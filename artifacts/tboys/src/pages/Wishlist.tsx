import { Link } from "wouter";
import { Heart, ArrowRight } from "lucide-react";
import { useSEO } from "@/hooks/use-seo";
import { useWishlist } from "@/hooks/use-wishlist";
import { useListProducts } from "@workspace/api-client-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/products";

export default function Wishlist() {
  useSEO("Wishlist — TBOY'S Clothing", "Your saved pieces. Snag them before they're gone.");

  const { ids, clear } = useWishlist();
  const { data: products = [] } = useListProducts();

  const wishlistProducts = products.filter((p) => ids.includes(p.id)) as Product[];

  return (
    <div className="bg-background min-h-screen pt-12 pb-24">
      <section className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs tracking-[0.5em] text-gold uppercase mb-4">Saved For You</p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">Your Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlistProducts.length === 0
              ? "Heart any piece you love. We'll keep them safe right here."
              : `${wishlistProducts.length} piece${wishlistProducts.length === 1 ? "" : "s"} waiting for you.`}
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-8 bg-secondary border border-border flex items-center justify-center">
              <Heart className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-lg mb-8 max-w-md mx-auto text-muted-foreground">
              Your wishlist is empty. Find something you love and tap the heart to save it for later.
            </p>
            <Button asChild className="rounded-none bg-gold text-black hover:bg-gold-soft px-10 py-6 text-xs tracking-widest font-bold">
              <Link href="/shop">
                START SHOPPING <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14">
              {wishlistProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-16 text-center">
              <button
                onClick={clear}
                className="text-sm text-muted-foreground hover:text-destructive underline underline-offset-4 tracking-wide"
              >
                Clear wishlist
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
