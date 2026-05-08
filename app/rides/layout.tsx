import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thrilling Rides & Activities | La La Land Adventure Park",
  description: "Explore 50+ adventure activities in Wayanad. From high-speed water slides to giant swings and rope activities, find your next thrill at La La Land.",
  keywords: ["Wayanad rides", "water activities Wayanad", "rope activities Kerala", "adventure park activities"],
};

export default function RidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
