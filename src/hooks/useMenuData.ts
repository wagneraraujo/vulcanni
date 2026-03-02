import { useState, useEffect } from 'react';
import type { MenuItem, DrinkItem, MenuCategory } from '../data/menuData';

export interface MenuData {
    menuCategories: MenuCategory[];
    bebidasDestaque: DrinkItem[];
    aguas: MenuItem[];
    refrigerantes: MenuItem[];
    cervejas: MenuItem[];
    vinhosTinto: MenuItem[];
    vinhosBranco: MenuItem[];
    vinhosRose: MenuItem[];
    espumante: MenuItem[];
    sangria: MenuItem[];
    aoCopo: MenuItem[];
    cafeDigestivos: MenuItem[];
}

// Fallback to static data if server is unavailable
import {
    menuCategories as staticMenuCategories,
    bebidasDestaque as staticBebidasDestaque,
    aguas as staticAguas,
    refrigerantes as staticRefrigerantes,
    cervejas as staticCervejas,
    vinhosTinto as staticVinhosTinto,
    vinhosBranco as staticVinhosBranco,
    vinhosRose as staticVinhosRose,
    espumante as staticEspumante,
    sangria as staticSangria,
    aoCopo as staticAoCopo,
    cafeDigestivos as staticCafeDigestivos,
} from '../data/menuData';

const STATIC_FALLBACK: MenuData = {
    menuCategories: staticMenuCategories,
    bebidasDestaque: staticBebidasDestaque,
    aguas: staticAguas,
    refrigerantes: staticRefrigerantes,
    cervejas: staticCervejas,
    vinhosTinto: staticVinhosTinto,
    vinhosBranco: staticVinhosBranco,
    vinhosRose: staticVinhosRose,
    espumante: staticEspumante,
    sangria: staticSangria,
    aoCopo: staticAoCopo,
    cafeDigestivos: staticCafeDigestivos,
};

export function useMenuData() {
    const [data, setData] = useState<MenuData>(STATIC_FALLBACK);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMenu = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/menu');
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json: MenuData = await res.json();
            setData(json);
            setError(null);
        } catch (err) {
            // Server not available — use static fallback silently
            setData(STATIC_FALLBACK);
            setError(null); // Don't show error to public visitors
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMenu();
    }, []);

    return { data, loading, error, refetch: fetchMenu };
}
