import { ChevronDown, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        <div className="relative min-h-screen w-full bg-background overflow-x-hidden selection:bg-accent selection:text-accent-foreground">
            {/* Background Image - Cinematic & Fixed */}
            <div
                className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0"
                style={{
                    backgroundImage: 'url(/galeria/DSC01888.jpg)',
                }}
            >
                {/* Elegant Gradient Overlay - Lighter and warmer for the rustic feel */}
                <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background/90" />
            </div>

            {/* Floating WhatsApp Button */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-[#25D366] rounded-full shadow-2xl hover:bg-[#128C7E] hover:scale-105 transition-all duration-300 animate-fade-in group"
                aria-label="WhatsApp"
            >
                <WhatsAppIcon className="w-8 h-8 text-white group-hover:rotate-12 transition-transform duration-300" />
            </a>

            {/* Main Content Container */}
            <div className="relative z-10 w-full">

                {/* HERO SECTION */}
                <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
                    <div className="w-full max-w-5xl mx-auto flex flex-col items-center">

                        {/* Logo - Center Stage with breathing room */}
                        <div className="animate-fade-in-up opacity-0-start mb-12 transform hover:scale-105 transition-transform duration-700 ease-out">
                            <Link to="/">
                                <img
                                    src="/logo-vulcani.png"
                                    alt="Vulcanici Pizzeria Napoletana"
                                    className="h-32 md:h-40 lg:h-48 w-auto object-contain opacity-90"
                                />
                            </Link>
                        </div>

                        {/* Typography - Serif Headline */}
                        <h1 className="animate-fade-in-up opacity-0-start delay-200 text-center text-5xl md:text-7xl lg:text-8xl font-serif text-primary mb-6 leading-tight tracking-tight">
                            Arte Napoletana
                        </h1>

                        {/* Subtitle - Sans Serif Modern */}
                        <p className="animate-fade-in-up opacity-0-start delay-300 text-center text-lg md:text-xl text-muted-foreground font-light tracking-widest uppercase mb-12 max-w-2xl border-y border-border/40 py-4">
                            Sabor Autêntico em Guimarães <br /> e em breve no Porto
                        </p>

                        {/* Narrative Paragraph */}
                        <p className="animate-fade-in-up opacity-0-start delay-500 text-center text-base md:text-lg text-foreground/80 font-sans leading-relaxed max-w-3xl mb-12">
                            Na Vulcanici não fazemos "pizza italiana". Fazemos a pizza como os italianos fazem:
                            ingredientes autênticos, massas de fermentação lenta, sabor que fala por si.
                        </p>
                        <p className="animate-fade-in-up opacity-0-start delay-500 text-center text-base md:text-lg text-foreground/80 font-sans leading-relaxed max-w-3xl mb-12">
                            Onde está estamos a preparar
                        </p>

                        {/* CTA Button - Elegant & Minimal */}
                        <Link
                            to="/menu"
                            className="animate-fade-in-up opacity-0-start delay-700 group relative px-10 py-5 bg-primary text-primary-foreground font-serif text-xl tracking-wide overflow-hidden rounded-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                Menù
                                <ChevronDown className="w-5 h-5 -rotate-90 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-primary-foreground/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </Link>
                        <a
                            href="https://wa.me/c/351939000735"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="animate-fade-in-up opacity-0-start mt-2 delay-700 group relative px-10 py-5 bg-primary text-primary-foreground font-serif text-xl tracking-wide overflow-hidden rounded-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                RESERVAS/TAKEAWAY GUIMARÃES
                                <ChevronDown className="w-5 h-5 -rotate-90 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-primary-foreground/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </a>

                    </div>
                </section>

                {/* INFO / CONTACT SECTION - "Card" Style */}


                {/* GALLERY PREVIEW */}
                {/* <section className="bg-secondary/50 py-20 border-t border-border/50">
                    <GallerySection />
                </section> */}

                {/* Footer */}
                <footer className="w-full bg-primary text-primary-foreground py-16 mt-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/bg-pizza.jpg')] bg-cover opacity-10 mix-blend-overlay" />
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                            {/* Brand */}
                            <div className="text-center md:text-left space-y-4">
                                <div className="flex items-center justify-center md:justify-start gap-4">
                                    <img src="/logo-vulcani.png" alt="Vulcanici" className="h-12 brightness-0 invert opacity-80" />
                                </div>
                                <p className="text-primary-foreground/60 text-sm max-w-xs mx-auto md:mx-0">
                                    A verdadeira tradição napolitana no coração de Guimarães. Ingredientes selecionados, paixão italiana.
                                </p>
                            </div>

                            {/* Contact */}
                            <div className="text-center md:text-left space-y-4">
                                <h4 className="font-serif text-xl font-bold text-accent">Contacto</h4>
                                <div className="space-y-4">
                                    <div>
                                        <p className="font-bold text-white">Guimarães</p>
                                        <p>R. Antero de Quental, 253</p>
                                        <p>4810-026 Guimarães</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">Porto</p>
                                        <p>Rua de Faria Guimarães 275</p>
                                        <p>Santo Ildefonso 4000-206 Porto</p>
                                    </div>
                                    <div className="pt-2 text-vulcanici-accent-yellow font-bold">
                                        <p>+351 939 000 735</p>
                                    </div>
                                </div>
                            </div>

                            {/* Horário */}
                            <div className="text-center md:text-left space-y-4">
                                <h4 className="font-serif text-xl font-bold text-accent">Horário</h4>
                                <div className="space-y-4 text-sm text-primary-foreground/80">
                                    <div>
                                        <p className="font-bold text-white">Segunda, Quinta e Sexta</p>
                                        <p>19:00 às 22:30</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">Terça, Sábado e Domingo</p>
                                        <p>12:00 às 15:00 <span className="mx-1">•</span> 19:00 às 23:00</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">Quarta</p>
                                        <p className="text-vulcanici-accent-yellow">Encerrado</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social */}
                            <div className="text-center md:text-left space-y-4">
                                <h4 className="font-serif text-xl font-bold text-accent">Siga-nos</h4>
                                <div className="flex justify-center md:justify-start gap-6">
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
            </div>
        </div>
    );
}
