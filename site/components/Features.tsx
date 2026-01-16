import React from 'react';
import { CheckCircle2, Fish, Anchor, Tv, HelpCircle } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { EditableText } from './admin/Editable';

const Features: React.FC = () => {
  const { content, updateContent } = useContent();
  const { solutions, sections } = content;

  const iconMap: any = {
    Fish,
    Anchor,
    Tv,
    HelpCircle
  };

  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          <div className="lg:w-1/2">
            <div className="inline-block mb-4 px-3 py-1 rounded bg-fishing-neon/10 text-fishing-neon text-xs font-bold tracking-widest uppercase">
              <EditableText
                value={sections.features.tagline}
                onSave={(val) => {
                  const newSections = { ...sections };
                  newSections.features = { ...newSections.features, tagline: val };
                  updateContent('sections', newSections);
                }}
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              <EditableText
                value={sections.features.title}
                onSave={(val) => {
                  const newSections = { ...sections };
                  newSections.features = { ...newSections.features, title: val };
                  updateContent('sections', newSections);
                }}
                multiline
              />
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              <EditableText
                value={sections.features.description}
                onSave={(val) => {
                  const newSections = { ...sections };
                  newSections.features = { ...newSections.features, description: val };
                  updateContent('sections', newSections);
                }}
                multiline
              />
            </p>

            <div className="space-y-6">
              {solutions.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                  <div className="flex-shrink-0 w-10 h-10 rounded bg-fishing-neon flex items-center justify-center text-black shadow-[0_0_10px_rgba(163,230,53,0.4)]">
                    {(() => {
                      const Icon = iconMap[item.icon as unknown as string] || HelpCircle;
                      return <Icon size={20} />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-white font-bold font-display text-lg">{item.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <button className="px-8 py-3 bg-white text-black font-display font-bold uppercase tracking-wider hover:bg-fishing-neon transition-colors">
                <EditableText
                  value={sections.features.cta}
                  onSave={(val) => {
                    const newSections = { ...sections };
                    newSections.features = { ...newSections.features, cta: val };
                    updateContent('sections', newSections);
                  }}
                />
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              <img
                src="https://images.unsplash.com/photo-1559863333-5c7438186eb2?q=80&w=2070&auto=format&fit=crop"
                alt="Gameplay Fishing Planet"
                className="w-full h-auto object-cover transform hover:scale-105 transition-duration-700 transition-transform"
              />

              <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="text-fishing-neon w-5 h-5" />
                  <span className="text-white font-bold font-display">
                    <EditableText
                      value={sections.features.spotTitle}
                      onSave={(val) => {
                        const newSections = { ...sections };
                        newSections.features = { ...newSections.features, spotTitle: val };
                        updateContent('sections', newSections);
                      }}
                    />
                  </span>
                </div>
                <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-fishing-neon w-[85%]"></div>
                </div>
                <p className="text-xs text-gray-400 mt-2 flex justify-between">
                  <span>Eficiência</span>
                  <span>85% Alta</span>
                </p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-fishing-neon/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;