import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "La La Land Adventure Park | Wayanad's Best Adventure Destination",
  description: "Experience 50+ thrilling rides, water activities, and family fun at La La Land Adventure Park in Wayanad. Book your tickets for an unforgettable day!",
  keywords: ["Wayanad adventure park", "best rides in Wayanad", "water park Kerala", "family entertainment center Wayanad", "La La Land park", "theme park Kerala"],
  authors: [{ name: "La La Land Team" }],
  openGraph: {
    title: "La La Land Adventure Park | Wayanad's Best Adventure Destination",
    description: "Experience 50+ thrilling rides, water activities, and family fun at La La Land Adventure Park in Wayanad.",
    url: "https://lalalandadventurepark.com",
    siteName: "La La Land Adventure Park",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "La La Land Adventure Park",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "La La Land Adventure Park | Wayanad",
    description: "Experience 50+ thrilling rides and family fun in Wayanad.",
    images: ["/og-image.png"],
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
    >
      <body className={`${baloo.className} min-h-full flex flex-col`}>{children}</body>
    </html>
  );
}
