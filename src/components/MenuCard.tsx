import { useState } from 'react';
import { type MenuItem } from '../data/menuData';

interface MenuCardProps {
    item: MenuItem;
    onImageClick: () => void;
}

export default function MenuCard({ item, onImageClick }: MenuCardProps) {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="group relative bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border/50 flex flex-col h-full">
            {/* Image Section - Only render if image exists and no error occurred */}
            {item.image && !imageError && (
                <div
                    className="relative h-64 overflow-hidden cursor-pointer"
                    onClick={onImageClick}
                >
                    <img
                        src={item.image}
                        alt={item.nome}
                        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                        loading="lazy"
                        onError={() => setImageError(true)}
                    />

                    {/* Overlay Gradient on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
            )}

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-2xl text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                        {item.nome}
                    </h3>
                    <span className="font-sans font-semibold text-lg text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap ml-4">
                        €{item.preco.toFixed(2)}
                    </span>
                </div>

                <p className="text-muted-foreground text-sm font-light leading-relaxed mb-6 flex-1">
                    {item.ingredientes}
                </p>

                {/* Decorative Line */}
                <div className="w-12 h-0.5 bg-accent/50 rounded-full group-hover:w-full group-hover:bg-primary/20 transition-all duration-500" />
            </div>
        </div>
    );
}
