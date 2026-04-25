import { useSEO } from "@/hooks/use-seo";
import { Link } from "wouter";
import { CATEGORIES, type Category, type Product } from "@/data/products";
import { useListProducts } from "@workspace/api-client-react";

const collectionDescriptions: Record<Category, string> = {
  Casual: "Elevated everyday essentials, crafted for the cool.",
  Luxury: "Avant-garde silhouettes. Pristine fabrics. Statement pieces.",
  Streetwear: "Modern utility meets premium construction.",
  Formal: "Impeccable Lagos tailoring for your moments that matter.",
};

const fallbackImages: Record<Category, string> = {
  Casual: "/images/casual-2.png",
  Luxury: "/images/luxury-1.png",
  Streetwear: "/images/street-2.png",
  Formal: "/images/formal-1.png",
};

export default function Collections() {
  useSEO("Collections — TBOY'S Clothing", "Explore TBOY'S collections — Casual, Luxury, Streetwear, Formal. Lagos-crafted, world-ready.");

  const { data: products = [] } = useListProducts();
  const list = products as Product[];

  const imageFor = (cat: Category): string => {
    const first = list.find((p) => p.category === cat);
    return first?.image ?? fallbackImages[cat];
  };

  const countFor = (cat: Category): number => list.filter((p) => p.category === cat).length;

  return (
    <div className="min-h-screen pt-12 pb-20">
      <div className="container mx-auto px-4 md:px-6 mb-16 md:mb-20 text-center max-w-3xl animate-in fade-in slide-in-from-bottom-4">
        <p className="text-xs tracking-[0.5em] text-gold uppercase mb-4">Curated For You</p>
        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-5">Our Collections</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Four distinct visions of modern Nigerian fashion. United by craft. Designed to be remembered.
        </p>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {CATEGORIES.map((category) => (
            <Link
              key={category}
              href={`/shop?category=${category}`}
              className="group block relative overflow-hidden bg-secondary aspect-[4/5] md:aspect-[3/4]"
            >
              <img
                src={imageFor(category)}
                alt={`${category} Collection`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20 group-hover:from-black/80 transition-colors duration-500" />

              <div className="absolute inset-0 flex flex-col items-center justify-end text-white p-8 md:p-10 text-center">
                <p className="text-xs tracking-[0.4em] text-gold uppercase mb-3">{countFor(category)} Pieces</p>
                <h2 className="font-serif text-4xl md:text-6xl font-bold mb-4 leading-tight">{category}</h2>
                <p className="text-sm md:text-base font-light tracking-wide max-w-xs text-white/85 mb-6">
                  {collectionDescriptions[category]}
                </p>
                <div>
                  <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase pb-1 border-b border-gold text-gold group-hover:px-3 group-hover:bg-gold group-hover:text-black transition-all duration-300">
                    Shop {category}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
