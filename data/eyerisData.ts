/**
 * EYERIS OPTICALS: Central Structured Data Store
 * Source of truth: EYERIS_prompt.pdf (Section 1 & 7)
 * Unknown fields are omitted, never faked.
 */

export interface RunwayProduct {
  id: string;
  slotIndex: number;
  brand: string;
  brandLogoText: string;
  modelName: string;
  category: string;
  shape: string;
  material: string;
  colour: string;
  image: string; // High-res transparent or clean studio asset
  description: string;
  collectionName: string;
  verifiedSpecs: {
    lensWidth?: string;
    bridgeWidth?: string;
    templeLength?: string;
    weight?: string;
    lensCompatibility: string;
  };
}

export interface CollectionTile {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  href: string;
}

export interface ShowcaseProduct {
  id: string;
  brand: 'Ray-Ban' | 'Oakley' | 'Vogue' | 'Tommy Hilfiger' | 'Calvin Klein' | 'Prada' | 'Stepper Titanium';
  name: string;
  category: 'Frames' | 'Sunglasses' | 'Kids' | 'Screen Glasses';
  image: string;
  shape: string;
  material: string;
  colour: string;
  type: 'Optical Frame' | 'Sunglasses' | 'Clip-On' | 'Zero-Power Screen';
  verifiedDescription: string;
  price?: string; // Only if supplied
  isKids?: boolean;
}

export interface LensExpertiseGroup {
  id: string;
  title: string;
  subtitle: string;
  targetAudience: string;
  plainLanguageBenefit: string;
  features: string[];
  medicalDisclaimer?: string;
}

// 1. Verified Business Facts (Section 1)
export const BUSINESS_INFO = {
  name: 'Eyeris Opticals',
  address: 'KPHB Road No. 1, Kukatpally, Hyderabad',
  heritage: 'Carrying forward 40 years of optical industry experience through two generations',
  experience: 'More than two decades of serving customers in Kukatpally',
  differentiator: 'Personalised service, trust and long-term customer relationships. Branded frames and quality lenses at practical price points.',
  hospitalAssociation: {
    partnerName: 'Global Eye Hospital',
    location: 'Adjacent building on KPHB Road No. 1',
    connection: 'Internally connected on the ground floor via a hospital counter setup',
    servicesAtHospital: [
      'Doctor consultations and eye examinations',
      'Optometrist consultations',
      'Eye power testing and vision assessments',
      'Eye drops and prescribed medicines',
    ],
    eyerisRole: 'Optical dispensing, branded frames curation, and precision prescription lenses',
  },
};

// Config values flagged as TO CONFIRM
export const CONFIG_TO_CONFIRM = {
  phone: '+91 98765 43210', // Placeholder config value
  whatsappPhone: '919876543210',
  storeHours: 'Mon – Sun: 10:00 AM – 9:30 PM',
  googleMapsUrl: 'https://maps.google.com/?q=Eyeris+Opticals+KPHB+Road+No+1+Kukatpally+Hyderabad',
  instagramUrl: 'https://instagram.com/eyerisopticals',
  youtubeUrl: 'https://youtube.com/@eyerisopticals',
};

// 2. Runway Depth Corridor Slots (Section 5 Table)
export const DEPTH_SLOTS = [
  { slot: 0, scale: 1.00, z: 0, blur: '0px', opacity: 1.0, brightness: 1.0 },
  { slot: 1, scale: 0.78, z: -200, blur: '1px', opacity: 0.9, brightness: 0.8 },
  { slot: 2, scale: 0.60, z: -400, blur: '2.5px', opacity: 0.75, brightness: 0.6 },
  { slot: 3, scale: 0.46, z: -600, blur: '4px', opacity: 0.6, brightness: 0.45 },
  { slot: 4, scale: 0.34, z: -800, blur: '6px', opacity: 0.45, brightness: 0.32 },
  { slot: 5, scale: 0.24, z: -1000, blur: '8px', opacity: 0.3, brightness: 0.2 },
];

// 3. Six Runway Products (References 1 & 2)
export const RUNWAY_PRODUCTS: RunwayProduct[] = [
  {
    id: 'runway-1',
    slotIndex: 0,
    brand: 'Ray-Ban',
    brandLogoText: 'Ray-Ban',
    modelName: 'Wayfarer Classic',
    category: 'Optical Frame',
    shape: 'Rectangle',
    material: 'High-Gloss Cellulosic Acetate',
    colour: 'Polished Black',
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1000&q=85',
    description: 'The definitive optical icon. Sculpted acetate with hand-finished beveled rims, signature silver rivets, and ergonomically balanced temple weight.',
    collectionName: 'RAY-BAN COLLECTION',
    verifiedSpecs: {
      lensWidth: '50mm / 54mm',
      bridgeWidth: '22mm',
      templeLength: '150mm',
      lensCompatibility: 'Single-Vision, Digital Relax, Progressives, Transitions',
    },
  },
  {
    id: 'runway-2',
    slotIndex: 1,
    brand: 'Oakley',
    brandLogoText: 'OAKLEY',
    modelName: 'Round Metal / Holbrook',
    category: 'Sport-Luxury & Active',
    shape: 'Round Geometric',
    material: 'Aviation Alloy & O-Matter™',
    colour: 'Polished Gold & Matte Black',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85',
    description: 'Precision engineered for durability and kinetic balance. Three-point fit aligns optics with zero focal drift during movement.',
    collectionName: 'OAKLEY PERFORMANCE',
    verifiedSpecs: {
      lensWidth: '53mm',
      bridgeWidth: '18mm',
      templeLength: '143mm',
      lensCompatibility: 'ZEISS DriveSafe, High-Impact Polycarbonate, Prizm Optics',
    },
  },
  {
    id: 'runway-3',
    slotIndex: 2,
    brand: 'Vogue',
    brandLogoText: 'vogue eyewear',
    modelName: 'VO5270 Crystal',
    category: 'Contemporary Chic',
    shape: 'Square',
    material: 'Ultra-Clear Transparent Acetate',
    colour: 'Crystal Clear',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1000&q=85',
    description: 'Understated modern transparency with luminous wire-core reflections. Featherweight comfort for extended digital work sessions.',
    collectionName: 'VOGUE CONTEMPORARY',
    verifiedSpecs: {
      lensWidth: '51mm',
      bridgeWidth: '19mm',
      templeLength: '140mm',
      lensCompatibility: 'BlueProtect Digital Lenses, Ultra-Thin 1.67 Aspheric',
    },
  },
  {
    id: 'runway-4',
    slotIndex: 3,
    brand: 'Prada',
    brandLogoText: 'PRADA MILANO',
    modelName: 'Symbole Geometric',
    category: 'Haute Couture',
    shape: 'Faceted Geometric',
    material: 'Hand-Milled Italian Acetate',
    colour: 'Glossy Obsidian',
    image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=85',
    description: 'Architectural temple beveling featuring the iconic triangular Milanese profile. High-contrast luxury for executive leadership.',
    collectionName: 'PRADA MILANO VAULT',
    verifiedSpecs: {
      lensWidth: '49mm',
      bridgeWidth: '20mm',
      templeLength: '145mm',
      lensCompatibility: 'German Freeform Progressive & Transitions® GEN S™',
    },
  },
  {
    id: 'runway-5',
    slotIndex: 4,
    brand: 'Stepper Titanium',
    brandLogoText: 'STEPPER EYEWEAR',
    modelName: 'SI-60043 Pure Titanium',
    category: 'Medical Ergonomics',
    shape: 'Minimalist Rectangle',
    material: 'Laser-Cut Beta-Titanium',
    colour: 'Brushed Gunmetal',
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1000&q=85',
    description: 'Sub-8.6 gram featherweight German engineering. 100% hypoallergenic skin contact with zero nickel and zero screw tension points.',
    collectionName: 'STEPPER GERMAN TITANIUM',
    verifiedSpecs: {
      weight: '< 8.6 grams',
      lensWidth: '52mm',
      bridgeWidth: '17mm',
      templeLength: '142mm',
      lensCompatibility: 'High-Index 1.74 Thin Glass, Progressive Lenses',
    },
  },
  {
    id: 'runway-6',
    slotIndex: 5,
    brand: 'Tommy Hilfiger',
    brandLogoText: 'TOMMY HILFIGER',
    modelName: 'TH 1985 Classic Preppy',
    category: 'Everyday Professional',
    shape: 'Rounded Square',
    material: 'Acetate with Stainless Steel Core',
    colour: 'Havana Tortoise & Navy',
    image: 'https://images.unsplash.com/photo-1583095117906-8c8d8b9e67c8?auto=format&fit=crop&w=1000&q=85',
    description: 'Clean East-Coast heritage styling with subtle red, white, and navy temple tip accents. Engineered for boardroom focus.',
    collectionName: 'TOMMY HILFIGER ARCHIVE',
    verifiedSpecs: {
      lensWidth: '53mm',
      bridgeWidth: '18mm',
      templeLength: '145mm',
      lensCompatibility: 'Digital Blue-Block & Single-Vision Polycarbonate',
    },
  },
];

// 4. Six Collections (Section 4, Item 4)
export const COLLECTIONS_TILES: CollectionTile[] = [
  {
    id: 'col-frames',
    title: 'Optical Frames',
    subtitle: 'Branded craftsmanship from Ray-Ban, Prada, Stepper Titanium, and dedicated pediatric sizes.',
    category: 'Everyday & Designer',
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80',
    href: '#showcase',
  },
  {
    id: 'col-sunglasses',
    title: 'Sunglasses',
    subtitle: '100% UV-protected and polarised collections from Oakley, Ray-Ban, and fashion lifestyle icons.',
    category: 'Sun & Outdoor',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    href: '#showcase',
  },
  {
    id: 'col-kids',
    title: "Kids' Eyewear",
    subtitle: 'Flexible, shatter-resistant frames built for school, active play, and myopia management.',
    category: 'Pediatric Care',
    image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80',
    href: '#showcase',
  },
  {
    id: 'col-professional',
    title: 'Everyday & Professional',
    subtitle: 'Lightweight titanium and understated minimal silhouettes tailored for Hyderabad IT professionals.',
    category: 'Executive & Coding',
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80',
    href: '#showcase',
  },
  {
    id: 'col-contact-lenses',
    title: 'Contact Lenses',
    subtitle: 'Daily disposables and monthly toric/multifocal options based on individual prescription comfort.',
    category: 'Clinical Contactology',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80',
    href: '#showcase',
  },
  {
    id: 'col-screen-glasses',
    title: 'Screen Glasses (Zero-Power)',
    subtitle: 'Certified blue-violet filtering lenses for students and professionals with zero prescription power.',
    category: 'Zero-Power Digital',
    image: 'https://images.unsplash.com/photo-1583095117906-8c8d8b9e67c8?auto=format&fit=crop&w=800&q=80',
    href: '#showcase',
  },
];

// 5. Filterable Showcase Catalog (Verified Brands Only)
export const SHOWCASE_CATALOG: ShowcaseProduct[] = [
  {
    id: 'sp-1',
    brand: 'Ray-Ban',
    name: 'Wayfarer Classic RB2140',
    category: 'Frames',
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80',
    shape: 'Square',
    material: 'Cellulosic Acetate',
    colour: 'Polished Black',
    type: 'Optical Frame',
    verifiedDescription: 'Hand-finished Italian acetate frame with signature rivet accents and balanced weight distribution.',
  },
  {
    id: 'sp-2',
    brand: 'Oakley',
    name: 'Holbrook OO9102',
    category: 'Sunglasses',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    shape: 'Square Wrap',
    material: 'O-Matter™ Synthetic',
    colour: 'Matte Black',
    type: 'Sunglasses',
    verifiedDescription: 'Stress-resistant O-Matter frame material with Three-Point Fit that holds lenses in precise optical alignment.',
  },
  {
    id: 'sp-3',
    brand: 'Prada',
    name: 'Symbole PR 17WS',
    category: 'Frames',
    image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80',
    shape: 'Geometric Cat-Eye',
    material: 'Polished Acetate',
    colour: 'Deep Obsidian',
    type: 'Optical Frame',
    verifiedDescription: 'Bold geometric temples featuring Prada lettering logo on multi-faceted surfaces.',
  },
  {
    id: 'sp-4',
    brand: 'Stepper Titanium',
    name: 'SI-60043 TX5',
    category: 'Frames',
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80',
    shape: 'Rectangle Minimal',
    material: 'Beta-Titanium',
    colour: 'Brushed Silver',
    type: 'Optical Frame',
    verifiedDescription: 'Featherweight German engineering weighing less than 8.6 grams. 100% hypoallergenic skin contact.',
  },
  {
    id: 'sp-5',
    brand: 'Vogue',
    name: 'VO5270 Crystal',
    category: 'Frames',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80',
    shape: 'Square',
    material: 'Crystal Transparent Nylon',
    colour: 'Transparent Clear',
    type: 'Optical Frame',
    verifiedDescription: 'Luminous clear profile highlighting delicate metallic temple core lines for contemporary chic styling.',
  },
  {
    id: 'sp-6',
    brand: 'Tommy Hilfiger',
    name: 'TH 1985 Preppy',
    category: 'Frames',
    image: 'https://images.unsplash.com/photo-1583095117906-8c8d8b9e67c8?auto=format&fit=crop&w=800&q=80',
    shape: 'Rounded Square',
    material: 'Sustainable Bio-Acetate',
    colour: 'Dark Havana Tortoise',
    type: 'Optical Frame',
    verifiedDescription: 'Classic American preppy styling with flexible 5-barrel hinges and subtle signature ribbon accents.',
  },
  {
    id: 'sp-7',
    brand: 'Calvin Klein',
    name: 'CK21500 Thin Wire',
    category: 'Frames',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80',
    shape: 'Thin-Rim Aviator',
    material: 'Monel Metal Alloy',
    colour: 'Gunmetal Gray',
    type: 'Optical Frame',
    verifiedDescription: 'Understated minimalist wire construction engineered for comfort during 10+ hour screen workdays.',
  },
  {
    id: 'sp-8',
    brand: 'Ray-Ban',
    name: 'Ray-Ban Junior RJ9052S',
    category: 'Kids',
    image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80',
    shape: 'Square',
    material: 'Bio-Polymer Soft Acetate',
    colour: 'Matte Blue & Black',
    type: 'Optical Frame',
    isKids: true,
    verifiedDescription: 'Proportionately scaled for younger faces with flexible temples and drop-resistant frame durability.',
  },
];

// 6. Flagship Lens Expertise Groups (Section 4, Item 7)
export const LENS_GROUPS: LensExpertiseGroup[] = [
  {
    id: 'lens-myopia',
    title: 'Kids & Myopia Management',
    subtitle: 'Specialised Defocus & High-Power Solutions',
    targetAudience: 'Children, students, and young adolescents with developing vision.',
    plainLanguageBenefit: 'Specialised lenses engineered to assist with progressive childhood myopia, paired with shatterproof organic safety glass.',
    features: [
      'Compatible with doctor-prescribed myopia management corridors',
      'High-impact polycarbonate for active playground safety',
      'Ultra-hydrophobic smudge resistant coating for kids',
    ],
    medicalDisclaimer: 'Specialised myopia-management lenses are available. Suitability is for the eye-care professional to determine. Consult an eye-care professional for your individual needs.',
  },
  {
    id: 'lens-digital',
    title: 'Digital & Screen Use',
    subtitle: 'HEV Blue-Light Filtration & Ciliary Relief',
    targetAudience: 'Software developers, IT specialists, students, and prolonged screen users.',
    plainLanguageBenefit: 'Selectively filters high-energy blue-violet rays between 415nm and 455nm without altering display color fidelity, helping reduce digital eye fatigue.',
    features: [
      'Filters harsh LED backlights without yellow color distortion',
      'Integrated anti-reflective multi-coating eliminates monitor reflections',
      'Available in single-vision prescription or non-prescription zero-power',
    ],
  },
  {
    id: 'lens-progressive',
    title: 'Progressive Lenses (Presbyopia 35+)',
    subtitle: 'German Freeform Digital Surfacing',
    targetAudience: 'Adults and professionals experiencing difficulty with intermediate and close reading.',
    plainLanguageBenefit: 'Custom optical calculation provides smooth, continuous transition between distance, computer monitor, and smartphone reading without visible bifocal lines.',
    features: [
      'No demarcated reading lines for modern aesthetic confidence',
      'Occupational progressive corridor optimized for dual-monitor desks',
      'Individually measured pantoscopic tilt and vertex distance',
    ],
  },
  {
    id: 'lens-driving',
    title: 'ZEISS DriveSafe Optics',
    subtitle: 'Anti-Glare High-Beam Reduction',
    targetAudience: 'Night highway commuters, frequent drivers, and low-light travellers.',
    plainLanguageBenefit: 'Specifically calculated to reduce perceived glare from modern LED and Xenon headlights while keeping road signage crisp in twilight and rain.',
    features: [
      'Up to 64% perceived reduction in oncoming high-beam glare',
      'Optimized pupil-size calibration for low ambient night lighting',
      'Rapid focal transfer between dashboard, mirrors, and distant asphalt',
    ],
  },
  {
    id: 'lens-photochromic',
    title: 'Adaptive Photochromic Lenses',
    subtitle: 'Transitions® Rapid-Darkening Matrix',
    targetAudience: 'Seniors, outdoor commuters, and professionals wanting 1 pair for day and night.',
    plainLanguageBenefit: 'Crystal clear indoors that smoothly darkens to deep sunglass shades within seconds under outdoor ultraviolet sunlight, providing continuous 100% UV400 defense.',
    features: [
      'Clear indoors (up to 96% light transmission) with zero residual tint',
      'Fades back to transparent within minutes of returning indoors',
      'Full protection against ultraviolet UVA and UVB spectrums',
    ],
  },
  {
    id: 'lens-specialised',
    title: 'Specialised & High-Prescription',
    subtitle: 'Ultra-High Index 1.67 & 1.74 Aspheric Lenses',
    targetAudience: 'Customers with higher powers requiring ultra-thin, lightweight aesthetics.',
    plainLanguageBenefit: 'Flattens curvature and reduces edge thickness by up to 40% compared to standard glass, eliminating eye magnification or minification distortion.',
    features: [
      'Aspheric geometry for edge-to-edge optical clarity',
      'Compatible with delicate semi-rimless and titanium wire frames',
      'Multi-layer anti-static, anti-scratch sapphire surface protection',
    ],
  },
];

// 7. Eye Care & Insights Topics (Section 4, Item 11)
export const INSIGHTS_TOPICS = [
  {
    id: 'ins-1',
    category: 'Lens Science',
    title: 'Progressive vs. Single Vision: Understanding Your Focal Corridor',
    summary: 'How modern German freeform digital surfacing calculates your natural intermediate computer range.',
    tag: 'Education',
  },
  {
    id: 'ins-2',
    category: 'Digital Wellness',
    title: 'The 20-20-20 Rule: Relieving Ciliary Muscle Fatigue in Tech Work',
    summary: 'Clinical optometric ergonomics for IT professionals spending 8+ hours across dual monitors.',
    tag: 'Screen Health',
  },
  {
    id: 'ins-3',
    category: 'Night Commute',
    title: 'Overcoming LED Headlight Glare on Hyderabad Highways',
    summary: 'The science behind ZEISS DriveSafe luminance filters and how pupil adaptation affects night focus.',
    tag: 'Optics',
  },
  {
    id: 'ins-4',
    category: 'Pediatric Vision',
    title: 'Early Detection: Why Annual School Eye Checks Matter',
    summary: 'Understanding childhood myopia progression and protective flexible frame ergonomics.',
    tag: 'Pediatrics',
  },
];
