export interface ReelItem {
  id: string;
  title: string;
  hook: string;
  duration: string;
  views: string;
  category: "Doctor Talk" | "Styling Guide" | "Lens Science" | "Corporate Claim";
  speaker: string;
  tag: string;
  description: string;
  keyPoints: string[];
  ctaText: string;
}

export const REELS: ReelItem[] = [
  {
    id: "reel-doctor-screen-strain",
    title: "Why Cheap Blue-Cut Glasses Don't Stop Eye Strain",
    hook: "Ophthalmologist explains the 20-20-20 rule vs optical accommodative lenses",
    duration: "0:58",
    views: "48.2K views",
    category: "Doctor Talk",
    speaker: "Dr. Consulting Ophthalmologist, Global Eye Hospital",
    tag: "Eye Health Awareness",
    description: "Most online yellow-tint glasses only block blue light but don't relieve ciliary muscle fatigue caused by 9-hour code sprints. Discover how micro-boost digital progressive lenses actually relax your eyes.",
    keyPoints: [
      "Why ciliary spasm causes post-work migraines and dry eyes",
      "Difference between cheap surface tint vs molecular blue-filtering",
      "Why walking next door from Global Eye Hospital guarantees clinical prescription accuracy"
    ],
    ctaText: "Book 14-Point Digital Eye Checkup"
  },
  {
    id: "reel-it-corporate-claim",
    title: "How Hyderabad IT Employees Claim ₹20,000 for Eyewear",
    hook: "Maximize your corporate health insurance before your policy year resets",
    duration: "1:15",
    views: "92.6K views",
    category: "Corporate Claim",
    speaker: "Eyeris Senior Optometrist",
    tag: "Corporate Reimbursement",
    description: "Did you know major tech companies (TCS, Infosys, Microsoft, Amazon, Google, Cognizant, Wipro) provide up to ₹15,000–₹25,000 optical reimbursement? Here is how to get an authentic GST medical prescription bill with zero hassle.",
    keyPoints: [
      "Itemized GST invoice formatted for insurance claims",
      "Doctor verified prescription stamped by Global Eye Hospital optometrists",
      "Pairing Ray-Ban/Oakley frames with premium ZEISS/Crizal lenses under limit"
    ],
    ctaText: "Check My Corporate Claim Eligibility"
  },
  {
    id: "reel-progressive-myths",
    title: "Turning 38? Why Progressives No Longer Make You Feel Dizzy",
    hook: "The end of head-bobbing and reading-glass headaches",
    duration: "1:04",
    views: "34.1K views",
    category: "Lens Science",
    speaker: "Master Dispensing Optician, Eyeris",
    tag: "Lens Innovation",
    description: "Old-generation progressive lenses had narrow reading corridors that made people stumble. Modern German-engineered digital freeform lenses calculate your exact posture and computer distance.",
    keyPoints: [
      "Digital back-surface freeform technology eliminates distortion",
      "Immediate adaptation period (under 48 hours)",
      "One seamless lens for your laptop screen, smartphone, and highway driving"
    ],
    ctaText: "Book Free Progressive Trial"
  },
  {
    id: "reel-frame-styling",
    title: "Which Frame Suits Your Face Shape? (Ray-Ban vs Oakley vs Stepper)",
    hook: "Styling breakdown: Oval, Square, Round & Heart Face Shapes",
    duration: "1:22",
    views: "67.4K views",
    category: "Styling Guide",
    speaker: "Eyeris Eyewear Stylist",
    tag: "In-Store Styling",
    description: "Never buy a frame based solely on how it looks on a website mockup. See how temple width, bridge elevation, and skin-tone acetate matching transform your face contour.",
    keyPoints: [
      "Square jaws ➔ Round & Panto shapes (Ray-Ban Round Metal, Clubmaster)",
      "Round faces ➔ Angular geometric frames & rectangular O-Matter (Oakley Hex Jector)",
      "Heavy nose marks? ➔ Featherweight Stepper Titanium (<9.5g)"
    ],
    ctaText: "Reserve Personal In-Store Styling Slot"
  }
];
