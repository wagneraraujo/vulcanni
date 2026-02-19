import { useState, useMemo } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Plus } from 'lucide-react';

// Original images from the previous version
const imageNames = [
    'DSC01855.jpg', 'DSC01862.jpg', 'DSC01884.jpg', 'DSC01888.jpg', 'DSC01898.jpg',
    'DSC01909.jpg', 'DSC01937.jpg', 'DSC01965.jpg', 'DSC01977.jpg', 'DSC01997.jpg',
    'DSC02024.jpg', 'DSC02029.jpg', 'DSC02035.jpg', 'DSC02047.jpg', 'DSC02049.jpg',
    'DSC02052.jpg', 'DSC02055.jpg', 'DSC02068.jpg', 'DSC02087.jpg', 'DSC02097.jpg',
    'DSC02125.jpg', 'DSC02144.jpg', 'DSC02157.jpg', 'DSC02162.jpg', 'DSC02193.jpg',
    'DSC02197.jpg'
];

export default function GallerySection() {
    const [index, setIndex] = useState(-1);

    const galleryImages = useMemo(() => {
        return imageNames.map(name => ({
            src: `/galeria/${name}`,
            alt: "Ambiente e Pratos Vulcanici"
        }));
    }, []);

    return (
        <section className="py-24 px-6 relative overflow-hidden bg-secondary/30">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <span className="font-serif text-accent italic text-xl">Nossa Galeria</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mt-2 mb-6">
                        Momentos Vulcanici
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                        Um olhar sobre a nossa paixão, desde a preparação dos ingredientes até à pizza fumegante na sua mesa.
                    </p>
                </div>

                {/* Masonry-like Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]">
                    {galleryImages.map((image, i) => (
                        <div
                            key={i}
                            className={`relative group rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 ease-in-out border border-border/20
                                ${i % 7 === 0 ? 'md:col-span-2 md:row-span-2' : ''}
                                ${i % 11 === 0 ? 'md:col-span-2' : ''}
                                animate-fade-in-up
                            `}
                            style={{ animationDelay: `${(i % 10) * 50}ms` }}
                            onClick={() => setIndex(i)}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]" />

                            {/* Content on Hover */}
                            <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-black/80 to-transparent">
                                <div className="flex justify-between items-end text-white">
                                    <span className="font-serif text-lg font-medium">Vulcanici</span>
                                    <Plus className="w-6 h-6 border rounded-full p-1" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Lightbox
                index={index}
                slides={galleryImages.map(img => ({ src: img.src }))}
                open={index >= 0}
                close={() => setIndex(-1)}
            />
        </section>
    );
}
