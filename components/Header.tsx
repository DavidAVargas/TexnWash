import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "./container";
import { Button } from "./ui/button";
import { Phone } from "lucide-react";

const menuItems = [
  { name: "Home", url: "/", newTab: false },
  { name: "Services", url: "/services", newTab: false },
  { name: "About", url: "/about", newTab: false },
  { name: "Contact", url: "/contact", newTab: false },
];

export default function Header() {
  return (
    <header className="bg-brand py-4 text-white shadow-md">
      <Container className="relative flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Tex N Wash Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </Link>

        {/* Nav Bar */}
        <nav className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <ul className="flex justify-center space-x-6 text-lg">
            {/* Map through menu items */}
            {menuItems.map(({ name, url, newTab }) => (
              <li key={name}>
                <Link
                  href={url}
                  target={newTab ? "_blank" : "_self"}
                  className="hover:text-gray-400"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Buttons */}
        <div className="flex space-x-4">
          <Button asChild>
            <Link href={"/contact"}>
            <span>
            <Phone />
            </span>Get In Touch
            </Link>
            
          </Button>
        </div>
      </Container>
    </header>
  );
}
