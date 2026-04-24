import { useSEO } from "@/hooks/use-seo";
import { Link } from "wouter";
import { CATEGORIES, type Category, type Product } from "@/data/products";
import { useListProducts } from "@workspace/api-client-react";

const collectionDescriptions: Record<Category, string> = {
  Casual: "Elevated essentials for everyday refinement.",
  Luxury: "Avant-garde silhouettes and pristine fabrics.",
  Streetwear: "Modern utility meets high-end construction.",
  Formal: "Impeccable tailoring for your most decisive moments.",
};

const fallbackImages: Record<Category, string> = {
  Casual: "/images/casual-2.png",
  Luxury: "/images/luxury-1.png",
  Streetwear: "/images/street-2.png",
  Formal: "/images/formal-1.png",
};

export default function Collections() {
  useSEO("Collections", "Explore TBOY'S curated collections spanning Casual, Luxury, Streetwear, and Formal attire.");

  const { data: products = [] } = useListProducts();
  const list = products as Product[];

  const imageFor = (cat: Category): string => {
    const first = list.find((p) => p.category === cat);
    return first?.image ?? fallbackImages[cat];
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6 mb-16 md:mb-24 text-center mt-12 animate-in fade-in slide-in-from-bottom-4">
        <h1 className="font-serif text-4xl md:text-6xl mb-6">Curated Collections</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-light">
          Four distinct visions of modern elegance. United by an uncompromising commitment to craft and poise.
        </p>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {CATEGORIES.map((category) => (
            <Link
              key={category}
              href={`/shop?category=${category}`}
              className="group block relative overflow-hidden bg-secondary aspect-[4/5] md:aspect-[3/4]"
            >
              <img
                src={imageFor(category)}
                alt={`${category} Collection`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                <h2 className="font-serif text-3xl md:text-5xl mb-4 tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{category}</h2>
                <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-sm md:text-base font-light tracking-wide max-w-xs delay-100">
                  {collectionDescriptions[category]}
                </p>
                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  <span className="text-xs tracking-widest uppercase border-b border-white pb-1">Explore</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
