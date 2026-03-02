import { put } from '@vercel/blob';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'vulcanici2024';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password');

    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const password = req.headers['x-admin-password'];
    if (!password || password !== ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'Nao autorizado' });
    }

    try {
        // Read raw body as buffer
        const chunks = [];
        for await (const chunk of req) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);
        const contentType = req.headers['content-type'] || 'application/octet-stream';

        // Parse filename from content-disposition or use timestamp
        const folder = req.query?.folder || 'bebidas';
        const filename = `${folder}/${Date.now()}.jpg`;

        const blob = await put(filename, buffer, {
            access: 'public',
            contentType,
        });

        return res.status(200).json({ path: blob.url, url: blob.url });
    } catch (err) {
        return res.status(500).json({ error: 'Upload error', details: String(err) });
    }
}
