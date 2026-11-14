export interface LensCategory {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  targetUser: string;
  keyBenefits: string[];
  techSpecs: string[];
  priceEstimate: string;
}

export const LENS_CATEGORIES: LensCategory[] = [
  {
    id: "it-digital-protect",
    title: "Digital Relax & Blue-Block Pro",
    subtitle: "Engineered for 8+ Hours Software & Screen Work",
    badge: "IT Professional Choice",
    targetUser: "Software engineers, developers, data analysts, tech workers",
    keyBenefits: [
      "Filters harmful 415-455nm blue-violet spike without sickly yellow color cast",
      "Micro-boost accommodative power reduces ciliary muscle fatigue by 68%",
      "Multi-layer hydrophobic & anti-static coating repels screen smudges & dust"
    ],
    techSpecs: ["1.60 / 1.67 High-Index Thin Optics", "Smart BlueProtect Filter", "Super Anti-Glare (99.6% light transmission)"],
    priceEstimate: "₹4,500 – ₹12,000 (Fully claimable under IT optical allowance)"
  },
  {
    id: "progressive-vision",
    title: "Personalized Digital Progressive Lenses",
    subtitle: "Seamless Vision at Near, Screen, and Distance (35+ Yrs)",
    badge: "No Line / Natural Transition",
    targetUser: "Professionals & leaders aged 35+ who need reading + laptop + driving vision",
    keyBenefits: [
      "Zero 'swim effect' or peripheral distortion when turning head",
      "Wide corridor customized to your specific posture and desk distance",
      "Eliminates the hassle of switching between reading glasses and regular specs"
    ],
    techSpecs: ["Freeform Digital Back-Surface Surfacing", "Individual Pantoscopic Tilt Calibration", "Instant Adaptation Guarantee"],
    priceEstimate: "₹8,500 – ₹28,000"
  },
  {
    id: "zeiss-drivesafe",
    title: "ZEISS DriveSafe & Night Optics",
    subtitle: "High-Contrast Glare Protection for Commuting in Hyderabad",
    badge: "Night Commute Safety",
    targetUser: "Daily car drivers, bikers, and night commuters facing high-beam LED glare",
    keyBenefits: [
      "Up to 64% reduction in perceived glare from oncoming LED headlights",
      "Optimized pupil-size technology provides razor-sharp vision in dusk and rainy weather",
      "Swift focal shift between dashboard, side mirrors, and open road ahead"
    ],
    techSpecs: ["ZEISS Luminance Design®", "DuraVision DriveSafe Anti-Reflective Coating", "UV400 Total Block"],
    priceEstimate: "₹9,500 – ₹24,000"
  },
  {
    id: "myopia-control",
    title: "Pediatric Myopia Management",
    subtitle: "Slows Down Vision Deterioration in Children & Teens",
    badge: "Pediatric Eye Health",
    targetUser: "School students and children (ages 6–16) with growing eye power",
    keyBenefits: [
      "Clinically proven to decelerate axial eye elongation and power increase",
      "Shatter-proof polycarbonate and impact-resistant materials for child safety",
      "Formulated for heavy study, tablet usage, and outdoor play"
    ],
    techSpecs: ["DIMS / Defocus Technology", "Impact Resistant Trivex", "Scratch-Armor Shield"],
    priceEstimate: "₹7,000 – ₹18,000"
  },
  {
    id: "photochromic-transitions",
    title: "Adaptive Transitions® Gen S",
    subtitle: "Crystal Clear Indoors, Instant Sun Glass Protection Outdoors",
    badge: "2-in-1 Convenience",
    targetUser: "Anyone seeking one versatile pair for indoor office work and bright outdoor sunlight",
    keyBenefits: [
      "Darkens within seconds of UV exposure and fades back clear indoors in under 2 minutes",
      "Dynamic tint colors: Emerald, Sapphire, Amber, Gray, and Graphite Green",
      "Blocks 100% of UVA and UVB rays"
    ],
    techSpecs: ["Fast-Fade Nanocrystal Matrix", "Indoor Class-0 Clarity", "Outdoor Category-3 Sunglasses Density"],
    priceEstimate: "₹6,000 – ₹16,500"
  }
];
