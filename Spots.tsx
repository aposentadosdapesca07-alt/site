import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from './context/ContentContext';
import { EditableText, EditableImage } from './admin/Editable';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

import { Draggable } from './admin/Draggable';

const Spots: React.FC = () => {
    const { content, updateContent } = useContent();
    const { spots, sections } = content;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(3);

    const handleSectionUpdate = (field: string, value: any) => {
        updateContent('sections', {
            ...sections,
            spots: { ...sections.spots, [field]: value }
        });
    };

    const handleSectionDrag = (field: string, newPos: { x: number; y: number }) => {
        handleSectionUpdate(field, newPos);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsPerView(1);
            } else if (window.innerWidth < 1024) {
                setItemsPerView(2);
            } else {
                setItemsPerView(3);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleUpdateSpot = (index: number, field: string, value: any) => {
        const newSpots = [...spots];
        newSpots[index] = { ...newSpots[index], [field]: value };
        updateContent('spots', newSpots);
    };

    const nextSlide = () => {
        if (currentIndex + itemsPerView < spots.length) {
            setCurrentIndex((prev) => prev + itemsPerView);
        }
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => Math.max(0, prev - itemsPerView));
    };

    return (
        <section id="spots" className="py-24 bg-transparent relative">
            <div className="container mx-auto px-6">
                <div className="mb-8 text-center flex flex-col items-center">
                    <Draggable
                        id="spots-tagline"
                        position={sections.spots.taglinePos || { x: 0, y: 0 }}
                        onDrag={(id, pos) => handleSectionDrag('taglinePos', pos)}
                        className="mb-4"
                    >
                        <div className="inline-block px-3 py-1 rounded bg-fishing-neon/10 text-fishing-neon text-xs font-bold tracking-widest uppercase">
                            <EditableText
                                value={content.sections.spots.tagline}
                                onSave={(val) => handleSectionUpdate('tagline', val)}
                            />
                        </div>
                    </Draggable>

                    <Draggable
                        id="spots-title"
                        position={sections.spots.titlePos || { x: 0, y: 0 }}
                        onDrag={(id, pos) => handleSectionDrag('titlePos', pos)}
                        className="mb-8"
                    >
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-white">
                            <EditableText
                                value={content.sections.spots.title}
                                onSave={(val) => handleSectionUpdate('title', val)}
                            />
                        </h2>
                    </Draggable>

                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        <EditableText
                            value={content.sections.spots.description}
                            onSave={(val) => handleSectionUpdate('description', val)}
                            multiline
                        />
                    </p>
                </div>

                <div className="relative group/slider">
                    <button
                        onClick={prevSlide}
                        disabled={currentIndex === 0}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 bg-fishing-neon text-black rounded-full hover:bg-white transition-all opacity-0 group-hover/slider:opacity-100 disabled:opacity-0 disabled:pointer-events-none shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                        aria-label="Previous spots"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={nextSlide}
                        disabled={currentIndex + itemsPerView >= spots.length}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 bg-fishing-neon text-black rounded-full hover:bg-white transition-all opacity-0 group-hover/slider:opacity-100 disabled:opacity-0 disabled:pointer-events-none shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                        aria-label="Next spots"
                    >
                        <ChevronRight size={24} />
                    </button>

                    <div className="overflow-hidden -mx-4">
                        <div
                            className="flex transition-transform duration-700 ease-in-out will-change-transform [--items-per-view:1] md:[--items-per-view:2] lg:[--items-per-view:3]"
                            style={{
                                transform: `translateX(calc(${currentIndex} * -100% / var(--items-per-view)))`
                            } as React.CSSProperties}
                        >
                            {spots.map((spot, index) => (
                                <div
                                    key={index}
                                    className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                                >
                                    <div className="group/card relative bg-neutral-900 rounded-2xl overflow-hidden border border-white/10 hover:border-fishing-neon/50 transition-all duration-300 h-full flex flex-col">
                                        <div className="aspect-square md:aspect-video relative overflow-hidden flex-shrink-0">
                                            <EditableImage
                                                src={spot.image}
                                                alt={spot.name}
                                                onSave={(val) => handleUpdateSpot(index, 'image', val)}
                                                className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent pointer-events-none"></div>
                                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-bold text-white uppercase flex items-center gap-1">
                                                <MapPin size={12} className="text-fishing-neon" />
                                                <EditableText
                                                    value={spot.region}
                                                    onSave={(val) => handleUpdateSpot(index, 'region', val)}
                                                    className="bg-transparent border-none p-0"
                                                />
                                            </div>
                                        </div>

                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-2xl font-display font-bold text-white group-hover/card:text-fishing-neon transition-colors">
                                                    <EditableText
                                                        value={spot.name}
                                                        onSave={(val) => handleUpdateSpot(index, 'name', val)}
                                                        className="bg-transparent border-none p-0 w-full font-display font-bold"
                                                    />
                                                </h3>
                                                <span className="text-xs font-bold px-2 py-1 rounded bg-white/10 text-gray-300 border border-white/5 h-fit shrink-0">
                                                    <EditableText
                                                        value={spot.difficulty}
                                                        onSave={(val) => handleUpdateSpot(index, 'difficulty', val)}
                                                        className="bg-transparent border-none p-0 w-20 text-center"
                                                    />
                                                </span>
                                            </div>

                                            <div className="space-y-3 mb-6">
                                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                                    <span className="text-white">
                                                        <EditableText
                                                            value={spot.coordinates}
                                                            onSave={(val) => handleUpdateSpot(index, 'coordinates', val)}
                                                            className="bg-transparent border-none p-0 text-white"
                                                        />
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                                                {spot?.fish?.slice(0, 3).map((f: any, i: number) => (
                                                    <span key={i} className="text-xs text-black bg-fishing-neon px-2 py-1 rounded font-bold uppercase">
                                                        {typeof f === 'string' ? f : f.name}
                                                    </span>
                                                ))}
                                            </div>

                                            <Link
                                                to={`/spot/${spot.name.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '')}`}
                                                className="w-full py-3 border border-white/20 text-white font-bold uppercase text-sm hover:bg-white hover:text-black transition-colors rounded block text-center"
                                            >
                                                Ver Detalhes
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Spots;


