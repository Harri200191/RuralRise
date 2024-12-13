import { create } from 'zustand';
import type { Product } from '../types';

interface CartState {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ 
    items: [...state.items, item] 
  })),
  removeItem: (itemId) => set((state) => ({ 
    items: state.items.filter(item => item.id !== itemId) 
  })),
  clearCart: () => set({ items: [] }),
}));