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
            <div className="bg-brand animate-pulse-slow absolute top-1/4 left-1/3 h-32 w-32 rounded-full opacity-10 blur-3xl" />
            <div className="animate-pulse-slower absolute right-1/4 bottom-1/4 h-24 w-24 rounded-full bg-gray-400 opacity-5 blur-2xl" />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center gap-50 md:flex-row">
            <div className="max-w-xl text-left">
              <h1 className="text-brand mb-4 text-8xl font-bold md:text-8xl">
                Because First Impressions{""}
                <span style={{ color: "#c3b091" }}> Start at the Curb </span>
              </h1>
              <p className="text-2xl text-black">
                Your neighbors will ask who cleaned it — trust us.
              </p>
              <p className="mt-4 text-2xl font-semibold text-[#BD5700]">
                “Tex N Wash: Just Text, and We Wash ”
              </p>
              <div>
                <Button className="bg-brand mt-8 text-white">
                  <a href="/quote">Free Quote</a>
                </Button>
                <p className="mt-2 text-lg">
                  Get an estimate for any service you need hassle free.
                </p>
              </div>
            </div>
            <div>
              <Image
                src="/images/aitnw.png"
                width={500}
                height={500}
                alt="Hero Image"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
