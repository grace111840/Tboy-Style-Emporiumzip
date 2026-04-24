import { useSEO } from "@/hooks/use-seo";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";

export default function Home() {
  useSEO("The Atelier", "Welcome to TBOY'S - Confident, refined, and unmistakably modern luxury fashion.");

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-secondary">
          <img 
            src="/images/hero-1.png" 
            alt="TBOY'S Luxury Collection" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-wide mb-6">
            The New Classic
          </h1>
          <p className="text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto mb-10 text-white/90">
            Unmistakably modern. Confident and refined. Step into the atelier.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button asChild size="lg" className="rounded-none px-8 py-6 text-sm tracking-widest bg-white text-black hover:bg-white/90">
              <Link href="/shop">SHOP NOW</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-none px-8 py-6 text-sm tracking-widest bg-transparent text-white border-white hover:bg-white/10 hover:text-white">
              <Link href="/collections">EXPLORE COLLECTION</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-primary mb-8">Refined Elegance</h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
            Walking into TBOY'S should feel like stepping into a private atelier on a quiet Mayfair side street. Every stitch, every drape, and every silhouette is considered. We build wardrobes for those who command the room without raising their voice.
          </p>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-12 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-serif text-3xl md:text-4xl">Featured Pieces</h2>
            <Link href="/shop" className="text-sm font-medium tracking-wide hover:text-primary border-b border-transparent hover:border-primary transition-all pb-1 hidden md:block">
              VIEW ALL
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Button asChild variant="outline" className="rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background w-full">
              <Link href="/shop">VIEW ALL PIECES</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Editorial Image / Split Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 items-center">
            <div className="aspect-[3/4] md:aspect-auto md:h-[700px] w-full bg-secondary md:pr-12">
              <img 
                src="/images/hero-2.png" 
                alt="Premium fabric details" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:pl-16 lg:pl-24 flex flex-col justify-center">
              <h2 className="font-serif text-4xl md:text-5xl mb-6">The Art of <br/>Tailoring</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Our commitment to craftsmanship goes beyond the surface. We source only the finest fabrics from storied mills across Italy and Japan, combining traditional techniques with contemporary silhouettes. The result is a garment that not only looks exceptional but feels entirely yours from the first wear.
              </p>
              <Button asChild className="rounded-none w-fit px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/collections">DISCOVER THE ATELIER</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
