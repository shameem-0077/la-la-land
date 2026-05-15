import type { Metadata } from "next";

export const metadata: Metadata = {
  title: " Packages & Pricing | La La Park Wayanad",
  description: "Affordable family and group packages for La La Park. View ticket prices for adults, kids, and senior citizens.",
  keywords: ["La La Park ticket prices", "Wayanad park packages", " park entry fee"],
};

export default function PackagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
