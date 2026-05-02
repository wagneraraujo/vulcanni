import ImageKit from 'imagekit';
import { IncomingForm } from 'formidable';
import fs from 'fs';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'vulcanici2024';

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

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
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const password = req.headers['x-admin-password'];
    if (!password || password !== ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'Nao autorizado' });
    }

    try {
        const folder = req.query?.folder || 'bebidas';

        const form = new IncomingForm({ keepExtensions: true });
        const [, files] = await form.parse(req);
        const file = Array.isArray(files.image) ? files.image[0] : files.image;

        if (!file) {
            return res.status(400).json({ error: 'Nenhum ficheiro enviado' });
        }

        const rawExt = (file.originalFilename?.split('.').pop() || 'jpg').toLowerCase();
        const mimeMap = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', gif: 'image/gif', heic: 'image/heic' };
        const ext = mimeMap[rawExt] ? rawExt : 'jpg';
        const fileName = `${Date.now()}.${ext}`;
        const buffer = fs.readFileSync(file.filepath);

        const result = await imagekit.upload({
            file: buffer,
            fileName,
            folder: `/${folder}`,
            useUniqueFileName: false,
        });

        return res.status(200).json({ path: result.url, url: result.url });
    } catch (err) {
        return res.status(500).json({ error: 'Upload error', details: String(err) });
    }
}
