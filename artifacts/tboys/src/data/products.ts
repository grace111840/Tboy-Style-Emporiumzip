export type Category = 'Casual' | 'Luxury' | 'Streetwear' | 'Formal';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  description: string;
  sizes: string[];
  popularity: number;
}

export const CATEGORIES: Category[] = ['Casual', 'Luxury', 'Streetwear', 'Formal'];
export const DEFAULT_SIZES = ['S', 'M', 'L', 'XL'];
export const SHOE_SIZES = ['40', '41', '42', '43', '44', '45'];
