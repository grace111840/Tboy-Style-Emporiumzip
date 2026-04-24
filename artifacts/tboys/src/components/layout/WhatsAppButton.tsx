import { FaWhatsapp } from "react-icons/fa";

export function WhatsAppButton() {
  const phoneNumber = "+1234567890";
  const message = encodeURIComponent("Hello! I'm interested in TBOY'S collections and would like to know more.");
  const waLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-xl flex items-center justify-center group"
      aria-label="Chat with us on WhatsApp"
    >
      <FaWhatsapp className="w-7 h-7" />
      <span className="absolute right-full mr-4 bg-background border border-border text-foreground px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
        Need help? Chat with us
      </span>
    </a>
  );
}
