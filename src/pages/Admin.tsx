import { useState, useEffect } from 'react';
import { useMenuData, type MenuData } from '../hooks/useMenuData';
import AdminItemForm from '../components/AdminItemForm';
import type { MenuItem, DrinkItem } from '../data/menuData';
import { Lock, Save, Plus, Trash2, Edit3, ArrowLeft, Wine, Utensils, GlassWater, AlertTriangle, GripVertical } from 'lucide-react';

const ADMIN_PASSWORD_KEY = 'vulcanici_admin_password';

export default function Admin() {
    const { data, loading, serverAvailable, refetch } = useMenuData();
    const [password, setPassword] = useState(() => sessionStorage.getItem(ADMIN_PASSWORD_KEY) ?? '');
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!sessionStorage.getItem(ADMIN_PASSWORD_KEY));
    const [authError, setAuthError] = useState('');
    const [saving, setSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');

    const [localData, setLocalData] = useState<MenuData>(data);
    const [activeTab, setActiveTab] = useState<'menu' | 'drinks' | 'drinks-list'>('menu');
    const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);
    const [editingItem, setEditingItem] = useState<{ type: 'menu' | 'drink'; categoryIdx?: number; itemIdx?: number } | null>(null);
    const [draggingItemIdx, setDraggingItemIdx] = useState<number | null>(null);
    const [dragOverItemIdx, setDragOverItemIdx] = useState<number | null>(null);
    const [dragContext, setDragContext] = useState<string | null>(null);

    useEffect(() => {
        setLocalData(data);
    }, [data]);

    const handleLogin = async () => {
        if (!password.trim()) { setAuthError('Digite a senha'); return; }
        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });
            if (res.status === 401) {
                setAuthError('Senha incorreta');
                return;
            }
            if (!res.ok) {
                setAuthError('Erro ao validar senha');
                return;
            }
            sessionStorage.setItem(ADMIN_PASSWORD_KEY, password);
            setIsAuthenticated(true);
            setAuthError('');
        } catch {
            setAuthError('Erro de conexao. Tente novamente.');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem(ADMIN_PASSWORD_KEY);
        setIsAuthenticated(false);
        setPassword('');
    };

    const handleSave = async () => {
        setSaving(true);
        setSaveMessage('');
        try {
            const res = await fetch('/api/menu', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
                body: JSON.stringify(localData),
            });
            if (res.ok) {
                setSaveMessage('Guardado com sucesso!');
                refetch();
            } else if (res.status === 401) {
                setSaveMessage('Senha incorreta. Faca login novamente.');
            } else {
                setSaveMessage('Erro ao guardar.');
            }
        } catch {
            setSaveMessage('Erro de conexao. O servidor esta a correr? Use npm run dev:full');
        } finally {
            setSaving(false);
            setTimeout(() => setSaveMessage(''), 5000);
        }
    };

    const addMenuItem = (categoryIdx: number, item: MenuItem) => {
        const newCats = [...localData.menuCategories];
        newCats[categoryIdx] = { ...newCats[categoryIdx], items: [...newCats[categoryIdx].items, item] };
        setLocalData({ ...localData, menuCategories: newCats });
        setEditingItem(null);
    };

    const reorderMenuItem = (categoryIdx: number, fromIdx: number, toIdx: number) => {
        if (fromIdx === toIdx) return;
        const newCats = [...localData.menuCategories];
        const items = [...newCats[categoryIdx].items];
        const [moved] = items.splice(fromIdx, 1);
        items.splice(toIdx, 0, moved);
        newCats[categoryIdx] = { ...newCats[categoryIdx], items };
        setLocalData({ ...localData, menuCategories: newCats });
    };

    const updateMenuItem = (categoryIdx: number, itemIdx: number, item: MenuItem) => {
        const newCats = [...localData.menuCategories];
        const newItems = [...newCats[categoryIdx].items];
        newItems[itemIdx] = item;
        newCats[categoryIdx] = { ...newCats[categoryIdx], items: newItems };
        setLocalData({ ...localData, menuCategories: newCats });
        setEditingItem(null);
    };

    const deleteMenuItem = (categoryIdx: number, itemIdx: number) => {
        if (!confirm('Tem a certeza que quer eliminar este item?')) return;
        const newCats = [...localData.menuCategories];
        const newItems = newCats[categoryIdx].items.filter((_, i) => i !== itemIdx);
        newCats[categoryIdx] = { ...newCats[categoryIdx], items: newItems };
        setLocalData({ ...localData, menuCategories: newCats });
    };

    const addDrinkItem = (item: DrinkItem) => {
        setLocalData({ ...localData, bebidasDestaque: [...localData.bebidasDestaque, item] });
        setEditingItem(null);
    };

    const reorderDrinkItem = (fromIdx: number, toIdx: number) => {
        if (fromIdx === toIdx) return;
        const items = [...localData.bebidasDestaque];
        const [moved] = items.splice(fromIdx, 1);
        items.splice(toIdx, 0, moved);
        setLocalData({ ...localData, bebidasDestaque: items });
    };

    const updateDrinkItem = (itemIdx: number, item: DrinkItem) => {
        const newItems = [...localData.bebidasDestaque];
        newItems[itemIdx] = item;
        setLocalData({ ...localData, bebidasDestaque: newItems });
        setEditingItem(null);
    };

    const deleteDrinkItem = (itemIdx: number) => {
        if (!confirm('Tem a certeza que quer eliminar esta bebida?')) return;
        const newItems = localData.bebidasDestaque.filter((_, i) => i !== itemIdx);
        setLocalData({ ...localData, bebidasDestaque: newItems });
    };

    const updateDrinkListItem = (listName: keyof MenuData, itemIdx: number, updated: MenuItem) => {
        const list = localData[listName] as MenuItem[];
        const newList = [...list];
        newList[itemIdx] = updated;
        setLocalData({ ...localData, [listName]: newList });
    };

    const deleteDrinkListItem = (listName: keyof MenuData, itemIdx: number) => {
        if (!confirm('Tem a certeza?')) return;
        const list = localData[listName] as MenuItem[];
        setLocalData({ ...localData, [listName]: list.filter((_, i) => i !== itemIdx) });
    };

    const addDrinkListItem = (listName: keyof MenuData) => {
        const list = localData[listName] as MenuItem[];
        const newItem: MenuItem = { nome: 'Novo item', preco: 0 };
        setLocalData({ ...localData, [listName]: [...list, newItem] });
    };

    const reorderDrinkListItem = (listName: keyof MenuData, fromIdx: number, toIdx: number) => {
        if (fromIdx === toIdx) return;
        const list = [...(localData[listName] as MenuItem[])];
        const [moved] = list.splice(fromIdx, 1);
        list.splice(toIdx, 0, moved);
        setLocalData({ ...localData, [listName]: list });
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <div className="w-full max-w-sm bg-card border border-border rounded-2xl p-8 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Lock className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">Area de Admin</h1>
                            <p className="text-xs text-muted-foreground">Vulcanici Pizzeria</p>
                        </div>
                    </div>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleLogin()}
                        placeholder="Senha de admin"
                        className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    {authError && <p className="text-xs text-red-500 mb-3">{authError}</p>}
                    <button
                        onClick={handleLogin}
                        className="w-full bg-primary text-primary-foreground rounded-lg py-3 text-sm font-semibold hover:bg-primary/90 transition"
                    >
                        Entrar
                    </button>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <p className="text-muted-foreground">A carregar menu...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Server offline warning */}
            {!serverAvailable && (
                <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center gap-2 text-amber-800 text-sm">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>
                        <strong>Servidor offline.</strong> As alteracoes nao serao guardadas. Inicie o servidor com <code className="bg-amber-100 px-1 rounded">npm run dev:full</code> em vez de <code className="bg-amber-100 px-1 rounded">npm run dev</code>.
                    </span>
                </div>
            )}

            {/* Header */}
            <header className="sticky top-0 z-40 bg-card border-b border-border">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <a href="/menu" className="p-2 hover:bg-muted rounded-lg transition">
                            <ArrowLeft className="w-5 h-5" />
                        </a>
                        <h1 className="font-bold hidden sm:block">Admin</h1>
                        {serverAvailable && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Servidor activo</span>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        {saveMessage && (
                            <span className={`text-xs ${saveMessage.includes('sucesso') ? 'text-green-600' : 'text-red-500'}`}>
                                {saveMessage}
                            </span>
                        )}
                        <button
                            onClick={handleSave}
                            disabled={saving || !serverAvailable}
                            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 transition"
                            title={!serverAvailable ? 'Servidor offline - use npm run dev:full' : ''}
                        >
                            <Save className="w-4 h-4" />
                            <span className="hidden sm:inline">{saving ? 'A guardar...' : 'Guardar'}</span>
                        </button>
                        <button onClick={handleLogout} className="p-2 hover:bg-muted rounded-lg transition" title="Sair">
                            <Lock className="w-4 h-4 text-muted-foreground" />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="max-w-6xl mx-auto px-4 pb-2">
                    <div className="flex gap-2 overflow-x-auto no-scrollbar">
                        <button
                            onClick={() => setActiveTab('menu')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${activeTab === 'menu' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
                        >
                            <Utensils className="w-4 h-4" />
                            Menu (Pizzas & Entradas)
                        </button>
                        <button
                            onClick={() => setActiveTab('drinks')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${activeTab === 'drinks' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
                        >
                            <Wine className="w-4 h-4" />
                            Bebidas
                        </button>
                        <button
                            onClick={() => setActiveTab('drinks-list')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${activeTab === 'drinks-list' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
                        >
                            <GlassWater className="w-4 h-4" />
                            Lista de Bebidas
                        </button>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-6xl mx-auto px-4 py-6">
                {activeTab === 'menu' && (
                    <div className="space-y-6">
                        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                            {localData.menuCategories.map((cat, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => { setActiveCategoryIdx(idx); setEditingItem(null); }}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${activeCategoryIdx === idx ? 'bg-secondary text-secondary-foreground' : 'hover:bg-muted'}`}
                                >
                                    {cat.title}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">{localData.menuCategories[activeCategoryIdx].title}</h2>
                            <button
                                onClick={() => setEditingItem({ type: 'menu', categoryIdx: activeCategoryIdx })}
                                className="flex items-center gap-2 text-sm text-primary hover:underline"
                            >
                                <Plus className="w-4 h-4" />
                                Adicionar item
                            </button>
                        </div>

                        {editingItem?.type === 'menu' && editingItem.categoryIdx === activeCategoryIdx && editingItem.itemIdx === undefined && (
                            <AdminItemForm
                                type="menu"
                                password={password}
                                onSave={item => addMenuItem(activeCategoryIdx, item as MenuItem)}
                                onCancel={() => setEditingItem(null)}
                            />
                        )}

                        <div className="space-y-3">
                            {localData.menuCategories[activeCategoryIdx].items.map((item, idx) => {
                                const contextKey = `menu-${activeCategoryIdx}`;
                                return (
                                    <div
                                        key={idx}
                                        className={`bg-card border border-border rounded-xl p-4 flex ${dragContext === contextKey && dragOverItemIdx === idx ? 'ring-2 ring-primary/40' : ''}`}
                                        draggable
                                        onDragStart={() => {
                                            setDraggingItemIdx(idx);
                                            setDragContext(contextKey);
                                        }}
                                        onDragOver={(e) => {
                                            e.preventDefault();
                                            if (dragContext !== contextKey) return;
                                            if (draggingItemIdx === null || draggingItemIdx === idx) return;
                                            setDragOverItemIdx(idx);
                                        }}
                                        onDrop={() => {
                                            if (dragContext !== contextKey) return;
                                            if (draggingItemIdx === null || draggingItemIdx === idx) return;
                                            reorderMenuItem(activeCategoryIdx, draggingItemIdx, idx);
                                            setDraggingItemIdx(null);
                                            setDragOverItemIdx(null);
                                            setDragContext(null);
                                        }}
                                        onDragEnd={() => {
                                            setDraggingItemIdx(null);
                                            setDragOverItemIdx(null);
                                            setDragContext(null);
                                        }}
                                    >
                                        {editingItem?.type === 'menu' && editingItem.categoryIdx === activeCategoryIdx && editingItem.itemIdx === idx ? (
                                            <AdminItemForm
                                                item={item}
                                                type="menu"
                                                password={password}
                                                onSave={updated => updateMenuItem(activeCategoryIdx, idx, updated as MenuItem)}
                                                onCancel={() => setEditingItem(null)}
                                            />
                                        ) : (
                                            <div className="flex items-start justify-between gap-4 w-full">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-3">
                                                        <h3 className="font-semibold truncate">{item.nome}</h3>
                                                        <span className="text-primary font-bold whitespace-nowrap">€{item.preco.toFixed(2)}</span>
                                                    </div>
                                                    {item.ingredientes && (
                                                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.ingredientes}</p>
                                                    )}
                                                    {item.opcional && (
                                                        <p className="text-xs text-muted-foreground/70 mt-1">{item.opcional}</p>
                                                    )}
                                                    {item.image && (
                                                        <p className="text-xs text-green-600 mt-1 truncate">{item.image}</p>
                                                    )}
                                                </div>
                                                <div className="flex gap-1 flex-shrink-0">
                                                    <div className="p-2 cursor-move text-muted-foreground flex items-center justify-center">
                                                        <GripVertical className="w-4 h-4" />
                                                    </div>
                                                    <button
                                                        onClick={() => setEditingItem({ type: 'menu', categoryIdx: activeCategoryIdx, itemIdx: idx })}
                                                        className="p-2 hover:bg-muted rounded-lg transition"
                                                    >
                                                        <Edit3 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteMenuItem(activeCategoryIdx, idx)}
                                                        className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {activeTab === 'drinks' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Bebidas em Destaque</h2>
                            <button
                                onClick={() => setEditingItem({ type: 'drink' })}
                                className="flex items-center gap-2 text-sm text-primary hover:underline"
                            >
                                <Plus className="w-4 h-4" />
                                Adicionar bebida
                            </button>
                        </div>

                        {editingItem?.type === 'drink' && editingItem.itemIdx === undefined && (
                            <AdminItemForm
                                type="drink"
                                password={password}
                                onSave={item => addDrinkItem(item as DrinkItem)}
                                onCancel={() => setEditingItem(null)}
                            />
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {localData.bebidasDestaque.map((item, idx) => {
                                const contextKey = 'drinks-featured';
                                return (
                                    <div
                                        key={idx}
                                        className={`bg-card border border-border rounded-xl p-4 flex ${dragContext === contextKey && dragOverItemIdx === idx ? 'ring-2 ring-primary/40' : ''}`}
                                        draggable
                                        onDragStart={() => {
                                            setDraggingItemIdx(idx);
                                            setDragContext(contextKey);
                                        }}
                                        onDragOver={(e) => {
                                            e.preventDefault();
                                            if (dragContext !== contextKey) return;
                                            if (draggingItemIdx === null || draggingItemIdx === idx) return;
                                            setDragOverItemIdx(idx);
                                        }}
                                        onDrop={() => {
                                            if (dragContext !== contextKey) return;
                                            if (draggingItemIdx === null || draggingItemIdx === idx) return;
                                            reorderDrinkItem(draggingItemIdx, idx);
                                            setDraggingItemIdx(null);
                                            setDragOverItemIdx(null);
                                            setDragContext(null);
                                        }}
                                        onDragEnd={() => {
                                            setDraggingItemIdx(null);
                                            setDragOverItemIdx(null);
                                            setDragContext(null);
                                        }}
                                    >
                                        {editingItem?.type === 'drink' && editingItem.itemIdx === idx ? (
                                            <AdminItemForm
                                                item={item}
                                                type="drink"
                                                password={password}
                                                onSave={updated => updateDrinkItem(idx, updated as DrinkItem)}
                                                onCancel={() => setEditingItem(null)}
                                            />
                                        ) : (
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs uppercase tracking-wider px-2 py-0.5 bg-muted rounded-full">{item.categoria}</span>
                                                        <span className="text-primary font-bold">€{item.preco.toFixed(2)}</span>
                                                    </div>
                                                    <h3 className="font-semibold mt-1">{item.nome}</h3>
                                                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.descricao}</p>
                                                    {item.image && (
                                                        <p className="text-xs text-green-600 mt-1 truncate">{item.image}</p>
                                                    )}
                                                </div>
                                                <div className="flex gap-1 flex-shrink-0">
                                                    <div className="p-2 cursor-move text-muted-foreground flex items-center justify-center">
                                                        <GripVertical className="w-4 h-4" />
                                                    </div>
                                                    <button
                                                        onClick={() => setEditingItem({ type: 'drink', itemIdx: idx })}
                                                        className="p-2 hover:bg-muted rounded-lg transition"
                                                    >
                                                        <Edit3 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteDrinkItem(idx)}
                                                        className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {activeTab === 'drinks-list' && (
                    <div className="space-y-8">
                        {[
                            { key: 'vinhosTinto', title: 'Vinhos Tinto' },
                            { key: 'vinhosBranco', title: 'Vinhos Branco' },
                            { key: 'vinhosRose', title: 'Vinhos Rose' },
                            { key: 'espumante', title: 'Espumante' },
                            { key: 'sangria', title: 'Sangria' },
                            { key: 'cervejas', title: 'Cervejas' },
                            { key: 'aguas', title: 'Aguas' },
                            { key: 'refrigerantes', title: 'Refrigerantes' },
                            { key: 'cafeDigestivos', title: 'Cafe & Digestivos' },
                            { key: 'aoCopo', title: 'Ao Copo' },
                        ].map(({ key, title }) => {
                            const list = localData[key as keyof MenuData] as MenuItem[];
                            return (
                                <div key={key}>
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-semibold">{title}</h3>
                                        <button
                                            onClick={() => addDrinkListItem(key as keyof MenuData)}
                                            className="text-xs text-primary hover:underline flex items-center gap-1"
                                        >
                                            <Plus className="w-3 h-3" />
                                            Adicionar
                                        </button>
                                    </div>
                                    <div className="space-y-2">
                                        {list.map((item, idx) => {
                                            const listName = key as keyof MenuData;
                                            const contextKey = `drinks-list-${listName}`;
                                            return (
                                                <div
                                                    key={idx}
                                                    className={`flex items-center gap-3 bg-card border border-border rounded-lg p-3 ${dragContext === contextKey && dragOverItemIdx === idx ? 'ring-2 ring-primary/40' : ''}`}
                                                    draggable
                                                    onDragStart={() => {
                                                        setDraggingItemIdx(idx);
                                                        setDragContext(contextKey);
                                                    }}
                                                    onDragOver={(e) => {
                                                        e.preventDefault();
                                                        if (dragContext !== contextKey) return;
                                                        if (draggingItemIdx === null || draggingItemIdx === idx) return;
                                                        setDragOverItemIdx(idx);
                                                    }}
                                                    onDrop={() => {
                                                        if (dragContext !== contextKey) return;
                                                        if (draggingItemIdx === null || draggingItemIdx === idx) return;
                                                        reorderDrinkListItem(listName, draggingItemIdx, idx);
                                                        setDraggingItemIdx(null);
                                                        setDragOverItemIdx(null);
                                                        setDragContext(null);
                                                    }}
                                                    onDragEnd={() => {
                                                        setDraggingItemIdx(null);
                                                        setDragOverItemIdx(null);
                                                        setDragContext(null);
                                                    }}
                                                >
                                                    <div className="p-1.5 cursor-move text-muted-foreground flex items-center justify-center">
                                                        <GripVertical className="w-4 h-4" />
                                                    </div>
                                                    <input
                                                        className="flex-1 bg-transparent text-sm focus:outline-none"
                                                        value={item.nome}
                                                        onChange={e => updateDrinkListItem(listName, idx, { ...item, nome: e.target.value })}
                                                    />
                                                    <span className="text-muted-foreground text-sm">€</span>
                                                    <input
                                                        type="number"
                                                        step="0.5"
                                                        className="w-16 bg-muted rounded px-2 py-1 text-sm"
                                                        value={item.preco}
                                                        onChange={e => updateDrinkListItem(listName, idx, { ...item, preco: parseFloat(e.target.value) || 0 })}
                                                    />
                                                    <button
                                                        onClick={() => deleteDrinkListItem(listName, idx)}
                                                        className="p-1.5 hover:bg-red-50 text-red-500 rounded transition"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}
