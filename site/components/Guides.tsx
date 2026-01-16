import React from 'react';
import { useContent } from '../context/ContentContext';
import { EditableText } from './admin/Editable';
import { BookOpen, Target, Anchor } from 'lucide-react';

const Guides: React.FC = () => {
    const { content, updateContent } = useContent();
    const { guides } = content;

    const handleUpdateGuide = (index: number, field: string, value: any) => {
        const newGuides = [...guides];
        newGuides[index] = { ...newGuides[index], [field]: value };
        updateContent('guides', newGuides);
    };

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'Anchor': return Anchor;
            case 'Target': return Target;
            case 'BookOpen': return BookOpen;
            default: return BookOpen;
        }
    };

    return (
        <section id="guias" className="py-24 bg-transparent border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <div className="inline-block mb-4 px-3 py-1 rounded bg-fishing-neon/10 text-fishing-neon text-xs font-bold tracking-widest uppercase">
                            Tutoriais
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white max-w-xl">
                            GUIAS PARA <span className="text-fishing-neon">MESTRES</span> E INICIANTES
                        </h2>
                    </div>
                    <button className="px-6 py-3 border border-fishing-neon text-fishing-neon font-bold uppercase text-sm hover:bg-fishing-neon hover:text-black transition-colors rounded">
                        Ver todos os guias
                    </button>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {guides.map((guide, index) => {
                        const IconObj = getIcon(guide.icon as string);
                        return (
                            <div key={index} className="bg-black p-8 rounded-2xl border border-white/10 hover:border-fishing-neon transition-colors group cursor-pointer">
                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white mb-6 group-hover:bg-fishing-neon group-hover:text-black transition-colors">
                                    <IconObj size={24} />
                                </div>
                                <span className="text-fishing-neon text-xs font-bold uppercase tracking-wider mb-2 block">
                                    <EditableText
                                        value={guide.category}
                                        onSave={(val) => handleUpdateGuide(index, 'category', val)}
                                        className="bg-transparent border-none p-0"
                                    />
                                </span>
                                <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-gray-300 transition-colors">
                                    <EditableText
                                        value={guide.title}
                                        onSave={(val) => handleUpdateGuide(index, 'title', val)}
                                        className="bg-transparent border-none p-0 w-full"
                                    />
                                </h3>
                                <div className="text-gray-400 text-sm leading-relaxed">
                                    <EditableText
                                        value={guide.desc}
                                        onSave={(val) => handleUpdateGuide(index, 'desc', val)}
                                        multiline
                                        className="bg-transparent border-none p-0 w-full resize-none bg-none"
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
};

export default Guides;
