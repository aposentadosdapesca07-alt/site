import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { EditableText } from './admin/Editable';
import { Draggable } from './admin/Draggable';

const Hero: React.FC = () => {
  const { content, updateContent } = useContent();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { hero, heroImages } = content;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleUpdate = (field: string, val: string) => {
    updateContent('hero', { ...hero, [field]: val });
  };

  const handleDrag = (field: string, newPos: { x: number; y: number }) => {
    updateContent('hero', { ...hero, [field]: newPos });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Carousel */}
      {heroImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <img
            src={img}
            alt={`Hero Background ${index + 1}`}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#050505]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(163,230,53,0.1),transparent_70%)]"></div>
        </div>
      ))}

      <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl pt-20">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-fishing-neon/30 bg-fishing-neon/10 backdrop-blur-md">
          <span className="text-fishing-neon font-display font-semibold tracking-wider text-sm uppercase">
            Simples • Direto • Pescador Raiz
          </span>
        </div>

        <Draggable
          id="title"
          position={hero.titlePos || { x: 0, y: 0 }}
          onDrag={(id, pos) => handleDrag('titlePos', pos)}
          className="mb-6"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight drop-shadow-2xl">
            <EditableText
              value={hero.title}
              onSave={(val) => handleUpdate('title', val)}
              multiline
              className="block w-full text-center bg-transparent border-none p-0 focus:ring-0"
            />
          </h1>
        </Draggable>

        <Draggable
          id="subtitle"
          position={hero.subtitlePos || { x: 0, y: 0 }}
          onDrag={(id, pos) => handleDrag('subtitlePos', pos)}
          className="mb-10 max-w-2xl mx-auto"
        >
          <div className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
            <EditableText
              value={hero.subtitle}
              onSave={(val) => handleUpdate('subtitle', val)}
              multiline
              className="block w-full text-center bg-transparent border-none p-0 focus:ring-0"
            />
          </div>
        </Draggable>

        <Draggable
          id="cta"
          position={hero.ctaPos || { x: 0, y: 0 }}
          onDrag={(id, pos) => handleDrag('ctaPos', pos)}
          className="flex flex-col md:flex-row gap-4 justify-center items-center"
        >
          <button className="group relative px-8 py-4 bg-fishing-neon text-black font-bold font-display uppercase tracking-widest text-lg rounded-sm hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(163,230,53,0.3)] hover:shadow-[0_0_30px_rgba(163,230,53,0.6)]">
            <span className="flex items-center gap-2">
              <EditableText
                value={hero.cta}
                onSave={(val) => handleUpdate('cta', val)}
                className="bg-transparent border-none p-0 text-black w-auto"
              />
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </Draggable>

        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-gray-400 opacity-80">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Pescar sem sair de casa também é diversão.
        </div>

        {/* Carousel Indicators - Only if more than 1 image */}
        {heroImages.length > 1 && (
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-fishing-neon w-6' : 'bg-white/30 hover:bg-white/50'
                  }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;