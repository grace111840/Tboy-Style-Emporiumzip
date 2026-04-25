import { useState } from "react";
import { Link } from "wouter";
import { Plus, Minus, Truck, Ruler, RefreshCw, ShieldCheck } from "lucide-react";
import { useSEO } from "@/hooks/use-seo";
import { Button } from "@/components/ui/button";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSection {
  icon: React.ReactNode;
  title: string;
  items: FAQItem[];
}

const SECTIONS: FAQSection[] = [
  {
    icon: <Truck className="w-5 h-5" />,
    title: "Delivery",
    items: [
      {
        q: "How long does delivery take?",
        a: "Lagos: 1–3 business days. Other Nigerian states: 3–7 business days via our trusted logistics partners (GIG, DHL Local). International orders: 7–14 business days.",
      },
      {
        q: "How much does delivery cost?",
        a: "FREE delivery within Lagos on orders over ₦50,000. Standard Lagos delivery is ₦3,500. Other states from ₦5,500. International rates calculated at checkout.",
      },
      {
        q: "Do you deliver outside Nigeria?",
        a: "Yes! We ship worldwide. Reach out via WhatsApp for international quotes and customs information.",
      },
      {
        q: "Can I track my order?",
        a: "Absolutely. You'll receive a tracking link via SMS and email as soon as your order ships.",
      },
    ],
  },
  {
    icon: <Ruler className="w-5 h-5" />,
    title: "Sizing & Fit",
    items: [
      {
        q: "How do I know my size?",
        a: "Each product page lists detailed measurements. Generally: S = 36–38, M = 38–40, L = 40–42, XL = 42–44 (chest in inches). When in doubt, message us on WhatsApp — we'll help you choose.",
      },
      {
        q: "Do TBOY'S pieces run true to size?",
        a: "Most pieces fit true to size. Streetwear (hoodies, tees) is cut with an oversized silhouette by design. Tailored pieces fit closer — size up if you prefer room.",
      },
      {
        q: "Can I get custom tailoring?",
        a: "Yes — we offer made-to-measure for our luxury and formal pieces. WhatsApp us with your measurements and the piece you love.",
      },
    ],
  },
  {
    icon: <RefreshCw className="w-5 h-5" />,
    title: "Returns & Exchanges",
    items: [
      {
        q: "What is your return policy?",
        a: "Unworn, unwashed pieces with tags can be returned within 7 days of delivery for a full refund or exchange. Custom and made-to-measure pieces are final sale.",
      },
      {
        q: "How do I start a return?",
        a: "Message us on WhatsApp with your order number and reason. We'll arrange free pickup within Lagos.",
      },
      {
        q: "How long do refunds take?",
        a: "Once we receive and inspect your return, refunds are processed within 5 business days to your original payment method.",
      },
    ],
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Payments & Orders",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "Bank transfer, Paystack (cards), USSD, and Pay-on-Delivery within Lagos for orders under ₦100,000.",
      },
      {
        q: "Is the 10% off code real?",
        a: "Absolutely real. Use code TBOYS10 at checkout (or mention it on WhatsApp) for 10% off your first order.",
      },
      {
        q: "Can I cancel my order?",
        a: "Orders can be cancelled within 2 hours of placement. After that, please use our return process.",
      },
    ],
  },
];

export default function FAQ() {
  useSEO(
    "FAQ — TBOY'S Clothing",
    "Everything you need to know about TBOY'S delivery, sizing, returns, and payments in Nigeria and beyond.",
  );

  const [open, setOpen] = useState<string | null>("Delivery-0");

  const toggle = (key: string) => setOpen(open === key ? null : key);

  return (
    <div className="bg-background min-h-screen">
      <section className="py-20 md:py-28 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <p className="text-xs tracking-[0.5em] text-gold uppercase mb-5">Help Centre</p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Quick answers to the things you want to know — delivery, sizing, returns, payments and more.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="space-y-16">
            {SECTIONS.map((section) => (
              <div key={section.title}>
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border">
                  <div className="w-10 h-10 bg-gold text-black flex items-center justify-center">
                    {section.icon}
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl">{section.title}</h2>
                </div>

                <div className="space-y-3">
                  {section.items.map((item, idx) => {
                    const key = `${section.title}-${idx}`;
                    const isOpen = open === key;
                    return (
                      <div
                        key={key}
                        className={`border transition-colors ${isOpen ? "border-gold" : "border-border hover:border-muted-foreground"}`}
                      >
                        <button
                          onClick={() => toggle(key)}
                          className="w-full flex items-center justify-between p-5 text-left"
                        >
                          <span className="font-medium pr-6">{item.q}</span>
                          <span className={`shrink-0 transition-colors ${isOpen ? "text-gold" : "text-muted-foreground"}`}>
                            {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                          </span>
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}>
                          <p className="px-5 pb-5 text-muted-foreground leading-relaxed">{item.a}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 p-10 md:p-14 bg-secondary/60 border border-border text-center">
            <h3 className="font-serif text-3xl md:text-4xl mb-4">Still have questions?</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Our team is on WhatsApp Monday–Saturday, 9am–7pm WAT. We typically respond in under 30 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="rounded-none bg-gold text-black hover:bg-gold-soft px-8 py-6 text-xs tracking-widest font-bold">
                <Link href="/contact">CONTACT US</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-none border-border hover:border-gold px-8 py-6 text-xs tracking-widest font-bold">
                <Link href="/shop">CONTINUE SHOPPING</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
