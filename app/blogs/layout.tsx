import type { Metadata } from "next";

export const metadata: Metadata = {
  title: " Blog & News | La La Land Wayanad",
  description: "Stay updated with the latest news, travel tips, and  stories from La La Land  Park, the best theme park in Wayanad.",
  keywords: ["Wayanad travel blog", " park news", "theme park stories"],
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
