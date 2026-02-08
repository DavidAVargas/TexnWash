import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Tex N Wash",
  description: "See before and after photos and videos of our pressure washing work in Fort Worth. Real results, real customers.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
