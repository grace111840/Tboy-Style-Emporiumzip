import { FaWhatsapp } from "react-icons/fa";
import { useGetSiteContent } from "@workspace/api-client-react";

export function WhatsAppButton() {
  const { data: site } = useGetSiteContent();
  const phoneNumber = (site?.whatsappNumber ?? "2348012345678").replace(/[^0-9]/g, "");
  const message = encodeURIComponent("Hi TBOY'S! I'd like to ask about your latest pieces.");
  const waLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
      aria-label="Chat with us on WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      <FaWhatsapp className="w-7 h-7 relative" />
      <span className="absolute right-full mr-3 bg-black text-gold border border-gold/50 px-3 py-1.5 text-xs font-medium tracking-wider whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300">
        Chat with us
      </span>
    </a>
  );
}
