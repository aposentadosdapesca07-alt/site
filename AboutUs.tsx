import React from 'react';
import { Users } from 'lucide-react';
import { useContent } from './context/ContentContext';
import { EditableText, EditableImage } from './admin/Editable';
import { Draggable } from './admin/Draggable';

const AboutUs: React.FC = () => {
    const { content, updateContent } = useContent();
    const { aboutUs } = content;

    const handleChange = (field: keyof typeof aboutUs, value: any) => {
        updateContent('aboutUs', {
            ...aboutUs,
            [field]: value
        });
    };

    const handleNewsChange = (newsKey: 'news1' | 'news2', field: 'image' | 'label', value: string) => {
        updateContent('aboutUs', {
            ...aboutUs,
            [newsKey]: {
                ...aboutUs[newsKey],
                [field]: value
            }
        });
    };

    return (
        <section id="quem-somos" className="py-24 bg-transparent border-t border-white/5 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center mb-4">
                        <Draggable
                            id="tagline"
                            position={aboutUs.taglinePos || { x: 0, y: 0 }}
                            onDrag={(id, pos) => handleChange('taglinePos', pos)}
                        >
                            <div className="flex items-center gap-2 px-3 py-1 rounded bg-fishing-neon/10 text-fishing-neon text-xs font-bold tracking-widest uppercase">
                                <Users size={14} />
                                <EditableText
                                    value={aboutUs.tagline}
                                    onSave={(val) => handleChange('tagline', val)}
                                />
                            </div>
                        </Draggable>
                    </div>

                    <div className="flex justify-center mb-6">
                        <Draggable
                            id="title"
                            position={aboutUs.titlePos || { x: 0, y: 0 }}
                            onDrag={(id, pos) => handleChange('titlePos', pos)}
                        >
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
                                <EditableText
                                    value={aboutUs.title}
                                    onSave={(val) => handleChange('title', val)}
                                />
                            </h2>
                        </Draggable>
                    </div>
                    <div className="prose prose-invert prose-lg mx-auto text-gray-300 leading-relaxed text-center">
                        <p className="mb-6 text-xl">
                            <EditableText
                                value={aboutUs.intro}
                                onSave={(val) => handleChange('intro', val)}
                                multiline
                            />
                        </p>
                        <p className="mb-8">
                            <EditableText
                                value={aboutUs.story}
                                onSave={(val) => handleChange('story', val)}
                                multiline
                            />
                        </p>
                        <p className="text-xl italic text-gray-400 font-medium">
                            <EditableText
                                value={aboutUs.quote}
                                onSave={(val) => handleChange('quote', val)}
                                multiline
                            />
                        </p>
                    </div>

                    <div className="mt-16">
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <div className="h-px w-12 bg-fishing-neon/50"></div>
                            <h3 className="text-2xl font-display font-bold text-white uppercase tracking-widest">
                                <EditableText
                                    value={aboutUs.newsTitle}
                                    onSave={(val) => handleChange('newsTitle', val)}
                                />
                            </h3>
                            <div className="h-px w-12 bg-fishing-neon/50"></div>
                        </div>

                        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
                            <div className="group relative w-64 md:w-72 aspect-video bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-fishing-neon/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(163,230,53,0.15)] transform hover:-translate-y-1">
                                <EditableImage
                                    src={aboutUs.news1.image}
                                    alt={aboutUs.news1.alt}
                                    onSave={(val) => handleNewsChange('news1', 'image', val)}
                                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs font-bold text-fishing-neon uppercase tracking-wider">
                                        <EditableText
                                            value={aboutUs.news1.label}
                                            onSave={(val) => handleNewsChange('news1', 'label', val)}
                                        />
                                    </span>
                                </div>
                            </div>

                            <div className="group relative w-64 md:w-72 aspect-video bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-fishing-neon/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(163,230,53,0.15)] transform hover:-translate-y-1">
                                <EditableImage
                                    src={aboutUs.news2.image}
                                    alt={aboutUs.news2.alt}
                                    onSave={(val) => handleNewsChange('news2', 'image', val)}
                                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs font-bold text-fishing-neon uppercase tracking-wider">
                                        <EditableText
                                            value={aboutUs.news2.label}
                                            onSave={(val) => handleNewsChange('news2', 'label', val)}
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;


