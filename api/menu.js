import { Redis } from '@upstash/redis';

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
});

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'vulcanici2024';
const MENU_KEY = 'vulcanici:menu';

export default async function handler(req, res) {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // GET — return menu data
    if (req.method === 'GET') {
        try {
            const raw = await redis.get(MENU_KEY);
            if (!raw) {
                return res.status(404).json({ error: 'Menu not initialised. Run the seed script.' });
            }
            // Upstash may return string or already-parsed object
            const data = typeof raw === 'string' ? JSON.parse(raw) : raw;
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ error: 'KV read error', details: String(err) });
        }
    }

    // POST — save menu data (requires auth)
    if (req.method === 'POST') {
        const password = req.headers['x-admin-password'];
        if (!password || password !== ADMIN_PASSWORD) {
            return res.status(401).json({ error: 'Nao autorizado' });
        }
        try {
            const data = req.body;
            if (!data || typeof data !== 'object') {
                return res.status(400).json({ error: 'Dados invalidos' });
            }
            await redis.set(MENU_KEY, JSON.stringify(data));
            return res.status(200).json({ success: true });
        } catch (err) {
            return res.status(500).json({ error: 'KV write error', details: String(err) });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
