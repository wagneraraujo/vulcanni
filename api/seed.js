/**
 * GET /api/seed?secret=SEED_SECRET
 * Populates Upstash Redis with the initial menu data.
 * Run once after first deploy.
 */
import { Redis } from '@upstash/redis';

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
});

const MENU_KEY = 'vulcanici:menu';
const SEED_SECRET = process.env.SEED_SECRET || 'vulcanici-seed-2024';

const INITIAL_MENU = {
  "menuCategories": [
    {
      "title": "Antipasti (Entradas)",
      "items": [
        { "nome": "Tabua de Charcutaria Italiana / Italian Board", "ingredientes": "Presunto de Parma, mortadela, salame Napoli, burrata, azeitona, parmesao, pao artesanal", "preco": 16, "image": "/galeria/DSC01855.jpg" },
        { "nome": "Salada / Salad", "ingredientes": "Rucula, burrata, presunto de Parma, tomate, pesto, parmesao, pao artesanal", "preco": 13, "image": "" },
        { "nome": "Pao de Alho / Garlic Bread", "ingredientes": "Azeite de alho, oregaos, mozzarella fior di latte", "preco": 3.5, "image": "/galeria/DSC01862.jpg" },
        { "nome": "Montanara Bufalina", "ingredientes": "Molho de tomate, mozzarella de bufala, parmesao, manjerical", "preco": 4, "image": "/galeria/bufalina.jpg" },
        { "nome": "Montanara Mortadela", "ingredientes": "Mortadela Bologna, stracciatella, granula de pistacchio, raspas de limao", "preco": 4, "image": "/galeria/DSC02049.jpg" },
        { "nome": "Montanara Presunto / Montanara Prosciutto", "ingredientes": "Stracciatella, presunto de Parma, pesto, parmesao", "preco": 4, "image": "/galeria/DSC02052.jpg" },
        { "nome": "Tris Montanara / Montanara Trio", "ingredientes": "Bufalina, mortadela, presunto (nao e possivel alteracao)", "preco": 10, "image": "/galeria/DSC02055.jpg" },
        { "nome": "Lasanha Bolognese / Lasagna Bolognese", "ingredientes": "Massa fresca, ragu encorpado e molho bechamel cremoso", "preco": 15, "image": "/galeria/DSC02068.jpg" }
      ]
    },
    {
      "title": "Le Classiche",
      "items": [
        { "nome": "Bufalina", "ingredientes": "Molho de tomate, mozzarella de bufala, manjerical, parmesao, azeite extra virgem", "preco": 13, "image": "/galeria/DSC01965.jpg" },
        { "nome": "Napoletana", "ingredientes": "Molho de tomate, oregaos, manjerical, parmesao, mozzarella fior di latte, anchova, azeite extra virgem", "preco": 12, "image": "/galeria/DSC01898.jpg" },
        { "nome": "Romana", "ingredientes": "Molho de tomate, fiambre, cogumelos salteados, azeitonas, manjerical, parmesao, mozzarella fior di latte, azeite extra virgem", "preco": 13, "image": "/galeria/DSC02024.jpg" },
        { "nome": "Margherita", "ingredientes": "Molho de tomate, manjerical, mozzarella fior di latte, parmesao, azeite extra virgem", "preco": 11, "image": "/galeria/DSC01884.jpg" },
        { "nome": "Quatro Formaggi / Quattro Formaggi", "ingredientes": "Creme de parmesao, manjerical, mozzarella fior di latte, mozzarella defumada (provola), gorgonzola, azeite extra virgem", "preco": 12, "opcional": "Sugestao: creme de trufa +3", "image": "/galeria/DSC01977.jpg" }
      ]
    },
    {
      "title": "Le Specialita",
      "items": [
        { "nome": "Perola Nera", "ingredientes": "Massa duas culturas (frita/forno), creme de trufa, mozzarella fior di latte, presunto de Parma, creme de ricota, pimenta preta", "preco": 18, "image": "/galeria/DSC02197.jpg" },
        { "nome": "Sofia Loren", "ingredientes": "Molho de tomate, tomate amarelo, rucula, mozzarella de bufala, lascas de parmesao, azeite extra virgem", "preco": 14, "image": "/galeria/DSC01937.jpg" },
        { "nome": "D. Afonso Henriques", "ingredientes": "Formato de raquete, mozzarella de bufala, tomate amarelo, rucula, presunto de Parma, lascas de parmesao, azeite extra virgem", "preco": 16, "image": "/menu/specialita/afonso-henriques.jpg" },
        { "nome": "VULCANICI", "ingredientes": "Pepperoni picante, tomate amarelo, manjerical, parmesao, Nduja, mozzarella defumada (provola), azeite extra virgem", "preco": 15, "image": "/galeria/DSC02097.jpg" },
        { "nome": "Largo da Oliveira", "ingredientes": "Mozzarella fior di latte, mortadela Bologna, manjerical, burrata, pesto de pistacchio, granula de pistacchio, raspas de limao", "preco": 16, "image": "/galeria/DSC01997.jpg" },
        { "nome": "Doce Armonia", "ingredientes": "Creme de pistacchio, fiambre, cebola caramelizada, stracciatella, granula de pistacchio", "preco": 16, "image": "/galeria/DSC02087.jpg" },
        { "nome": "Parmigiana", "ingredientes": "Ragu napolitano, berinjela, manjerical, mozzarella defumada (provola), creme de bechamel", "preco": 14, "image": "/galeria/DSC02144.jpg" },
        { "nome": "O Ragu", "ingredientes": "Carne desfiada glaceada no vinho tinto cozida no tomate lentamente, manjerical, mozzarella defumada (provola), parmesao, azeite extra virgem", "preco": 15, "image": "/galeria/DSC02029.jpg" },
        { "nome": "Toto", "ingredientes": "Molho de tomate, mozzarella fior di latte, rucula, presunto de Parma, lascas de parmesao, azeite extra virgem", "preco": 14, "image": "/galeria/DSC01909.jpg" },
        { "nome": "Diavola do Mar", "ingredientes": "Molho de tomate, Nduja, anchova, oregaos, parmesao, stracciatella, manjerical", "preco": 15, "image": "/galeria/DSC02125.jpg" },
        { "nome": "Prosciutto & Mascarpone", "ingredientes": "Molho de tomate, presunto de Parma, manjerical, parmesao, queijo mascarpone", "preco": 16, "image": "/galeria/DSC02193.jpg" }
      ]
    },
    {
      "title": "Calzone",
      "items": [
        { "nome": "Completo", "ingredientes": "Ricota, salame Napoli, manjerical, mozzarella fior di latte, molho de tomate, parmesao, azeite extra virgem", "preco": 13, "image": "/galeria/DSC02162.jpg" },
        { "nome": "Scarola", "ingredientes": "Scarola, manjerical, azeitona, mozzarella defumada (provola), parmesao, azeite extra virgem", "preco": 11, "image": "/galeria/DSC02157.jpg" }
      ]
    },
    {
      "title": "Sobremesas / Dessert",
      "items": [
        { "nome": "Baba", "ingredientes": "", "preco": 5, "image": "/menu/sobremesas/baba.jpg" },
        { "nome": "Tiramisu", "ingredientes": "", "preco": 6, "image": "/menu/sobremesas/tiramisu.jpg" },
        { "nome": "Delicia de limao / Delizia di Limone", "ingredientes": "", "preco": 7, "image": "/menu/sobremesas/delizia-limone.jpg" },
        { "nome": "Cheesecake de frutos vermelhos / Red Berry Cheesecake", "ingredientes": "", "preco": 7, "image": "/menu/sobremesas/cheesecake-berries.jpg" },
        { "nome": "Cheesecake de pistacchio / Pistachio Cheesecake", "ingredientes": "", "preco": 7, "image": "/menu/sobremesas/cheesecake-pistacchio.jpg" },
        { "nome": "Cheesecake de nutella / Nutella Cheesecake", "ingredientes": "", "preco": 7, "image": "/menu/sobremesas/cheesecake-nutella.jpg" }
      ]
    }
  ],
  "bebidasDestaque": [
    { "nome": "Orme di Lava Tinto", "descricao": "Tinto vulcanico do Vulture, aromas de fruta escura e especiarias, taninos firmes mas elegantes.", "preco": 16, "image": "/bebidas/orme-di-lava-tinto.jpg", "categoria": "vinho-tinto" },
    { "nome": "Aglianico", "descricao": "Tinto intenso do Sannio, notas de frutos vermelhos e pimenta, estrutura cheia e final seco.", "preco": 17, "image": "/bebidas/aglianico.jpg", "categoria": "vinho-tinto" },
    { "nome": "Negroamaro", "descricao": "Tinto da Puglia macio, com aromas de ameixa e amarena, sabor quente e envolvente.", "preco": 15, "image": "/bebidas/negroamaro.jpg", "categoria": "vinho-tinto" },
    { "nome": "Orme di Lava Branco", "descricao": "Branco fresco da Basilicata, aromas florais e de fruta branca, boca salgada e mineral.", "preco": 16, "image": "/bebidas/orme-di-lava-branco.jpg", "categoria": "vinho-branco" },
    { "nome": "Grillo", "descricao": "Branco siciliano aromatico, citrinos e flores brancas, fresco, com toque maritimo.", "preco": 17, "image": "/bebidas/grillo.jpg", "categoria": "vinho-branco" },
    { "nome": "Pinot Grigio", "descricao": "Branco leve e fragrante, notas de pera e maca, sabor seco e direto.", "preco": 16, "image": "/bebidas/pinot-grigio.jpg", "categoria": "vinho-branco" },
    { "nome": "Ciro Rose", "descricao": "Rose calabres de Gaglioppo, cor delicada, aromas de morango silvestre e rosa, boca fresca e seca.", "preco": 19, "image": "/bebidas/ciro-rose.jpg", "categoria": "vinho-rose" },
    { "nome": "Lambrusco Rose Extra Dry", "descricao": "Rose frisante, aromas de frutos vermelhos, bolha viva e sabor meio seco mas equilibrado.", "preco": 17, "image": "/bebidas/lambrusco-rose.jpg", "categoria": "vinho-rose" },
    { "nome": "Radise Spumante", "descricao": "Espumante elegante, aromas de maca e pao tostado, bolha fina e final seco.", "preco": 15, "image": "/bebidas/radise-spumante.jpg", "categoria": "espumante" },
    { "nome": "Messina Cristalli di Sale", "descricao": "Cerveja lager siciliana nao filtrada, dourada e ligeiramente turva, sabor macio, toques florais.", "preco": 5, "image": "/bebidas/messina.jpg", "categoria": "cerveja" },
    { "nome": "Ichnusa Nao Filtrata", "descricao": "Cerveja sarda nao filtrada, cor dourada velada, corpo suave, amargor moderado.", "preco": 4, "image": "/bebidas/ichnusa.jpg", "categoria": "cerveja" },
    { "nome": "Nastro Azzurro", "descricao": "Lager italiana clara e leve, muito refrescante, notas discretas de malte e lupulo.", "preco": 3.5, "image": "/bebidas/nastro-azzurro.jpg", "categoria": "cerveja" },
    { "nome": "Peroni Gran Riserva Doppio Malto", "descricao": "Cerveja encorpada de dupla maltagem, cor dourado intenso, aromas de malte e caramelo.", "preco": 4, "image": "/bebidas/peroni-doppio-malto.jpg", "categoria": "cerveja" },
    { "nome": "Peroni Gran Riserva Rossa", "descricao": "Cerveja de cor ambar/avermelhada, notas de malte tostado e caramelo, corpo medio.", "preco": 4, "image": "/bebidas/peroni-rossa.jpg", "categoria": "cerveja" }
  ],
  "aguas": [
    { "nome": "Agua Panna 75cl", "preco": 3 },
    { "nome": "Agua Sanpellegriano 75cl", "preco": 3 },
    { "nome": "Limonata Sanpellegrino", "preco": 3 }
  ],
  "refrigerantes": [
    { "nome": "Coca cola, Cola cola Zero, Sprite, Fanta Laranja 33cl", "preco": 3 },
    { "nome": "Estathe (Ice Tea Italiano): Pessego, limao", "preco": 3 }
  ],
  "cervejas": [
    { "nome": "Messina Cristalli di Sale 33cl", "preco": 5 },
    { "nome": "Ichnusa nao filtrada 33cl", "preco": 4 },
    { "nome": "Peroni Nastro Azzurro 33cl", "preco": 3.5 },
    { "nome": "Peroni Gran Riserva Doppio Malto 33cl", "preco": 4 },
    { "nome": "Peroni Gran Riserva Rossa 33cl", "preco": 4 }
  ],
  "vinhosTinto": [
    { "nome": "Orme di Lava (Basilicata)", "preco": 16 },
    { "nome": "Aglianico (Campania)", "preco": 17 },
    { "nome": "NegroAmaro (Puglia)", "preco": 15 }
  ],
  "vinhosBranco": [
    { "nome": "Orme di Lava (Basilicata)", "preco": 16 },
    { "nome": "Grillo (Sicilia)", "preco": 17 },
    { "nome": "Pinot grigio (Friuli Venezia Giulia)", "preco": 16 }
  ],
  "vinhosRose": [
    { "nome": "Ciro Rose (Calabria)", "preco": 19 },
    { "nome": "Lambrusco (Emilia Romagna)", "preco": 17 }
  ],
  "espumante": [
    { "nome": "Radise (Veneto)", "preco": 15 }
  ],
  "sangria": [
    { "nome": "Sangria Tinta", "preco": 16 },
    { "nome": "Sangria Branca", "preco": 16 },
    { "nome": "Sangria Espumante", "preco": 17 }
  ],
  "aoCopo": [
    { "nome": "Limoncello Spritz", "preco": 7 },
    { "nome": "Aperol Spritz", "preco": 7 },
    { "nome": "Vinho Branco", "preco": 6 },
    { "nome": "Vinho Tinto", "preco": 6 }
  ],
  "cafeDigestivos": [
    { "nome": "Cafe / Espresso", "preco": 1.5 },
    { "nome": "Descafeinado / Decaffeinated", "preco": 1.5 },
    { "nome": "Limoncello", "preco": 3 },
    { "nome": "Meloncello", "preco": 3.5 },
    { "nome": "Amaro del capo", "preco": 3 }
  ]
};

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).end();

    const secret = req.query?.secret;
    if (!secret || secret !== SEED_SECRET) {
        return res.status(401).json({ error: 'Secret invalido. Use ?secret=SEU_SEED_SECRET' });
    }

    try {
        await redis.set(MENU_KEY, JSON.stringify(INITIAL_MENU));
        return res.status(200).json({ success: true, message: 'Menu populado no Upstash Redis com sucesso!' });
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao popular KV', details: String(err) });
    }
}
