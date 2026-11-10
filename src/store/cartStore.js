import { create } from 'zustand';
function readItems() { try { const value = JSON.parse(localStorage.getItem('assignment7-cart') || '[]'); return Array.isArray(value) ? value.filter((item) => item && Number.isFinite(item.id) && Number.isFinite(item.quantity) && item.quantity > 0) : []; } catch { return []; } }
export const useCartStore = create((set) => ({
  items: readItems(),
  addItem: (product) => set((state) => state.items.some((item) => item.id === product.id) ? { items: state.items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) } : { items: [...state.items, { id: product.id, title: product.title, price: product.price, quantity: 1 }] }),
  removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  setQuantity: (id, quantity) => set((state) => ({ items: quantity < 1 ? state.items.filter((item) => item.id !== id) : state.items.map((item) => item.id === id ? { ...item, quantity } : item) })),
  clear: () => set({ items: [] }),
}));
useCartStore.subscribe((state, previous) => { if (state.items !== previous.items) { try { localStorage.setItem('assignment7-cart', JSON.stringify(state.items)); } catch { /* Storage may be unavailable. */ } } });
