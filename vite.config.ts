import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    build: {
      emptyOutDir: false,
    },
    plugins: [
      react(),
      {
        name: 'save-content-plugin',
        configureServer(server) {
          // Serve static files from dist/cards to ensure they are visible even if only present there
          server.middlewares.use('/cards', (req, res, next) => {
            const url = req.url?.split('?')[0] || '';
            const fileName = decodeURIComponent(url.replace(/^\//, '')); // Decode to handle spaces/special chars
            if (!fileName) return next();

            const distPath = path.resolve(__dirname, 'dist/cards', fileName);
            console.log(`Serving card: ${fileName} from ${distPath}`); // Debug log
            if (fs.existsSync(distPath)) {
              const stat = fs.statSync(distPath);
              res.writeHead(200, {
                'Content-Type': 'image/png', // Simple content type setting, mostly PNGs used here
                'Content-Length': stat.size
              });
              const readStream = fs.createReadStream(distPath);
              readStream.pipe(res);
              return;
            }
            next();
          });

          // New endpoint to list available cards
          server.middlewares.use('/api/list-cards', (req, res, next) => {
            if (req.method === 'GET') {
              try {
                // CHANGED: Read from dist/cards as requested by USER
                const cardsDir = path.resolve(__dirname, 'dist/cards');
                if (fs.existsSync(cardsDir)) {
                  const files = fs.readdirSync(cardsDir).filter(f => /\.(png|jpg|jpeg|webp|gif)$/i.test(f));
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: true, files }));
                } else {
                  // If dist/cards doesn't exist, try creating it or fallback
                  if (!fs.existsSync(cardsDir)) {
                    fs.mkdirSync(cardsDir, { recursive: true });
                  }
                  res.statusCode = 200;
                  res.end(JSON.stringify({ success: true, files: [] }));
                }
              } catch (err) {
                console.error('Error listing cards:', err);
                res.statusCode = 500;
                res.end(JSON.stringify({ success: false, error: 'Failed to list cards' }));
              }
            } else {
              next();
            }
          });

          server.middlewares.use('/api/save-content', (req, res, next) => {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', chunk => {
                body += chunk.toString();
              });
              req.on('end', () => {
                try {
                  const publicDir = path.resolve(__dirname, 'public');
                  const distDir = path.resolve(__dirname, 'dist');

                  if (!fs.existsSync(publicDir)) {
                    fs.mkdirSync(publicDir);
                  }
                  if (!fs.existsSync(distDir)) {
                    // Create dist if it doesn't exist (though usually vite handles this on build)
                    fs.mkdirSync(distDir);
                  }

                  const contentPath = path.join(publicDir, 'content.json');
                  const distContentPath = path.join(distDir, 'content.json');

                  // Write to both to ensure immediate persistence in dev and build
                  fs.writeFileSync(contentPath, body);
                  // Also write to dist so the user sees it "in the dist folder" immediately if checking
                  if (fs.existsSync(distDir)) {
                    fs.writeFileSync(distContentPath, body);
                  }

                  res.statusCode = 200;
                  res.end(JSON.stringify({ success: true, message: 'Content saved successfully' }));
                } catch (err) {
                  console.error('Error saving content:', err);
                  res.statusCode = 500;
                  res.end(JSON.stringify({ success: false, error: 'Failed to write file' }));
                }
              });
            } else {
              next();
            }
          });
        }
      }
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
