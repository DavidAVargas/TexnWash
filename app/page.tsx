import Hero from "@/components/hero";
import NewsLetter from "@/components/newsLetter";
import ReviewsHome from "@/components/reviewsHome";
import ServiceHighlights from "@/components/serviceHighlights";
import SponsorDivider from "@/components/sponsorDivider";
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
