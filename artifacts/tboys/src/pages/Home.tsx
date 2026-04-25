import { Link } from "wouter";
import { ArrowRight, Truck, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";
import { useSEO } from "@/hooks/use-seo";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/ProductCard";
import { HeroCarousel } from "@/components/ui/HeroCarousel";
import { StarRating } from "@/components/ui/StarRating";
import { useListProducts, useListReviews, useGetSiteContent } from "@workspace/api-client-react";
import type { Product } from "@/data/products";

export default function Home() {
  useSEO(
    "TBOY'S Clothing — Premium Nigerian Streetwear & Tailoring",
    "Discover TBOY'S — Lagos-crafted streetwear, formal & casual fits. Free Lagos delivery over ₦50,000. 10% off your first order.",
  );

  const { data: products = [] } = useListProducts();
  const { data: reviews = [] } = useListReviews();
  const { data: site } = useGetSiteContent();

  const tagline = site?.tagline ?? "Wear the moment. Own the room.";

  const newArrivals = (products as Product[]).filter((p) => p.isNew).slice(0, 4);
  const featured = (products as Product[]).filter((p) => !p.isNew).slice(0, 4);
  const heroProducts = (products as Product[]).slice(0, 3);

  const slides = [
    {
      image: "/images/hero-1.png",
      eyebrow: "SS26 — JUST DROPPED",
      headline: site?.heroHeadline ?? "Wear The Moment.",
      subheading: site?.heroSubheading ?? "Premium streetwear, formal & casual fits — handcrafted in Lagos for the bold and the brilliant.",
      ctaPrimary: { label: site?.heroCtaPrimary ?? "SHOP NEW DROPS", href: "/shop" },
      ctaSecondary: { label: site?.heroCtaSecondary ?? "EXPLORE LOOKBOOK", href: "/lookbook" },
    },
    {
      image: "/images/hero-2.png",
      eyebrow: "THE TBOY'S DIFFERENCE",
      headline: "Tailored In Lagos.",
      subheading: "Hand-cut patterns. Premium fabrics. Small-batch craftsmanship that the runway notices.",
      ctaPrimary: { label: "SHOP LUXURY", href: "/shop?category=Luxury" },
      ctaSecondary: { label: "OUR STORY", href: "/contact" },
    },
    {
      image: heroProducts[2]?.image ?? "/images/hero-1.png",
      eyebrow: "FRESH DROPS WEEKLY",
      headline: "Streetwear, Reimagined.",
      subheading: "Heavy-weight cottons, technical fabrics, signature embroidery. The pieces everyone's asking about.",
      ctaPrimary: { label: "SHOP STREETWEAR", href: "/shop?category=Streetwear" },
      ctaSecondary: { label: "SHOP ALL", href: "/shop" },
    },
  ];

  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 5;

  return (
    <div>
      <HeroCarousel slides={slides} />

      <section className="py-10 md:py-12 bg-secondary/40 border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center">
            {[
              { icon: Truck, title: "Free Lagos Delivery", subtitle: "On orders over ₦50,000" },
              { icon: Sparkles, title: "10% Off First Order", subtitle: "Use code TBOYS10" },
              { icon: RefreshCw, title: "Easy Returns", subtitle: "Within 7 days" },
              { icon: ShieldCheck, title: "Authentic Quality", subtitle: "Made in Lagos" },
            ].map(({ icon: Icon, title, subtitle }) => (
              <div key={title} className="flex flex-col items-center gap-2">
                <Icon className="w-6 h-6 text-gold" />
                <p className="font-semibold text-sm md:text-base">{title}</p>
                <p className="text-xs text-muted-foreground">{subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {newArrivals.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs tracking-[0.4em] text-gold uppercase mb-3">Just Landed</p>
                <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight">New Arrivals</h2>
              </div>
              <Link href="/shop" className="hidden md:flex items-center text-xs tracking-[0.25em] uppercase font-bold hover:text-gold transition-colors">
                Shop All <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14">
              {newArrivals.map((p, i) => (
                <ProductCard key={p.id} product={p} priority={i < 2} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 md:py-32 bg-secondary/40 relative overflow-hidden">
        <div className="absolute inset-0 shimmer pointer-events-none opacity-50" />
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl relative">
          <p className="text-xs tracking-[0.5em] text-gold uppercase mb-6">The TBOY'S Code</p>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-8">
            "{tagline}"
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            We don't make clothes. We make moments. Every piece designed to be photographed,
            remembered, and remembered again.
          </p>
          <Button asChild size="lg" className="rounded-none bg-gold text-black hover:bg-gold-soft px-10 py-7 text-xs tracking-[0.25em] font-bold">
            <Link href="/lookbook">EXPLORE THE LOOKBOOK</Link>
          </Button>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-14">
              <p className="text-xs tracking-[0.4em] text-gold uppercase mb-3">Bestsellers</p>
              <h2 className="font-serif text-3xl md:text-5xl font-bold">Customer Favourites</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            <div className="text-center mt-14">
              <Button asChild variant="outline" className="rounded-none border-gold text-gold hover:bg-gold hover:text-black px-10 py-6 text-xs tracking-widest font-bold">
                <Link href="/shop">SHOP ALL PRODUCTS</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {reviews.length > 0 && (
        <section className="py-20 md:py-28 bg-black border-y border-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-14">
              <div className="flex justify-center mb-4">
                <StarRating rating={avgRating} size="lg" />
              </div>
              <p className="text-xs tracking-[0.4em] text-gold uppercase mb-3">{reviews.length}+ verified reviews</p>
              <h2 className="font-serif text-3xl md:text-5xl font-bold">Loved Across Naija</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.slice(0, 3).map((r) => (
                <div key={r.id} className="border border-border bg-card p-7 hover-lift transition-all">
                  <StarRating rating={r.rating} size="sm" />
                  <p className="my-5 text-sm md:text-base leading-relaxed text-foreground/90 italic">
                    "{r.text}"
                  </p>
                  <p className="text-xs uppercase tracking-widest text-gold font-semibold">— {r.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <p className="text-xs tracking-[0.4em] text-gold uppercase mb-4">Got Questions?</p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
            Delivery, sizing, returns — sorted.
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Quick answers to everything you need before you order. Or chat with us live on WhatsApp — bottom right.
          </p>
          <Button asChild variant="outline" className="rounded-none border-gold text-gold hover:bg-gold hover:text-black px-10 py-6 text-xs tracking-widest font-bold">
            <Link href="/faq">VISIT THE FAQ</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
