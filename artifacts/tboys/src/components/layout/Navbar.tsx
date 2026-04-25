import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, X, Heart, Sun, Moon } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { useTheme } from "@/hooks/use-theme";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/faq", label: "FAQ" },
  { href: "/admin", label: "Admin" },
];

export function Navbar() {
  const [location] = useLocation();
  const { totalItems, setIsOpen } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300 border-b",
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-border shadow-md py-3"
            : "bg-background/70 backdrop-blur-sm border-transparent py-5",
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-3 items-center gap-3">
            <div className="flex items-center md:justify-self-start">
              <button
                className="md:hidden p-2 -ml-2 text-foreground hover:text-gold transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              <nav className="hidden md:flex items-center space-x-5 lg:space-x-7">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-xs font-semibold tracking-[0.2em] uppercase transition-colors",
                      location === link.href ? "text-gold" : "hover:text-gold",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex justify-center min-w-0">
              <Link href="/" className="font-serif text-xl md:text-2xl lg:text-3xl font-bold tracking-[0.25em] text-gold whitespace-nowrap">
                TBOY'S
              </Link>
            </div>

            <div className="flex items-center justify-end space-x-1 md:space-x-3">
              <button
                onClick={toggleTheme}
                className="p-2 text-foreground hover:text-gold transition-colors"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <Link
                href="/wishlist"
                className="p-2 relative text-foreground hover:text-gold transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-gold text-black text-[10px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <button
                className="p-2 -mr-2 relative text-foreground hover:text-gold transition-colors"
                onClick={() => setIsOpen(true)}
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-gold text-black text-[10px] font-bold flex items-center justify-center animate-in zoom-in">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-background md:hidden animate-in slide-in-from-left duration-300">
          <div className="flex flex-col h-full p-6">
            <div className="flex items-center justify-between mb-12">
              <Link href="/" className="font-serif text-2xl font-bold tracking-[0.25em] text-gold" onClick={() => setIsMobileMenuOpen(false)}>
                TBOY'S
              </Link>
              <button
                className="p-2 -mr-2 text-foreground hover:text-gold"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col space-y-7 flex-1">
              <Link href="/" className="text-3xl font-serif" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-3xl font-serif"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/wishlist" className="text-3xl font-serif" onClick={() => setIsMobileMenuOpen(false)}>Wishlist</Link>
              <Link href="/contact" className="text-3xl font-serif" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            </nav>

            <div className="mt-auto border-t border-border pt-6">
              <p className="text-xs text-muted-foreground tracking-widest uppercase mb-3">Need help?</p>
              <p className="text-sm">Chat us on WhatsApp — bottom right.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
