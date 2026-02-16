import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Static list of images from public/galeria
// Since Vite's import.meta.glob doesn't work with public folder,
// we need to manually list the images or generate this list
const imageNames = [
    'DSC01855.jpg', 'DSC01862.jpg', 'DSC01884.jpg', 'DSC01888.jpg', 'DSC01898.jpg',
    'DSC01909.jpg', 'DSC01937.jpg', 'DSC01965.jpg', 'DSC01977.jpg', 'DSC01997.jpg',
    'DSC02024.jpg', 'DSC02029.jpg', 'DSC02035.jpg', 'DSC02047.jpg', 'DSC02049.jpg',
    'DSC02052.jpg', 'DSC02055.jpg', 'DSC02068.jpg', 'DSC02087.jpg', 'DSC02097.jpg',
    'DSC02125.jpg', 'DSC02144.jpg', 'DSC02157.jpg', 'DSC02162.jpg', 'DSC02193.jpg',
    'DSC02197.jpg'
];

const GallerySection = () => {
    const [index, setIndex] = useState(-1);

    // Convert image names to full paths
    const images = useMemo(() => {
        return imageNames.map(name => `/galeria/${name}`);
    }, []);

    // Formatted slides for lightbox
    const slides = useMemo(() => images.map((src) => ({ src })), [images]);

    if (images.length === 0) {
        return null;
    }

    return (
        <section className="py-20 px-6 bg-secondary relative z-10 text-center">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    className="text-4xl md:text-5xl lg:text-6xl font-light text-center text-primary mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Galeria
                </motion.h2>

                {/* Masonry Layout using CSS columns */}
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                    {images.map((src, i) => (
                        <motion.div
                            key={src}
                            className="relative break-inside-avoid cursor-pointer overflow-hidden rounded-lg group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                            onClick={() => setIndex(i)}
                        >
                            <img
                                src={src}
                                alt={`Gallery image ${i + 1}`}
                                className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
                        </motion.div>
                    ))}
                </div>

                <Lightbox
                    index={index}
                    slides={slides}
                    open={index >= 0}
                    close={() => setIndex(-1)}
                />
            </div>
        </section>
    );
};

export default GallerySection;
