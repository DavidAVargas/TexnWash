import Hero from "@/components/Heroes/HeroV3";
import NewsLetter from "@/components/newsletter";
import ReviewsHome from "@/components/reviewshome";
import ServiceHighlights from "@/components/servicehighlights";
import SponsorDivider from "@/components/sponsordivider";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";

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
