import { useSEO } from "@/hooks/use-seo";
import { useParams, Link } from "wouter";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import NotFound from "@/pages/not-found";
import { useGetProduct, getGetProductQueryKey } from "@workspace/api-client-react";
import type { Product } from "@/data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const productId = id ?? "";
  const { data: product, isLoading, isError } = useGetProduct(productId, {
    query: { enabled: !!productId, queryKey: getGetProductQueryKey(productId) },
  });
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");

  useSEO(product?.name ?? "Product", product?.description ?? "Premium piece from TBOY'S Atelier.");

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-24 container mx-auto px-4 text-muted-foreground">
        Loading piece…
      </div>
    );
  }

  if (isError || !product) return <NotFound />;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    addItem(product as Product, selectedSize, 1);
  };

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 text-sm text-muted-foreground mt-4">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <span className="mx-2">/</span>
          <Link href={`/shop?category=${product.category}`} className="hover:text-foreground transition-colors">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-secondary w-full">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[4/5] bg-secondary w-full">
                <img src={product.image} alt={`${product.name} detail`} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <div className="aspect-[4/5] bg-secondary w-full">
                <img src={product.image} alt={`${product.name} back`} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>

          <div className="flex flex-col pt-4 md:pt-10">
            <div className="mb-8">
              <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase mb-3">{product.category}</p>
              <h1 className="font-serif text-3xl md:text-4xl mb-4 leading-tight">{product.name}</h1>
              <p className="text-2xl">${product.price}</p>
            </div>

            <div className="prose prose-sm md:prose-base text-muted-foreground mb-10 max-w-none">
              <p>{product.description}</p>
            </div>

            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium text-sm">Size</span>
                <button className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">Size Guide</button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-sm font-medium border transition-colors ${
                      selectedSize === size
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full py-8 text-sm tracking-widest font-bold rounded-none bg-primary hover:bg-primary/90"
            >
              ADD TO CART
            </Button>

            <div className="mt-12 pt-8 border-t border-border space-y-6 text-sm text-muted-foreground">
              <div>
                <p className="text-foreground font-medium mb-1">Free Global Shipping</p>
                <p>On all orders over $300.</p>
              </div>
              <div>
                <p className="text-foreground font-medium mb-1">Free Returns</p>
                <p>Return within 30 days for a full refund.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
