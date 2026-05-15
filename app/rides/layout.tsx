import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thrilling Rides & Activities | La La Park",
  description: "Explore 50+  activities in Wayanad. From high-speed water slides to giant swings and rope activities, find your next thrill at La La Park.",
  keywords: ["Wayanad rides", "water activities Wayanad", "rope activities Kerala", " park activities"],
};

export default function RidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
