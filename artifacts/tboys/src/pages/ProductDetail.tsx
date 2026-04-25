import { useSEO } from "@/hooks/use-seo";
import { useParams, Link } from "wouter";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import NotFound from "@/pages/not-found";
import {
  useGetProduct,
  getGetProductQueryKey,
  useListReviews,
  useCreateReview,
  useGetSiteContent,
  getListReviewsQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import type { Product } from "@/data/products";
import { formatNaira } from "@/lib/format";
import { StarRating } from "@/components/ui/StarRating";
import { WishlistButton } from "@/components/ui/WishlistButton";
import { useToast } from "@/hooks/use-toast";
import { Truck, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function ProductDetail() {
  const { id } = useParams();
  const productId = id ?? "";
  const { data: product, isLoading, isError } = useGetProduct(productId, {
    query: { enabled: !!productId, queryKey: getGetProductQueryKey(productId) },
  });
  const { data: reviews = [] } = useListReviews({ productId }, {
    query: { enabled: !!productId, queryKey: getListReviewsQueryKey({ productId }) },
  });
  const { data: site } = useGetSiteContent();
  const { addItem } = useCart();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { mutateAsync: createReview, isPending: submittingReview } = useCreateReview();

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [reviewForm, setReviewForm] = useState({ author: "", rating: 5, text: "" });

  useSEO(product?.name ?? "Product", product?.description ?? "Premium piece from TBOY'S Clothing.");

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-24 container mx-auto px-4 text-muted-foreground">
        Loading piece…
      </div>
    );
  }

  if (isError || !product) return <NotFound />;

  const onSale = product.oldPrice != null && product.oldPrice > product.price;
  const lowStock = product.stockCount > 0 && product.stockCount <= 5;
  const soldOut = product.stockCount === 0;

  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const waNumber = (site?.whatsappNumber ?? "2348012345678").replace(/[^0-9]/g, "");
  const waMessage = encodeURIComponent(
    `Hi TBOY'S! I'd like to order:\n\n• ${product.name}${selectedSize ? ` (Size: ${selectedSize})` : ""}\n• Price: ${formatNaira(product.price)}\n\nIs it available?`,
  );
  const orderLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose your size before adding to bag.",
        variant: "destructive",
      });
      return;
    }
    addItem(product as Product, selectedSize, 1);
    toast({ title: "Added to bag", description: `${product.name} (${selectedSize})` });
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.author.trim() || !reviewForm.text.trim()) return;
    try {
      await createReview({
        data: {
          productId,
          author: reviewForm.author.trim(),
          rating: reviewForm.rating,
          text: reviewForm.text.trim(),
        },
      });
      setReviewForm({ author: "", rating: 5, text: "" });
      queryClient.invalidateQueries({ queryKey: getListReviewsQueryKey({ productId }) });
      toast({ title: "Thank you!", description: "Your review is live." });
    } catch {
      toast({ title: "Could not submit", description: "Please try again.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen pt-12 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 text-xs text-muted-foreground tracking-wider uppercase">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-gold transition-colors">Shop</Link>
          <span className="mx-2">/</span>
          <Link href={`/shop?category=${product.category}`} className="hover:text-gold transition-colors">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground normal-case tracking-normal">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-secondary w-full overflow-hidden relative">
              {product.isNew && (
                <span className="absolute top-4 left-4 z-10 bg-gold text-black text-[10px] font-bold tracking-widest px-3 py-1.5 uppercase">
                  New Drop
                </span>
              )}
              {onSale && (
                <span className="absolute top-4 right-4 z-10 bg-destructive text-destructive-foreground text-[10px] font-bold tracking-widest px-3 py-1.5 uppercase">
                  -{Math.round(((product.oldPrice! - product.price) / product.oldPrice!) * 100)}%
                </span>
              )}
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[4/5] bg-secondary w-full overflow-hidden">
                <img src={product.image} alt={`${product.name} detail`} className="w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-500" />
              </div>
              <div className="aspect-[4/5] bg-secondary w-full overflow-hidden">
                <img src={product.image} alt={`${product.name} back`} className="w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-500" />
              </div>
            </div>
          </div>

          <div className="flex flex-col pt-4 md:pt-6">
            <p className="text-xs font-medium tracking-[0.3em] text-gold uppercase mb-3">{product.category}</p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight font-bold">{product.name}</h1>

            {reviews.length > 0 && (
              <div className="mb-5">
                <StarRating rating={avgRating} showValue count={reviews.length} />
              </div>
            )}

            <div className="flex items-baseline gap-3 mb-6">
              <p className="text-3xl font-bold text-gold">{formatNaira(product.price)}</p>
              {onSale && (
                <p className="text-lg text-muted-foreground line-through">{formatNaira(product.oldPrice!)}</p>
              )}
            </div>

            {lowStock && !soldOut && (
              <div className="mb-6 px-4 py-3 border border-gold/40 bg-gold/10 text-gold text-sm font-medium tracking-wide flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0" />
                Hurry — only {product.stockCount} left in stock!
              </div>
            )}
            {soldOut && (
              <div className="mb-6 px-4 py-3 border border-border bg-secondary text-muted-foreground text-sm font-medium tracking-wide">
                Sold out — message us on WhatsApp for restock alerts.
              </div>
            )}

            <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

            {product.styleTip && (
              <div className="mb-8 p-5 border-l-2 border-gold bg-secondary/40">
                <p className="text-xs font-bold tracking-[0.3em] text-gold uppercase mb-2">Style Tip</p>
                <p className="text-sm leading-relaxed text-foreground/90 italic">{product.styleTip}</p>
              </div>
            )}

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-sm uppercase tracking-wider">Size</span>
                <Link href="/faq" className="text-xs text-muted-foreground underline underline-offset-4 hover:text-gold">Size Guide</Link>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-sm font-semibold border transition-all ${
                      selectedSize === size
                        ? "border-gold bg-gold text-black"
                        : "border-border hover:border-gold"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 mb-4">
              <Button
                onClick={handleAddToCart}
                disabled={soldOut}
                className="w-full py-7 text-xs tracking-[0.25em] font-bold rounded-none bg-gold text-black hover:bg-gold-soft disabled:bg-muted disabled:text-muted-foreground"
              >
                {soldOut ? "SOLD OUT" : "ADD TO BAG"}
              </Button>

              <a
                href={orderLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-5 bg-[#25D366] text-white hover:bg-[#1ebe5a] transition-colors text-xs font-bold tracking-[0.25em]"
              >
                <FaWhatsapp className="w-5 h-5" />
                ORDER ON WHATSAPP
              </a>

              <WishlistButton productId={product.id} variant="pill" className="w-full justify-center py-4" />
            </div>

            <div className="mt-10 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-5 text-sm">
              <div className="flex flex-col items-start gap-2">
                <Truck className="w-5 h-5 text-gold" />
                <p className="font-semibold">Free Lagos Delivery</p>
                <p className="text-xs text-muted-foreground">On orders over ₦50,000</p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <RefreshCw className="w-5 h-5 text-gold" />
                <p className="font-semibold">7-Day Returns</p>
                <p className="text-xs text-muted-foreground">Unworn, with tags</p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <ShieldCheck className="w-5 h-5 text-gold" />
                <p className="font-semibold">Authentic</p>
                <p className="text-xs text-muted-foreground">Made in Lagos</p>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-24 pt-14 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <p className="text-xs tracking-[0.4em] text-gold uppercase mb-3">Reviews</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Customer Reviews</h2>
              {reviews.length > 0 ? (
                <>
                  <StarRating rating={avgRating} size="lg" showValue count={reviews.length} />
                </>
              ) : (
                <p className="text-muted-foreground">Be the first to review this piece.</p>
              )}
            </div>

            <div className="md:col-span-2 space-y-6">
              {reviews.length === 0 && (
                <p className="text-muted-foreground italic">No reviews yet — share your thoughts below.</p>
              )}
              {reviews.map((r) => (
                <div key={r.id} className="border-b border-border pb-6 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gold">{r.author}</p>
                    <StarRating rating={r.rating} size="sm" />
                  </div>
                  <p className="text-foreground/90 leading-relaxed">{r.text}</p>
                </div>
              ))}

              <form onSubmit={handleSubmitReview} className="border border-border p-6 mt-8 space-y-5">
                <h3 className="font-serif text-xl font-bold">Leave a review</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={reviewForm.author}
                    onChange={(e) => setReviewForm((f) => ({ ...f, author: e.target.value }))}
                    required
                    className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                  <div className="flex items-center gap-3 px-4 py-3 border border-border">
                    <span className="text-sm text-muted-foreground">Rating:</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setReviewForm((f) => ({ ...f, rating: n }))}
                          className={`text-xl transition-colors ${n <= reviewForm.rating ? "text-gold" : "text-muted-foreground/40 hover:text-gold/60"}`}
                          aria-label={`${n} stars`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <textarea
                  placeholder="Share your experience…"
                  value={reviewForm.text}
                  onChange={(e) => setReviewForm((f) => ({ ...f, text: e.target.value }))}
                  required
                  rows={4}
                  className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors resize-none"
                />

                <Button
                  type="submit"
                  disabled={submittingReview}
                  className="rounded-none bg-gold text-black hover:bg-gold-soft px-8 py-5 text-xs tracking-[0.25em] font-bold"
                >
                  {submittingReview ? "SUBMITTING…" : "POST REVIEW"}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
