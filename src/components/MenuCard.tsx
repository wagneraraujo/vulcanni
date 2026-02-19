import { type MenuItem } from '../data/menuData';
import { Plus } from 'lucide-react';

interface MenuCardProps {
    item: MenuItem;
    onImageClick: () => void;
}

export default function MenuCard({ item, onImageClick }: MenuCardProps) {
    return (
        <div className="group relative bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border/50 flex flex-col h-full">
            {/* Image Section */}
            <div
                className="relative h-64 overflow-hidden cursor-pointer"
                onClick={onImageClick}
            >
                {item.image ? (
                    <img
                        src={item.image}
                        alt={item.nome}
                        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground font-serif italic text-lg opacity-50">Vulcanici</span>
                    </div>
                )}

                {/* Overlay Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Zoom Icon */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <Plus className="w-5 h-5 text-white" />
                </div>
            </div>

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
                    {item.descricao}
                </p>

                {/* Decorative Line */}
                <div className="w-12 h-0.5 bg-accent/50 rounded-full group-hover:w-full group-hover:bg-primary/20 transition-all duration-500" />
            </div>
        </div>
    );
}
