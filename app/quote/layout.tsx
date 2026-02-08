import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Quote | Tex N Wash",
  description: "Request a free pressure washing quote from Tex N Wash. Serving Fort Worth and surrounding areas.",
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
