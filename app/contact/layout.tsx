import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Tex N Wash",
  description: "Get in touch with Tex N Wash for pressure washing services in Fort Worth. Call, email, or send us a message.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
