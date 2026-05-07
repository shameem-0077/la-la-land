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
  description: "Experience 50+ thrilling rides, water activities, and family fun at La La Land Adventure Park in Wayanad. Book your tickets now!",
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
