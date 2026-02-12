import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Static list of images from public/galeria
// Since Vite's import.meta.glob doesn't work with public folder,
// we need to manually list the images or generate this list
const imageNames = [
    'vul1', 'vul2', 'vul3', 'vul4', 'vul5', 'vul6', 'vul7', 'vul8', 'vul9', 'vul10',
    'vul11', 'vul12', 'vul13', 'vul14', 'vul15', 'vul16', 'vul17', 'vul18', 'vul19', 'vul20',
    'vul21', 'vul22', 'vul23', 'vul24', 'vul25', 'vul26', 'vul27', 'vul28', 'vul29', 'vul30',
    'vul31', 'vul32'
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
        <section className="py-20 px-6 bg-black relative z-10">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    className="text-4xl md:text-5xl lg:text-6xl font-light text-center text-white mb-16"
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
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
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
