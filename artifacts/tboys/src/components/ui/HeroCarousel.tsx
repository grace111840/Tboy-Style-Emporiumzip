import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  image: string;
  eyebrow: string;
  headline: string;
  subheading: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

interface HeroCarouselProps {
  slides: Slide[];
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const total = slides.length;

  useEffect(() => {
    if (total <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % total), 6000);
    return () => clearInterval(t);
  }, [total]);

  const go = (delta: number) => setIndex((i) => (i + delta + total) % total);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          <img
            src={slide.image}
            alt={slide.headline}
            loading={i === 0 ? "eager" : "lazy"}
            className={`w-full h-full object-cover object-center transition-transform duration-[8000ms] ease-out ${i === index ? "scale-110" : "scale-100"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className={`max-w-3xl text-center text-white transition-all duration-1000 ${i === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <p className="text-xs md:text-sm tracking-[0.4em] text-gold uppercase mb-6">{slide.eyebrow}</p>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6">
                {slide.headline}
              </h1>
              <p className="text-base md:text-xl font-light max-w-2xl mx-auto mb-10 text-white/85">
                {slide.subheading}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="rounded-none px-10 py-7 text-xs tracking-[0.25em] bg-gold text-black hover:bg-gold-soft font-bold border-0">
                  <Link href={slide.ctaPrimary.href}>{slide.ctaPrimary.label}</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-none px-10 py-7 text-xs tracking-[0.25em] bg-transparent text-white border-white hover:bg-white hover:text-black font-bold">
                  <Link href={slide.ctaSecondary.href}>{slide.ctaSecondary.label}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {total > 1 && (
        <>
          <button
            onClick={() => go(-1)}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/40 hover:bg-gold hover:text-black text-white backdrop-blur-sm transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => go(1)}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/40 hover:bg-gold hover:text-black text-white backdrop-blur-sm transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1 transition-all duration-500 ${i === index ? "w-12 bg-gold" : "w-6 bg-white/40 hover:bg-white/70"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
