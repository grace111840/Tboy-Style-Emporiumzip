import { Link } from "wouter";
import { Product } from "@/data/products";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export function ProductCard({ product, className, priority = false }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className={cn("group block", className)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary mb-4">
        <img
          src={product.image}
          alt={product.name}
          loading={priority ? "eager" : "lazy"}
          className="object-cover object-center w-full h-full transform transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
      </div>
      <div className="flex flex-col space-y-1">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-sm md:text-base leading-snug group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <span className="font-medium ml-4 shrink-0">${product.price}</span>
        </div>
        <p className="text-sm text-muted-foreground">{product.category}</p>
      </div>
    </Link>
  );
}
