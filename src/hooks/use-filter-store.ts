import { create } from 'zustand';
import type { DietaryTag } from '@shared/types';
interface FilterState {
  category: string;
  priceRange: [number, number];
  tags: DietaryTag[];
  setCategory: (category: string) => void;
  setPriceRange: (range: [number, number]) => void;
  toggleTag: (tag: DietaryTag) => void;
  clearFilters: () => void;
}
const INITIAL_PRICE_RANGE: [number, number] = [0, 50];
export const useFilterStore = create<FilterState>((set) => ({
  category: 'all',
  priceRange: INITIAL_PRICE_RANGE,
  tags: [],
  setCategory: (category) => set({ category }),
  setPriceRange: (range) => set({ priceRange: range }),
  toggleTag: (tag) =>
    set((state) => ({
      tags: state.tags.includes(tag)
        ? state.tags.filter((t) => t !== tag)
        : [...state.tags, tag],
    })),
  clearFilters: () =>
    set({
      category: 'all',
      priceRange: INITIAL_PRICE_RANGE,
      tags: [],
    }),
}));