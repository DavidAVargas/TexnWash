import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing Guide | Tex N Wash",
  description: "View our pressure washing pricing for residential and commercial services in Fort Worth. Transparent pricing with no surprises.",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
