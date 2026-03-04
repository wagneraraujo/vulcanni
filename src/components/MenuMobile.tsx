import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import MenuCard from './MenuCard';
import DrinkCard from './DrinkCard';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useMenuData } from '../hooks/useMenuData';
import { type MenuItem } from '../data/menuData';

interface MenuMobileProps {
    onImageClick: (item: MenuItem) => void;
}

export default function MenuMobile({ onImageClick }: MenuMobileProps) {
    const { data } = useMenuData();
    const {
        menuCategories, bebidasDestaque,
    } = data;

    const [drinkLightboxIndex, setDrinkLightboxIndex] = useState(-1);
    const drinkSlides = bebidasDestaque.map(item => ({ src: item.image }));



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

                {/* Bebidas em Destaque Section */}
                <AccordionItem value="bebidas-destaque" className="border rounded-xl bg-card overflow-hidden shadow-sm">
                    <AccordionTrigger className="w-full p-0 hover:no-underline transition-all group relative h-28 overflow-hidden [&>svg]:hidden">
                        <div className="absolute inset-0 z-0">
                            <img
                                src="/bg-pizza.jpg"
                                alt="Bebidas em Destaque"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/55 group-hover:bg-black/45 transition-colors duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-transparent mix-blend-overlay" />
                        </div>
                        <div className="relative z-10 w-full px-6 flex items-center justify-between gap-3 mt-8">
                            <span className="font-serif text-2xl font-bold text-white tracking-wide drop-shadow-md">
                                Bebidas em Destaque
                            </span>
                            <div className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 shadow-lg transition-transform duration-300 group-data-[state=open]:rotate-180">
                                <ChevronDown className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-6 pt-2">
                        <div className="grid grid-cols-1 gap-6">
                            {bebidasDestaque.map((item, idx) => (
                                <DrinkCard
                                    key={idx}
                                    item={item}
                                    onImageClick={() => setDrinkLightboxIndex(idx)}
                                />
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            {/* Lightbox - Drinks */}
            <Lightbox
                index={drinkLightboxIndex}
                slides={drinkSlides}
                open={drinkLightboxIndex >= 0}
                close={() => setDrinkLightboxIndex(-1)}
            />
        </div>
    );
}
