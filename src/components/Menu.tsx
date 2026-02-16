'use client';

import { useState } from 'react';
import { MapPin, Phone, Instagram, Facebook } from 'lucide-react';
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

    // Calculate slides for the current view (only items with images)
    // We need to know which items have images to map the index correctly
    const currentCategoryItems = activeCategory < menuCategories.length
        ? menuCategories[activeCategory].items
        : []; // Bebidas are handled separately or don't have images in this flow usually, but we can add if needed.
    // For simplicity, let's enable lightbox for the main menu categories first.

    // Filter items that have images to create slides
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
        <div className="min-h-screen bg-background text-foreground">
            {/* Floating WhatsApp Button */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300"
                aria-label="WhatsApp"
            >
                <WhatsAppIcon className="w-7 h-7 text-white" />
            </a>

            {/* Header */}
            <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    {/* Logo */}
                    <div className="flex justify-center mb-4">
                        <img
                            src="/logo-vulcani.png"
                            alt="Vulcanici Pizzeria Napoletana"
                            className="h-16 md:h-20 w-auto object-contain brightness-0"
                        />
                    </div>

                    {/* Restaurant Name */}
                    <h1 className="text-center text-2xl md:text-3xl font-bold tracking-wide mb-4 text-primary">
                        Vulcanici Pizzeria Napoletana
                    </h1>

                    {/* Unidades */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-sm">
                        {unidades.map((unidade, index) => (
                            <div key={index} className="flex items-start gap-2">
                                <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                                <div className="text-center md:text-left">
                                    <p className="font-bold text-foreground text-base">{unidade.cidade}</p>
                                    <p className="text-muted-foreground font-medium">{unidade.endereco}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                {/* Category Navigation */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {menuCategories.map((category, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveCategory(index)}
                                className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-bold text-base transition-all duration-300 ${activeCategory === index
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                                    }`}
                            >
                                {category.title}
                            </button>
                        ))}
                        <button
                            onClick={() => setActiveCategory(menuCategories.length)}
                            className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-bold text-base transition-all duration-300 ${activeCategory === menuCategories.length
                                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                                }`}
                        >
                            Bebidas
                        </button>
                    </div>
                </div>

                {/* Menu Items Grid */}
                {activeCategory < menuCategories.length ? (
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">
                            {menuCategories[activeCategory].title}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    /* Bebidas Section */
                    <div className="space-y-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">
                            Bebidas
                        </h2>

                        {/* Águas */}
                        <div>
                            <h3 className="text-2xl font-bold mb-4 text-foreground border-b border-border pb-2">
                                Águas
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {aguas.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center bg-card border border-border rounded-lg p-4 hover:border-primary transition-all duration-300 shadow-sm"
                                    >
                                        <span className="text-foreground font-semibold text-base">{item.nome}</span>
                                        <span className="text-primary font-bold text-lg">€{item.preco.toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Refrigerantes */}
                        <div>
                            <h3 className="text-2xl font-bold mb-4 text-foreground border-b border-border pb-2">
                                Refrigerantes
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {refrigerantes.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center bg-card border border-border rounded-lg p-4 hover:border-primary transition-all duration-300 shadow-sm"
                                    >
                                        <span className="text-foreground font-semibold text-base">{item.nome}</span>
                                        <span className="text-primary font-bold text-lg">€{item.preco.toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Cervejas */}
                        <div>
                            <h3 className="text-2xl font-bold mb-4 text-foreground border-b border-border pb-2">
                                Cervejas
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {cervejas.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center bg-card border border-border rounded-lg p-4 hover:border-primary transition-all duration-300 shadow-sm"
                                    >
                                        <span className="text-foreground font-semibold text-base">{item.nome}</span>
                                        <span className="text-primary font-bold text-lg">€{item.preco.toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Vinhos */}
                        <div>
                            <h3 className="text-2xl font-bold mb-4 text-foreground border-b border-border pb-2">
                                Vinhos
                            </h3>

                            <div className="space-y-6">
                                {/* Tinto */}
                                <div>
                                    <h4 className="text-lg font-bold text-primary mb-3">Tinto</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {vinhosTinto.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex justify-between items-center bg-card border border-border rounded-lg p-4 hover:border-primary transition-all duration-300 shadow-sm"
                                            >
                                                <span className="text-foreground font-semibold text-base">{item.nome}</span>
                                                <span className="text-primary font-bold text-lg">€{item.preco.toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Branco */}
                                <div>
                                    <h4 className="text-lg font-bold text-primary mb-3">Branco</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {vinhosBranco.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex justify-between items-center bg-card border border-border rounded-lg p-4 hover:border-primary transition-all duration-300 shadow-sm"
                                            >
                                                <span className="text-foreground font-semibold text-base">{item.nome}</span>
                                                <span className="text-primary font-bold text-lg">€{item.preco.toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Rosé */}
                                <div>
                                    <h4 className="text-lg font-bold text-primary mb-3">Rosé</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {vinhosRose.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex justify-between items-center bg-card border border-border rounded-lg p-4 hover:border-primary transition-all duration-300 shadow-sm"
                                            >
                                                <span className="text-foreground font-semibold text-base">{item.nome}</span>
                                                <span className="text-primary font-bold text-lg">€{item.preco.toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Espumante */}
                                <div>
                                    <h4 className="text-lg font-bold text-primary mb-3">Espumante</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {espumante.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex justify-between items-center bg-card border border-border rounded-lg p-4 hover:border-primary transition-all duration-300 shadow-sm"
                                            >
                                                <span className="text-foreground font-semibold text-base">{item.nome}</span>
                                                <span className="text-primary font-bold text-lg">€{item.preco.toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Sangria 1L */}
                                <div>
                                    <h4 className="text-lg font-bold text-primary mb-3">Sangria 1L</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {sangria.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex justify-between items-center bg-card border border-border rounded-lg p-4 hover:border-primary transition-all duration-300 shadow-sm"
                                            >
                                                <span className="text-foreground font-semibold text-base">{item.nome}</span>
                                                <span className="text-primary font-bold text-lg">€{item.preco.toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Ao Copo */}
                                <div>
                                    <h4 className="text-lg font-bold text-primary mb-3">Ao Copo</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {aoCopo.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex justify-between items-center bg-card border border-border rounded-lg p-4 hover:border-primary transition-all duration-300 shadow-sm"
                                            >
                                                <span className="text-foreground font-semibold text-base">{item.nome}</span>
                                                <span className="text-primary font-bold text-lg">€{item.preco.toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Café e Digestivos */}
                        <div>
                            <h3 className="text-2xl font-bold mb-4 text-foreground border-b border-border pb-2">
                                Café e Digestivos
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {cafeDigestivos.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center bg-card border border-border rounded-lg p-4 hover:border-primary transition-all duration-300 shadow-sm"
                                    >
                                        <span className="text-foreground font-semibold text-base">{item.nome}</span>
                                        <span className="text-primary font-bold text-lg">€{item.preco.toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-secondary border-t border-border py-12 mt-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        {/* Contact */}
                        <div>
                            <h3 className="text-primary font-semibold mb-4">Contato</h3>
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-muted-foreground hover:text-green-600 transition-colors mb-2"
                            >
                                <Phone className="w-4 h-4" />
                                <span>+351 939 000 735</span>
                            </a>
                        </div>

                        {/* Social */}
                        <div>
                            <h3 className="text-primary font-semibold mb-4">Redes Sociais</h3>
                            <div className="flex gap-4">
                                <a
                                    href="https://www.instagram.com/vulcaniciguimaraes"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    <Instagram className="w-6 h-6" />
                                </a>
                                <a
                                    href="https://www.facebook.com/profile.php?id=61552967728211"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    <Facebook className="w-6 h-6" />
                                </a>
                            </div>
                        </div>

                        {/* Logo */}
                        <div className="flex justify-center md:justify-end">
                            <img
                                src="/logo-vulcani.png"
                                alt="Vulcanici"
                                className="h-12 w-auto opacity-50 brightness-0"
                            />
                        </div>
                    </div>

                    <div className="text-center text-muted-foreground text-sm">
                        <p>© {new Date().getFullYear()} Vulcanici Pizzeria Napoletana. Todos os direitos reservados.</p>
                    </div>
                </div>
            </footer>
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
