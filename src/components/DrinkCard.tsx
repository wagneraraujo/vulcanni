import { useState } from 'react';
import { type DrinkItem } from '../data/menuData';

interface DrinkCardProps {
    item: DrinkItem;
    onImageClick: () => void;
}

const categoriaLabel: Record<DrinkItem['categoria'], string> = {
    'vinho-tinto': 'Vinho Tinto',
    'vinho-branco': 'Vinho Branco',
    'vinho-rose': 'Vinho Rosé',
    'espumante': 'Espumante',
    'cerveja': 'Cerveja',
};

const categoriaBadgeClass: Record<DrinkItem['categoria'], string> = {
    'vinho-tinto': 'bg-red-900/20 text-red-700 border-red-700/30',
    'vinho-branco': 'bg-yellow-100/40 text-yellow-700 border-yellow-500/30',
    'vinho-rose': 'bg-pink-100/40 text-pink-600 border-pink-400/30',
    'espumante': 'bg-amber-100/40 text-amber-700 border-amber-500/30',
    'cerveja': 'bg-orange-100/40 text-orange-700 border-orange-500/30',
};

export default function DrinkCard({ item, onImageClick }: DrinkCardProps) {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="group relative bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border/50 flex flex-col h-full">
            {/* Image Section */}
            <div
                className="relative h-64 overflow-hidden cursor-pointer bg-muted/30"
                onClick={onImageClick}
            >
                {!imageError ? (
                    <>
                        <img
                            src={item.image}
                            alt={item.nome}
                            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                            loading="lazy"
                            {...(item.image?.startsWith('http') ? { crossOrigin: 'anonymous' } : {})}
                            onError={(e) => {
                                console.error('❌ Erro ao carregar imagem de bebida:', item.image);
                                console.error('Detalhes:', e);
                                setImageError(true);
                            }}
                            onLoad={() => {
                                console.log('✅ Imagem de bebida carregada com sucesso:', item.image);
                            }}
                        />

                        {/* Overlay Gradient on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Zoom hint */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-black/40 backdrop-blur-sm rounded-full p-3">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted/20">
                        <div className="text-center p-4">
                            <span className="text-muted-foreground text-sm italic">Imagem não disponível</span>
                            {item.image && <p className="text-xs text-muted-foreground/60 mt-1 truncate max-w-[150px]">{item.image}</p>}
                        </div>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-1">
                {/* Category Badge */}
                <span className={`self-start text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border mb-3 ${categoriaBadgeClass[item.categoria]}`}>
                    {categoriaLabel[item.categoria]}
                </span>

                <div className="flex justify-between items-start mb-2 gap-3">
                    <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                        {item.nome}
                    </h3>
                    <span className="font-sans font-semibold text-lg text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap">
                        €{item.preco.toFixed(2)}
                    </span>
                </div>

                <p className="text-muted-foreground text-sm font-light leading-relaxed flex-1">
                    {item.descricao}
                </p>

                {/* Decorative Line */}
                <div className="w-12 h-0.5 bg-accent/50 rounded-full group-hover:w-full group-hover:bg-primary/20 transition-all duration-500 mt-4" />
            </div>
        </div>
    );
}
