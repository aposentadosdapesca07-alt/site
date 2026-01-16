import React from 'react';
import { useContent } from '../context/ContentContext';
import { EditableText } from './admin/Editable';

const Footer: React.FC = () => {
  const { content, updateContent } = useContent();
  const { sections } = content;

  return (
    <footer className="bg-black/90 backdrop-blur-md py-20 border-t border-white/10 relative overflow-hidden">
      {/* Glow effect at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-24 bg-fishing-neon/5 blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 text-center">
        <div className="mb-8">
          <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider">
            <EditableText
              value={sections.footer.title}
              onSave={(val) => {
                const newSections = { ...sections };
                newSections.footer = { ...newSections.footer, title: val };
                updateContent('sections', newSections);
              }}
            />
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            <EditableText
              value={sections.footer.subtitle}
              onSave={(val) => {
                const newSections = { ...sections };
                newSections.footer = { ...newSections.footer, subtitle: val };
                updateContent('sections', newSections);
              }}
            />
          </p>
        </div>

        <div className="flex justify-center gap-6 mb-12">
          <a href="#" className="text-gray-400 hover:text-fishing-neon transition-colors">Youtube</a>
          <a href="#" className="text-gray-400 hover:text-fishing-neon transition-colors">Discord</a>
          <a href="#" className="text-gray-400 hover:text-fishing-neon transition-colors">Guias</a>
        </div>

        <div className="p-6 bg-neutral-900/50 rounded-lg border border-white/5 inline-block max-w-md mx-auto transform rotate-1 hover:rotate-0 transition-transform duration-300">
          <p className="text-fishing-neon font-display text-xl italic">
            <EditableText
              value={sections.footer.quote}
              onSave={(val) => {
                const newSections = { ...sections };
                newSections.footer = { ...newSections.footer, quote: val };
                updateContent('sections', newSections);
              }}
              multiline
            />
          </p>
        </div>

        <div className="mt-12 text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} <EditableText
            value={sections.footer.copyright}
            onSave={(val) => {
              const newSections = { ...sections };
              newSections.footer = { ...newSections.footer, copyright: val };
              updateContent('sections', newSections);
            }}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;