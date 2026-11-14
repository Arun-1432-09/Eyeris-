import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EYERIS OPTICALS | Cinematic Luxury Eyewear & Precision Optical Care',
  description:
    'Where Personal Style Meets Precision Vision. Discover curated designer frames from Ray-Ban, Oakley, Prada & Stepper Titanium paired with bespoke German-engineered lenses at KPHB Road No. 1, Hyderabad. Ground-floor linked to Global Eye Hospital.',
  keywords: [
    'Eyeris Opticals',
    'Luxury Eyewear Hyderabad',
    'Opticals in KPHB Road 1',
    'Global Eye Hospital optical partner',
    'Ray-Ban authorized store Kukatpally',
    'Oakley sports optics',
    'Stepper Titanium featherweight frames',
    'Prada eyewear Hyderabad',
    'ZEISS DriveSafe lenses',
    'Corporate IT optical allowance claim',
    'Pediatric myopia control glasses',
    'Digital progressive lenses'
  ],
  authors: [{ name: 'EYERIS OPTICALS' }],
  openGraph: {
    title: 'EYERIS OPTICALS | Where Personal Style Meets Precision Vision',
    description: 'Hyderabad’s premier standalone optical boutique. Curated designer frames paired with precision optical craftsmanship.',
    type: 'website',
    locale: 'en_IN',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#08090B',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Manrope:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background text-ivory-100 antialiased selection:bg-brand-400 selection:text-black">
        {children}
      </body>
    </html>
  );
}
