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

export const metadata: Metadata = {
  metadataBase: new URL("https://cherithgeosystems.com"),
  title: "Cherith GeoSystems | Strategic Geospatial Intelligence",
  description: "Advanced mapping, drone analytics, cadastral scanning and geographical insights based in Kenya.",
  openGraph: {
    title: "Cherith GeoSystems | Strategic Geospatial Intelligence",
    description: "Advanced mapping, drone analytics, cadastral scanning and geographical insights based in Kenya.",
    url: "https://cherithgeosystems.com",
    siteName: "Cherith GeoSystems",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cherith GeoSystems Logo",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cherith GeoSystems | Strategic Geospatial Intelligence",
    description: "Advanced mapping, drone analytics, cadastral scanning and geographical insights based in Kenya.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
