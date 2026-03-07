import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Tex N Wash",
  description: "Learn about Tex N Wash, a local Fort Worth pressure washing company. Our mission, cleaning methods, and commitment to quality.",
};

export default function About() {
  return (
    <div className="bg-white">

      {/* Header */}
      <div className="border-b border-gray-100 py-12 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">About Tex N Wash</h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          A Fort Worth local business built on honest work, quality results, and community pride.
        </p>
      </div>

      <section className="py-14 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Left Column */}
          <div className="space-y-6">

            {/* Proudly Fort Worth */}
            <div className="bg-[#2d1500] rounded-2xl p-8 text-white relative overflow-hidden ring-1 ring-[#BD5700]/30">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#BD5700] opacity-20 rounded-full translate-x-16 -translate-y-16" />
              <h2 className="text-2xl font-bold mb-3">Proudly Fort Worth Built</h2>
              <p className="text-white/90 text-sm leading-relaxed mb-3">
                Tex N Wash is a local business started to give Fort Worth top-tier pressure washing with a Texas touch. We&apos;re fully licensed and permitted, operating professionally while focusing on quality results and honest service.
              </p>
              <div className="mt-1 flex items-start gap-2.5 bg-white/10 rounded-xl px-4 py-3 text-sm text-white">
                <span className="mt-0.5 text-[#BD5700] shrink-0">📍</span>
                <span>We currently serve Fort Worth and surrounding areas only to ensure the highest quality and fastest service.</span>
              </div>
            </div>

            {/* Mission */}
            <div className="border border-gray-100 rounded-2xl p-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Our Mission</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Hey y&apos;all — I&apos;m a proud Fort Worth local who started Tex N Wash with one mission: to bring professional, reliable, and convenient pressure washing services to the community I love.
              </p>
            </div>

            {/* Inspiration */}
            <div className="bg-[#BD5700] rounded-2xl p-8 text-white ring-1 ring-black/10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/80 mb-3">The Inspiration</h3>
              <p className="text-white text-sm leading-relaxed">
                I started this company after needing home services myself and realizing very few companies had a great website, solid communication, or even showed up on time. That&apos;s where Tex N Wash comes in — we&apos;re setting a new standard in Fort Worth for what it means to be professional, easy to work with, and proud of our work.
              </p>
            </div>

            {/* Payments */}
            <div className="border border-gray-100 rounded-2xl p-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Payments &amp; Security</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                We accept secure payments through Chase Business Invoicing. Pay with confidence, knowing your transactions are processed by a trusted national banking partner.
              </p>
              <div className="mt-4 flex items-start gap-2.5 bg-orange-50 rounded-xl px-4 py-3 text-sm text-gray-700">
                <span className="font-bold text-[#BD5700] shrink-0">%</span>
                <span>All services include the required 8.25% Texas sales tax. Chase applies a processing fee of 3.5% + $0.10 per transaction for card payments.</span>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="space-y-6">

            {/* Why Tex N Wash */}
            <div className="border border-gray-100 rounded-2xl p-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Why Tex N Wash?</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                The name &quot;Tex N Wash&quot; is a nod to our Texas roots and our easy booking system — you can reach out and book your entire service by text! But if we&apos;re not on a job, we&apos;re always happy to answer your call too.
              </p>
            </div>

            {/* Always Improving */}
            <div className="bg-[#2d1500] rounded-2xl p-8 text-white relative overflow-hidden ring-1 ring-[#BD5700]/30">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#BD5700] opacity-20 rounded-full -translate-x-10 translate-y-10" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/80 mb-3">Always Improving</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                We&apos;re constantly improving every single day — whether it&apos;s upgrading our equipment, fine-tuning our services, or making our website better. We&apos;re here for you, and we&apos;re always working hard to raise the bar.
              </p>
            </div>

            {/* Cleaning Methods */}
            <div className="border border-gray-100 rounded-2xl p-8 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Our Cleaning Methods</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                We specialize in soft washing — a powerful but safe method using eco-friendly bleach solutions combined with a surfactant to break down dirt, algae, and grime. The soap enhances cleaning and masks any bleach odor, so you get a fresh result without the harsh smell.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                We water all nearby plants and grass before, during, and after cleaning. We also strictly follow Texas environmental regulations by managing wastewater runoff — redirecting dirty water to safe areas instead of the street or sewage system.
              </p>
              <div className="flex items-start gap-2.5 bg-orange-50 rounded-xl px-4 py-3 text-sm text-gray-700">
                <span className="shrink-0 mt-0.5">⚠️</span>
                <span>Many companies skip proper containment — unmanaged chemical runoff can lead to fines up to <strong>$25,000 per day</strong> for both the business and homeowner. At Tex N Wash, we go the extra mile to protect your property and the environment.</span>
              </div>
            </div>

            {/* Photo Transparency */}
            <div className="bg-[#BD5700] rounded-2xl p-8 text-white ring-1 ring-black/10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/80 mb-3">Photo &amp; Video Transparency</h3>
              <p className="text-white text-sm leading-relaxed">
                📸 We document every project with photos and videos — for our records, marketing, and to give you before-and-after proof of our results as part of your invoice and service summary.
              </p>
            </div>

          </div>
        </div>

        {/* Bottom tagline */}
        <p className="font-semibold text-center mt-12 text-[#BD5700] text-lg max-w-4xl mx-auto">
          Thank you for supporting a local business. We&apos;re here to make Fort Worth shine — one wash at a time.
        </p>
      </section>
    </div>
  );
}
