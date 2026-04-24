import { useSEO } from "@/hooks/use-seo";
import { FaInstagram, FaTwitter, FaTiktok, FaFacebookF, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useGetSiteContent } from "@workspace/api-client-react";

export default function Contact() {
  useSEO("Contact Us", "Get in touch with TBOY'S atelier.");
  const { data: site } = useGetSiteContent();
  const contactEmail = site?.contactEmail ?? "atelier@tboys.com";

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4">
            <h1 className="font-serif text-4xl md:text-5xl mb-6">Contact The Atelier</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
              Whether you have a question about an order, need styling advice, or simply want to learn more about our process, we are here for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h3 className="font-serif text-2xl mb-6">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 text-muted-foreground hover:text-foreground transition-colors">
                    <FaEnvelope className="w-5 h-5 mt-1 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 text-muted-foreground hover:text-foreground transition-colors">
                    <FaPhone className="w-5 h-5 mt-1 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Phone</p>
                      <a href="tel:+442012345678">+44 20 1234 5678</a>
                      <p className="text-sm mt-1">Mon-Fri: 9am - 6pm GMT</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 text-muted-foreground hover:text-foreground transition-colors">
                    <FaMapMarkerAlt className="w-5 h-5 mt-1 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Atelier</p>
                      <p>15 Savile Row<br />Mayfair, London<br />W1S 3PJ, UK</p>
                      <p className="text-sm mt-1 italic">By appointment only.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl mb-6">Social</h3>
                <div className="flex space-x-6">
                  <a href="#" className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300">
                    <FaInstagram size={20} />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300">
                    <FaTwitter size={20} />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300">
                    <FaTiktok size={20} />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300">
                    <FaFacebookF size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-secondary/30 p-8 md:p-10">
              <h3 className="font-serif text-2xl mb-8">Send a Message</h3>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully. We will get back to you shortly."); }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                    <input 
                      id="firstName" 
                      type="text" 
                      required
                      className="w-full bg-transparent border-b border-border py-2 px-0 focus:outline-none focus:border-primary transition-colors rounded-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                    <input 
                      id="lastName" 
                      type="text" 
                      required
                      className="w-full bg-transparent border-b border-border py-2 px-0 focus:outline-none focus:border-primary transition-colors rounded-none"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                  <input 
                    id="email" 
                    type="email" 
                    required
                    className="w-full bg-transparent border-b border-border py-2 px-0 focus:outline-none focus:border-primary transition-colors rounded-none"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <select 
                    id="subject"
                    className="w-full bg-transparent border-b border-border py-2 px-0 focus:outline-none focus:border-primary transition-colors rounded-none cursor-pointer"
                  >
                    <option>General Inquiry</option>
                    <option>Order Status</option>
                    <option>Returns & Exchanges</option>
                    <option>Styling Advice</option>
                    <option>Press & Media</option>
                  </select>
                </div>

                <div className="space-y-2 pt-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    required
                    className="w-full bg-transparent border-b border-border py-2 px-0 focus:outline-none focus:border-primary transition-colors rounded-none resize-none"
                  ></textarea>
                </div>

                <Button type="submit" className="w-full py-6 rounded-none text-sm tracking-widest font-bold mt-4">
                  SEND MESSAGE
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
