import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LogoMain } from "./svgs";

export default function Header() {
  return (
    <header className="bg-[#BD5700] px-6 py-4 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          {/* <Image
            src="/images/small-logo.svg"
            alt="Tex N Wash Logo"
            width={120}
            height={40}
            className="object-contain"
          /> */}
          <LogoMain className="h-[80px]" />
        </Link>

        {/* Nav Bar */}
        <nav>
          <ul className="flex space-x-6 text-lg">
            <li>
              <Link href="/" className="hover:text-gray-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-gray-400">
                Services
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-400">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-400">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Buttons */}
        <div className="flex space-x-4">
          <Link href="/quote">
            <button className="rounded-md bg-yellow-400 px-4 py-2 text-black hover:bg-yellow-500">
              Insta Quote
            </button>
          </Link>
          <Link href="/book">
            <button className="rounded-md bg-[#1B1F3B] px-4 py-2 text-white hover:bg-[#2A2F49]">
              Book
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
