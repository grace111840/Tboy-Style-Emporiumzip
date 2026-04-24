import { Link } from "wouter";
import { FaInstagram, FaTwitter, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import { useCreateSubscriber, useGetSiteContent } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

export function Footer() {
  const [email, setEmail] = useState("");
  const { mutateAsync: subscribe, isPending } = useCreateSubscriber();
  const { data: site } = useGetSiteContent();
  const { toast } = useToast();
  const tagline = site?.tagline ?? "Wear the moment. Own the room.";

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    try {
      await subscribe({ data: { email: trimmed } });
      setEmail("");
      toast({
        title: "You're in.",
        description: "Welcome to the TBOY'S inner circle. Drops and exclusive offers coming your way.",
      });
    } catch {
      toast({
        title: "Could not subscribe",
        description: "Please check your email address and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <footer className="bg-black border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="font-serif text-3xl font-bold tracking-[0.25em] text-gold block mb-6">
              TBOY'S
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3 max-w-sm">
              {tagline}
            </p>
            <p className="text-xs text-muted-foreground/70 mb-6">Premium Nigerian fashion. Made for the bold.</p>
            <div className="flex items-center gap-2">
              <a href="#" aria-label="Instagram" className="w-9 h-9 border border-border hover:border-gold hover:text-gold flex items-center justify-center transition-colors">
                <FaInstagram size={16} />
              </a>
              <a href="#" aria-label="TikTok" className="w-9 h-9 border border-border hover:border-gold hover:text-gold flex items-center justify-center transition-colors">
                <FaTiktok size={16} />
              </a>
              <a href="#" aria-label="Twitter" className="w-9 h-9 border border-border hover:border-gold hover:text-gold flex items-center justify-center transition-colors">
                <FaTwitter size={16} />
              </a>
              <a href="#" aria-label="WhatsApp" className="w-9 h-9 border border-border hover:border-gold hover:text-gold flex items-center justify-center transition-colors">
                <FaWhatsapp size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-base mb-5 text-gold">Shop</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/shop" className="hover:text-gold transition-colors">All Products</Link></li>
              <li><Link href="/collections" className="hover:text-gold transition-colors">Collections</Link></li>
              <li><Link href="/lookbook" className="hover:text-gold transition-colors">Lookbook</Link></li>
              <li><Link href="/shop?category=Streetwear" className="hover:text-gold transition-colors">Streetwear</Link></li>
              <li><Link href="/shop?category=Formal" className="hover:text-gold transition-colors">Formal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base mb-5 text-gold">Help</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/faq" className="hover:text-gold transition-colors">FAQ</Link></li>
              <li><Link href="/faq" className="hover:text-gold transition-colors">Delivery</Link></li>
              <li><Link href="/faq" className="hover:text-gold transition-colors">Sizing</Link></li>
              <li><Link href="/faq" className="hover:text-gold transition-colors">Returns</Link></li>
              <li><Link href="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base mb-5 text-gold">Join the List</h4>
            <p className="text-muted-foreground text-sm mb-4">Drop alerts, exclusive offers, 10% off your first order.</p>
            <form className="flex border border-border focus-within:border-gold transition-colors" onSubmit={handleSubscribe}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="bg-transparent py-2.5 px-3 text-sm w-full focus:outline-none placeholder:text-muted-foreground/60"
              />
              <button
                type="submit"
                disabled={isPending}
                className="bg-gold text-black py-2.5 px-4 text-xs font-bold tracking-widest hover:bg-gold-soft transition-colors disabled:opacity-50"
              >
                {isPending ? "…" : "JOIN"}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground space-y-4 md:space-y-0">
          <p>&copy; {new Date().getFullYear()} TBOY'S CLOTHING. Crafted in Lagos.</p>
          <div className="flex space-x-5">
            <a href="#" className="hover:text-gold transition-colors">Privacy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms</a>
            <Link href="/admin" className="hover:text-gold transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
