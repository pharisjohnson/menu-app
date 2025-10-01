export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export type DietaryTag = 'Vegan' | 'Vegetarian' | 'Gluten-Free' | 'Spicy';
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string; // slug of the category
  tags: DietaryTag[];
}
export interface Category {
  id: string;
  name: string;
  slug: string;
}
export interface CartItem extends Product {
  quantity: number;
}
export interface User {
  id: string; // email
  name: string;
}
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  createdAt: string;
}