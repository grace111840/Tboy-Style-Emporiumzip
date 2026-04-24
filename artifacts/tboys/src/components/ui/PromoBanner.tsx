import { useState } from "react";
import { X, Sparkles } from "lucide-react";
import { useGetSiteContent } from "@workspace/api-client-react";

export function PromoBanner() {
  const { data: site } = useGetSiteContent();
  const [closed, setClosed] = useState(false);
  const message = site?.promoBanner ?? "GET 10% OFF YOUR FIRST ORDER — USE CODE TBOYS10 AT CHECKOUT";

  if (closed) return null;

  return (
    <div className="relative bg-gold text-black overflow-hidden">
      <div className="flex items-center overflow-hidden whitespace-nowrap py-2.5 text-xs font-semibold tracking-widest uppercase">
        <div className="marquee flex shrink-0">
          {[...Array(2)].map((_, group) => (
            <div key={group} className="flex items-center gap-12 pr-12 shrink-0">
              {[...Array(6)].map((_, i) => (
                <span key={i} className="flex items-center gap-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{message}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => setClosed(true)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-black/10 transition-colors"
        aria-label="Dismiss promo"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
