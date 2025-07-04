import Image from "next/image";
import Container from "./Container";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <section className="pt-20 pb-20">
      <Container>
        <div className="relative">
          {/* Subtle floating shapes */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-brand opacity-10 rounded-full animate-pulse-slow blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gray-400 opacity-5 rounded-full animate-pulse-slower blur-2xl" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-50">
            <div className="text-left max-w-xl">
              <h1 className="text-8xl md:text-8xl font-bold text-brand mb-4">
                Because First Impressions{''}
                <span style={{ color: '#c3b091'}} > Start at the Curb </span>
              </h1>
              <p className="text-2xl text-black">
                Your neighbors will ask who cleaned it — trust us.
              </p>
              <p className="text-2xl text-[#BD5700] font-semibold mt-4">
                “Tex N Wash: Just Text, and We Wash ”
              </p>
              <div>
                <Button className="bg-brand text-white mt-8">
                  <a href="/quote">Free Quote</a>
                </Button>
                <p className="mt-2 text-lg">Get an estimate for any service you need hassle free.</p>
              </div>
            </div>
            <div>
              <Image src="/images/aitnw.png" width={500} height={500} alt="Hero Image" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
