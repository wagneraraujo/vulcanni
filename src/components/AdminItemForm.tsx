import { useState, useRef } from 'react';
import type { MenuItem, DrinkItem } from '../data/menuData';

type ItemType = 'menu' | 'drink';

interface AdminItemFormProps {
    item?: Partial<MenuItem> | Partial<DrinkItem>;
    type: ItemType;
    password: string;
    onSave: (item: MenuItem | DrinkItem) => void;
    onCancel: () => void;
}

const DRINK_CATEGORIES = [
    { value: 'vinho-tinto', label: 'Vinho Tinto' },
    { value: 'vinho-branco', label: 'Vinho Branco' },
    { value: 'vinho-rose', label: 'Vinho Rosé' },
    { value: 'espumante', label: 'Espumante' },
    { value: 'cerveja', label: 'Cerveja' },
] as const;

const compressImage = async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                const MAX_WIDTH = 1280;
                if (width > MAX_WIDTH) {
                    height = Math.round((height * MAX_WIDTH) / width);
                    width = MAX_WIDTH;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Failed to get canvas context'));
                    return;
                }
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob((blob) => {
                    if (!blob) {
                        reject(new Error('Canvas is empty'));
                        return;
                    }
                    const originalName = file.name;
                    const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.')) || originalName;
                    const compressedFile = new File([blob], `${nameWithoutExt}.jpg`, {
                        type: 'image/jpeg',
                        lastModified: Date.now(),
                    });
                    resolve(compressedFile);
                }, 'image/jpeg', 0.82);
            };
            img.onerror = (error) => reject(error);
        };
        reader.onerror = (error) => reject(error);
    });
};

export default function AdminItemForm({ item, type, password, onSave, onCancel }: AdminItemFormProps) {
    const [nome, setNome] = useState(item?.nome ?? '');
    const [nomeEn, setNomeEn] = useState(() => {
        const n = (item as MenuItem)?.nome ?? '';
        return n.includes(' / ') ? n.split(' / ')[1] : '';
    });
    const [ingredientes, setIngredientes] = useState(
        (item as MenuItem)?.ingredientes ?? (item as DrinkItem)?.descricao ?? ''
    );
    const [preco, setPreco] = useState(String(item?.preco ?? ''));
    const [opcional, setOpcional] = useState((item as MenuItem)?.opcional ?? '');
    const [categoria, setCategoria] = useState<DrinkItem['categoria']>(
        (item as DrinkItem)?.categoria ?? 'cerveja'
    );
    const [image, setImage] = useState(item?.image ?? '');
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const fileRef = useRef<HTMLInputElement>(null);

    const folder = type === 'drink' ? 'bebidas' : 'galeria';

    const handleUpload = async (file: File) => {
        setUploading(true);
        setUploadError('');
        try {
            const compressedFile = await compressImage(file);
            const fd = new FormData();
            fd.append('image', compressedFile);
            const res = await fetch(`/api/upload?folder=${folder}`, {
                method: 'POST',
                headers: { 'x-admin-password': password },
                body: fd,
            });
            if (!res.ok) throw new Error('Falha no upload');
            const { path } = await res.json();
            setImage(path);
        } catch (e) {
            setUploadError('Erro ao enviar a imagem. Tente novamente.');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!nome.trim()) return;

        const nomeFinal = nomeEn.trim() ? `${nome.trim()} / ${nomeEn.trim()}` : nome.trim();

        if (type === 'menu') {
            onSave({
                nome: nomeFinal,
                ingredientes: ingredientes.trim(),
                preco: parseFloat(preco) || 0,
                opcional: opcional.trim() || undefined,
                image: image || undefined,
            } as MenuItem);
        } else {
            onSave({
                nome: nome.trim(),
                descricao: ingredientes.trim(),
                preco: parseFloat(preco) || 0,
                image: image,
                categoria,
            } as DrinkItem);
        }
    };

    const inputClass = "w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition";
    const labelClass = "block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1";

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-muted/30 rounded-xl p-5 border border-border/60">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>Nome {type === 'menu' ? '(Português)' : ''}</label>
                    <input
                        className={inputClass}
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        placeholder={type === 'menu' ? 'Ex: Margherita' : 'Ex: Messina Cristalli di Sale'}
                        required
                    />
                </div>
                {type === 'menu' && (
                    <div>
                        <label className={labelClass}>Nome em inglês (opcional)</label>
                        <input
                            className={inputClass}
                            value={nomeEn}
                            onChange={e => setNomeEn(e.target.value)}
                            placeholder="Ex: Garlic Bread"
                        />
                    </div>
                )}
                {type === 'drink' && (
                    <div>
                        <label className={labelClass}>Categoria</label>
                        <select
                            className={inputClass}
                            value={categoria}
                            onChange={e => setCategoria(e.target.value as DrinkItem['categoria'])}
                        >
                            {DRINK_CATEGORIES.map(c => (
                                <option key={c.value} value={c.value}>{c.label}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            <div>
                <label className={labelClass}>{type === 'drink' ? 'Descrição' : 'Ingredientes'}</label>
                <textarea
                    className={`${inputClass} resize-none`}
                    rows={3}
                    value={ingredientes}
                    onChange={e => setIngredientes(e.target.value)}
                    placeholder={type === 'drink' ? 'Descrição da bebida...' : 'Ingredientes separados por vírgula...'}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>Preço (€)</label>
                    <input
                        className={inputClass}
                        type="number"
                        step="0.5"
                        min="0"
                        value={preco}
                        onChange={e => setPreco(e.target.value)}
                        placeholder="0.00"
                        required
                    />
                </div>
                {type === 'menu' && (
                    <div>
                        <label className={labelClass}>Nota/Sugestão (opcional)</label>
                        <input
                            className={inputClass}
                            value={opcional}
                            onChange={e => setOpcional(e.target.value)}
                            placeholder="Ex: Sugestão: creme de trufa +3"
                        />
                    </div>
                )}
            </div>

            {/* Image Upload */}
            <div>
                <label className={labelClass}>Imagem</label>
                <div className="flex gap-3 items-start">
                    <div className="flex-1">
                        <div
                            className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition"
                            onClick={() => fileRef.current?.click()}
                            onDragOver={e => e.preventDefault()}
                            onDrop={e => {
                                e.preventDefault();
                                const file = e.dataTransfer.files[0];
                                if (file) handleUpload(file);
                            }}
                        >
                            {uploading ? (
                                <p className="text-sm text-muted-foreground animate-pulse">A enviar imagem...</p>
                            ) : (
                                <>
                                    <p className="text-sm text-muted-foreground">Clique ou arraste uma imagem aqui</p>
                                    <p className="text-xs text-muted-foreground/60 mt-1">JPG, PNG, WEBP até 10MB</p>
                                </>
                            )}
                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={e => {
                                    const file = e.target.files?.[0];
                                    if (file) handleUpload(file);
                                }}
                            />
                        </div>
                        {uploadError && <p className="text-xs text-red-500 mt-1">{uploadError}</p>}
                        {image && (
                            <p className="text-xs text-green-600 mt-1 truncate">
                                Imagem: {image}
                            </p>
                        )}
                    </div>
                    {image && (
                        <div className="w-20 h-20 rounded-lg overflow-hidden border border-border flex-shrink-0">
                            <img src={image} alt="preview" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex gap-3 pt-2">
                <button
                    type="submit"
                    className="flex-1 bg-primary text-primary-foreground rounded-lg py-2 text-sm font-semibold hover:bg-primary/90 transition"
                >
                    Guardar
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 bg-muted text-muted-foreground rounded-lg py-2 text-sm font-semibold hover:bg-muted/70 transition"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}
