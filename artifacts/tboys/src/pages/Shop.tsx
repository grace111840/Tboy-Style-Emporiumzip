import { useSEO } from "@/hooks/use-seo";
import { useState, useMemo } from "react";
import { useSearch } from "wouter";
import { products, CATEGORIES, Product } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";

export default function Shop() {
  useSEO("Shop", "Shop the latest arrivals from TBOY'S.");
  
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const initialCategory = searchParams.get("category") || "All";
  
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<string>("featured");

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];
    
    if (activeCategory !== "All") {
      result = result.filter(p => p.category === activeCategory);
    }
    
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
        // Use default order
        break;
    }
    
    return result;
  }, [activeCategory, sortBy]);

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="font-serif text-4xl md:text-5xl mb-12">Shop</h1>
        
        {/* Filters and Sorting */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-border pb-6 mb-12 gap-6">
          <div className="flex overflow-x-auto w-full md:w-auto space-x-6 pb-2 md:pb-0 scrollbar-hide">
            <button
              onClick={() => setActiveCategory("All")}
              className={`whitespace-nowrap text-sm font-medium tracking-wide pb-1 border-b-2 transition-colors ${
                activeCategory === "All" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              ALL
            </button>
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap text-sm font-medium tracking-wide pb-1 border-b-2 transition-colors ${
                  activeCategory === category ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-4 w-full md:w-auto">
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

        {/* Product Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-x-6 md:gap-y-12">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-lg text-muted-foreground">No products found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
