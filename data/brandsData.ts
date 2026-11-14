export interface BrandItem {
  id: string;
  name: string;
  tagline: string;
  category: string;
  origin: string;
  priceRange: string;
  description: string;
  badge?: string;
  features: string[];
}

export const BRANDS: BrandItem[] = [
  {
    id: "ray-ban",
    name: "Ray-Ban",
    tagline: "Timeless Icon & Global Legend",
    category: "Classic & Lifestyle",
    origin: "Italy",
    priceRange: "₹7,500 – ₹18,000",
    badge: "Most Popular",
    description: "Original Aviator, Wayfarer, and Clubmaster collections crafted for bold, confident identity.",
    features: ["Crystal clear mineral glass", "100% UV protection", "Heritage metal & acetate frames"]
  },
  {
    id: "oakley",
    name: "Oakley",
    tagline: "Precision Engineering & Sport Optics",
    category: "Performance & Active",
    origin: "USA",
    priceRange: "₹8,000 – ₹22,000",
    badge: "Engineered for Tech & Sports",
    description: "O-Matter™ ultra-lightweight stress-resistant frames engineered with high-definition optics for athletes and active professionals.",
    features: ["Unobtainium® non-slip grip", "Impact protection testing", "Prizm™ lens color tuning"]
  },
  {
    id: "stepper",
    name: "Stepper Titanium",
    tagline: "Pure Featherweight Comfort",
    category: "Executive & Titanium",
    origin: "Germany",
    priceRange: "₹6,500 – ₹16,000",
    badge: "Hypoallergenic Comfort",
    description: "Surgical-grade pure titanium and TX5 polymers designed for all-day comfort without nose-bridge pressure marks.",
    features: ["Zero-weight feel (<10 grams)", "100% corrosion resistant", "Ergonomic 3D bridge contour"]
  },
  {
    id: "prada",
    name: "Prada",
    tagline: "Milano Haute Couture",
    category: "Luxury Fashion",
    origin: "Milan, Italy",
    priceRange: "₹16,000 – ₹35,000",
    badge: "Haute Couture",
    description: "Sculpted architectural silhouettes and avant-garde luxury details for distinguished fashion statements.",
    features: ["Artisan Italian finishing", "Signature geometric temples", "Premium gradient lenses"]
  },
  {
    id: "tommy-hilfiger",
    name: "Tommy Hilfiger",
    tagline: "Modern American Prep",
    category: "Smart Casual & Office",
    origin: "USA",
    priceRange: "₹5,500 – ₹12,000",
    badge: "Workplace Favorite",
    description: "Crisp, tailored optical designs perfect for corporate workspaces and smart casual everyday wear.",
    features: ["Flexible spring hinges", "Contemporary dual-tone colorways", "Durable acetate construction"]
  },
  {
    id: "vogue",
    name: "Vogue Eyewear",
    tagline: "Trendsetting Everyday Elegance",
    category: "Chic & Contemporary",
    origin: "Italy",
    priceRange: "₹4,500 – ₹10,500",
    badge: "Contemporary Chic",
    description: "Vibrant palettes and playful modern silhouettes catering to urban youth, college students, and young professionals.",
    features: ["Lightweight profiles", "Trend-driven geometric shapes", "Soft pastel & crystal acetates"]
  }
];
