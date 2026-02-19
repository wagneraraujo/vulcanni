'use client';

import { useState } from 'react';
import { MapPin, Phone, Instagram, Facebook, ChevronRight } from 'lucide-react';
import MenuCard from './MenuCard';
import {
    menuCategories,
    unidades,
    aguas,
    refrigerantes,
    cervejas,
    vinhosTinto,
    vinhosBranco,
    vinhosRose,
    espumante,
    sangria,
    aoCopo,
    cafeDigestivos,
    type MenuItem,
} from '../data/menuData';

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

export default function Menu() {
    const [activeCategory, setActiveCategory] = useState(0);
    const [lightboxIndex, setLightboxIndex] = useState(-1);

    const currentCategoryItems = activeCategory < menuCategories.length
        ? menuCategories[activeCategory].items
        : [];

    const itemsWithImages = currentCategoryItems.filter(item => item.image);
    const slides = itemsWithImages.map(item => ({ src: item.image! }));

    const handleImageClick = (item: MenuItem) => {
        if (!item.image) return;
        const index = itemsWithImages.findIndex(i => i.image === item.image);
        if (index >= 0) {
            setLightboxIndex(index);
        }
    };

    const whatsappNumber = '+351939000735';
    const whatsappMessage = 'Olá! Gostaria de fazer uma reserva na Vulcanici Pizzeria.';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground">

            {/* Header / Navbar */}
            <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-lg border-b border-border/50 shadow-sm transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">

                    {/* Logo & Title */}
                    <div className="flex items-center gap-4">
                        <img
                            src="/logo-vulcani.png"
                            alt="Vulcanici Pizzeria"
                            className="h-12 w-auto object-contain brightness-0"
                        />
                        <h1 className="font-serif text-xl md:text-2xl font-bold tracking-tight text-primary hidden md:block">
                            Vulcanici
                        </h1>
                    </div>

                    {/* Locations - Compact */}
                    <div className="flex gap-6 text-sm text-muted-foreground hidden lg:flex">
                        {unidades.map((unidade, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-accent" />
                                <span>{unidade.cidade}</span>
                            </div>
                        ))}
                    </div>

                    {/* Contact CTA */}
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:text-accent transition-colors">
                        Reservas: +351 939 000 735
                    </a>
                </div>

                {/* Categories Navigation - Scrollable */}
                <div className="bg-background/50 border-t border-border/50">
                    <div className="max-w-7xl mx-auto px-4 py-3 overflow-x-auto no-scrollbar">
                        <div className="flex gap-2 min-w-max">
                            {menuCategories.map((category, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveCategory(index)}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === index
                                            ? 'bg-primary text-primary-foreground shadow-md scale-105'
                                            : 'bg-secondary text-muted-foreground hover:bg-muted hover:text-foreground'
                                        }`}
                                >
                                    {category.title}
                                </button>
                            ))}
                            <button
                                onClick={() => setActiveCategory(menuCategories.length)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === menuCategories.length
                                        ? 'bg-primary text-primary-foreground shadow-md scale-105'
                                        : 'bg-secondary text-muted-foreground hover:bg-muted hover:text-foreground'
                                    }`}
                            >
                                Bebidas & Vinhos
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-12 md:py-16 min-h-[calc(100vh-300px)]">

                {activeCategory < menuCategories.length ? (
                    <div className="animate-fade-in-up">
                        <div className="text-center mb-12">
                            <span className="text-accent font-serif italic text-lg opacity-80">Nossa Seleção de</span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mt-2">
                                {menuCategories[activeCategory].title}
                            </h2>
                            <div className="w-24 h-1 bg-accent mx-auto mt-6 rounded-full opacity-60" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {menuCategories[activeCategory].items.map((item, index) => (
                                <MenuCard
                                    key={index}
                                    item={item}
                                    onImageClick={() => handleImageClick(item)}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Bebidas Section - Modern List Layout */
                    <div className="space-y-16 animate-fade-in-up max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">
                                Rolha & Bar
                            </h2>
                            <p className="text-muted-foreground mt-4 font-light">Uma seleção curada para acompanhar sua experiência.</p>
                        </div>

                        {/* Drink Categories */}
                        {[
                            { title: 'Vinhos Tinto', items: vinhosTinto },
                            { title: 'Vinhos Branco', items: vinhosBranco },
                            { title: 'Vinhos Rosé', items: vinhosRose },
                            { title: 'Espumante & Sangria', items: [...espumante, ...sangria] },
                            { title: 'Cervejas', items: cervejas },
                            { title: 'Não Alcoólicos', items: [...aguas, ...refrigerantes] },
                            { title: 'Café & Digestivos', items: [...cafeDigestivos, ...aoCopo] }
                        ].map((category, idx) => (
                            <div key={idx} className="bg-card rounded-2xl p-8 border border-border/40 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="text-2xl font-serif font-bold text-primary mb-6 flex items-center gap-3">
                                    {category.title}
                                    <div className="h-px bg-border flex-1 opacity-50 ml-4" />
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                                    {category.items.map((item, i) => (
                                        <div key={i} className="flex justify-between items-baseline group border-b border-dashed border-border/30 pb-2">
                                            <span className="text-foreground font-medium group-hover:text-primary transition-colors">{item.nome}</span>
                                            <div className="border-b-2 border-dotted border-muted flex-1 mx-2 opacity-30" />
                                            <span className="text-primary font-bold">€{item.preco.toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-primary text-primary-foreground py-16 mt-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/bg-pizza.jpg')] bg-cover opacity-10 mix-blend-overlay" />
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                        {/* Brand */}
                        <div className="text-center md:text-left space-y-4">
                            <div className="flex items-center justify-center md:justify-start gap-4">
                                <img src="/logo-vulcani.png" alt="Vulcanici" className="h-12 brightness-0 invert opacity-80" />
                                <span className="font-serif text-xl font-bold">Vulcanici</span>
                            </div>
                            <p className="text-primary-foreground/60 text-sm max-w-xs mx-auto md:mx-0">
                                A verdadeira tradição napolitana no coração de Guimarães. Ingredientes selecionados, paixão italiana.
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="text-center space-y-4">
                            <h4 className="font-serif text-xl font-bold text-accent">Contato</h4>
                            <div className="space-y-2 text-primary-foreground/80">
                                <p>R. Antero de Quental, 253</p>
                                <p>+351 939 000 735</p>
                                <p>Guimarães, Portugal</p>
                            </div>
                        </div>

                        {/* Social */}
                        <div className="text-center md:text-right space-y-4">
                            <h4 className="font-serif text-xl font-bold text-accent">Siga-nos</h4>
                            <div className="flex justify-center md:justify-end gap-6">
                                <a href="https://www.instagram.com/vulcaniciguimaraes" className="hover:text-accent transition-colors">
                                    <Instagram className="w-6 h-6" />
                                </a>
                                <a href="https://www.facebook.com/profile.php?id=61552967728211" className="hover:text-accent transition-colors">
                                    <Facebook className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-primary-foreground/10 pt-8 text-center text-xs text-primary-foreground/40 uppercase tracking-widest">
                        <p>© {new Date().getFullYear()} Vulcanici Pizzeria Napoletana. Todos os direitos reservados.</p>
                    </div>
                </div>
            </footer>

            {/* Floating WhatsApp */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg hover:bg-[#128C7E] hover:scale-110 transition-all duration-300"
                aria-label="WhatsApp"
            >
                <WhatsAppIcon className="w-7 h-7 text-white" />
            </a>

            {/* Lightbox */}
            <Lightbox
                index={lightboxIndex}
                slides={slides}
                open={lightboxIndex >= 0}
                close={() => setLightboxIndex(-1)}
            />
        </div>
    );
}
