"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type AddOn = {
  emoji: string;
  label: string;
  price: string;
};

type Service = {
  image: string;
  title: string;
  description: string;
  rate: string;
  rateLabel: string;
  example?: string;
  badge?: string;
  addOns: AddOn[];
};

const residentialServices: Service[] = [
  {
    image: "/images/concrete.png",
    title: "Concrete Surfaces",
    description: "Driveways, sidewalks, walkways, and patios. We lift years of buildup to make your home's first impression stand out.",
    rate: "$0.28",
    rateLabel: "per sq ft",
    example: "1,200 sq ft → $336",
    addOns: [
      { emoji: "🌱", label: "Weed Removal in Cracks", price: "$75 flat, +$30/hr if extensive" },
      { emoji: "🛢️", label: "Oil & Grease Stain Treatment", price: "$60 per stain" },
      { emoji: "🪑", label: "Outdoor Furniture Moving", price: "$30 / hr" },
    ],
  },
  {
    image: "/images/housewalls.png",
    title: "House Walls",
    description: "Soft washing safely removes mold, mildew, and grime from siding, stucco, and painted surfaces. No damage — lasting results.",
    rate: "$0.40",
    rateLabel: "per sq ft",
    example: "1,600 sq ft → $640",
    addOns: [
      { emoji: "🪑", label: "Outdoor Furniture Moving", price: "$30 / hr" },
    ],
  },
  {
    image: "/images/fnd.png",
    title: "Fences & Decks",
    description: "Restore your wood surfaces with a gentle, effective clean. Perfect prep before staining or sealing.",
    rate: "$1.50",
    rateLabel: "per sq ft",
    example: "200 sq ft → $300",
    addOns: [
      { emoji: "🪑", label: "Outdoor Furniture Moving", price: "$30 / hr" },
    ],
  },
  {
    image: "/images/garbage.png",
    title: "Trash Bin Cleaning",
    description: "Sanitize and deodorize inside and out — eliminates bacteria, grime, and odors. Add this on to any service booking while we're already at your property.",
    rate: "$35",
    rateLabel: "per bin",
    example: "2 bins → $70",
    badge: "Add-On Service",
    addOns: [
      { emoji: "💪", label: "Heavy / Severely Dirty Bin", price: "+$15 per bin" },
    ],
  },
];

const commercialServices: Service[] = [
  {
    image: "/images/storefront.png",
    title: "Storefront & Walkway",
    description: "Keep your entrance clean and welcoming. Ideal for retail spaces, restaurants, and small businesses with heavy foot traffic.",
    rate: "$0.60",
    rateLabel: "per sq ft",
    example: "800 sq ft → $480",
    addOns: [
      { emoji: "🧹", label: "Stain Treatment (gum, oil, grease)", price: "$75 per stain" },
    ],
  },
  {
    image: "/images/parkinglot.png",
    title: "Parking Lot",
    description: "Remove dirt, oil stains, and debris from commercial parking areas to improve curb appeal and safety.",
    rate: "$0.45",
    rateLabel: "per sq ft",
    example: "2,500 sq ft → $1,125",
    addOns: [
      { emoji: "🛢️", label: "Oil & Grease Stain Treatment", price: "$75 per stain" },
    ],
  },
  {
    image: "/images/storewalls.png",
    title: "Store Walls",
    description: "Soft wash for commercial exteriors — removes mold, mildew, and grime from brick, stucco, and painted surfaces.",
    rate: "$0.65",
    rateLabel: "per sq ft",
    example: "1,000 sq ft → $650",
    addOns: [
      { emoji: "🧪", label: "Mold & Mildew Pre-Treatment", price: "$50 flat" },
    ],
  },
  {
    image: "/images/sign.png",
    title: "Signage Cleaning",
    description: "Make your business signage shine again. We carefully remove dirt, bird droppings, and environmental buildup.",
    rate: "$100",
    rateLabel: "per sign",
    addOns: [
      { emoji: "🐦", label: "Bird Dropping Removal", price: "+$25" },
    ],
  },
];

function ServiceSection({ service }: { service: Service }) {
  return (
    <div className="py-12 flex flex-col md:flex-row gap-8 md:gap-14 items-start">

      {/* Image — aspect-ratio driven, no awkward cropping */}
      <div className="w-full md:w-[42%] shrink-0">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#f7f5f2]">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, 42vw"
            className="object-contain p-5"
          />
          {service.badge && (
            <div className="absolute top-3 left-3">
              <span className="bg-[#BD5700] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                {service.badge}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{service.title}</h2>

        {/* Price — big and bold */}
        <div className="flex items-end gap-3 mb-4">
          <span className="text-5xl md:text-6xl font-black text-[#BD5700] leading-none">
            {service.rate}
          </span>
          <div className="pb-1.5 space-y-0.5">
            <span className="block text-sm font-semibold text-gray-500">{service.rateLabel}</span>
            {service.example && (
              <span className="block text-xs text-gray-400">e.g. {service.example}</span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-md">
          {service.description}
        </p>

        {/* Add-Ons */}
        {service.addOns.length > 0 && (
          <div className="border-t border-gray-100 pt-5">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
              Optional Add-Ons
            </p>
            <div className="space-y-2.5">
              {service.addOns.map((addon) => (
                <div key={addon.label} className="flex items-center gap-3">
                  <span className="w-8 h-8 flex items-center justify-center bg-gray-50 border border-gray-100 rounded-lg text-base shrink-0">
                    {addon.emoji}
                  </span>
                  <span className="text-sm text-gray-700 flex-1">{addon.label}</span>
                  <span className="text-sm font-bold text-[#BD5700] shrink-0">{addon.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PricesPage() {
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">("residential");
  const services = activeTab === "residential" ? residentialServices : commercialServices;

  return (
    <div className="bg-white">

      {/* Header */}
      <div className="border-b border-gray-100 py-12 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Services & Pricing</h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Transparent pricing with no surprises. Every quote is free.
        </p>
        <div className="flex items-center justify-center gap-2 bg-orange-50 rounded-full px-5 py-2.5 text-sm text-gray-600 mx-auto w-fit mt-5">
          <span className="text-[#BD5700] font-bold">ⓘ</span>
          <span>$125 minimum on all bookings · Free estimates always</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Tab Toggle */}
        <div className="flex justify-center mb-2">
          <div className="inline-flex bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setActiveTab("residential")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeTab === "residential"
                  ? "bg-[#BD5700] text-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              🏠 Residential
            </button>
            <button
              onClick={() => setActiveTab("commercial")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeTab === "commercial"
                  ? "bg-[#BD5700] text-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              🏢 Commercial
            </button>
          </div>
        </div>

        {/* Services List */}
        <div className="divide-y divide-gray-100">
          {services.map((service) => (
            <ServiceSection key={service.title} service={service} />
          ))}
        </div>

        {/* Curb Appeal Package — residential only */}
        {activeTab === "residential" && (
          <div className="mt-4 relative bg-[#2d1500] rounded-2xl overflow-hidden ring-1 ring-[#BD5700]/30">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_#BD5700_0%,_transparent_60%)] opacity-20" />
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#BD5700] mb-2 block">
                  Bundle & Save $50
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">Curb Appeal Refresh Package</h3>
                <p className="text-white/70 text-sm max-w-sm leading-relaxed">
                  Driveway + walkway + sidewalk cleaned in one visit — save $50 off the total.
                  Add trash bin cleaning while we&apos;re already there.
                </p>
              </div>
              <Link
                href="/quote"
                className="shrink-0 inline-block bg-[#BD5700] hover:bg-[#BD5700]/90 text-white font-semibold py-3 px-7 rounded-full transition-colors whitespace-nowrap"
              >
                Get a Free Quote
              </Link>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm mb-4">
            Not sure what you need? We&apos;ll walk you through it — no pressure.
          </p>
          <Link
            href="/quote"
            className="inline-block bg-[#BD5700] hover:bg-[#BD5700]/90 text-white font-semibold px-8 py-3 rounded-full transition-colors"
          >
            Get Your Free Quote →
          </Link>
        </div>

      </div>
    </div>
  );
}
