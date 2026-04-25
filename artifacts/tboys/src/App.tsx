import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/hooks/use-cart";
import { WishlistProvider } from "@/hooks/use-wishlist";
import { ThemeProvider } from "@/hooks/use-theme";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { PromoBanner } from "@/components/ui/PromoBanner";

import Home from "@/pages/Home";
import Collections from "@/pages/Collections";
import Shop from "@/pages/Shop";
import ProductDetail from "@/pages/ProductDetail";
import Lookbook from "@/pages/Lookbook";
import FAQ from "@/pages/FAQ";
import Wishlist from "@/pages/Wishlist";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000, refetchOnWindowFocus: false } },
});

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <PromoBanner />
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/collections" component={Collections} />
          <Route path="/shop" component={Shop} />
          <Route path="/lookbook" component={Lookbook} />
          <Route path="/faq" component={FAQ} />
          <Route path="/wishlist" component={Wishlist} />
          <Route path="/product/:id" component={ProductDetail} />
          <Route path="/contact" component={Contact} />
          <Route path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
        <WishlistProvider>
          <CartProvider>
            <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, "") || ""}>
              <Router />
            </WouterRouter>
            <Toaster />
          </CartProvider>
        </WishlistProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
