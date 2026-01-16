import React, { createContext, useContext, useState, useEffect } from 'react';
import { HERO_CONTENT, PAIN_POINTS, SOLUTIONS, FAQS, ABOUT_US_CONTENT, SECTIONS_CONTENT } from '../constants';
import { Map, MapPin, Navigation, Anchor, Target, BookOpen } from 'lucide-react';

export interface FishSpotInfo {
    name: string;
    image?: string;
    description?: string;
    spotImage?: string;
    setupImage?: string;
    videoUrl?: string;
}

export interface Spot {
    name: string;
    region: string;
    image: string;
    url: string;
    difficulty?: string;
    coordinates?: string;
    fish?: FishSpotInfo[];
    description?: string;
    videoUrl?: string;
}

const SPOTS_DATA: Spot[] = [
    {
        name: "Lone Star Lake",
        region: "Texas NV 1",
        image: "/Texas.png",
        url: "https://wiki.fishingplanet.com/Lone_Star_Lake_-_Texas",
        difficulty: "Iniciante",
        coordinates: "33.45, -96.55",
        fish: [
            { name: "Blacktail Shiner", description: "Common", image: "/300px-Blacktail_Shiner.png" },
            { name: "Bluegill", description: "Common Trophy", image: "/300px-Bluegill.png" },
            { name: "Channel Catfish", description: "Young", image: "/300px-Channel_Catfish.png" },
            { name: "Golden Shiner", description: "Common", image: "/300px-Golden_Shiner.png" },
            { name: "Grass Pickerel", description: "Common", image: "/300px-Grass_Pickerel.png" },
            { name: "Green Sunfish", description: "Common", image: "/300px-Green_Sunfish.png" },
            { name: "Redear Sunfish", description: "Common Trophy", image: "/300px-Redear_Sunfish.png" },
            { name: "Smallmouth Buffalo", description: "Common", image: "/300px-Smallmouth_Buffalo.png" },
            { name: "Spotted Bass", description: "Common", image: "/300px-Spotted_Bass.png" },
            { name: "White Crappie", description: "Common Trophy", image: "/300px-White_Crappie.png" }
        ],
        description: "Um lago perfeito para quem está começando. Águas calmas e peixes abundantes.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
        name: "Lesni Vila",
        region: "Checa NV 3",
        image: "/Lesni_Vila_New.jpg",
        url: "https://wiki.fishingplanet.com/Lesni_Vila_Fishery_-_Czech_Republic",
        difficulty: "Fácil",
        coordinates: "50.08, 14.43",
        fish: [
            { name: "Carp" },
            { name: "Tench" },
            { name: "Roach" }
        ]
    },
    {
        name: "Mudwater River",
        region: "Missouri NV 4",
        image: "/Mudwater_River_Map.jpg",
        url: "https://wiki.fishingplanet.com/Mudwater_River_-_Missouri"
    },
    {
        name: "Rocky Lake",
        region: "Colorado NV 5",
        image: "/Rocky_Lake_Map.jpg",
        url: "https://wiki.fishingplanet.com/Rocky_Lake_-_Colorado"
    },
    {
        name: "Emerald Lake",
        region: "New York NV 8",
        image: "/Emerald_Lake_Map.jpg",
        url: "https://wiki.fishingplanet.com/Emerald_Lake_-_New_York"
    },
    {
        name: "Neherrin Lake",
        region: "Nort Carolina NV 10",
        image: "/Neherrin_Lake_Map.jpg",
        url: "https://wiki.fishingplanet.com/Neherrin_River_-_North_Carolina"
    },
    {
        name: "Ghent-Terneuzen Canal",
        region: "Netherlands NV 12",
        image: "/Netherlands.png",
        url: "https://wiki.fishingplanet.com/Ghent-Terneuzen_Canal_-_Netherlands"
    },
    {
        name: "Falcon Lake",
        region: "Oregon NV 14",
        image: "/Falcon_Lake_Map.jpg",
        url: "https://wiki.fishingplanet.com/Falcon_Lake_-_Oregon"
    },
    {
        name: "Everglades",
        region: "Florida NV 18",
        image: "/Everglades_Map.png",
        url: "https://wiki.fishingplanet.com/Everglades_-_Florida"
    },
    {
        name: "Tibre Lake",
        region: "Itália NV 20",
        image: "/Tibre_Map.jpg",
        url: "https://wiki.fishingplanet.com/Tiber_River_-_Italy"
    },
    {
        name: "White Moose Lake",
        region: "Alberta Canadá NV 22",
        image: "/White_Moose_Map.jpg",
        url: "https://wiki.fishingplanet.com/White_Moose_Lake_-_Alberta"
    },
    {
        name: "Quanchkin Lake ",
        region: "Luisiana NV 26",
        image: "/Quanchkin_Map.jpg",
        url: "https://wiki.fishingplanet.com/Quanchkin_Lake_-_Louisiana"
    },
    {
        name: "Saint Croix Lake",
        region: "Michigan NV 30",
        image: "/Saint_Croix_Map.jpg",
        url: "https://wiki.fishingplanet.com/Saint-Croix_Lake_-_Michigan"
    },
    {
        name: "San Joaquin Delta",
        region: "California NV 34",
        image: "/San_Joaquin_Delta_Map.jpg",
        url: "https://wiki.fishingplanet.com/San_Joaquin_Delta_-_California"
    },
    {
        name: "kanik Creek",
        region: "Alaska NV 38",
        image: "/Kaniq_Creek_Map.jpg",
        url: "https://wiki.fishingplanet.com/Kaniq_Creek_-_Alaska"
    },
    {
        name: "Sander Barggesee Lake",
        region: "Alemanha NV 42",
        image: "/Sander_Baggersee_Map.jpg",
        url: "https://wiki.fishingplanet.com/Sander_Baggersee_Lake_-_Germany"
    },
    {
        name: "Rio Dnipro",
        region: "Ucrânia NV 44",
        image: "/Dnipro_Map.jpg",
        url: "https://wiki.fishingplanet.com/Dnipro_River_-_Ukraine"
    },
    {
        name: "Selenge River",
        region: "Mongolia NV 48",
        image: "/Mongolia_Map.jpg",
        url: "https://wiki.fishingplanet.com/Selenge_River_-_Mongolia"
    },
    {
        name: "Aréa Weeping Willow",
        region: "United_Kingdom NV 50",
        image: "/United_Kingdom.png",
        url: "https://wiki.fishingplanet.com/Weeping_Willow_Fishery_-_United_Kingdom"
    },
    {
        name: "Blue Crab Islands",
        region: "Mississipi NV 54",
        image: "/Blue_Crab_Map.png",
        url: "https://wiki.fishingplanet.com/Blue_Crab_Island_-_Mississippi"
    },
    {
        name: "Maku-Maku Lake",
        region: "Peru NV 58",
        image: "/Maku_Maku_Map.jpg",
        url: "https://wiki.fishingplanet.com/Maku-Maku_Lake_-_Peru"
    },
    {
        name: " Marrom River",
        region: "Bolívia NV 63",
        image: "/Bolivia.png",
        url: "https://wiki.fishingplanet.com/Marron_River_-_Bolivia"
    },
    {
        name: "Amazoniam Maze",
        region: "Brazil NV 68",
        image: "/Brazil.png",
        url: "https://wiki.fishingplanet.com/Amazonian_Maze_-_Brazil"
    },
    {
        name: "Rio Congo",
        region: "Congo NV 75",
        image: "/Congo_Map.jpg",
        url: "https://wiki.fishingplanet.com/Congo_River_-_Congo"
    },
    {
        name: "Kaiji No Ri",
        region: "Japão NV 83",
        image: "/Kaiji_No_Ri_Map.png",
        url: "https://wiki.fishingplanet.com/Kaiji_No_Ri_-_Japan"
    },
    {
        name: "Noomaa Kuda Atholhu",
        region: "Maldivas NV 94",
        image: "/Maldivas_Map.png",
        url: "https://wiki.fishingplanet.com/Noomaa_Kuda_Atholhu_-_Maldives"
    },
    {
        name: "Fiorde Skãrland",
        region: "Noruega NV 105",
        image: "/Skarland_Fjord_Map.png",
        url: "https://wiki.fishingplanet.com/index.php?search=Skarland"
    }
];

const GUIDES_DATA = [
    {
        category: "Iniciante",
        title: "Como configurar sua primeira vara",
        desc: "O guia definitivo para não gastar dinheiro errado no início do jogo.",
        icon: "Anchor"
    },
    {
        category: "Técnica",
        title: "A arte do Arremesso Perfeito",
        desc: "Domine a mecânica de arremesso para alcançar os peixes maiores.",
        icon: "Target"
    },
    {
        category: "Equipamento",
        title: "Entendendo Iscas e Anzóis",
        desc: "Qual isca usar para cada tipo de peixe e clima.",
        icon: "BookOpen"
    }
];

const NEWS_DATA = [
    {
        date: "12 JAN 2026",
        tag: "ATUALIZAÇÃO",
        title: "Novo lago disponível: Amazon River",
        excerpt: "Explore as águas misteriosas da Amazônia na nova atualização v2.5."
    },
    {
        date: "10 JAN 2026",
        tag: "EVENTO",
        title: "Torneio de Fim de Semana - Trutas",
        excerpt: "Prepare seu equipamento leve. Premiação dobrada para todos os participantes."
    },
    {
        date: "05 JAN 2026",
        tag: "COMUNIDADE",
        title: "Vencedores do Concurso de Fotografia",
        excerpt: "Veja as capturas mais impressionantes enviadas pela comunidade."
    }
];

const VIDEOS_DATA = [1, 2, 3].map((_, i) => ({
    id: i,
    thumbnail: `https://images.unsplash.com/photo-${1500000000000 + i * 1000}?q=80&w=400&auto=format&fit=crop`,
    tag: `TUTORIAL #${i + 1}`,
    title: "Melhores iscas para pescar em dias de chuva",
    meta: "10:42 • 2 dias atrás"
}));

// Define types for our content
type ContentState = {
    hero: typeof HERO_CONTENT;
    painPoints: typeof PAIN_POINTS;
    solutions: typeof SOLUTIONS;
    faqs: typeof FAQS;
    aboutUs: typeof ABOUT_US_CONTENT;
    sections: typeof SECTIONS_CONTENT;
    heroImages: string[];
    spots: Spot[];
    guides: typeof GUIDES_DATA;
    news: typeof NEWS_DATA;
    videos: typeof VIDEOS_DATA;
};

type ContentContextType = {
    content: ContentState;
    updateContent: (section: keyof ContentState, data: any) => void;
    isEditing: boolean;
    toggleEditing: () => void;
    saveChanges: () => void;
    resetContent: () => void;
};

const defaultContent: ContentState = {
    hero: HERO_CONTENT,
    painPoints: PAIN_POINTS,
    solutions: SOLUTIONS,
    faqs: FAQS,
    aboutUs: ABOUT_US_CONTENT,
    sections: SECTIONS_CONTENT,
    heroImages: [
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/380600/library_hero.jpg"
    ],
    spots: SPOTS_DATA,
    guides: GUIDES_DATA,
    news: NEWS_DATA,
    videos: VIDEOS_DATA
};

const DATA_VERSION = "2.7";

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [content, setContent] = useState<ContentState>(defaultContent);
    const [isEditing, setIsEditing] = useState(false);

    // Load from content.json on mount
    useEffect(() => {
        const loadContent = async () => {
            try {
                // Add timestamp to prevent caching
                const response = await fetch(`/content.json?t=${Date.now()}`);
                if (response.ok) {
                    const json = await response.json();
                    if (json && json.data) {
                        // Check version
                        if (json.version === DATA_VERSION || json.version === "2.6") {
                            setContent({ ...defaultContent, ...json.data });
                            console.log("Content loaded from file.");
                        } else {
                            console.log("Content version mismatch in file, using defaults.");
                        }
                    }
                } else {
                    console.log("No content.json found (first run?), using defaults.");
                }
            } catch (e) {
                console.error("Failed to load content from file", e);
            }
        };

        loadContent();
    }, []);

    // Keyboard shortcut to toggle edit mode
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Check for Ctrl + Shift + Q
            if (e.ctrlKey && e.shiftKey && (e.key === 'Q' || e.key === 'q')) {
                e.preventDefault();
                setIsEditing(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const updateContent = (section: keyof ContentState, data: any) => {
        setContent(prev => ({
            ...prev,
            [section]: data
        }));
    };

    const saveChanges = async () => {
        const payload = {
            version: DATA_VERSION,
            data: content
        };

        try {
            const response = await fetch('/api/save-content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert('Alterações salvas com sucesso no servidor (dist/content.json)!');
                setIsEditing(false);
            } else {
                alert('Erro ao salvar no servidor. Verifique o console.');
                console.error('Save failed:', await response.text());
            }
        } catch (e) {
            console.error('Error saving:', e);
            alert('Erro de conexão ao tentar salvar.');
        }
    };

    const resetContent = () => {
        if (confirm('Tem certeza? Isso voltará para o conteúdo original.')) {
            setContent(defaultContent);
            // Optional: delete content.json or just overwrite next time
        }
    };

    const toggleEditing = () => setIsEditing(prev => !prev);

    return (
        <ContentContext.Provider value={{ content, updateContent, isEditing, toggleEditing, saveChanges, resetContent }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (context === undefined) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};
