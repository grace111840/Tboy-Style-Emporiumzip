import { useState, useEffect, useMemo } from "react";
import { useSEO } from "@/hooks/use-seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import {
  useListProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  useGetSiteContent,
  useUpdateSiteContent,
  useListSubscribers,
  getListProductsQueryKey,
  getGetSiteContentQueryKey,
  getListSubscribersQueryKey,
} from "@workspace/api-client-react";
import type { Category, Product } from "@/data/products";
import { CATEGORIES } from "@/data/products";
import { Trash2, Pencil, Plus, X } from "lucide-react";

const EMPTY_DRAFT = {
  name: "",
  price: 0,
  oldPrice: null as number | null,
  category: "Casual" as Category,
  image: "/images/casual-1.png",
  description: "",
  styleTip: "" as string,
  sizes: ["S", "M", "L", "XL"] as string[],
  popularity: 80,
  stockCount: 10,
  isNew: false,
};

export default function Admin() {
  useSEO("Atelier Admin", "Manage products and site content.");

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: products = [] } = useListProducts();
  const { data: site } = useGetSiteContent();
  const { data: subscribers = [] } = useListSubscribers();

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const updateSite = useUpdateSiteContent();

  const [tab, setTab] = useState<"prices" | "products" | "site" | "subscribers">("prices");
  const [priceDrafts, setPriceDrafts] = useState<Record<string, { price: number; oldPrice: number | null; stockCount: number }>>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState({ ...EMPTY_DRAFT });
  const [showForm, setShowForm] = useState(false);

  const editingProduct = useMemo(
    () => (editingId ? (products as Product[]).find((p) => p.id === editingId) : null),
    [editingId, products],
  );

  useEffect(() => {
    if (editingProduct) {
      setDraft({
        name: editingProduct.name,
        price: editingProduct.price,
        oldPrice: editingProduct.oldPrice ?? null,
        category: editingProduct.category,
        image: editingProduct.image,
        description: editingProduct.description,
        styleTip: editingProduct.styleTip ?? "",
        sizes: editingProduct.sizes,
        popularity: editingProduct.popularity,
        stockCount: editingProduct.stockCount,
        isNew: editingProduct.isNew,
      });
      setShowForm(true);
    }
  }, [editingProduct]);

  const resetForm = () => {
    setDraft({ ...EMPTY_DRAFT });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateProduct.mutateAsync({ id: editingId, data: draft });
        toast({ title: "Piece updated" });
      } else {
        await createProduct.mutateAsync({ data: draft });
        toast({ title: "Piece added" });
      }
      await queryClient.invalidateQueries({ queryKey: getListProductsQueryKey() });
      resetForm();
    } catch (err) {
      toast({
        title: "Could not save",
        description: err instanceof Error ? err.message : "Please review the values and try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this piece from the catalog?")) return;
    try {
      await deleteProduct.mutateAsync({ id });
      await queryClient.invalidateQueries({ queryKey: getListProductsQueryKey() });
      toast({ title: "Piece removed" });
    } catch (err) {
      toast({
        title: "Could not delete",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  // Site content state
  const [siteDraft, setSiteDraft] = useState({
    heroHeadline: "",
    heroSubheading: "",
    heroCtaPrimary: "",
    heroCtaSecondary: "",
    whatsappNumber: "",
    contactEmail: "",
    promoBanner: "",
    tagline: "",
  });
  const [siteInitialized, setSiteInitialized] = useState(false);

  useEffect(() => {
    if (site && !siteInitialized) {
      setSiteDraft({
        heroHeadline: site.heroHeadline,
        heroSubheading: site.heroSubheading,
        heroCtaPrimary: site.heroCtaPrimary,
        heroCtaSecondary: site.heroCtaSecondary,
        whatsappNumber: site.whatsappNumber,
        contactEmail: site.contactEmail,
        promoBanner: site.promoBanner ?? "",
        tagline: site.tagline ?? "",
      });
      setSiteInitialized(true);
    }
  }, [site, siteInitialized]);

  const handleSaveSite = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSite.mutateAsync({ data: siteDraft });
      await queryClient.invalidateQueries({ queryKey: getGetSiteContentQueryKey() });
      toast({ title: "Site content updated" });
    } catch (err) {
      toast({
        title: "Could not save",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  void getListSubscribersQueryKey;

  return (
    <div className="min-h-screen pt-28 pb-24 bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="mb-10 mt-6">
          <p className="text-xs tracking-widest text-muted-foreground uppercase mb-2">Atelier Console</p>
          <h1 className="font-serif text-4xl md:text-5xl">Manage Your Boutique</h1>
          <p className="text-muted-foreground mt-3 max-w-xl">
            Edit products, hero copy, contact details, and review newsletter signups — changes go live instantly.
          </p>
        </div>

        <div className="flex gap-1 border-b border-border mb-10 overflow-x-auto">
          {[
            { id: "prices", label: "Quick Prices & Stock" },
            { id: "products", label: `Products (${products.length})` },
            { id: "site", label: "Site Content" },
            { id: "subscribers", label: `Subscribers (${subscribers.length})` },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as typeof tab)}
              className={`px-5 py-3 text-sm font-medium tracking-wide border-b-2 -mb-px whitespace-nowrap transition-colors ${
                tab === t.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "prices" && (
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="font-serif text-2xl">Quick Price & Stock Editor</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Edit prices, sale prices, and stock counts inline. Click <span className="text-gold font-semibold">Save</span> on each row to update.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto bg-background border border-border">
              <table className="w-full text-sm">
                <thead className="bg-secondary/40 text-left">
                  <tr>
                    <th className="px-4 py-3 font-medium"></th>
                    <th className="px-4 py-3 font-medium">Product</th>
                    <th className="px-4 py-3 font-medium text-right w-36">Price (₦)</th>
                    <th className="px-4 py-3 font-medium text-right w-36">Sale Was (₦)</th>
                    <th className="px-4 py-3 font-medium text-right w-28">Stock</th>
                    <th className="px-4 py-3 font-medium text-right w-32">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {(products as Product[]).map((p) => {
                    const draft = priceDrafts[p.id] ?? { price: p.price, oldPrice: p.oldPrice ?? null, stockCount: p.stockCount };
                    const dirty =
                      draft.price !== p.price ||
                      draft.oldPrice !== (p.oldPrice ?? null) ||
                      draft.stockCount !== p.stockCount;
                    const setField = (patch: Partial<typeof draft>) =>
                      setPriceDrafts((d) => ({ ...d, [p.id]: { ...draft, ...patch } }));
                    return (
                      <tr key={p.id} className="border-t border-border hover:bg-secondary/20">
                        <td className="px-4 py-3 w-16">
                          <img src={p.image} alt={p.name} className="w-12 h-14 object-cover" />
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-medium">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.category}</p>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Input
                            type="number"
                            min={0}
                            step={500}
                            value={draft.price}
                            onChange={(e) => setField({ price: Number(e.target.value) })}
                            className="rounded-none text-right"
                          />
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Input
                            type="number"
                            min={0}
                            step={500}
                            value={draft.oldPrice ?? ""}
                            placeholder="—"
                            onChange={(e) => setField({ oldPrice: e.target.value ? Number(e.target.value) : null })}
                            className="rounded-none text-right"
                          />
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Input
                            type="number"
                            min={0}
                            value={draft.stockCount}
                            onChange={(e) => setField({ stockCount: Number(e.target.value) })}
                            className="rounded-none text-right"
                          />
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button
                            type="button"
                            size="sm"
                            disabled={!dirty || savingId === p.id}
                            onClick={async () => {
                              setSavingId(p.id);
                              try {
                                await updateProduct.mutateAsync({
                                  id: p.id,
                                  data: {
                                    name: p.name,
                                    price: draft.price,
                                    oldPrice: draft.oldPrice,
                                    category: p.category,
                                    image: p.image,
                                    description: p.description,
                                    styleTip: p.styleTip ?? "",
                                    sizes: p.sizes,
                                    popularity: p.popularity,
                                    stockCount: draft.stockCount,
                                    isNew: p.isNew,
                                  },
                                });
                                await queryClient.invalidateQueries({ queryKey: getListProductsQueryKey() });
                                setPriceDrafts((d) => {
                                  const next = { ...d };
                                  delete next[p.id];
                                  return next;
                                });
                                toast({ title: "Saved", description: p.name });
                              } catch (err) {
                                toast({
                                  title: "Could not save",
                                  description: err instanceof Error ? err.message : "Please try again.",
                                  variant: "destructive",
                                });
                              } finally {
                                setSavingId(null);
                              }
                            }}
                            className={`rounded-none text-xs ${dirty ? "bg-gold text-black hover:bg-gold-soft" : ""}`}
                          >
                            {savingId === p.id ? "Saving…" : dirty ? "Save" : "Saved"}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                        No pieces yet — add some in the Products tab.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "products" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-serif text-2xl">All Pieces</h2>
              {!showForm && (
                <Button onClick={() => { resetForm(); setShowForm(true); }} className="rounded-none">
                  <Plus className="w-4 h-4 mr-2" /> Add Piece
                </Button>
              )}
            </div>

            {showForm && (
              <Card className="p-6 md:p-8 border-border rounded-none bg-background">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-serif text-xl">{editingId ? "Edit Piece" : "New Piece"}</h3>
                  <button onClick={resetForm} className="text-muted-foreground hover:text-foreground">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} required className="rounded-none mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="price">Price (₦)</Label>
                    <Input id="price" type="number" min={0} step={500} value={draft.price} onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })} required className="rounded-none mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="oldPrice">Compare-at Price (₦, optional)</Label>
                    <Input id="oldPrice" type="number" min={0} step={500} value={draft.oldPrice ?? ""} onChange={(e) => setDraft({ ...draft, oldPrice: e.target.value ? Number(e.target.value) : null })} className="rounded-none mt-2" placeholder="Leave empty if no discount" />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={draft.category} onValueChange={(v) => setDraft({ ...draft, category: v as Category })}>
                      <SelectTrigger id="category" className="rounded-none mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="image">Image URL</Label>
                    <Input id="image" value={draft.image} onChange={(e) => setDraft({ ...draft, image: e.target.value })} required className="rounded-none mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">Try: /images/casual-1.png, /images/luxury-2.png, /images/street-1.png, /images/formal-1.png</p>
                  </div>
                  <div>
                    <Label htmlFor="popularity">Popularity (0–100)</Label>
                    <Input id="popularity" type="number" min={0} max={100} value={draft.popularity} onChange={(e) => setDraft({ ...draft, popularity: Number(e.target.value) })} required className="rounded-none mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="stockCount">Stock Count</Label>
                    <Input id="stockCount" type="number" min={0} value={draft.stockCount} onChange={(e) => setDraft({ ...draft, stockCount: Number(e.target.value) })} required className="rounded-none mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">Pieces ≤ 5 show "Only X left" urgency badge</p>
                  </div>
                  <div className="flex items-end pb-1">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={draft.isNew}
                        onChange={(e) => setDraft({ ...draft, isNew: e.target.checked })}
                        className="w-5 h-5 accent-[hsl(42_70%_55%)]"
                      />
                      <span className="text-sm">Mark as NEW (shows New badge)</span>
                    </label>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="sizes">Sizes (comma-separated)</Label>
                    <Input
                      id="sizes"
                      value={draft.sizes.join(", ")}
                      onChange={(e) => setDraft({ ...draft, sizes: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
                      className="rounded-none mt-2"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" rows={4} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} required className="rounded-none mt-2" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="styleTip">Style Tip (optional)</Label>
                    <Textarea id="styleTip" rows={2} value={draft.styleTip} onChange={(e) => setDraft({ ...draft, styleTip: e.target.value })} className="rounded-none mt-2" placeholder="How to style this piece — appears in a gold callout on the product page." />
                  </div>
                  <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                    <Button type="button" variant="outline" onClick={resetForm} className="rounded-none">Cancel</Button>
                    <Button type="submit" disabled={createProduct.isPending || updateProduct.isPending} className="rounded-none">
                      {editingId ? "Save Changes" : "Add Piece"}
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            <div className="overflow-x-auto bg-background border border-border">
              <table className="w-full text-sm">
                <thead className="bg-secondary/40 text-left">
                  <tr>
                    <th className="px-4 py-3 font-medium"></th>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium text-right">Price</th>
                    <th className="px-4 py-3 font-medium text-right">Stock</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(products as Product[]).map((p) => (
                    <tr key={p.id} className="border-t border-border hover:bg-secondary/20">
                      <td className="px-4 py-3 w-16">
                        <img src={p.image} alt={p.name} className="w-12 h-14 object-cover" />
                      </td>
                      <td className="px-4 py-3 font-medium">{p.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                      <td className="px-4 py-3 text-right">₦{p.price.toLocaleString("en-NG")}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">{p.stockCount}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => setEditingId(p.id)}
                            className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
                            aria-label="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-2 text-muted-foreground hover:text-destructive hover:bg-secondary transition-colors"
                            aria-label="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                        No pieces yet. Add your first one above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "site" && (
          <Card className="p-6 md:p-10 border-border rounded-none bg-background">
            <h2 className="font-serif text-2xl mb-6">Hero & Contact</h2>
            <form onSubmit={handleSaveSite} className="space-y-6 max-w-2xl">
              <div>
                <Label htmlFor="heroHeadline">Hero Headline</Label>
                <Input id="heroHeadline" value={siteDraft.heroHeadline} onChange={(e) => setSiteDraft({ ...siteDraft, heroHeadline: e.target.value })} required className="rounded-none mt-2" />
              </div>
              <div>
                <Label htmlFor="heroSubheading">Hero Subheading</Label>
                <Textarea id="heroSubheading" rows={2} value={siteDraft.heroSubheading} onChange={(e) => setSiteDraft({ ...siteDraft, heroSubheading: e.target.value })} required className="rounded-none mt-2" />
              </div>
              <div>
                <Label htmlFor="promoBanner">Promo Banner (top of every page)</Label>
                <Input id="promoBanner" value={siteDraft.promoBanner} onChange={(e) => setSiteDraft({ ...siteDraft, promoBanner: e.target.value })} className="rounded-none mt-2" placeholder="GET 10% OFF YOUR FIRST ORDER — USE CODE TBOYS10" />
              </div>
              <div>
                <Label htmlFor="tagline">Tagline (footer + about section)</Label>
                <Input id="tagline" value={siteDraft.tagline} onChange={(e) => setSiteDraft({ ...siteDraft, tagline: e.target.value })} className="rounded-none mt-2" placeholder="Wear the moment. Own the room." />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="ctaPrimary">Primary CTA Text</Label>
                  <Input id="ctaPrimary" value={siteDraft.heroCtaPrimary} onChange={(e) => setSiteDraft({ ...siteDraft, heroCtaPrimary: e.target.value })} required className="rounded-none mt-2" />
                </div>
                <div>
                  <Label htmlFor="ctaSecondary">Secondary CTA Text</Label>
                  <Input id="ctaSecondary" value={siteDraft.heroCtaSecondary} onChange={(e) => setSiteDraft({ ...siteDraft, heroCtaSecondary: e.target.value })} required className="rounded-none mt-2" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="whatsapp">WhatsApp Number</Label>
                  <Input id="whatsapp" value={siteDraft.whatsappNumber} onChange={(e) => setSiteDraft({ ...siteDraft, whatsappNumber: e.target.value })} required className="rounded-none mt-2" placeholder="e.g. 14155551234" />
                  <p className="text-xs text-muted-foreground mt-2">Include country code, no symbols.</p>
                </div>
                <div>
                  <Label htmlFor="email">Contact Email</Label>
                  <Input id="email" type="email" value={siteDraft.contactEmail} onChange={(e) => setSiteDraft({ ...siteDraft, contactEmail: e.target.value })} required className="rounded-none mt-2" />
                </div>
              </div>
              <div className="pt-2">
                <Button type="submit" disabled={updateSite.isPending} className="rounded-none">
                  Save Changes
                </Button>
              </div>
            </form>
          </Card>
        )}

        {tab === "subscribers" && (
          <Card className="p-6 md:p-10 border-border rounded-none bg-background">
            <h2 className="font-serif text-2xl mb-6">Newsletter Subscribers</h2>
            {subscribers.length === 0 ? (
              <p className="text-muted-foreground">No subscribers yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/40 text-left">
                    <tr>
                      <th className="px-4 py-3 font-medium">Email</th>
                      <th className="px-4 py-3 font-medium">Subscribed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((s) => (
                      <tr key={s.id} className="border-t border-border">
                        <td className="px-4 py-3">{s.email}</td>
                        <td className="px-4 py-3 text-muted-foreground">{new Date(s.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
