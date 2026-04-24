import { Link } from "wouter";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { totalItems, setIsOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-border shadow-sm py-4"
            : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 -ml-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/shop" className="text-sm font-medium tracking-wide hover:text-primary transition-colors">
                SHOP
              </Link>
              <Link href="/collections" className="text-sm font-medium tracking-wide hover:text-primary transition-colors">
                COLLECTIONS
              </Link>
            </nav>

            {/* Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/" className="font-serif text-2xl md:text-3xl font-bold tracking-widest text-primary">
                TBOY'S
              </Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4 md:space-x-6">
              <button className="hidden md:block p-2 text-foreground hover:text-primary transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <Link href="/contact" className="hidden md:block text-sm font-medium tracking-wide hover:text-primary transition-colors">
                CONTACT
              </Link>
              <button
                className="p-2 -mr-2 relative text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(true)}
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center rounded-full animate-in zoom-in">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-background md:hidden animate-in slide-in-from-left">
          <div className="flex flex-col h-full p-6">
            <div className="flex items-center justify-between mb-12">
              <Link href="/" className="font-serif text-2xl font-bold tracking-widest text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                TBOY'S
              </Link>
              <button
                className="p-2 -mr-2 text-foreground hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex flex-col space-y-8 flex-1">
              <Link href="/" className="text-2xl font-serif" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/shop" className="text-2xl font-serif" onClick={() => setIsMobileMenuOpen(false)}>
                Shop All
              </Link>
              <Link href="/collections" className="text-2xl font-serif" onClick={() => setIsMobileMenuOpen(false)}>
                Collections
              </Link>
              <Link href="/contact" className="text-2xl font-serif" onClick={() => setIsMobileMenuOpen(false)}>
                Contact Us
              </Link>
            </nav>
            
            <div className="mt-auto">
              <div className="flex space-x-6 text-sm">
                <a href="#" className="hover:text-primary transition-colors">Instagram</a>
                <a href="#" className="hover:text-primary transition-colors">Twitter</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
