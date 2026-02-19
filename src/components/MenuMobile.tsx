import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ChevronDown } from "lucide-react";
import MenuCard from './MenuCard';
import {
    menuCategories,
    // bebidas imports
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

interface MenuMobileProps {
    onImageClick: (item: MenuItem) => void;
}

export default function MenuMobile({ onImageClick }: MenuMobileProps) {
    const drinkCategories = [
        { title: 'Vinhos Tinto', items: vinhosTinto },
        { title: 'Vinhos Branco', items: vinhosBranco },
        { title: 'Vinhos Rosé', items: vinhosRose },
        { title: 'Espumante & Sangria', items: [...espumante, ...sangria] },
        { title: 'Cervejas', items: cervejas },
        { title: 'Não Alcoólicos', items: [...aguas, ...refrigerantes] },
        { title: 'Café & Digestivos', items: [...cafeDigestivos, ...aoCopo] }
    ];

    const getCategoryImage = (title: string) => {
        const t = title.toLowerCase();
        if (t.includes('antipasti')) return '/galeria/DSC01855.jpg'; // Tábua
        if (t.includes('classiche')) return '/galeria/DSC01965.jpg'; // Bufalina
        if (t.includes('specialic')) return '/galeria/DSC02197.jpg'; // Pérola Nera
        if (t.includes('calzone')) return '/galeria/DSC02162.jpg'; // Calzone
        if (t.includes('sobremesa')) return '/bg-pizza.jpg'; // Fallback
        return '/bg-pizza.jpg';
    };

    return (
        <div className="w-full space-y-4 pb-20">
            <Accordion type="single" collapsible className="w-full space-y-4">
                {menuCategories.map((category, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border rounded-xl bg-card overflow-hidden shadow-sm">
                        <AccordionTrigger className="w-full p-0 hover:no-underline transition-all group relative h-28 overflow-hidden [&>svg]:hidden">
                            {/* Background Image */}
                            <div className="absolute inset-0 z-0">
                                <img
                                    src={getCategoryImage(category.title)}
                                    alt={category.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />
                            </div>

                            {/* Text Content */}
                            <div className="relative z-10 w-full px-6 flex items-center justify-between gap-3 mt-8">
                                <span className="font-serif text-2xl font-bold text-white tracking-wide drop-shadow-md text-center">
                                    {category.title}
                                </span>
                                <div className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 shadow-lg transition-transform duration-300 group-data-[state=open]:rotate-180">
                                    <ChevronDown className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-6 pt-2">
                            {/* Specific grid for Specialità to show images larger if needed, but standard 1 col is fine too */}
                            <div className="grid grid-cols-1 gap-6">
                                {category.items.map((item, idx) => (
                                    <MenuCard
                                        key={idx}
                                        item={item}
                                        onImageClick={() => onImageClick(item)}
                                    />
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}

                {/* Bebidas Section */}
                <AccordionItem value="bebidas" className="border rounded-xl bg-card overflow-hidden shadow-sm">
                    <AccordionTrigger className="w-full p-0 hover:no-underline transition-all group relative h-28 overflow-hidden [&>svg]:hidden">
                        {/* Background Image */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src="/bg-pizza.jpg"
                                alt="Bebidas"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />
                            {/* Optional: Add a tint gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent mix-blend-overlay" />
                        </div>

                        {/* Text Content */}
                        <div className="relative z-10 w-full px-6 flex items-center justify-center gap-3">
                            <span className="font-serif text-2xl font-bold text-white tracking-wide drop-shadow-md text-center">
                                Bebidas & Vinhos
                            </span>
                            <div className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 shadow-lg transition-transform duration-300 group-data-[state=open]:rotate-180">
                                <ChevronDown className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-6 pt-2">
                        <div className="space-y-8">
                            {drinkCategories.map((cat, idx) => (
                                <div key={idx}>
                                    <h3 className="font-serif font-bold text-lg text-secondary mb-3 border-b border-border/40 pb-1">
                                        {cat.title}
                                    </h3>
                                    <div className="space-y-3">
                                        {cat.items.map((item, i) => (
                                            <div key={i} className="flex justify-between items-baseline">
                                                <span className="text-foreground/90 font-medium text-sm">{item.nome}</span>
                                                <div className="border-b border-dotted border-muted flex-1 mx-2 opacity-30" />
                                                <span className="text-primary font-bold text-sm">€{item.preco.toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
