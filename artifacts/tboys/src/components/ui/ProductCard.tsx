import { Link } from "wouter";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";
import { formatNaira } from "@/lib/format";
import { WishlistButton } from "@/components/ui/WishlistButton";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export function ProductCard({ product, className, priority = false }: ProductCardProps) {
  const onSale = product.oldPrice != null && product.oldPrice > product.price;
  const lowStock = product.stockCount > 0 && product.stockCount <= 5;
  const soldOut = product.stockCount === 0;

  return (
    <Link href={`/product/${product.id}`} className={cn("group block", className)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary mb-4">
        <img
          src={product.image}
          alt={product.name}
          loading={priority ? "eager" : "lazy"}
          className="object-cover object-center w-full h-full transform transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-gold text-black text-[10px] font-bold tracking-widest px-2 py-1 uppercase">
              New
            </span>
          )}
          {onSale && (
            <span className="bg-destructive text-destructive-foreground text-[10px] font-bold tracking-widest px-2 py-1 uppercase">
              Sale
            </span>
          )}
          {soldOut && (
            <span className="bg-muted text-muted-foreground text-[10px] font-bold tracking-widest px-2 py-1 uppercase">
              Sold Out
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <WishlistButton productId={product.id} />
        </div>

        {lowStock && !soldOut && (
          <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-sm text-gold border border-gold/40 text-[10px] font-bold tracking-widest px-2 py-1.5 uppercase text-center">
            Only {product.stockCount} left
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-1.5">
        <p className="text-[10px] tracking-widest text-muted-foreground uppercase">{product.category}</p>
        <div className="flex justify-between items-start gap-3">
          <h3 className="font-medium text-sm md:text-base leading-snug group-hover:text-gold transition-colors">
            {product.name}
          </h3>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-base">{formatNaira(product.price)}</span>
          {onSale && (
            <span className="text-xs text-muted-foreground line-through">
              {formatNaira(product.oldPrice!)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
