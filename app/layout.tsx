import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Outfit } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/json-ld";
import type { Organization, WithContext } from "schema-dts";


const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                process.env.NEXT_PUBLIC_APP_URL ||
                "https://cherith.co.ke";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Cherith GeoSystems | Land Surveying & Geospatial Services in Kenya",
    template: "%s | Cherith GeoSystems",
  },
  description: "Professional land surveying, cadastral surveys, boundary verification and subdivision services across Nairobi and Kenya. Request a survey consultation from Cherith GeoSystems.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Land Surveyors & Geospatial Services in Kenya | Cherith GeoSystems",
    description: "Professional land surveying, cadastral surveys, boundary verification and subdivision services across Nairobi and Kenya. Request a survey consultation from Cherith GeoSystems.",
    url: baseUrl,
    siteName: "Cherith GeoSystems",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Cherith GeoSystems | Land Surveying & Geospatial Services",
        type: "image/png",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Land Surveyors & Geospatial Services in Kenya | Cherith GeoSystems",
    description: "Professional land surveying, cadastral surveys, boundary verification and subdivision services across Nairobi and Kenya.",
    images: [`${baseUrl}/og-image.png`],
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },
};

const orgSchema: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cherith GeoSystems",
  alternateName: "Cherith Informatics & Mapping Ltd",
  url: baseUrl,
  logo: `${baseUrl}/icon.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+254 790 034 580",
    contactType: "customer service",
    email: "info@cherith.co.ke",
    areaServed: "KE",
    availableLanguage: "en",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Olympic House, 1st Floor, Room 104",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${outfit.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <JsonLd schema={orgSchema} />
        {children}
      </body>
    </html>
  );
}
