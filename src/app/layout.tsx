import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Self-hosted via next/font, exposed as CSS variables consumed in globals.css.
const serif = Bricolage_Grotesque({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://folionics.com";
const description =
  "Folionics is a Dallas-based web design and development studio building websites that earn their place. Eight years, 120+ projects shipped, 40+ industries.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Folionics — Web design & development studio",
    template: "%s · Folionics",
  },
  description,
  applicationName: "Folionics",
  keywords: [
    "web design studio",
    "web development",
    "Next.js agency",
    "Shopify Plus",
    "SEO",
    "Dallas web design",
    "headless commerce",
  ],
  authors: [{ name: "Folionics" }],
  creator: "Folionics",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Folionics",
    title: "Folionics — Web design & development studio",
    description,
    locale: "en_US",
    // TODO: add an app/opengraph-image.(tsx|png) file for a real social card.
  },
  twitter: {
    card: "summary_large_image",
    title: "Folionics — Web design & development studio",
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a3f3c" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="min-h-screen bg-bg font-sans text-text antialiased">
        {/* Fixed SVG-noise grain overlay: decorative, never interactive. */}
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
