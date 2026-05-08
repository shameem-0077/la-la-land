import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | La La Land Adventure Park Wayanad",
  description: "Get in touch with La La Land Adventure Park. Find our location in Wayanad, call us, or send an email for bookings and inquiries.",
  keywords: ["contact La La Land", "Wayanad park location", "adventure park booking number"],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
