import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useGetSiteContent } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { formatNaira } from "@/lib/format";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, subtotal } = useCart();
  const { data: site } = useGetSiteContent();
  const waNumber = (site?.whatsappNumber ?? "2348012345678").replace(/[^0-9]/g, "");

  if (!isOpen) return null;

  const orderLines = items
    .map((i) => `• ${i.name} (${i.selectedSize}) × ${i.quantity} — ${formatNaira(i.price * i.quantity)}`)
    .join("\n");
  const message = encodeURIComponent(
    `Hi TBOY'S! I'd like to order:\n\n${orderLines}\n\nTotal: ${formatNaira(subtotal)}\n\nPlease confirm availability and delivery.`,
  );
  const orderLink = `https://wa.me/${waNumber}?text=${message}`;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] animate-in fade-in"
        onClick={() => setIsOpen(false)}
      />
      <div className="fixed inset-y-0 right-0 w-full md:w-[460px] bg-background border-l border-border shadow-2xl z-[100] flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-serif text-2xl tracking-wide">Your Bag</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 -mr-2 text-muted-foreground hover:text-gold transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-gold">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <p className="text-lg font-serif mb-2">Your bag is empty</p>
                <p className="text-muted-foreground text-sm">Find your next favourite piece in the new collection.</p>
              </div>
              <Button asChild onClick={() => setIsOpen(false)} className="w-full max-w-[220px] rounded-none mt-4 bg-gold text-black hover:bg-gold-soft">
                <Link href="/shop">CONTINUE SHOPPING</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-5 group">
                  <div className="w-24 h-32 bg-secondary flex-shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <Link
                        href={`/product/${item.id}`}
                        className="font-medium hover:text-gold transition-colors pr-4 text-sm"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id, item.selectedSize)}
                        className="text-muted-foreground hover:text-destructive transition-colors mt-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">Size: {item.selectedSize}</p>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-border">
                        <button
                          className="p-2 text-muted-foreground hover:text-gold transition-colors"
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          className="p-2 text-muted-foreground hover:text-gold transition-colors"
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="font-semibold text-sm">{formatNaira(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border p-6 bg-secondary/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-serif text-lg">Subtotal</span>
              <span className="font-bold text-xl text-gold">{formatNaira(subtotal)}</span>
            </div>
            <p className="text-xs text-muted-foreground">Free delivery within Lagos on orders over ₦50,000.</p>
            <a
              href={orderLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 bg-gold text-black hover:bg-gold-soft transition-colors text-sm font-bold tracking-widest"
            >
              ORDER ON WHATSAPP
            </a>
            <Button asChild variant="outline" onClick={() => setIsOpen(false)} className="w-full rounded-none border-border hover:border-gold">
              <Link href="/shop">CONTINUE SHOPPING</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
