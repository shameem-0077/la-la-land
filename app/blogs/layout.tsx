import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adventure Blog & News | La La Land Wayanad",
  description: "Stay updated with the latest news, travel tips, and adventure stories from La La Land Adventure Park, the best theme park in Wayanad.",
  keywords: ["Wayanad travel blog", "adventure park news", "theme park stories"],
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
