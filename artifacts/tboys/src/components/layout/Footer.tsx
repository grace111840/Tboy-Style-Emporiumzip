import { Link } from "wouter";
import { FaInstagram, FaTwitter, FaTiktok, FaFacebookF } from "react-icons/fa";
import { useState } from "react";
import { useCreateSubscriber } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

export function Footer() {
  const [email, setEmail] = useState("");
  const { mutateAsync: subscribe, isPending } = useCreateSubscriber();
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    try {
      await subscribe({ data: { email: trimmed } });
      setEmail("");
      toast({
        title: "You're on the list",
        description: "Welcome to the atelier — exclusive previews are on the way.",
      });
    } catch (err) {
      toast({
        title: "Could not subscribe",
        description: "Please check your email address and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="font-serif text-3xl font-bold tracking-widest text-primary block mb-6">
              TBOY'S
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
              Walking into TBOY'S is like stepping into a private atelier on a quiet Mayfair side street. Confident, refined, and unmistakably modern.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 -ml-2">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2">
                <FaTiktok size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2">
                <FaFacebookF size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/collections" className="hover:text-primary transition-colors">New Arrivals</Link></li>
              <li><Link href="/shop" className="hover:text-primary transition-colors">All Products</Link></li>
              <li><Link href="/shop?category=Luxury" className="hover:text-primary transition-colors">Luxury</Link></li>
              <li><Link href="/shop?category=Streetwear" className="hover:text-primary transition-colors">Streetwear</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6">The Atelier</h4>
            <p className="text-muted-foreground text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="flex" onSubmit={handleSubscribe}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="bg-transparent border-b border-border py-2 px-0 text-sm w-full focus:outline-none focus:border-primary transition-colors rounded-none placeholder:text-muted-foreground/60"
              />
              <button
                type="submit"
                disabled={isPending}
                className="border-b border-border py-2 px-4 text-sm font-medium hover:text-primary hover:border-primary transition-colors disabled:opacity-50"
              >
                {isPending ? "…" : "SUBSCRIBE"}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground space-y-4 md:space-y-0">
          <p>&copy; {new Date().getFullYear()} TBOY'S CLOTHING BRAND. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
