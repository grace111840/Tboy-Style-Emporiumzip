import { useSEO } from "@/hooks/use-seo";
import { useState, useMemo } from "react";
import { useSearch } from "wouter";
import { CATEGORIES, type Product } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { useListProducts } from "@workspace/api-client-react";
import { formatNaira } from "@/lib/format";

const MAX_PRICE = 200000;

export default function Shop() {
  useSEO("Shop — TBOY'S Clothing", "Shop the latest TBOY'S drops. Free Lagos delivery on orders over ₦50,000.");

  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const initialCategory = searchParams.get("category") || "All";

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [maxPrice, setMaxPrice] = useState<number>(MAX_PRICE);
  const [onlyNew, setOnlyNew] = useState(false);
  const [onlySale, setOnlySale] = useState(false);

  const { data: products = [], isLoading } = useListProducts();

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products] as Product[];

    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (onlyNew) result = result.filter((p) => p.isNew);
    if (onlySale) result = result.filter((p) => p.oldPrice != null && p.oldPrice > p.price);

    result = result.filter((p) => p.price <= maxPrice);

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        result.sort((a, b) => b.popularity - a.popularity);
        break;
      case "newest":
        result.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      default:
        break;
    }

    return result;
  }, [products, activeCategory, sortBy, maxPrice, onlyNew, onlySale]);

  return (
    <div className="min-h-screen pt-12 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs tracking-[0.5em] text-gold uppercase mb-3">The Collection</p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">Shop All</h1>
          <p className="text-muted-foreground">
            Premium pieces, hand-crafted in Lagos. Use code <span className="text-gold font-bold">TBOYS10</span> for 10% off your first order.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-y border-border py-5 mb-12 gap-6">
          <div className="flex overflow-x-auto w-full md:w-auto space-x-6 pb-1 md:pb-0 scrollbar-hide">
            <button
              onClick={() => setActiveCategory("All")}
              className={`whitespace-nowrap text-xs font-bold tracking-[0.2em] uppercase pb-1 border-b-2 transition-colors ${
                activeCategory === "All"
                  ? "border-gold text-gold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              ALL
            </button>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap text-xs font-bold tracking-[0.2em] uppercase pb-1 border-b-2 transition-colors ${
                  activeCategory === category
                    ? "border-gold text-gold"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto flex-wrap">
            <button
              onClick={() => setOnlyNew(!onlyNew)}
              className={`text-xs font-semibold tracking-wider uppercase px-3 py-1.5 border transition-colors ${onlyNew ? "border-gold bg-gold text-black" : "border-border hover:border-gold"}`}
            >
              New
            </button>
            <button
              onClick={() => setOnlySale(!onlySale)}
              className={`text-xs font-semibold tracking-wider uppercase px-3 py-1.5 border transition-colors ${onlySale ? "border-gold bg-gold text-black" : "border-border hover:border-gold"}`}
            >
              Sale
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border border-border px-3 py-1.5 text-xs font-medium focus:border-gold focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-10">
          <span className="text-xs text-muted-foreground whitespace-nowrap tracking-wider uppercase">Max {formatNaira(maxPrice)}</span>
          <input
            type="range"
            min={10000}
            max={MAX_PRICE}
            step={5000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="flex-1 max-w-xs accent-[hsl(42_70%_55%)]"
          />
        </div>

        {isLoading ? (
          <div className="py-24 text-center text-muted-foreground">Loading collection…</div>
        ) : filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14">
            {filteredAndSortedProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 4} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-lg text-muted-foreground">No pieces match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
