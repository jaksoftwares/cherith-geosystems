import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://cherith.co.ke");

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Cherith GeoSystems |  Geospatial Intelligence",
  description: "Advanced mapping, drone analytics, cadastral scanning and geographical insights based in Kenya.",
  openGraph: {
    title: "Cherith GeoSystems |  Geospatial Intelligence",
    description: "Advanced mapping, drone analytics, cadastral scanning and geographical insights based in Kenya.",
    url: baseUrl,
    siteName: "Cherith GeoSystems",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Cherith GeoSystems |  Geospatial Intelligence",
        type: "image/png",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cherith GeoSystems |  Geospatial Intelligence",
    description: "Advanced mapping, drone analytics, cadastral scanning and geographical insights based in Kenya.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
