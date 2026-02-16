export interface MenuItem {
    nome: string;
    ingredientes?: string;
    preco: number;
    opcional?: string;
    image?: string;
}

export interface MenuCategory {
    title: string;
    items: MenuItem[];
}

export interface Unidade {
    endereco: string;
    cidade: string;
}

export const unidades: Unidade[] = [
    {
        endereco: "R. Antero de Quental, 253, 4810-026 Guimarães",
        cidade: "Guimarães"
    },
    {
        endereco: "Rua de Faria Guimarães 275, Santo Ildefonso 4000-206 Porto",
        cidade: "Porto"
    }
];

export const antipasti: MenuItem[] = [
    {
        nome: "Tábua de Charcutaria Italiana / Italian Board",
        ingredientes: "Presunto de Parma, mortadela, salame Napoli, burrata, azeitona, parmesão, pão artesanal",
        preco: 16,
        image: "/galeria/DSC01855.jpg"
    },
    {
        nome: "Salada / Salad",
        ingredientes: "Rúcula, burrata, presunto de Parma, tomate, pesto, parmesão, pão artesanal",
        preco: 13,
        image: "/galeria/DSC01862.jpg"
    },
    {
        nome: "Pão de Alho / Garlic Bread",
        ingredientes: "Azeite de alho, orégãos, mozzarella fior di latte",
        preco: 3.5,
        image: "/galeria/DSC01862.jpg"
    },
    {
        nome: "Montanara Bufalina",
        ingredientes: "Molho de tomate, mozzarella de bufala, parmesão, manjericão",
        preco: 4,
        image: "/galeria/DSC02047.jpg"
    },
    {
        nome: "Montanara Mortadela",
        ingredientes: "Mortadela Bologna, stracciatella, granula de pistacchio, raspas de limão",
        preco: 4,
        image: "/galeria/DSC02049.jpg"
    },
    {
        nome: "Montanara Presunto / Montanara Prosciutto",
        ingredientes: "Stracciatella, presunto de Parma, pesto, parmesão",
        preco: 4,
        image: "/galeria/DSC02052.jpg"
    },
    {
        nome: "Tris Montanara / Montanara Trio",
        ingredientes: "Bufalina, mortadela, presunto (não é possível alteração)",
        preco: 10,
        image: "/galeria/DSC02055.jpg"
    },
    {
        nome: "Lasanha Bolognese / Lasagna Bolognese",
        ingredientes: "Massa fresca, ragù encorpado e molho béchamel cremoso",
        preco: 15,
        image: "/galeria/DSC02068.jpg"
    }
];

export const leClassiche: MenuItem[] = [
    {
        nome: "Bufalina",
        ingredientes: "Molho de tomate, mozzarella de bufala, manjericão, parmesão, azeite extra virgem",
        preco: 13,
        image: "/galeria/DSC01965.jpg"
    },
    {
        nome: "Napoletana",
        ingredientes: "Molho de tomate, orégãos, manjericão, parmesão, mozzarella fior di latte, anchova, azeite extra virgem",
        preco: 12,
        image: "/galeria/DSC01898.jpg"
    },
    {
        nome: "Romana",
        ingredientes: "Molho de tomate, fiambre, cogumelos salteados, azeitonas, manjericão, parmesão, mozzarella fior di latte, azeite extra virgem",
        preco: 13,
        image: "/galeria/DSC02024.jpg"
    },
    {
        nome: "Margherita",
        ingredientes: "Molho de tomate, manjericão, mozzarella fior di latte, parmesão, azeite extra virgem",
        preco: 11,
        image: "/galeria/DSC01884.jpg"
    },
    {
        nome: "Quatro Formaggi / Quattro Formaggi",
        ingredientes: "Creme de parmesão, manjericão, mozzarella fior di latte, mozzarella defumada (provola), gorgonzola, azeite extra virgem",
        preco: 12,
        opcional: "Sugestão: creme de trufa +3",
        image: "/galeria/DSC01977.jpg"
    }
];

export const leSpecialita: MenuItem[] = [
    {
        nome: "Pérola Nera",
        ingredientes: "Massa duas culturas (frita/forno), creme de trufa, mozzarella fior di latte, presunto de Parma, creme de ricota, pimenta preta",
        preco: 18,
        image: "/galeria/DSC02197.jpg"
    },
    {
        nome: "Sofia Loren",
        ingredientes: "Molho de tomate, tomate amarelo, rúcula, mozzarella de bufala, lascas de parmesão, azeite extra virgem",
        preco: 14,
        image: "/galeria/DSC01937.jpg"
    },
    {
        nome: "D. Afonso Henriques",
        ingredientes: "Formato de raquete, mozzarella de bufala, tomate amarelo, rúcula, presunto de Parma, lascas de parmesão, azeite extra virgem, cabo recheado de ricota e salame Napoli",
        preco: 16,
        image: "/menu/specialita/afonso-henriques.jpg"
    },
    {
        nome: "VULCANICI",
        ingredientes: "Pepperoni picante, tomate amarelo, manjericão, parmesão, Nduja, mozzarella defumada (provola), azeite extra virgem",
        preco: 15,
        image: "/galeria/DSC02097.jpg"
    },
    {
        nome: "Largo da Oliveira",
        ingredientes: "Mozzarella fior di latte, mortadela Bologna, manjericão, burrata, pesto de pistacchio, granula de pistacchio, raspas de limão",
        preco: 16,
        image: "/galeria/DSC01997.jpg"
    },
    {
        nome: "Doce Armonia / Doce Armonia",
        ingredientes: "Creme de pistacchio, fiambre, cebola caramelizada, stracciatella, granula de pistacchio",
        preco: 16,
        image: "/galeria/DSC02087.jpg"
    },
    {
        nome: "Parmigiana",
        ingredientes: "Ragu napolitano, berinjela, manjericão, mozzarella defumada (provola), creme de bechamel",
        preco: 14,
        image: "/galeria/DSC02144.jpg"
    },
    {
        nome: "O Ragù",
        ingredientes: "Carne desfiada glaceada no vinho tinto cozida no tomate lentamente, manjericão, mozzarella defumada (provola), parmesão, azeite extra virgem",
        preco: 15,
        image: "/galeria/DSC02029.jpg"
    },
    {
        nome: "Totó",
        ingredientes: "Molho de tomate, mozzarella fior di latte, rúcula, presunto de Parma, lascas de parmesão, azeite extra virgem",
        preco: 14,
        image: "/galeria/DSC01909.jpg"
    },
    {
        nome: "Diavola do Mar",
        ingredientes: "Molho de tomate, Nduja, anchova, orégãos, parmesão, stracciatella, manjericão",
        preco: 15,
        image: "/galeria/DSC02125.jpg"
    },
    {
        nome: "Prosciutto & Mascarpone",
        ingredientes: "Molho de tomate, presunto de Parma, manjericão, parmesão, queijo mascarpone",
        preco: 16,
        image: "/galeria/DSC02193.jpg"
    }
];

export const calzone: MenuItem[] = [
    {
        nome: "Completo",
        ingredientes: "Ricota, salame Napoli, manjericão, mozzarella fior di latte, molho de tomate, parmesão, azeite extra virgem",
        preco: 13,
        image: "/galeria/DSC02162.jpg"
    },
    {
        nome: "Scarola",
        ingredientes: "Scarola, manjericão, azeitona, mozzarella defumada (provola), parmesão, azeite extra virgem",
        preco: 11,
        image: "/galeria/DSC02157.jpg"
    }
];

export const sobremesas: MenuItem[] = [
    { nome: "Babà", preco: 5, image: "/menu/sobremesas/baba.jpg" },
    { nome: "Tiramisú", preco: 6, image: "/menu/sobremesas/tiramisu.jpg" },
    { nome: "Delícia de limão / Delizia di Limone", preco: 7, image: "/menu/sobremesas/delizia-limone.jpg" },
    { nome: "Cheesecake de frutos vermelhos / Red Berry Cheesecake", preco: 7, image: "/menu/sobremesas/cheesecake-berries.jpg" },
    { nome: "Cheesecake de pistacchio / Pistachio Cheesecake", preco: 7, image: "/menu/sobremesas/cheesecake-pistacchio.jpg" },
    { nome: "Cheesecake de nutella / Nutella Cheesecake", preco: 7, image: "/menu/sobremesas/cheesecake-nutella.jpg" }
];

export const aguas: MenuItem[] = [
    { nome: "Água Panna 75cl", preco: 3 },
    { nome: "Água Sanpellegriano 75cl", preco: 3 },
    { nome: "Limonata Sanpellegrino", preco: 3 }
];

export const refrigerantes: MenuItem[] = [
    { nome: "Coca cola, Cola cola Zero, Sprite, Fanta Laranja 33cl", preco: 3 },
    { nome: "Estathé (Ice Tea Italiano): Pêssego, limão", preco: 3 }
];

export const cervejas: MenuItem[] = [
    { nome: "Messina Cristalli di Sale 33cl", preco: 5 },
    { nome: "Ichnusa não filtrada 33cl", preco: 4 },
    { nome: "Peroni Nastro Azzurro 33cl", preco: 3.5 },
    { nome: "Peroni Gran Riserva Doppio Malto 33cl", preco: 4 },
    { nome: "Peroni Gran Riserva Rossa 33cl", preco: 4 }
];

export const vinhosTinto: MenuItem[] = [
    { nome: "Orme di Lava (Basilicata)", preco: 16 },
    { nome: "Aglianico (Campania)", preco: 17 },
    { nome: "NegroAmaro (Puglia)", preco: 15 }
];

export const vinhosBranco: MenuItem[] = [
    { nome: "Orme di Lava (Basilicata)", preco: 16 },
    { nome: "Grillo (Sicilia)", preco: 17 },
    { nome: "Pinot grigio (Friuli Venezia Giulia)", preco: 16 }
];

export const vinhosRose: MenuItem[] = [
    { nome: "Ciró Rosé (Calabria)", preco: 19 },
    { nome: "Lambrusco (Emilia Romagna)", preco: 17 }
];

export const espumante: MenuItem[] = [
    { nome: "Radise (Veneto)", preco: 15 }
];

export const sangria: MenuItem[] = [
    { nome: "Sangria Tinta", preco: 16 },
    { nome: "Sangria Branca", preco: 16 },
    { nome: "Sangria Espumante", preco: 17 }
];

export const aoCopo: MenuItem[] = [
    { nome: "Limoncello Spritz", preco: 7 },
    { nome: "Aperol Spritz", preco: 7 },
    { nome: "Vinho Branco", preco: 6 },
    { nome: "Vinho Tinto", preco: 6 }
];

export const cafeDigestivos: MenuItem[] = [
    { nome: "Café / Espresso", preco: 1.5 },
    { nome: "Descafeinado / Decaffeinated", preco: 1.5 },
    { nome: "Limoncello", preco: 3 },
    { nome: "Meloncello", preco: 3.5 },
    { nome: "Amaro del capo", preco: 3 }
];

export const menuCategories: MenuCategory[] = [
    { title: "Antipasti (Entradas)", items: antipasti },
    { title: "Le Classiche", items: leClassiche },
    { title: "Le Specialità", items: leSpecialita },
    { title: "Calzone", items: calzone },
    { title: "Sobremesas / Dessert", items: sobremesas }
];
