import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "La La  Park | Wayanad's Best  Destination",
  description: "Experience 50+ thrilling rides, water activities, and family fun at La La Park in Wayanad. Book your tickets for an unforgettable day!",
  keywords: ["Wayanad  park", "best rides in Wayanad", "water park Kerala", "family entertainment center Wayanad", "La La Land park", "theme park Kerala"],
  authors: [{ name: "La La Team" }],
  openGraph: {
    title: "La La Park | Wayanad's Best  Destination",
    description: "Experience 50+ thrilling rides, water activities, and family fun at La La Park in Wayanad.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "La La Park",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "La La Park",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "La La Park | Wayanad",
    description: "Experience 50+ thrilling rides and family fun in Wayanad.",
    images: ["/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
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
      className="h-full antialiased scroll-smooth"
      suppressHydrationWarning
    >
      <body className={`${outfit.className} min-h-full flex flex-col`} suppressHydrationWarning>{children}</body>
    </html>
  );
}
