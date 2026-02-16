import type { MenuItem } from '../data/menuData';

interface MenuCardProps {
    item: MenuItem;
    onImageClick?: () => void;
}

export default function MenuCard({ item, onImageClick }: MenuCardProps) {
    return (
        <div className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
            {/* Image Placeholder */}
            {item.image && (
                <div
                    className="relative h-48 bg-muted overflow-hidden cursor-pointer"
                    onClick={onImageClick}
                >
                    <img
                        src={item.image}
                        alt={item.nome}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                            // Fallback to gradient if image fails to load
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
            )}

            {/* Content */}
            <div className="p-4">
                {/* Nome e Preço */}
                <div className="flex justify-between items-start gap-3 mb-3">
                    <h3 className="text-primary font-bold text-xl leading-tight flex-1">
                        {item.nome}
                    </h3>
                    <span className="text-primary font-bold text-2xl whitespace-nowrap">
                        €{item.preco.toFixed(2)}
                    </span>
                </div>

                {/* Ingredientes */}
                {item.ingredientes && (
                    <p className="text-muted-foreground text-base leading-relaxed mb-2 font-medium">
                        {item.ingredientes}
                    </p>
                )}

                {/* Opcional */}
                {item.opcional && (
                    <p className="text-accent-foreground text-sm italic mt-2 font-semibold">
                        {item.opcional}
                    </p>
                )}
            </div>
        </div>
    );
}
