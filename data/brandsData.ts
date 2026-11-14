export interface TrendingFrame {
  id: string;
  brand: "Ray-Ban" | "Oakley" | "Prada" | "Stepper Titanium" | "Tommy Hilfiger" | "Calvin Klein" | "Vogue Eyewear";
  modelName: string;
  tagline: string;
  image: string;
  category: "Optical" | "Sunglasses" | "Sport" | "Haute Couture";
  material: string;
  weight: string;
  faceShape: "Square" | "Round" | "Oval" | "Heart" | "All Face Shapes";
  priceGuide: string;
  lensTech: string;
  badge?: string;
  description: string;
}

export const TRENDING_FRAMES: TrendingFrame[] = [
  {
    id: "rayban-reverse-wayfarer",
    brand: "Ray-Ban",
    modelName: "Reverse Wayfarer (RBR0502S)",
    tagline: "World's First Concave Inverted Lens Design",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85",
    category: "Sunglasses",
    material: "Bio-Based Acetate",
    weight: "26g",
    faceShape: "Square",
    priceGuide: "₹10,500",
    lensTech: "Bio-Nylon Concave Optics • 100% UV400",
    badge: "Trending Worldwide",
    description: "Follows natural facial curves with revolutionary inverted concave lenses that reduce glare by 70%."
  },
  {
    id: "oakley-hex-jector",
    brand: "Oakley",
    modelName: "Hex Jector Tech Optical",
    tagline: "Top Prescription Choice for Hyderabad Software Developers",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85",
    category: "Optical",
    material: "O-Matter™ + Ace-Fit Adjustable Temples",
    weight: "18g",
    faceShape: "Round",
    priceGuide: "₹9,200",
    lensTech: "Compatible with ZEISS BlueGuard & DriveSafe",
    badge: "IT Hub Favorite",
    description: "Stress-resistant featherweight O-Matter frame with Trubridge nosepads. Zero slippage during 10+ hr screen marathons."
  },
  {
    id: "prada-symbole-sculpted",
    brand: "Prada",
    modelName: "Prada Symbole Geometric (PR 17WS)",
    tagline: "Sculptural Haute Couture Architectural Statement",
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85",
    category: "Haute Couture",
    material: "Hand-Polished Mazzucchelli Italian Acetate",
    weight: "32g",
    faceShape: "Oval",
    priceGuide: "₹24,500",
    lensTech: "Signature Deep Tint • Anti-Reflective Inner Coat",
    badge: "Runway Icon",
    description: "Bold faceted temples adorned with Prada's iconic triangle emblem. Architectural luxury crafted in Milan."
  },
  {
    id: "stepper-pure-titanium",
    brand: "Stepper Titanium",
    modelName: "Stepper SI-60043 Beta-Titanium",
    tagline: "Sub-9g Zero-Pressure Ergonomic German Precision",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1200&q=85",
    category: "Optical",
    material: "100% Pure Surgical Beta-Titanium & TX5",
    weight: "8.6g",
    faceShape: "All Face Shapes",
    priceGuide: "₹11,400",
    lensTech: "Optimized for German Freeform Progressives",
    badge: "Featherweight <9g",
    description: "Hypoallergenic titanium eliminates all nasal pressure marks. Designed for executive all-day comfort."
  },
  {
    id: "tommy-hilfiger-executive",
    brand: "Tommy Hilfiger",
    modelName: "TH 1957 Executive Half-Rim",
    tagline: "Smart Corporate Distinction for Tech Leaders",
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=85",
    category: "Optical",
    material: "Monel Metal + Cellulose Acetate",
    weight: "21g",
    faceShape: "Oval",
    priceGuide: "₹7,800",
    lensTech: "Digital Blue-Cut & Anti-Glare Ready",
    badge: "Corporate Pick",
    description: "Crisp architectural browline with flexible spring hinges. Clean professional styling for boardroom and coding."
  },
  {
    id: "calvin-klein-titanium",
    brand: "Calvin Klein",
    modelName: "CK Minimalist Titanium Rimless",
    tagline: "Understated Elegance & Pure Minimalism",
    image: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=1200&q=85",
    category: "Optical",
    material: "Ultra-Fine Japanese Titanium",
    weight: "9.8g",
    faceShape: "Heart",
    priceGuide: "₹8,600",
    lensTech: "High-Index 1.67 Shatter-Proof Polycarbonate",
    badge: "Pure Minimalist",
    description: "Frameless rimless silhouette for an unobstructed field of vision. Featherweight feel with zero distraction."
  },
  {
    id: "rayban-clubmaster-classic",
    brand: "Ray-Ban",
    modelName: "Clubmaster Classic Gold",
    tagline: "Mid-Century Intellectual Poise Since 1986",
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85",
    category: "Optical",
    material: "Cellulose Acetate + 24K Gold Plated Bridge",
    weight: "24g",
    faceShape: "Heart",
    priceGuide: "₹8,900",
    lensTech: "BlueProtect Anti-Fatigue Clear Optics",
    badge: "Classic Essential",
    description: "The retro browline masterpiece popularized by visionaries. Combines polished tortoiseshell with gold bridge accents."
  },
  {
    id: "vogue-contemporary-chic",
    brand: "Vogue Eyewear",
    modelName: "Vogue VO5422S Geometric Cat-Eye",
    tagline: "Effortless Everyday Milanese Chic",
    image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1200&q=85",
    category: "Sunglasses",
    material: "Lightweight High-Gloss Acetate",
    weight: "22g",
    faceShape: "Square",
    priceGuide: "₹6,800",
    lensTech: "Gradient UV400 Protection",
    badge: "Contemporary Chic",
    description: "Soft geometric facets and warm gradient lenses designed for women who demand subtle everyday distinction."
  }
];

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
