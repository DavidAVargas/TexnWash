import Hero from "@/components/Hero";
import NewsLetter from "@/components/NewsLetter";
import ReviewsHome from "@/components/ReviewsHome";
import ServiceHighlights from "@/components/ServiceHighlights";
import SponsorDivider from "@/components/SponsorDivider";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <>
       <Hero />
       <SponsorDivider />
       <ServiceHighlights />
       <ReviewsHome />
       <NewsLetter />
    
    </>
  );
}
