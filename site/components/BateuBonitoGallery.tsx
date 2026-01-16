import React from 'react';
import { Camera } from 'lucide-react';

const galleryImages = [
    "/bateu_bonito_1.png",
    "/bateu_bonito_2.png",
    "/bateu_bonito_3.png"
];

const BateuBonitoGallery: React.FC = () => {
    return (
        <section id="galeria" className="py-24 bg-transparent relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded bg-fishing-neon/10 text-fishing-neon text-xs font-bold tracking-widest uppercase">
                            <Camera size={14} />
                            <span>Hall da Fama</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
                            GALERIA <span className="text-fishing-neon">BATEU BONITO SEU ZÉ</span>
                        </h2>
                        <p className="text-gray-400 mt-4 max-w-xl">
                            A Prova do Crime: Mostre que não é história de pescador!
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryImages.map((src, index) => (
                        <div key={index} className="group relative aspect-video rounded-2xl overflow-hidden border border-white/10 hover:border-fishing-neon/50 transition-all duration-300 bg-black/40">
                            <img
                                src={src}
                                alt={`Galeria Bateu Bonito ${index + 1}`}
                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 p-4"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="bg-fishing-neon text-black font-bold uppercase text-xs px-3 py-1 rounded">
                                    Ver Foto
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BateuBonitoGallery;
