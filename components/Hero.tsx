import Image from "next/image";
import Container from "./Container";

export default function Hero() {
  return (
    <section>
      <Container>
        <div>
          <h1>Title</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            voluptatibus.
          </p>
        </div>
        <div>
          <Image src="/baibfiubIEb.jpg" width={500} height={500} alt="Hero Image" />
        </div>
      </Container>
    </section>
  );
}
