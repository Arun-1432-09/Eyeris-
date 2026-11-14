import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Eyeris Opticals | Standalone Luxury Eyewear & Hospital-Linked Precision | KPHB Hyderabad',
  description: 'Eyeris Opticals at KPHB Road No. 1, Kukatpally, Hyderabad. Curated Ray-Ban, Oakley, Prada, Stepper Titanium frames paired with German precision lenses. Directly interconnected with Global Eye Hospital. 40 years of optical family trust.',
  keywords: [
    'Eyeris Opticals',
    'Opticals in KPHB',
    'Opticals Kukatpally Hyderabad',
    'Ray-Ban Hyderabad',
    'Oakley glasses Hyderabad',
    'Global Eye Hospital opticals',
    'Corporate optical insurance reimbursement',
    'ZEISS DriveSafe lenses',
    'Progressive lenses Hyderabad',
    'Doctor prescription spectacles'
  ],
  authors: [{ name: 'Eyeris Opticals' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#08090C',
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background text-neutral-100 antialiased selection:bg-brand-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
