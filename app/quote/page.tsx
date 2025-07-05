"use client";

import { useState } from "react";

export default function QuotePage() {
  const [activeTab, setActiveTab] = useState("residential");

  return (
    <section className="bg-white text-[#4E3629] py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center">Get Your Free Quote</h1>
        <p className="text-center text-lg text-[#4E3629]">
          No payment needed — just tell us what you need, and we’ll get back to you fast.
        </p>

        {/* Residential/Commercial toggle */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setActiveTab("residential")}
            className={`px-6 py-3 text-lg font-semibold rounded transition-colors duration-300 ${
              activeTab === "residential"
                ? "bg-[#BD5700] text-white"
                : "bg-gray-200 text-[#4E3629] hover:bg-[#c3b091]"
            }`}
          >
            Residential
          </button>
          <button
            onClick={() => setActiveTab("commercial")}
            className={`px-6 py-3 text-lg font-semibold rounded transition-colors duration-300 ${
              activeTab === "commercial"
                ? "bg-[#BD5700] text-white"
                : "bg-gray-200 text-[#4E3629] hover:bg-[#c3b091]"
            }`}
          >
            Commercial
          </button>
        </div>

        {/* Quote form */}
        <form
          className="space-y-6 mt-6"
          action="https://formspree.io/f/mzzgqrya"
          method="POST"
        >
          {activeTab === "residential" && (
            <>
              <h2 className="text-2xl font-semibold">Select Residential Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="services" value="Driveway / Sidewalks" className="accent-[#BD5700]" /> Driveway / Sidewalks
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="services" value="House Wash" className="accent-[#BD5700]" /> House Wash
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="services" value="Garbage Bin Cleaning" className="accent-[#BD5700]" /> Garbage Bin Cleaning
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="services" value="Fence / Deck" className="accent-[#BD5700]" /> Fence / Deck
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="services" value="Curb Appeal Refresh Package" className="accent-[#BD5700]" /> Curb Appeal Refresh Package
                </label>
              </div>
            </>
          )}
          {activeTab === "commercial" && (
            <>
              <h2 className="text-2xl font-semibold">Select Commercial Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="services" value="Storefront / Walkway" className="accent-[#BD5700]" /> Storefront / Walkway
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="services" value="Parking Lot" className="accent-[#BD5700]" /> Parking Lot
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="services" value="Store Walls" className="accent-[#BD5700]" /> Store Walls
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="services" value="Signage Cleaning" className="accent-[#BD5700]" /> Signage Cleaning
                </label>
              </div>
            </>
          )}

          {/* common fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              className="border border-[#C3B091] p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#BD5700]"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              className="border border-[#C3B091] p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#BD5700]"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              name="phone"
              className="border border-[#C3B091] p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#BD5700]"
              required
            />
            <input
              type="text"
              placeholder="Property Address"
              name="address"
              className="border border-[#C3B091] p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#BD5700]"
              required
            />
            {activeTab === "commercial" && (
              <input
                type="text"
                placeholder="Business Name"
                name="businessName"
                className="border border-[#C3B091] p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#BD5700]"
              />
            )}
          </div>

          <textarea
            placeholder="Any additional notes?"
            name="notes"
            className="border border-[#C3B091] p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#BD5700]"
          />

          <button
            type="submit"
            className="bg-[#BD5700] hover:bg-black text-white font-semibold px-6 py-3 rounded transition-colors"
          >
            Request Quote
          </button>
        </form>
      </div>
    </section>
  );
}