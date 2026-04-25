import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import { useListProducts } from "@workspace/api-client-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Lookbook() {
  useSEO("Lookbook — TBOY'S Clothing", "Discover the TBOY'S Lookbook. Editorial styling, premium fits, and the latest drops from Lagos.");

  const { data: products = [] } = useListProducts();
  const [activeSlide, setActiveSlide] = useState(0);

  const looks = [
    {
      title: "The Atelier",
      subtitle: "Tailored statements for the room you walk in.",
      filter: "Luxury",
    },
    {
      title: "Off Duty",
      subtitle: "Elevated essentials, designed for the everyday.",
      filter: "Casual",
    },
    {
      title: "After Dark",
      subtitle: "Streetwear that speaks before you do.",
      filter: "Streetwear",
    },
    {
      title: "The Occasion",
      subtitle: "Ceremony, celebration, command.",
      filter: "Formal",
    },
  ];

  const slides = looks.map((l) => ({
    ...l,
    products: products.filter((p) => p.category === l.filter).slice(0, 3),
  }));

  const total = slides.length;

  useEffect(() => {
    if (total <= 1) return;
    const t = setInterval(() => setActiveSlide((i) => (i + 1) % total), 7000);
    return () => clearInterval(t);
  }, [total]);

  const go = (delta: number) => setActiveSlide((i) => (i + delta + total) % total);

  return (
    <div className="bg-background">
      <section className="relative h-[70vh] overflow-hidden">
        <img
          src="/images/hero-1.png"
          alt="TBOY'S Lookbook"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-xs tracking-[0.5em] text-gold uppercase mb-6 animate-in fade-in duration-1000">SS26 — VOLUME ONE</p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[0.95] animate-in fade-in slide-in-from-bottom-8 duration-1000">
            The Lookbook
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl font-light leading-relaxed">
            Four worlds. One signature. Step into the season.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative">
            {slides.map((slide, i) => (
              <div
                key={slide.title}
                className={`transition-all duration-1000 ${i === activeSlide ? "opacity-100" : "opacity-0 pointer-events-none absolute inset-0"}`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
                    <p className="text-xs tracking-[0.4em] text-gold uppercase">Look 0{i + 1}</p>
                    <h2 className="font-serif text-5xl md:text-6xl font-bold leading-tight">{slide.title}</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">{slide.subtitle}</p>
                    <Button asChild className="rounded-none bg-gold text-black hover:bg-gold-soft px-8 py-6 text-xs tracking-widest font-bold mt-4">
                      <Link href={`/shop?category=${slide.filter}`}>SHOP THE LOOK</Link>
                    </Button>
                  </div>

                  <div className="lg:col-span-7 grid grid-cols-2 gap-3 md:gap-5">
                    {slide.products.map((product, idx) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        className={`group block overflow-hidden bg-secondary ${idx === 0 ? "col-span-2 aspect-[4/3]" : "aspect-[3/4]"}`}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-center gap-6 mt-16">
              <button
                onClick={() => go(-1)}
                className="p-3 border border-border hover:border-gold hover:text-gold transition-colors"
                aria-label="Previous look"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    className={`h-1 transition-all duration-500 ${i === activeSlide ? "w-12 bg-gold" : "w-6 bg-muted hover:bg-muted-foreground"}`}
                    aria-label={`Go to look ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => go(1)}
                className="p-3 border border-border hover:border-gold hover:text-gold transition-colors"
                aria-label="Next look"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-secondary/40">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
          <p className="text-xs tracking-[0.4em] text-gold uppercase mb-5">The TBOY'S Promise</p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Every stitch tells a story.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
            From hand-cut patterns to small-batch production in Lagos — every TBOY'S piece is designed to be seen, felt, and remembered.
          </p>
          <Button asChild variant="outline" className="rounded-none border-gold text-gold hover:bg-gold hover:text-black px-8 py-6 text-xs tracking-widest font-bold">
            <Link href="/shop">EXPLORE THE COLLECTION</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
