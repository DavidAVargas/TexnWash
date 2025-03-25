import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#BD5700] text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/big-tex-nbg.svg"
            alt="Tex N Wash Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </Link>

        {/* Nav Bar */}
        <nav>
          <ul className="flex space-x-6 text-lg">
            <li>
              <Link href="/" className="hover:text-gray-400">Home</Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-gray-400">Services</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-400">About</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-400">Contact</Link>
            </li>
          </ul>
        </nav>

        {/* Buttons */}
        <div className="flex space-x-4">
          <Link href="/quote">
            <button className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500">
              Insta Quote
            </button>
          </Link>
          <Link href="/book">
            <button className="bg-[#1B1F3B] text-white px-4 py-2 rounded-md hover:bg-[#2A2F49]">
              Book
            </button>
          </Link>
        </div>

      </div>
    </header>
  );
}
