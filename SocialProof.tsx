import React from 'react';
import { Users, Youtube, Eye } from 'lucide-react';
import { useContent } from './context/ContentContext';
import { EditableText } from './admin/Editable';

const SocialProof: React.FC = () => {
  const { content, updateContent } = useContent();
  const { sections } = content;

  return (
    <section className="py-24 bg-transparent border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">

          <div className="text-left md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              <EditableText
                value={sections.socialProof.title}
                onSave={(val) => {
                  const newSections = { ...sections };
                  newSections.socialProof = { ...newSections.socialProof, title: val };
                  updateContent('sections', newSections);
                }}
              />
            </h2>
            <p className="text-gray-400 text-lg mb-6">
              <EditableText
                value={sections.socialProof.subtitle}
                onSave={(val) => {
                  const newSections = { ...sections };
                  newSections.socialProof = { ...newSections.socialProof, subtitle: val };
                  updateContent('sections', newSections);
                }}
                multiline
              />
            </p>
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <img key={i} className="w-12 h-12 rounded-full border-2 border-[#171717]" src={`https://picsum.photos/seed/${i + 50}/100/100`} alt="User" />
              ))}
              <div className="w-12 h-12 rounded-full border-2 border-[#171717] bg-neutral-800 flex items-center justify-center text-xs text-white font-bold">
                +18k
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full md:w-auto">
            <div className="p-6 bg-black/40 rounded-lg border border-white/5 text-center">
              <Youtube className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white font-display">18k+</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Inscritos</div>
            </div>

            <div className="p-6 bg-black/40 rounded-lg border border-white/5 text-center">
              <Eye className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white font-display">Milhares</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Visualizações</div>
            </div>

            <div className="p-6 bg-black/40 rounded-lg border border-white/5 text-center col-span-2 md:col-span-1">
              <Users className="w-8 h-8 text-fishing-neon mx-auto mb-2" />
              <div className="text-2xl font-bold text-white font-display">Ativa</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Comunidade</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SocialProof;

