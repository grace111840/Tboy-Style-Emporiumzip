export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Casual' | 'Luxury' | 'Streetwear' | 'Formal';
  image: string;
  description: string;
  sizes: string[];
  popularity: number;
}

export const CATEGORIES = ['Casual', 'Luxury', 'Streetwear', 'Formal'] as const;
export const DEFAULT_SIZES = ['S', 'M', 'L', 'XL'];
export const SHOE_SIZES = ['40', '41', '42', '43', '44', '45'];

export const products: Product[] = [
  {
    id: 'c1',
    name: 'Essential Supima Cotton T-Shirt',
    price: 85,
    category: 'Casual',
    image: '/images/casual-1.png',
    description: 'Crafted from 100% Supima cotton, this t-shirt offers unparalleled softness and a perfect drape. The quintessential foundation for any modern wardrobe.',
    sizes: DEFAULT_SIZES,
    popularity: 95,
  },
  {
    id: 'c2',
    name: 'Cashmere Blend Knit Sweater',
    price: 245,
    category: 'Casual',
    image: '/images/casual-2.png',
    description: 'A luxurious blend of cashmere and merino wool. Features a relaxed fit and ribbed trims for a refined yet effortless silhouette.',
    sizes: DEFAULT_SIZES,
    popularity: 88,
  },
  {
    id: 'c3',
    name: 'Minimalist Leather Sneakers',
    price: 320,
    category: 'Casual',
    image: '/images/casual-3.png',
    description: 'Handcrafted from full-grain Italian leather. Features a clean profile and a comfortable Margom sole. The epitome of quiet luxury.',
    sizes: SHOE_SIZES,
    popularity: 92,
  },
  {
    id: 'l1',
    name: 'Structured Silk-Wool Blazer',
    price: 890,
    category: 'Luxury',
    image: '/images/luxury-1.png',
    description: 'An avant-garde take on the classic blazer. Tailored from a pristine silk and wool blend, featuring sharp shoulders and a dramatic drape.',
    sizes: DEFAULT_SIZES,
    popularity: 85,
  },
  {
    id: 'l2',
    name: 'Navy Cashmere Overcoat',
    price: 1250,
    category: 'Luxury',
    image: '/images/luxury-2.png',
    description: 'The ultimate outerwear piece. Unlined double-faced cashmere offers warmth without weight. Impeccable tailoring and a sweeping length.',
    sizes: DEFAULT_SIZES,
    popularity: 98,
  },
  {
    id: 'l3',
    name: 'Signature Leather Weekend Bag',
    price: 750,
    category: 'Luxury',
    image: '/images/luxury-3.png',
    description: 'Constructed from pebble-grain calf leather with palladium hardware. Perfectly sized for short getaways with a sophisticated profile.',
    sizes: ['ONE SIZE'],
    popularity: 82,
  },
  {
    id: 's1',
    name: 'Heavyweight Oversized Hoodie',
    price: 165,
    category: 'Streetwear',
    image: '/images/street-1.png',
    description: 'Cut from 500gsm French terry cotton. Features dropped shoulders, a double-lined hood, and a perfectly engineered boxy fit.',
    sizes: DEFAULT_SIZES,
    popularity: 90,
  },
  {
    id: 's2',
    name: 'Technical Cargo Trousers',
    price: 280,
    category: 'Streetwear',
    image: '/images/street-2.png',
    description: 'Japanese technical nylon blend offering water resistance and a sharp drape. Features articulated knees and concealed hardware.',
    sizes: DEFAULT_SIZES,
    popularity: 87,
  },
  {
    id: 'f1',
    name: 'Mayfair Black Tuxedo',
    price: 1100,
    category: 'Formal',
    image: '/images/formal-1.png',
    description: 'A masterpiece of formal tailoring. Super 150s wool with silk grosgrain lapels. Impeccably sharp and unyieldingly elegant.',
    sizes: DEFAULT_SIZES,
    popularity: 94,
  },
  {
    id: 'f2',
    name: 'Midnight Velvet Dinner Jacket',
    price: 950,
    category: 'Formal',
    image: '/images/formal-2.png',
    description: 'Rich, deep blue cotton velvet that catches the light beautifully. Finished with black silk peak lapels and covered buttons.',
    sizes: DEFAULT_SIZES,
    popularity: 91,
  },
  {
    id: 'f3',
    name: 'Crisp Poplin Dress Shirt',
    price: 195,
    category: 'Formal',
    image: '/images/casual-1.png',
    description: 'The foundation of formalwear. Egyptian cotton poplin with a classic spread collar and French cuffs. Flawless construction.',
    sizes: DEFAULT_SIZES,
    popularity: 89,
  },
  {
    id: 's3',
    name: 'Utilitarian Vest',
    price: 340,
    category: 'Streetwear',
    image: '/images/street-1.png',
    description: 'A modern layering piece. Lightweight technical fabric with multiple dimensional pockets and a two-way riri zipper.',
    sizes: DEFAULT_SIZES,
    popularity: 84,
  },
];
