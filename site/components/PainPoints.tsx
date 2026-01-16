import React from 'react';
import { Frown, Map, AlertTriangle, Anchor, HelpCircle } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { EditableText } from './admin/Editable';

const PainPoints: React.FC = () => {
  const { content, updateContent } = useContent();
  const { painPoints, sections } = content;

  const iconMap: any = {
    Map,
    AlertTriangle,
    Anchor,
    HelpCircle
  };

  return (
    <section className="py-24 bg-transparent relative border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            <EditableText
              value={sections.painPoints.title}
              onSave={(val) => {
                const newSections = { ...sections };
                newSections.painPoints = { ...newSections.painPoints, title: val };
                updateContent('sections', newSections);
              }}
            />
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            <EditableText
              value={sections.painPoints.subtitle}
              onSave={(val) => {
                const newSections = { ...sections };
                newSections.painPoints = { ...newSections.painPoints, subtitle: val };
                updateContent('sections', newSections);
              }}
              multiline
            />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {painPoints.map((item, index) => (
            <div key={index} className="group p-8 rounded-xl bg-neutral-900/50 border border-white/5 hover:border-red-500/30 transition-all duration-300 hover:bg-neutral-900 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Frown size={64} className="text-red-500" />
              </div>
              <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-6 text-red-500 group-hover:scale-110 transition-transform">
                {(() => {
                  const Icon = iconMap[item.icon as unknown as string] || HelpCircle;
                  return <Icon size={24} />;
                })()}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 italic">
                {item.quote}
              </h3>
              <p className="text-gray-400 text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl font-display text-white">
            Se isso soa familiar, relaxa. <span className="text-fishing-neon underline decoration-wavy underline-offset-4">
              <EditableText
                value={sections.painPoints.finalText}
                onSave={(val) => {
                  const newSections = { ...sections };
                  newSections.painPoints = { ...newSections.painPoints, finalText: val };
                  updateContent('sections', newSections);
                }}
              />
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PainPoints;