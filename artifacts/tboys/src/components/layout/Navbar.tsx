import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, X, Heart, Sun, Moon, Search } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { useTheme } from "@/hooks/use-theme";
import { useState, useEffect, useRef, type FormEvent } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/faq", label: "FAQ" },
  { href: "/admin", label: "Admin" },
];

export function Navbar() {
  const [location, navigate] = useLocation();
  const { totalItems, setIsOpen } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    navigate(`/shop?q=${encodeURIComponent(q)}`);
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
    setSearchQuery("");
  };

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
          <div className="flex items-center justify-between gap-4">
            {/* LEFT — Logo + mobile menu */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                className="md:hidden p-2 -ml-2 text-foreground hover:text-gold transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
              <Link
                href="/"
                className="font-serif text-xl md:text-2xl lg:text-3xl font-bold tracking-[0.25em] text-gold whitespace-nowrap hover:opacity-80 transition-opacity"
              >
                TBOY'S
              </Link>
            </div>

            {/* CENTER — Navigation */}
            <nav className="hidden md:flex items-center justify-center gap-5 lg:gap-8 flex-1">
              {NAV_LINKS.map((link) => {
                const active = location === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative text-xs font-semibold tracking-[0.2em] uppercase transition-colors py-1",
                      "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:bg-gold after:transition-all after:duration-300",
                      active
                        ? "text-gold after:w-full"
                        : "text-foreground/80 hover:text-gold after:w-0 hover:after:w-full",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT — Search + icons */}
            <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-foreground hover:text-gold transition-colors"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>
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
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-gold text-black text-[10px] font-bold flex items-center justify-center">
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
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-gold text-black text-[10px] font-bold flex items-center justify-center animate-in zoom-in">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* SEARCH OVERLAY */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-[70] bg-background/95 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsSearchOpen(false)}
        >
          <div className="container mx-auto px-4 md:px-6 pt-24 md:pt-32" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={submitSearch} className="max-w-2xl mx-auto">
              <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">Search the store</p>
              <div className="flex items-center border-b-2 border-gold pb-3">
                <Search className="w-6 h-6 text-gold mr-3 flex-shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search jackets, tees, agbada..."
                  className="flex-1 bg-transparent text-2xl md:text-3xl font-serif outline-none placeholder:text-muted-foreground/50"
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 text-foreground hover:text-gold transition-colors flex-shrink-0"
                  aria-label="Close search"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground tracking-wider">
                Press <kbd className="px-1.5 py-0.5 bg-secondary rounded text-foreground">Enter</kbd> to search
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {["Casual", "Formal", "Streetwear", "Outerwear"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      navigate(`/shop?category=${encodeURIComponent(cat)}`);
                      setIsSearchOpen(false);
                    }}
                    className="px-4 py-2 text-xs tracking-widest uppercase border border-border hover:border-gold hover:text-gold transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-background md:hidden animate-in slide-in-from-left duration-300">
          <div className="flex flex-col h-full p-6">
            <div className="flex items-center justify-between mb-10">
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

            <form onSubmit={submitSearch} className="mb-8">
              <div className="flex items-center border border-border focus-within:border-gold transition-colors">
                <Search className="w-5 h-5 text-muted-foreground ml-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 bg-transparent px-3 py-3 text-sm outline-none"
                />
              </div>
            </form>

            <nav className="flex flex-col space-y-6 flex-1">
              <Link href="/" className="text-3xl font-serif hover:text-gold transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-3xl font-serif hover:text-gold transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/wishlist" className="text-3xl font-serif hover:text-gold transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Wishlist</Link>
              <Link href="/contact" className="text-3xl font-serif hover:text-gold transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
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
