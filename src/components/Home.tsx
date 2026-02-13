import { Instagram, Facebook, MapPin, Phone, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import GallerySection from './ui/GallerySection';

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

export default function Home() {
    const whatsappNumber = '+351939000735';
    const whatsappMessage = 'Olá! Gostaria de fazer uma reserva na Vulcanici Pizzeria.';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <div className="relative min-h-screen w-full bg-black overflow-x-hidden">
            {/* Background Image - Fixed */}
            <div
                className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
                style={{
                    backgroundImage: 'url(/bg-pizza.jpg)',
                }}
            >
                {/* Dark overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
            </div>

            {/* Floating WhatsApp Button */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 animate-fade-in"
                aria-label="WhatsApp"
            >
                <WhatsAppIcon className="w-7 h-7 text-white" />
            </a>

            {/* HERO SECTION */}
            <section className="relative h-screen w-full flex flex-col items-center justify-center px-6">
                <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl mx-auto">

                    {/* Logo */}
                    <div className="animate-fade-in opacity-0-start mb-8">
                        <img
                            src="/logo-vulcani.png"
                            alt="Vulcanici Pizzeria Napoletana"
                            className="h-24 md:h-32 lg:h-40 w-auto object-contain drop-shadow-2xl brightness-0 invert"
                        />
                    </div>

                    {/* Main Title */}
                    <h1 className="animate-fade-in-up opacity-0-start delay-200 text-center text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-white/95 mb-4">
                        Site em Desenvolvimento
                    </h1>

                    {/* Subtitle */}
                    <p className="animate-fade-in-up opacity-0-start delay-300 text-center text-lg md:text-xl text-white/70 font-light tracking-wider mb-12 max-w-2xl">
                        Estamos preparando algo especial para você.
                        <br />
                        <span className="text-white/90">Em breve, nossa nova experiência digital.</span>
                    </p>

                    {/* Divider */}
                    <div className="animate-fade-in opacity-0-start delay-500 w-24 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mb-12" />

                    {/* Menu Button */}
                    <Link
                        to="/menu"
                        className="animate-fade-in-up opacity-0-start delay-600 px-8 py-4 bg-gradient-to-r from-[#E31E26] to-[#501013] hover:from-[#501013] hover:to-[#E31E26] text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl hover:shadow-[#E31E26]/30 hover:scale-105 transition-all duration-300 mb-8"
                    >
                        Ver Cardápio Completo
                    </Link>

                    {/* Contact Info */}
                    <div className="animate-fade-in-up opacity-0-start delay-700 flex flex-col items-center gap-4 mb-8 text-white/80">
                        {/* Address */}
                        <div className="flex items-start gap-3 text-center">
                            <MapPin className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                            <div className="text-sm md:text-base tracking-wide">
                                <p>R. Antero de Quental, 253</p>
                                <p>4810-026 Guimarães, Portugal</p>
                            </div>
                        </div>
                        {/* Phone/WhatsApp */}
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 hover:text-green-400 transition-colors"
                        >
                            <Phone className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-sm md:text-base tracking-wide">+351 939 000 735</span>
                        </a>
                    </div>

                    {/* Social Links */}
                    <div className="animate-fade-in-up opacity-0-start delay-1000 flex items-center gap-8 mb-8">
                        <a
                            href="https://www.instagram.com/vulcaniciguimaraes"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon flex items-center gap-2 text-white/80 hover:text-amber-500"
                            aria-label="Instagram"
                        >
                            <Instagram className="w-6 h-6" />
                            <span className="hidden md:inline text-sm tracking-wider">Instagram</span>
                        </a>
                        <a
                            href="https://www.facebook.com/profile.php?id=61552967728211"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon flex items-center gap-2 text-white/80 hover:text-amber-500"
                            aria-label="Facebook"
                        >
                            <Facebook className="w-6 h-6" />
                            <span className="hidden md:inline text-sm tracking-wider">Facebook</span>
                        </a>
                    </div>

                    {/* Gallery CTA Button */}
                    <button
                        onClick={() => {
                            const gallerySection = document.querySelector('section.py-20');
                            gallerySection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className="animate-fade-in-up opacity-0-start delay-1200 px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 mb-16"
                    >
                        <span>Ver Nossa Galeria</span>
                        <ChevronDown className="w-5 h-5" />
                    </button>

                    {/* Scroll Indicator */}
                    <div className="animate-bounce absolute bottom-8">
                        <ChevronDown className="w-8 h-8 text-white/50" />
                    </div>

                </div>
            </section>

            {/* GALLERY SECTION */}
            <GallerySection />

            {/* Footer */}
            <footer className="w-full bg-black py-8 border-t border-white/10 text-center relative z-10">
                <p className="text-white/40 text-xs tracking-widest uppercase">
                    Vulcanici Pizzeria Napoletana © {new Date().getFullYear()}
                </p>
            </footer>
        </div>
    );
}
