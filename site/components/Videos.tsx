import React from 'react';
import { useContent } from '../context/ContentContext';
import { EditableText, EditableImage } from './admin/Editable';
import { Play } from 'lucide-react';

const Videos: React.FC = () => {
    const { content, updateContent } = useContent();
    const { videos } = content;

    const handleUpdateVideo = (index: number, field: string, value: any) => {
        const newVideos = [...videos];
        newVideos[index] = { ...newVideos[index], [field]: value };
        updateContent('videos', newVideos);
    };

    return (
        <section id="videos" className="py-24 bg-transparent relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-neutral-900/50 to-black pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                        ÚLTIMOS VÍDEOS
                    </h2>
                    <p className="text-gray-400">Acompanhe nossas aventuras e tutoriais em vídeo.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Main Video - Still hardcoded for now or add to context later specifically */}
                    <div className="relative group rounded-2xl overflow-hidden aspect-square md:aspect-video border border-white/10 shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1544551763-8dd44758c2dd?q=80&w=2070&auto=format&fit=crop"
                            alt="Video Highlight"
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <button className="w-20 h-20 bg-fishing-neon rounded-full flex items-center justify-center pl-1 text-black transform group-hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(163,230,53,0.5)]">
                                <Play size={32} fill="currentColor" />
                            </button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded mb-2 inline-block uppercase">Ao Vivo</span>
                            <h3 className="text-2xl font-bold text-white mb-2">Campeonato de Pesca de Robalo - Final</h3>
                            <p className="text-gray-300 text-sm">Acompanhe a final emocionante do torneio mundial.</p>
                        </div>
                    </div>

                    {/* List */}
                    <div className="space-y-4">
                        {videos.map((video, i) => (
                            <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-fishing-neon/50 hover:bg-white/10 transition-all cursor-pointer group">
                                <div className="w-40 h-24 flex-shrink-0 bg-neutral-800 rounded-lg overflow-hidden relative">
                                    <EditableImage
                                        src={video.thumbnail}
                                        alt=""
                                        onSave={(val) => handleUpdateVideo(i, 'thumbnail', val)}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 pointer-events-none">
                                        <Play size={20} className="text-white" fill="currentColor" />
                                    </div>
                                </div>
                                <div>
                                    <span className="text-fishing-neon text-xs font-bold mb-1 block">
                                        <EditableText
                                            value={video.tag}
                                            onSave={(val) => handleUpdateVideo(i, 'tag', val)}
                                            className="bg-transparent border-none p-0"
                                        />
                                    </span>
                                    <h4 className="text-white font-bold leading-tight mb-2 group-hover:text-fishing-neon transition-colors">
                                        <EditableText
                                            value={video.title}
                                            onSave={(val) => handleUpdateVideo(i, 'title', val)}
                                            multiline
                                            className="bg-transparent border-none p-0 w-full"
                                        />
                                    </h4>
                                    <span className="text-xs text-gray-500">
                                        <EditableText
                                            value={video.meta}
                                            onSave={(val) => handleUpdateVideo(i, 'meta', val)}
                                            className="bg-transparent border-none p-0"
                                        />
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Videos;
