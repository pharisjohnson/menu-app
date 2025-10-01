import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '@shared/types';
import { toast } from 'sonner';
interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);
        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
          toast.success(`${product.name} quantity updated in cart.`);
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] });
          toast.success(`${product.name} added to cart.`);
        }
      },
      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
        toast.info('Item removed from cart.');
      },
      updateQuantity: (productId, quantity) => {
        if (quantity < 1) {
          get().removeItem(productId);
        } else {
          set({
            items: get().items.map((item) =>
              item.id === productId ? { ...item, quantity } : item
            ),
          });
          toast.success('Cart updated.');
        }
      },
      clearCart: () => {
        set({ items: [] });
        toast.info('Cart cleared.');
      },
    }),
    {
      name: 'savorly-cart-storage',
    }
  )
);