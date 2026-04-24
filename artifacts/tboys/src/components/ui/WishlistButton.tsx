import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/hooks/use-wishlist";

interface WishlistButtonProps {
  productId: string;
  className?: string;
  variant?: "icon" | "pill";
}

export function WishlistButton({ productId, className, variant = "icon" }: WishlistButtonProps) {
  const { isWishlisted, toggle } = useWishlist();
  const active = isWishlisted(productId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(productId);
  };

  if (variant === "pill") {
    return (
      <button
        onClick={handleClick}
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 border border-border text-xs font-medium tracking-wide uppercase transition-all",
          active
            ? "bg-gold text-black border-gold"
            : "bg-transparent hover:border-gold hover:text-gold",
          className,
        )}
      >
        <Heart className={cn("w-4 h-4 transition-all", active && "fill-current")} />
        {active ? "In Wishlist" : "Add to Wishlist"}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "p-2 bg-background/90 backdrop-blur-sm border border-border hover:border-gold transition-all duration-200 hover:scale-110",
        active && "text-gold border-gold",
        className,
      )}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart className={cn("w-4 h-4 transition-all", active && "fill-current")} />
    </button>
  );
}
