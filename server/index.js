import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'vulcanici2024';

// Paths
const MENU_JSON_PATH = path.join(__dirname, 'menu.json');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));

// Auth middleware for write routes
function requireAuth(req, res, next) {
    const password = req.headers['x-admin-password'];
    if (!password || password !== ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'Não autorizado' });
    }
    next();
}

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = req.query.folder || 'galeria';
        const uploadDir = path.join(PUBLIC_DIR, folder);
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const base = path.basename(file.originalname, ext)
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9\-]/g, '');
        const unique = `${base}-${Date.now()}${ext}`;
        cb(null, unique);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Apenas imagens são permitidas'));
        }
        cb(null, true);
    }
});

// ─── Routes ─────────────────────────────────────────────────────────────────

// GET /api/menu — Return menu data
app.get('/api/menu', (req, res) => {
    try {
        const data = fs.readFileSync(MENU_JSON_PATH, 'utf-8');
        res.json(JSON.parse(data));
    } catch (err) {
        res.status(500).json({ error: 'Erro ao ler o menu', details: err.message });
    }
});

// POST /api/menu — Save menu data (requires auth)
app.post('/api/menu', requireAuth, (req, res) => {
    try {
        const data = req.body;
        if (!data || typeof data !== 'object') {
            return res.status(400).json({ error: 'Dados inválidos' });
        }
        // Backup before writing
        const backup = MENU_JSON_PATH.replace('.json', `.backup-${Date.now()}.json`);
        if (fs.existsSync(MENU_JSON_PATH)) {
            fs.copyFileSync(MENU_JSON_PATH, backup);
        }
        fs.writeFileSync(MENU_JSON_PATH, JSON.stringify(data, null, 2), 'utf-8');
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao guardar o menu', details: err.message });
    }
});

// POST /api/upload — Upload image (requires auth)
app.post('/api/upload', requireAuth, upload.single('image'), (req, res) => {
    try {
        const folder = req.query.folder || 'galeria';
        const filePath = `/${folder}/${req.file.filename}`;
        res.json({ path: filePath, filename: req.file.filename });
    } catch (err) {
        res.status(500).json({ error: 'Erro no upload', details: err.message });
    }
});

// GET /api/images — List images in a folder
app.get('/api/images', (req, res) => {
    const folder = req.query.folder || 'galeria';
    const dir = path.join(PUBLIC_DIR, folder);
    try {
        if (!fs.existsSync(dir)) return res.json([]);
        const files = fs.readdirSync(dir)
            .filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
            .map(f => `/${folder}/${f}`);
        res.json(files);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao listar imagens', details: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`\n  Vulcanici Admin Server rodando em http://localhost:${PORT}`);
    console.log(`  Senha admin: ${ADMIN_PASSWORD}\n`);
});
