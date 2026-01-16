import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        setMobileMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            const offset = 100; // Slightly more offset for the larger header
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const navItems = [
        { name: 'Quem Somos', id: 'quem-somos' },
        { name: 'Spots', id: 'spots' },
        { name: 'Galeria', id: 'galeria' },
        { name: 'Guias', id: 'guias' },
        { name: 'Vídeos', id: 'videos' },
        { name: 'Notícias', id: 'noticias' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${isScrolled
                ? 'bg-[#050505]/80 backdrop-blur-xl border-white/10 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
                : 'bg-gradient-to-b from-black/80 to-transparent border-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex justify-between items-center">

                    {/* Logo Brand */}
                    <div
                        className="flex items-center gap-3 cursor-pointer group select-none"
                        onClick={() => scrollToSection('home')}
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-fishing-neon/40 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <img
                                src="/logo.png"
                                alt="Aposentados da Pesca"
                                className="h-16 w-auto relative z-10 object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                            />
                        </div>
                        <div className="hidden lg:flex flex-col">
                            <span className="font-display font-bold text-white text-lg tracking-[0.2em] leading-none group-hover:text-gray-200 transition-colors">
                                APOSENTADOS
                            </span>
                            <span className="font-display font-bold text-fishing-neon text-lg tracking-[0.2em] leading-none group-hover:text-white transition-colors duration-300">
                                DA PESCA
                            </span>
                        </div>
                    </div>

                    {/* Desktop Navigation (Centered) */}
                    <div className="hidden lg:flex items-center gap-1 bg-white/5 rounded-full p-1.5 border border-white/10 backdrop-blur-md shadow-lg">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => scrollToSection('contato')}
                            className="hidden md:block px-8 py-3 bg-fishing-neon text-black font-black text-xs uppercase tracking-[0.15em] rounded hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(163,230,53,0.2)] hover:shadow-[0_0_30px_rgba(163,230,53,0.5)]"
                        >
                            Contato
                        </button>

                        <button
                            className="lg:hidden text-gray-300 hover:text-fishing-neon transition-colors"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'max-h-[500px] opacity-100 pt-6' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-2 shadow-2xl">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all font-bold tracking-wide uppercase"
                            >
                                {item.name}
                            </button>
                        ))}
                        <button
                            onClick={() => scrollToSection('contato')}
                            className="w-full mt-4 py-4 bg-fishing-neon text-black font-black uppercase tracking-wider rounded-lg"
                        >
                            Entre em Contato
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;


