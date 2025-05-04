import Image from "next/image";
import Container from "./Container";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <section className="pt-20 pb-20">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-center   gap-50">
          <div className="text-left max-w-xl">
            <h1 className="text-8xl md:text-8xl font-bold text-brand mb-4">
              Because First Impressions{''}
              <span style={{ color: '#c3b091'}} > Start at the Curb </span>
            </h1>
            <p className="text-2xl text-black">
              Your neighbors will ask who cleaned it — trust us.
            </p>
            <div>
          <Button className="bg-brand text-white mt-8">
            <a href="/contact">Free Quote</a>
          </Button>
          <p className="mt-2 text-lg">Get an estimate for any service you need hassle free.</p>
        </div>
          </div>
          <div>
            <Image src="/images/logo.png" width={500} height={500} alt="Hero Image" />
          </div>
        </div>
      </Container>
    </section>
  );
}
