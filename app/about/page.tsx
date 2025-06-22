"use client";

import React from "react";

export default function About() {
  return (
    <section className="bg-white text-[#4E3629] py-20 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Column */}
        <div className="space-y-10 pr-6 md:pr-10">
          <h1 className="text-5xl font-bold text-center text-[#4E3629] mb-4 md:text-left">
            About Tex N Wash
          </h1>

          <div className="bg-[#c3b091] p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-4 text-[#4E3629]">
              Proudly Fort Worth Built
            </h2>
            <p className="text-lg mb-2">
              Tex N Wash is a local business started to give Fort Worth top-tier pressure washing with a Texas touch.
            </p>
            <p className="text-lg">
              We’re fully licensed and permitted, operating legally and professionally while focusing on quality results and honest service.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-[#4E3629]">Our Mission</h3>
            <p>
              Hey y’all — I’m a proud Fort Worth local who started Tex N Wash with one mission: to bring professional, reliable, and convenient pressure washing services to the community I love.
            </p>
          </div>

          <div className="bg-[#c3b091] p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-[#4E3629]">The Inspiration</h3>
            <p>
              I started this company after needing some home services myself and realizing there were very few companies that had a great website, solid communication, or even showed up on time. That’s where Tex N Wash comes in — we’re setting a new standard in Fort Worth for what it means to be professional, easy to work with, and proud of our work.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-10 pl-6 md:pl-10 md:border-l md:border-[#c3b091]">
          <div className="bg-gray-50 p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-[#4E3629]">Why Tex N Wash?</h3>
            <p>
              The name “Tex N Wash” is a nod to our Texas roots and our easy-to-reach booking system — you can reach out and book your entire service by text! But of course, if we're not on a job, we’re happy to answer your call too.
            </p>
          </div>

          <div className="bg-[#c3b091] p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-[#4E3629]">Always Improving</h3>
            <p>
              We’re constantly improving every single day — whether it’s upgrading our equipment, fine-tuning our services, or making our website better. We’re here for you, and we’re always working hard to raise the bar.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg shadow-md space-y-4">
            <h3 className="text-2xl font-bold mb-4 text-[#4E3629] uppercase tracking-wide">Our Cleaning Methods</h3>
            <p>
              We specialize in soft washing — a powerful but safe cleaning method that uses eco-friendly bleach solutions combined with a surfactant (a soap) to break down dirt, algae, and grime. The soap not only enhances cleaning but also masks any bleach odor, so you get a fresh, clean result without the harsh smell.
            </p>
            <p>
              We take extra care by watering all nearby plants and grass before, during, and after cleaning to ensure no harm is done to your landscape. Unlike others, we strictly follow Texas environmental regulations by managing wastewater runoff properly. Instead of letting dirty water flow into the street or sewage system, we use a pump to redirect it to safe areas of your lawn or a designated spot approved by you.
            </p>
            <p className="bg-[#fff3e0] border-l-8 border-[#BD5700] p-6 rounded shadow-md font-medium text-[#4E3629]">
              ⚠️ Many companies skip proper containment — but unmanaged chemical runoff can lead to hefty fines (up to $25,000 per day) for both the business and homeowner. At <span className="font-bold">Tex N Wash</span>, we go the extra mile to protect your property, the environment, and your peace of mind.
            </p>
          </div>
        </div>
      </div>

      <p className="font-semibold text-center mt-10 text-[#BD5700] text-xl max-w-4xl mx-auto">
        Thank you for supporting a local business. We’re here to make Fort Worth shine — one wash at a time.
      </p>
    </section>
  );
}