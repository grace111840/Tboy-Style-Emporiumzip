import { useSEO } from "@/hooks/use-seo";
import { useState, useMemo } from "react";
import { useSearch } from "wouter";
import { CATEGORIES, type Product } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { useListProducts } from "@workspace/api-client-react";

export default function Shop() {
  useSEO("Shop", "Shop the latest arrivals from TBOY'S.");

  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const initialCategory = searchParams.get("category") || "All";

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [maxPrice, setMaxPrice] = useState<number>(2000);

  const { data: products = [], isLoading } = useListProducts();

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products] as Product[];

    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

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
      case "featured":
      default:
        break;
    }

    return result;
  }, [products, activeCategory, sortBy, maxPrice]);

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="font-serif text-4xl md:text-5xl mb-12">Shop</h1>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-border pb-6 mb-12 gap-6">
          <div className="flex overflow-x-auto w-full md:w-auto space-x-6 pb-2 md:pb-0 scrollbar-hide">
            <button
              onClick={() => setActiveCategory("All")}
              className={`whitespace-nowrap text-sm font-medium tracking-wide pb-1 border-b-2 transition-colors ${
                activeCategory === "All"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              ALL
            </button>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap text-sm font-medium tracking-wide pb-1 border-b-2 transition-colors ${
                  activeCategory === category
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6 w-full md:w-auto flex-wrap">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Max ${maxPrice}</span>
              <input
                type="range"
                min={50}
                max={2000}
                step={50}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-32 accent-primary"
              />
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-sm font-medium focus:ring-0 focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="popular">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="py-24 text-center text-muted-foreground">Loading collection…</div>
        ) : filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-x-6 md:gap-y-12">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product as Product} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-lg text-muted-foreground">No products match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
