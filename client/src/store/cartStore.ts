import { create } from 'zustand';
import type { Product } from '../types';
import { useAuthStore } from './authStore';

interface CartState {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) => {
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      set((state) => ({ items: [...state.items, item] }));
    } else {
      alert('Please log in to add items to the cart.');
      console.warn('Unauthorized: Cannot add item to the cart.');
    }
  },
  removeItem: (itemId) => {
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      set((state) => ({ items: state.items.filter((item) => item.id !== itemId) }));
    } else {
      alert('Please log in to remove items from the cart.');
      console.warn('Unauthorized: Cannot remove item from the cart.');
    }
  },
  clearCart: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      set({ items: [] });
    } else {
      alert('Please log in to clear the cart.');
      console.warn('Unauthorized: Cannot clear the cart.');
    }
  },
}));
