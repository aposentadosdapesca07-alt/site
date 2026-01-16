const https = require('https');

const urls = [
    "https://wiki.fishingplanet.com/Lone_Star_Lake_-_Texas",
    "https://wiki.fishingplanet.com/Mudwater_River_-_Missouri"
];

function fetch(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
            res.on('error', reject);
        }).on('error', reject);
    });
}

(async () => {
    for (const url of urls) {
        try {
            const html = await fetch(url);
            // Look for map images. Heuristic: larger images, png, or containing 'map'
            // Usually wiki images are in /images/thumb/ or /images/
            // <img alt="Lone Star Lake map.png" src="/images/thumb/e/e4/Lone_Star_Lake_map.png/300px-Lone_Star_Lake_map.png"

            const regex = /src="([^"]+map[^"]+\.png)"/g;
            let match;
            let found = false;
            while ((match = regex.exec(html)) !== null) {
                console.log(`FOUND: ${url} -> https://wiki.fishingplanet.com${match[1]}`);
                found = true;
            }
            if (!found) {
                // Try simpler lookup for pngs inside infobox? Hard without DOM.
                // Just log all PNGs that look content-related
                console.log(`NO EXACT MAP MATCH FOR ${url}, checking other PNGs...`);
            }
        } catch (e) {
            console.error(`ERROR ${url}: ${e.message}`);
        }
    }
})();
