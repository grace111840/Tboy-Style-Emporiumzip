import { db, productsTable, siteContentTable, reviewsTable, pool } from "@workspace/db";

const DEFAULT_SIZES = ["S", "M", "L", "XL"];
const SHOE_SIZES = ["40", "41", "42", "43", "44", "45"];

const products = [
  {
    id: "c1",
    name: "Lagos Heat Premium Tee",
    price: 18500,
    oldPrice: 25000,
    category: "Casual",
    image: "/images/casual-1.png",
    description:
      "Heavyweight 240gsm cotton, garment-dyed for that perfectly broken-in feel. Cut for an oversized, modern silhouette that drapes beautifully.",
    styleTip: "Pair with cargo trousers and chunky white sneakers for an elevated street look.",
    sizes: DEFAULT_SIZES,
    popularity: 95,
    stockCount: 8,
    isNew: true,
  },
  {
    id: "c2",
    name: "Atelier Knit — Champagne",
    price: 38500,
    category: "Casual",
    image: "/images/casual-2.png",
    description:
      "Soft merino-blend knit with ribbed cuffs and a relaxed crew neck. The ultimate everyday luxury layer.",
    styleTip: "Wear over a crisp white shirt with tailored trousers for smart-casual perfection.",
    sizes: DEFAULT_SIZES,
    popularity: 88,
    stockCount: 12,
    isNew: false,
  },
  {
    id: "c3",
    name: "Mayfair Leather Sneakers",
    price: 65000,
    category: "Casual",
    image: "/images/casual-3.png",
    description:
      "Full-grain leather upper with cushioned insole and Margom-style sole. Quiet luxury in every step.",
    styleTip: "Crisp denim and a knit polo — instant off-duty cool.",
    sizes: SHOE_SIZES,
    popularity: 92,
    stockCount: 5,
    isNew: true,
  },
  {
    id: "l1",
    name: "Sovereign Silk-Wool Blazer",
    price: 125000,
    oldPrice: 145000,
    category: "Luxury",
    image: "/images/luxury-1.png",
    description:
      "Avant-garde shoulder line, cut in pristine Italian silk-wool. The kind of piece that ends conversations.",
    styleTip: "Throw over a black tee and slim trousers — confidence requires no explanation.",
    sizes: DEFAULT_SIZES,
    popularity: 85,
    stockCount: 3,
    isNew: false,
  },
  {
    id: "l2",
    name: "Midnight Cashmere Overcoat",
    price: 185000,
    category: "Luxury",
    image: "/images/luxury-2.png",
    description:
      "Unlined double-faced cashmere — warmth without weight. The investment piece your wardrobe has been waiting for.",
    styleTip: "Layer over tailored separates for a quietly powerful winter silhouette.",
    sizes: DEFAULT_SIZES,
    popularity: 98,
    stockCount: 2,
    isNew: true,
  },
  {
    id: "l3",
    name: "Heritage Weekend Bag",
    price: 95000,
    category: "Luxury",
    image: "/images/luxury-3.png",
    description:
      "Pebble-grain calf leather, palladium hardware, suede-lined interior. The only travel companion you need.",
    styleTip: "Pairs effortlessly with a well-cut suit for the modern business traveller.",
    sizes: ["ONE SIZE"],
    popularity: 82,
    stockCount: 4,
    isNew: false,
  },
  {
    id: "s1",
    name: "TBOY'S Heavy Hoodie",
    price: 28500,
    oldPrice: 35000,
    category: "Streetwear",
    image: "/images/street-1.png",
    description:
      "500gsm French terry with dropped shoulders, double-lined hood and embroidered TBOY'S signature on the chest.",
    styleTip: "Layer under an overcoat or rock solo with cargo pants and Air Force 1s.",
    sizes: DEFAULT_SIZES,
    popularity: 90,
    stockCount: 15,
    isNew: true,
  },
  {
    id: "s2",
    name: "Tactical Cargo Trousers",
    price: 32000,
    category: "Streetwear",
    image: "/images/street-2.png",
    description:
      "Japanese tech nylon with articulated knees and concealed hardware. Built for the city, designed for the runway.",
    styleTip: "Cuff at the ankle and pair with statement sneakers for maximum impact.",
    sizes: DEFAULT_SIZES,
    popularity: 87,
    stockCount: 9,
    isNew: false,
  },
  {
    id: "f1",
    name: "Mayfair Black Tuxedo",
    price: 165000,
    category: "Formal",
    image: "/images/formal-1.png",
    description:
      "Super 150s wool with silk grosgrain peak lapels. Tailored for the unforgettable evenings.",
    styleTip: "The white pocket square is non-negotiable. Trust us.",
    sizes: DEFAULT_SIZES,
    popularity: 94,
    stockCount: 4,
    isNew: false,
  },
  {
    id: "f2",
    name: "Velvet Dinner Jacket — Midnight",
    price: 145000,
    oldPrice: 165000,
    category: "Formal",
    image: "/images/formal-2.png",
    description:
      "Rich cotton velvet with black silk peak lapels and covered buttons. The room remembers you.",
    styleTip: "Black slim trousers and patent loafers — dinner becomes an event.",
    sizes: DEFAULT_SIZES,
    popularity: 91,
    stockCount: 3,
    isNew: true,
  },
  {
    id: "f3",
    name: "Egyptian Poplin Dress Shirt",
    price: 22500,
    category: "Formal",
    image: "/images/casual-1.png",
    description:
      "Pure Egyptian cotton poplin with French cuffs and mother-of-pearl buttons. Foundation of every great wardrobe.",
    styleTip: "Wear with a knit tie and a navy blazer for boardroom-ready elegance.",
    sizes: DEFAULT_SIZES,
    popularity: 89,
    stockCount: 18,
    isNew: false,
  },
  {
    id: "s3",
    name: "Utility Tech Vest",
    price: 42500,
    category: "Streetwear",
    image: "/images/street-1.png",
    description:
      "Lightweight tech fabric with multi-pocket dimensional design and a two-way Riri zipper. Function meets form.",
    styleTip: "Layer over a long-sleeve tee for a sharp, lived-in city silhouette.",
    sizes: DEFAULT_SIZES,
    popularity: 84,
    stockCount: 7,
    isNew: true,
  },
];

const reviews: Array<{ productId: string; author: string; rating: number; text: string }> = [
  { productId: "c1", author: "Tunde A.", rating: 5, text: "Quality is unreal for the price. The fit is perfect and the cotton feels premium. Already ordered another colour." },
  { productId: "c1", author: "Chiamaka O.", rating: 5, text: "Got this for my boyfriend — he hasn't taken it off since. Solid weight, beautiful drape." },
  { productId: "c1", author: "David E.", rating: 4, text: "Runs a little oversized but that's the look. Love it." },
  { productId: "s1", author: "Kemi R.", rating: 5, text: "THIS HOODIE. Heavy, soft, the embroidery is so clean. Worth every naira." },
  { productId: "s1", author: "Ade O.", rating: 5, text: "Bought during the last drop, second purchase already. TBOY'S quality is consistent." },
  { productId: "l1", author: "Mr. Okafor", rating: 5, text: "Wore this to a board dinner — three people asked where it's from. Tailoring is exceptional." },
  { productId: "l2", author: "Femi B.", rating: 5, text: "The cashmere is buttery soft. Worth the investment — will last years." },
  { productId: "f1", author: "Bayo S.", rating: 5, text: "Got married in this. Photos look like a magazine cover. Thank you TBOY'S." },
  { productId: "c3", author: "Zara M.", rating: 5, text: "Bought for my brother's birthday. The leather quality is incredible and the box presentation is luxury level." },
  { productId: "s2", author: "Ifeanyi K.", rating: 4, text: "Fit is sharp. Material is heavier than expected (in a good way). Sizing runs slim, size up if you're between sizes." },
  { productId: "f3", author: "Emeka T.", rating: 5, text: "Best dress shirt I've owned. Period. Crisp, structured, doesn't lose shape after washing." },
  { productId: "s3", author: "Tobi A.", rating: 5, text: "The pockets! So many pockets. And it actually looks good — not bulky at all." },
];

async function main() {
  // Wipe existing rows so prices and new fields take effect cleanly
  await db.delete(productsTable);
  await db.delete(reviewsTable);

  for (const p of products) {
    await db.insert(productsTable).values(p);
  }

  for (const r of reviews) {
    await db.insert(reviewsTable).values(r);
  }

  await db
    .insert(siteContentTable)
    .values({
      id: 1,
      heroHeadline: "Wear The Moment.",
      heroSubheading:
        "Premium streetwear, formal & casual fits — handcrafted in Lagos for the bold and the brilliant.",
      heroCtaPrimary: "SHOP NEW DROPS",
      heroCtaSecondary: "EXPLORE LOOKBOOK",
      whatsappNumber: "2348012345678",
      contactEmail: "orders@tboysclothing.ng",
      promoBanner: "GET 10% OFF YOUR FIRST ORDER — USE CODE TBOYS10 AT CHECKOUT",
      tagline: "Wear the moment. Own the room.",
    })
    .onConflictDoUpdate({
      target: siteContentTable.id,
      set: {
        promoBanner: "GET 10% OFF YOUR FIRST ORDER — USE CODE TBOYS10 AT CHECKOUT",
        tagline: "Wear the moment. Own the room.",
      },
    });

  console.log(`Seeded ${products.length} products + ${reviews.length} reviews`);
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
