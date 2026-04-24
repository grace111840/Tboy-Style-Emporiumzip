import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, subtotal } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] animate-in fade-in"
        onClick={() => setIsOpen(false)}
      />
      <div className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-background border-l border-border shadow-2xl z-[100] flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-serif text-2xl tracking-wide">Your Cart</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-muted-foreground">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <p className="text-lg font-serif mb-2">Your cart is empty</p>
                <p className="text-muted-foreground text-sm">Discover our latest collections and find your new favorite piece.</p>
              </div>
              <Button asChild onClick={() => setIsOpen(false)} className="w-full max-w-[200px] rounded-none mt-4">
                <Link href="/shop">CONTINUE SHOPPING</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-6 group">
                  <div className="w-24 h-32 bg-secondary flex-shrink-0 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <Link 
                        href={`/product/${item.id}`} 
                        className="font-medium hover:text-primary transition-colors pr-4"
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
                    <p className="text-sm text-muted-foreground mb-4">Size: {item.selectedSize}</p>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-border">
                        <button 
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button 
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="font-medium">${item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border p-6 bg-secondary/30">
            <div className="flex items-center justify-between mb-6">
              <span className="font-serif text-lg">Subtotal</span>
              <span className="font-medium text-lg">${subtotal}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6">Shipping and taxes calculated at checkout.</p>
            <Button className="w-full rounded-none py-6 text-sm tracking-widest font-bold">
              PROCEED TO CHECKOUT
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
