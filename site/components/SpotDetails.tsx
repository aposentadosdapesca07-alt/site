import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { ArrowLeft, MapPin } from 'lucide-react';
import { EditableText, EditableImage } from './admin/Editable';
import AdSpace from './AdSpace';

// ... (existing imports)

// Inside SpotDetails component return, before content grid:
{/* Header Image */ }
{/* ... (existing header image code) ... */ }

// import outside? No, this file is fully contained.
import { FishSpotInfo } from '../context/ContentContext';
import { X, Info, Image as ImageIcon, Edit2, Play } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

// Helper to extract YouTube ID
const getYoutubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

const SpotDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { content, updateContent, isEditing } = useContent();
    const { spots } = content;

    // Create Ref for file input
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Find spot by slug (simple name matching for now)
    const spotIndex = spots.findIndex(s =>
        s.name.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '') === id
    );

    const spot = spots[spotIndex];

    if (!spot) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
                <h1 className="text-4xl font-display font-bold text-fishing-neon mb-4">Spot não encontrado</h1>
                <Link to="/" className="text-white hover:text-fishing-neon flex items-center gap-2">
                    <ArrowLeft /> Voltar para o início
                </Link>
            </div>
        );
    }

    const [selectedFishIndex, setSelectedFishIndex] = useState<number | null>(null);
    const [showSetup, setShowSetup] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    // Reset video state when changing fish
    useEffect(() => {
        setIsVideoPlaying(false);
    }, [selectedFishIndex]);

    // Card Selector State
    const [showCardSelector, setShowCardSelector] = useState(false);
    const [availableCards, setAvailableCards] = useState<string[]>([]);
    const [loadingCards, setLoadingCards] = useState(false);

    const openCardSelector = async () => {
        setShowCardSelector(true);
        setLoadingCards(true);
        try {
            const res = await fetch('/api/list-cards');
            const data = await res.json();
            if (data.success) {
                setAvailableCards(data.files);
            }
        } catch (e) {
            console.error(e);
            alert("Erro ao carregar lista de cards.");
        } finally {
            setLoadingCards(false);
        }
    };

    const handleUpdateSpot = (field: string, value: any) => {
        const newSpots = [...spots];
        newSpots[spotIndex] = { ...newSpots[spotIndex], [field]: value };
        updateContent('spots', newSpots);
    };

    const handleUpdateFish = (index: number, field: keyof FishSpotInfo, value: any) => {
        if (!spot.fish) return;
        const newSpots = [...spots];
        const newFishList = [...spot.fish];
        // Ensure object structure
        if (typeof newFishList[index] === 'string') {
            newFishList[index] = { name: newFishList[index] as unknown as string };
        }
        newFishList[index] = { ...newFishList[index], [field]: value };
        newSpots[spotIndex] = { ...newSpots[spotIndex], fish: newFishList };
        updateContent('spots', newSpots);
    };

    const handleUpdateGlobalLabel = (field: string, value: string) => {
        const newSections = { ...content.sections };
        // @ts-ignore
        newSections.spotDetails = {
            // @ts-ignore
            ...newSections.spotDetails,
            [field]: value
        };
        updateContent('sections', newSections);
    };

    return (
        <div className="min-h-screen custom-page-bg text-gray-200 font-sans selection:bg-fishing-neon selection:text-black">
            {/* Nav similar to main app or just a back button */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-white/10 py-4">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
                        <img
                            src="/logo.png"
                            alt="Aposentados da Pesca Logo"
                            className="h-12 w-auto object-contain"
                        />
                        <span className="font-display font-bold text-white text-lg tracking-wider">
                            APOSENTADOS <span className="text-fishing-neon">DA PESCA</span>
                        </span>
                    </Link>
                    <Link to="/" className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-fishing-neon transition-colors uppercase">
                        <ArrowLeft size={16} /> Voltar
                    </Link>
                </div>
            </nav>

            <main className="pt-32 pb-24 container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header Image */}
                    <div className="relative aspect-square md:aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-12 group">
                        <EditableImage
                            src={spot.image}
                            alt={spot.name}
                            onSave={(val) => handleUpdateSpot('image', val)}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                            <div className="inline-flex items-center gap-2 bg-fishing-neon text-black px-3 py-1 rounded font-bold text-xs uppercase tracking-wider mb-4">
                                <MapPin size={14} />
                                <EditableText
                                    value={spot.region}
                                    onSave={(val) => handleUpdateSpot('region', val)}
                                    className="bg-transparent border-none p-0"
                                />
                            </div>
                            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-2">
                                <EditableText
                                    value={spot.name}
                                    onSave={(val) => handleUpdateSpot('name', val)}
                                    className="bg-transparent border-none p-0 w-full"
                                />
                            </h1>
                        </div>
                    </div>

                    {/* Fish Spot Section - Full Width */}
                    <section className="bg-neutral-900/50 p-8 rounded-2xl border border-white/5 mb-12">
                        <h3 className="text-2xl font-display font-bold text-fishing-neon mb-2">
                            <EditableText
                                // @ts-ignore
                                value={content.sections.spotDetails?.fishTitle || "Spot dos Peixes"}
                                onSave={(val) => handleUpdateGlobalLabel('fishTitle', val)}
                            />
                        </h3>
                        <p className="text-gray-400 text-sm mb-6">Selecione o peixe que deseja capturar.</p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {spot?.fish?.map((f: FishSpotInfo | string, i: number) => {
                                const fishName = typeof f === 'string' ? f : f.name;
                                const fishImg = typeof f === 'object' ? f.image : null;

                                return (
                                    <div
                                        key={i}
                                        onClick={() => setSelectedFishIndex(i)}
                                        className="group relative bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-fishing-neon/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(196,253,45,0.15)] hover:-translate-y-1"
                                    >
                                        <div className="w-full aspect-[4/3] bg-gradient-to-b from-white/5 to-transparent p-4 flex items-center justify-center relative">
                                            {fishImg ? (
                                                <img
                                                    src={fishImg}
                                                    alt={fishName}
                                                    className="w-full h-full object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500 ease-out"
                                                />
                                            ) : (
                                                <span className="text-gray-600 font-bold text-4xl opacity-20 group-hover:opacity-40 transition-opacity">?</span>
                                            )}

                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                                <span className="bg-fishing-neon text-black text-xs font-bold uppercase px-3 py-1 rounded-full transform scale-90 group-hover:scale-100 transition-transform">
                                                    Ver Detalhes
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-3 bg-black/40 border-t border-white/5">
                                            <span className="block font-display font-bold text-gray-300 group-hover:text-white text-center text-sm truncate tracking-wide">
                                                {fishName}
                                            </span>
                                        </div>
                                    </div>
                                );
                            }) || <span className="text-gray-500 italic">Lista de peixes não disponível.</span>}
                        </div>
                    </section>

                    {/* Content Grid */}
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="md:col-span-2 space-y-8">
                            <section className="bg-neutral-900/50 p-8 rounded-2xl border border-white/5">
                                <h3 className="text-2xl font-display font-bold text-fishing-neon mb-4">
                                    <EditableText
                                        // @ts-ignore
                                        value={content.sections.spotDetails?.aboutTitle || "Sobre o Spot"}
                                        onSave={(val) => handleUpdateGlobalLabel('aboutTitle', val)}
                                    />
                                </h3>
                                <div className="text-gray-300 leading-relaxed text-lg">
                                    <EditableText
                                        value={spot.description || "Adicione uma descrição para este spot..."}
                                        onSave={(val) => handleUpdateSpot('description', val)}
                                        multiline
                                        className="w-full min-h-[100px]"
                                    />
                                </div>
                            </section>

                            <section className="bg-neutral-900/50 p-8 rounded-2xl border border-white/5">
                                <h3 className="text-2xl font-display font-bold text-fishing-neon mb-4">
                                    <EditableText
                                        // @ts-ignore
                                        value={content.sections.spotDetails?.videoTitle || "Vídeo do Spot"}
                                        onSave={(val) => handleUpdateGlobalLabel('videoTitle', val)}
                                    />
                                </h3>
                                <div className="aspect-video bg-black rounded-xl overflow-hidden border border-white/10 relative group">
                                    {spot.videoUrl ? (
                                        <iframe
                                            src={spot.videoUrl}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full"
                                        ></iframe>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                                            <p>Sem vídeo disponível</p>
                                        </div>
                                    )}

                                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 p-2 rounded backdrop-blur">
                                        <p className="text-xs text-fishing-neon font-bold mb-1">URL DO VÍDEO (Embed)</p>
                                        <EditableText
                                            value={spot.videoUrl || ""}
                                            onSave={(val) => handleUpdateSpot('videoUrl', val)}
                                            className="w-full text-xs"
                                        />
                                    </div>
                                </div>
                            </section>


                        </div>

                        {/* Fish Details Modal */}
                        {selectedFishIndex !== null && spot.fish && (
                            <div className="fixed inset-0 z-[100] flex justify-center items-start p-4 pt-0 bg-black/90 backdrop-blur-md overflow-y-auto" onClick={(e) => { if (e.target === e.currentTarget) { setSelectedFishIndex(null); setShowSetup(false); } }}>
                                <div className={`bg-[#0a0a0a] border border-white/10 rounded-2xl w-full ${showSetup ? 'max-w-[98vw]' : 'max-w-2xl'} shadow-2xl flex flex-col md:flex-row h-auto my-0 transition-all duration-300 relative`}>

                                    {/* Left Side (Form) */}
                                    <div className={`flex flex-col min-w-0 bg-[#0a0a0a] transition-all duration-300 ${showSetup ? 'hidden md:flex md:w-[400px] shrink-0 border-r border-white/10' : 'flex-1'}`}>
                                        <div className="p-4 px-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-[#0a0a0a] z-10 shrink-0">
                                            <div>
                                                <p className="text-fishing-neon text-xs font-bold uppercase tracking-wider mb-1">Editando informações de</p>
                                                <h2 className="text-2xl font-display font-bold text-white">
                                                    <EditableText
                                                        value={(typeof spot.fish[selectedFishIndex] === 'string' ? spot.fish[selectedFishIndex] : (spot.fish[selectedFishIndex] as FishSpotInfo).name) as string}
                                                        onSave={(val) => handleUpdateFish(selectedFishIndex, 'name', val)}
                                                    />
                                                </h2>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => setShowSetup(!showSetup)}
                                                    className={`flex items-center gap-3 px-3 py-2 border rounded-lg transition-all group ${showSetup ? 'bg-fishing-neon/10 border-fishing-neon' : 'bg-neutral-800 hover:bg-neutral-700 border-white/10'}`}
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-black/50 border border-white/10 p-1">
                                                        <img src="/rod_setup.jpg" alt="Setup" className="w-full h-full object-contain" />
                                                    </div>
                                                    <div className="text-left">
                                                        <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider group-hover:text-fishing-neon transition-colors">Setup</span>
                                                        <span className="block text-sm font-bold text-white leading-none">Monte seu Equipamento</span>
                                                    </div>
                                                </button>

                                                <button onClick={() => { setSelectedFishIndex(null); setShowSetup(false); }} className="text-gray-500 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10">
                                                    <X size={24} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="p-6 space-y-8">
                                            {/* Fish Image */}
                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2 text-white font-bold text-sm uppercase"><ImageIcon size={16} className="text-fishing-neon" /> Imagem do Peixe</label>
                                                <div className="w-full aspect-video bg-black rounded-xl border border-dashed border-white/20 flex items-center justify-center overflow-hidden relative">
                                                    <EditableImage
                                                        src={(spot.fish[selectedFishIndex] as FishSpotInfo).image || "/placeholder_fish.png"}
                                                        alt="Peixe"
                                                        onSave={(val) => handleUpdateFish(selectedFishIndex, 'image', val)}
                                                        className="w-full h-full object-contain"
                                                    />
                                                    {!(spot.fish[selectedFishIndex] as FishSpotInfo).image && <span className="absolute pointer-events-none text-gray-600 text-sm">Clique para adicionar imagem</span>}
                                                </div>
                                            </div>

                                            {/* Location Info & Map */}
                                            <div className="space-y-4">
                                                <label className="flex items-center gap-2 text-white font-bold text-sm uppercase"><Info size={16} className="text-fishing-neon" /> Onde e Como Pescar</label>
                                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                                    <EditableText
                                                        value={(spot.fish[selectedFishIndex] as FishSpotInfo).description || "Descreva aqui o local exato no mapa, iscas, horário e profundidade..."}
                                                        onSave={(val) => handleUpdateFish(selectedFishIndex, 'description', val)}
                                                        multiline
                                                        className="w-full min-h-[100px] text-gray-300"
                                                    />
                                                </div>
                                            </div>

                                            {/* Precise Map Spot Image */}
                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2 text-white font-bold text-sm uppercase"><MapPin size={16} className="text-fishing-neon" /> Imagem do Local (Map Spot)</label>
                                                <div className="w-full aspect-video bg-black rounded-xl border border-dashed border-white/20 flex items-center justify-center overflow-hidden relative">
                                                    <EditableImage
                                                        src={(spot.fish[selectedFishIndex] as FishSpotInfo).spotImage || ""}
                                                        alt="Local no Mapa"
                                                        onSave={(val) => handleUpdateFish(selectedFishIndex, 'spotImage', val)}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    {!(spot.fish[selectedFishIndex] as FishSpotInfo).spotImage && <span className="absolute pointer-events-none text-gray-600 text-sm">Clique para adicionar print do mapa</span>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 border-t border-white/10 bg-white/5 flex justify-end shrink-0 mt-auto">
                                            <button onClick={() => { setSelectedFishIndex(null); setShowSetup(false); }} className="px-6 py-2 bg-fishing-neon text-black font-bold uppercase rounded hover:bg-fishing-neon/80 transition-colors">
                                                Concluir Edição
                                            </button>
                                        </div>
                                    </div>

                                    {/* Right Side (Setup Panel) */}
                                    {showSetup && (
                                        <div className="flex-1 border-l border-white/10 flex flex-col bg-neutral-900 shadow-inner overflow-hidden shrink-0">
                                            <div className="p-4 px-6 border-b border-white/10 flex items-center gap-4 bg-neutral-900 border-l border-white/5 shrink-0">
                                                <button onClick={() => setShowSetup(false)} className="md:hidden text-gray-400 hover:text-white">
                                                    <ArrowLeft size={24} />
                                                </button>
                                                <h3 className="font-display font-bold text-xl md:text-2xl text-white leading-tight">Monte sua Traia e Busque seu Peixe</h3>
                                            </div>

                                            {/* Setup Panel Content - Expansive */}
                                            <div className="p-6 pt-1 flex flex-col gap-6">

                                                {/* Card/Video Container */}
                                                <div
                                                    id="setup-video-container"
                                                    className="relative group w-full aspect-video bg-black/40 rounded-xl overflow-hidden shadow-lg border border-white/5 shrink-0 scroll-mt-24"
                                                >

                                                    {/* Video Player Active */}
                                                    {isVideoPlaying && ((spot.fish?.[selectedFishIndex!] as FishSpotInfo)?.videoUrl) ? (
                                                        <iframe
                                                            width="100%"
                                                            height="100%"
                                                            src={`https://www.youtube.com/embed/${getYoutubeId((spot.fish[selectedFishIndex!] as FishSpotInfo).videoUrl!)}?autoplay=1`}
                                                            title="YouTube video player"
                                                            frameBorder="0"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                            className="absolute inset-0 w-full h-full z-20"
                                                        ></iframe>
                                                    ) : (
                                                        /* Standard Image Display */
                                                        <div className="w-full h-full relative">
                                                            <img
                                                                src={(spot.fish?.[selectedFishIndex!] as FishSpotInfo)?.setupImage || "/cards/setup-pesca1.png"}
                                                                alt="Card do Peixe"
                                                                className="w-full h-full object-contain object-top"
                                                            />

                                                            {/* Play Button Overlay (if video exists) */}
                                                            {((spot.fish?.[selectedFishIndex!] as FishSpotInfo)?.videoUrl) && (
                                                                <div
                                                                    className="absolute bottom-[2%] right-[2%] w-[30%] h-[28%] z-50 cursor-pointer rounded-xl hover:bg-white/5 hover:shadow-[0_0_20px_rgba(196,253,45,0.2)] hover:border border-fishing-neon/30 transition-all duration-300"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setIsVideoPlaying(true);
                                                                    }}
                                                                    title="Assistir Tutorial"
                                                                />
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* Control Buttons (Edit Mode) */}
                                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[60] flex flex-row gap-3">
                                                        {/* Edit Image */}
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                fileInputRef.current?.click();
                                                            }}
                                                            className="flex items-center justify-center w-10 h-10 bg-neutral-900/90 text-white border border-white/20 rounded-lg shadow-xl hover:bg-fishing-neon hover:text-black hover:border-fishing-neon transition-all"
                                                            title="Trocar Imagem"
                                                        >
                                                            <ImageIcon size={20} />
                                                        </button>

                                                        {/* Edit Video Link */}
                                                        <div className="relative group/link">
                                                            <button
                                                                className="flex items-center justify-center w-10 h-10 bg-neutral-900/90 text-white border border-white/20 rounded-lg shadow-xl hover:bg-fishing-neon hover:text-black hover:border-fishing-neon transition-all"
                                                                title="Configurar Vídeo"
                                                            >
                                                                <Play size={20} />
                                                            </button>
                                                            {/* Hover/Focus Dropdown for URL */}
                                                            <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 p-2 bg-neutral-900 border border-white/20 rounded-xl shadow-2xl opacity-0 invisible group-hover/link:opacity-100 group-hover/link:visible transition-all duration-300 origin-bottom z-[70]">
                                                                <span className="text-[10px] font-bold text-fishing-neon uppercase mb-1 block">Link do YouTube</span>
                                                                <input
                                                                    type="text"
                                                                    value={((spot.fish?.[selectedFishIndex!] as FishSpotInfo)?.videoUrl) || ""}
                                                                    onChange={(e) => handleUpdateFish(selectedFishIndex!, 'videoUrl', e.target.value)}
                                                                    placeholder="https://youtube.com..."
                                                                    className="w-full text-xs bg-black/50 border border-white/10 rounded px-2 py-1.5 text-white outline-none focus:border-fishing-neon"
                                                                    onClick={(e) => e.stopPropagation()}
                                                                />
                                                            </div>
                                                        </div>


                                                        {/* Hidden File Input */}
                                                        <input
                                                            type="file"
                                                            ref={fileInputRef}
                                                            className="hidden"
                                                            accept="image/*"
                                                            onChange={(e) => {
                                                                if (e.target.files && e.target.files[0]) {
                                                                    const file = e.target.files[0];
                                                                    const newPath = `/cards/${file.name}`;
                                                                    handleUpdateFish(selectedFishIndex!, 'setupImage', newPath);
                                                                    e.target.value = '';
                                                                }
                                                            }}
                                                        />

                                                        {/* Helper Text (Only if no image) */}
                                                        {!((spot.fish?.[selectedFishIndex!] as FishSpotInfo)?.setupImage) && (
                                                            <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                                                                <span className="bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                                                                    Visualizando Card Padrão
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>

                                                </div>

                                                {/* Tutorial Area */}
                                                <div className="shrink-0 bg-neutral-900 border border-white/5 rounded-xl p-4">
                                                    <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">
                                                        VIDEO TUTORIAL CANAL CHAIRA ÔNIX
                                                    </h4>

                                                    {((spot.fish?.[selectedFishIndex!] as FishSpotInfo)?.videoUrl) ? (
                                                        <div className="flex flex-col gap-2">
                                                            <a
                                                                href={(spot.fish[selectedFishIndex!] as FishSpotInfo).videoUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="block w-full max-w-sm aspect-video bg-black rounded-lg overflow-hidden border border-white/10 hover:border-fishing-neon transition-all group/thumb relative"
                                                            >
                                                                <img
                                                                    src={`https://img.youtube.com/vi/${getYoutubeId((spot.fish[selectedFishIndex!] as FishSpotInfo).videoUrl!)}/hqdefault.jpg`}
                                                                    alt="Video Tutorial Thumbnail"
                                                                    className="w-full h-full object-cover opacity-80 group-hover/thumb:opacity-100 transition-opacity"
                                                                />
                                                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/thumb:bg-transparent transition-colors">
                                                                    <div className="w-12 h-12 bg-fishing-neon/90 rounded-full flex items-center justify-center pl-1 text-black shadow-xl group-hover/thumb:scale-110 transition-transform">
                                                                        <Play size={20} fill="currentColor" />
                                                                    </div>
                                                                </div>
                                                            </a>
                                                            <a
                                                                href={(spot.fish[selectedFishIndex!] as FishSpotInfo).videoUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-center text-xs text-fishing-neon hover:underline"
                                                            >
                                                                Assistir vídeo no YouTube
                                                            </a>
                                                        </div>
                                                    ) : (
                                                        <div className="w-full h-24 bg-white/5 rounded-lg border border-dashed border-white/10 flex items-center justify-center text-gray-500 text-xs">
                                                            Adicione um link de vídeo para ver o tutorial aqui
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        )}

                        <div className="space-y-6">
                            <div className="bg-neutral-900 p-6 rounded-2xl border border-white/10 sticky top-32">
                                <h4 className="text-white font-bold uppercase tracking-wide mb-6 border-b border-white/10 pb-4">
                                    <EditableText
                                        // @ts-ignore
                                        value={content.sections.spotDetails?.infoTitle || "Informações Rápidas"}
                                        onSave={(val) => handleUpdateGlobalLabel('infoTitle', val)}
                                    />
                                </h4>

                                <div className="space-y-4">
                                    <div>
                                        <span className="text-gray-500 text-xs uppercase font-bold block mb-1">
                                            <EditableText
                                                // @ts-ignore
                                                value={content.sections.spotDetails?.difficultyLabel || "Dificuldade"}
                                                onSave={(val) => handleUpdateGlobalLabel('difficultyLabel', val)}
                                            />
                                        </span>
                                        <span className="text-white font-medium">
                                            <EditableText
                                                value={spot.difficulty || "Normal"}
                                                onSave={(val) => handleUpdateSpot('difficulty', val)}
                                                className="bg-transparent border-none p-0"
                                            />
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 text-xs uppercase font-bold block mb-1">
                                            <EditableText
                                                // @ts-ignore
                                                value={content.sections.spotDetails?.coordinatesLabel || "Coordenadas"}
                                                onSave={(val) => handleUpdateGlobalLabel('coordinatesLabel', val)}
                                            />
                                        </span>
                                        <span className="text-fishing-neon font-mono">
                                            <EditableText
                                                value={spot.coordinates || "00.00, 00.00"}
                                                onSave={(val) => handleUpdateSpot('coordinates', val)}
                                                className="bg-transparent border-none p-0"
                                            />
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main >
        </div >
    );
};

export default SpotDetails;
