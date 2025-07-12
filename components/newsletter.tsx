"use client";

import React from "react";

export default function NewsLetter() {
  return (
    <section className="bg-white text-[#4E3629] py-12 md:py-20 px-4 md:px-6">
      <div className="max-w-5xl mx-auto text-center flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
        {/* Text Section */}
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Join the Tex N Wash Community</h2>
          <p className="text-base md:text-lg mb-4">
            Be part of 100+ homeowners who stay in the loop! Get exclusive discounts, seasonal offers, and the latest service updates delivered straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mt-6">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded text-black w-full sm:w-2/3 focus:outline-none border border-gray-300"
            />
            <button
              type="submit"
              className="bg-[#BD5700] hover:bg-black text-white font-semibold px-6 py-3 rounded transition-colors w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Highlights Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <ul className="space-y-3 md:space-y-4 text-base md:text-lg text-[#4E3629]">
            <li className="flex items-start justify-center md:justify-start">
              <span className="text-[#BD5700] text-xl md:text-2xl mr-2 md:mr-3">✓</span>
              Members-only cleaning discounts
            </li>
            <li className="flex items-start justify-center md:justify-start">
              <span className="text-[#BD5700] text-xl md:text-2xl mr-2 md:mr-3">✓</span>
              Early access to seasonal promos
            </li>
            <li className="flex items-start justify-center md:justify-start">
              <span className="text-[#BD5700] text-xl md:text-2xl mr-2 md:mr-3">✓</span>
              Tips to keep your home looking sharp
            </li>
            <li className="flex items-start justify-center md:justify-start">
              <span className="text-[#BD5700] text-xl md:text-2xl mr-2 md:mr-3">✓</span>
              Direct contact with our local experts
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-12 md:mt-16 text-center max-w-3xl mx-auto px-4">
        <h3 className="text-2xl md:text-3xl font-semibold text-[#BD5700] mb-4">Why Join Our Email List?</h3>
        <p className="text-sm md:text-base text-[#4E3629]">
          At Tex N Wash, we believe in rewarding loyalty. Subscribers not only stay up-to-date with the latest services and promotions, but also get first dibs on appointment slots during peak seasons. Don't miss out — your property deserves VIP treatment.
        </p>
      </div>
    </section>
  );
}