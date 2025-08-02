import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hochzeit Doro & Felix",
  description: "Die Hochzeits-Foto-Seite von Doro und Felix. Hier können Gäste Fotos hochladen und den besonderen Tag mit uns teilen.",
  keywords: ["Hochzeit", "Doro", "Felix", "Fotos", "Upload", "Gäste"],
  authors: [{ name: "Clemens & Cila" }],
  creator: "Clemens & Cila",
  publisher: "Hochzeit Doro & Felix",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://hochzeit-doro.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Hochzeit Doro & Felix",
    description: "Die Hochzeits-Foto-Seite von Doro und Felix. Hier können Gäste Fotos hochladen und den besonderen Tag mit uns teilen.",
    url: 'https://hochzeit-doro.vercel.app',
    siteName: 'Hochzeit Doro & Felix',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Elegantes Hochzeitsmonogram für Doro und Felix',
      },
    ],
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hochzeit Doro & Felix",
    description: "Die Hochzeits-Foto-Seite von Doro und Felix. Hier können Gäste Fotos hochladen und den besonderen Tag mit uns teilen.",
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // Optional: Falls Sie Google Search Console verwenden
  },
  icons: {
    icon: '/icon',
    apple: '/apple-icon',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/waf4hav.css" />
        <meta name="theme-color" content="#fbbf24" />
        <meta name="color-scheme" content="light" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
