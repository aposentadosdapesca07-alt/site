import React from 'react';
import { useContent } from '../context/ContentContext';
import { EditableText } from './admin/Editable';
import { Calendar, ArrowRight } from 'lucide-react';

const News: React.FC = () => {
    const { content, updateContent } = useContent();
    const { news } = content;

    const handleUpdateNews = (index: number, field: string, value: any) => {
        const newNews = [...news];
        newNews[index] = { ...newNews[index], [field]: value };
        updateContent('news', newNews);
    };

    return (
        <section id="noticias" className="py-24 bg-transparent">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
                        NOTÍCIAS & ATUALIZAÇÕES
                    </h2>
                    <a href="#" className="hidden md:flex items-center gap-2 text-fishing-neon hover:text-white transition-colors font-bold text-sm uppercase tracking-wide">
                        Ver Arquivo <ArrowRight size={16} />
                    </a>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {news.map((item, index) => (
                        <div key={index} className="bg-black/40 border border-white/5 p-8 rounded-2xl hover:bg-black hover:border-fishing-neon/30 transition-all group">
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-gray-500 text-xs font-bold flex items-center gap-1">
                                    <Calendar size={12} />
                                    <EditableText
                                        value={item.date}
                                        onSave={(val) => handleUpdateNews(index, 'date', val)}
                                        className="bg-transparent border-none p-0"
                                    />
                                </span>
                                <span className="text-fishing-neon bg-fishing-neon/10 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide border border-fishing-neon/20">
                                    <EditableText
                                        value={item.tag}
                                        onSave={(val) => handleUpdateNews(index, 'tag', val)}
                                        className="bg-transparent border-none p-0"
                                    />
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-fishing-neon transition-colors">
                                <EditableText
                                    value={item.title}
                                    onSave={(val) => handleUpdateNews(index, 'title', val)}
                                    multiline
                                    className="bg-transparent border-none p-0 w-full"
                                />
                            </h3>
                            <div className="text-gray-400 text-sm mb-6">
                                <EditableText
                                    value={item.excerpt}
                                    onSave={(val) => handleUpdateNews(index, 'excerpt', val)}
                                    multiline
                                    className="bg-transparent border-none p-0 w-full resize-none"
                                />
                            </div>
                            <a href="#" className="text-white text-sm font-bold border-b border-fishing-neon/50 pb-0.5 hover:border-fishing-neon transition-colors inline-block">
                                Ler mais
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default News;
