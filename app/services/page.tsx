"use client";

import Image from "next/image";
import { useState } from "react";

export default function PricesPage() {
  const [activeTab, setActiveTab] = useState("residential");
  return (
    <main className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-[#4E3629]">Our Pricing Guide</h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          We base our pricing on square footage or by unit, depending on the service. Below you’ll find average prices and helpful examples so you know what to expect.
        </p>
        <div className="flex justify-center">
          <Image src="/images/logo.png" width={600} height={400} alt="Pricing Example" className="rounded-lg shadow-md" />
        </div>
      </section>

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => {
            setActiveTab("residential");
            const residentialEl = document.getElementById("residential");
            const commercialEl = document.getElementById("commercial");
            if (residentialEl) residentialEl.style.display = "block";
            if (commercialEl) commercialEl.style.display = "none";
          }}
          className={`px-4 py-2 rounded transition-colors duration-300 ${
            activeTab === "residential"
              ? "bg-[#BD5700] text-white"
              : "bg-gray-200 text-[#4E3629] hover:bg-[#c3b091]"
          }`}
        >
          Residential
        </button>
        <button
          onClick={() => {
            setActiveTab("commercial");
            const residentialEl = document.getElementById("residential");
            const commercialEl = document.getElementById("commercial");
            if (residentialEl) residentialEl.style.display = "none";
            if (commercialEl) commercialEl.style.display = "block";
          }}
          className={`px-4 py-2 rounded transition-colors duration-300 ${
            activeTab === "commercial"
              ? "bg-[#BD5700] text-white"
              : "bg-gray-200 text-[#4E3629] hover:bg-[#c3b091]"
          }`}
        >
          Commercial
        </button>
      </div>

      <div id="residential" className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Concrete Surfaces */}
          <section className="bg-white rounded-lg p-6 shadow-md flex flex-col items-center">
            <Image src="/images/concrete.png" alt="Concrete Cleaning" width={3000} height={200} className="rounded-lg object-cover mb-4" />
            <div>
              <h2 className="text-3xl font-bold text-[#BD5700] mb-2">Concrete Surfaces</h2>
              <p className="text-gray-700 text-base">
                This includes driveways, sidewalks, walkways, and outdoor patios. We lift away years of buildup to make your home's first impression stand out.
              </p>
              <p className="text-gray-800 mt-3 font-semibold text-lg">Average Price: $0.23 per sq. ft.</p>
              <p className="text-gray-600 mt-1 font-semibold text-lg">Example: 1,600 sq. ft. × $0.23 = $368</p>
              <div className="mt-4">
                <h3 className="font-semibold text-[#4E3629] mb-3 text-lg">Optional Add-Ons:</h3>
                <ul className="list-disc list-inside text-gray-600 text-base space-y-2">
                  <li><strong>Weed Removal in Cracks</strong>: $50 flat or $0.05/sq ft</li>
                  <li><strong>Oil/Greaser Stain Treatment</strong>: $60 per stain</li>
                  <li><strong>Prep Work (Patio Clearing)</strong>: $30/hr for moving furniture or other items before cleaning</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Garbage Bins */}
          <section className="bg-white rounded-lg p-6 shadow-md flex flex-col items-center">
            <Image src="/images/garbage.png" alt="Garbage Bin Cleaning" width={3000} height={200} className="rounded-lg object-cover mb-4" />
            <div>
              <h2 className="text-3xl font-bold text-[#BD5700] mb-2">Garbage Bin Cleaning</h2>
              <p className="text-gray-700 text-base">
                Sanitize and deodorize your garbage bins inside and out to eliminate bacteria and odors.
              </p>
              <p className="text-gray-800 mt-3 font-semibold text-lg">Average Price: $25 per bin</p>
              <p className="text-gray-600 mt-1 font-semibold text-lg">Example: Two bins at $25 = $50</p>
              <p className="text-sm text-gray-500 mt-2">Tip: Add this to any larger service to save time and money.</p>
              <div className="mt-4">
                <h3 className="font-semibold text-[#4E3629] mb-3 text-lg">Optional Add-Ons:</h3>
                <ul className="list-disc list-inside text-gray-600 text-base space-y-2">
                  <li><strong>Heavy Garbage Bin Cleaning</strong>: $15 extra per bin</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Fences / Decks */}
          <section className="bg-white rounded-lg p-6 shadow-md flex flex-col items-center">
            <Image src="/images/fnd.png" alt="Wood Fence Cleaning" width={3000} height={200} className="rounded-lg object-cover mb-4" />
            <div>
              <h2 className="text-3xl font-bold text-[#BD5700] mb-2">Fences / Decks</h2>
              <p className="text-gray-700 text-base">
                Restore your wood surfaces with a gentle yet effective clean that preps for staining or sealing.
              </p>
              <p className="text-gray-800 mt-3 font-semibold text-lg">Average Price: $1.50 per sq. ft.</p>
              <p className="text-gray-600 mt-1 font-semibold text-lg">Example: 200 sq. ft. × $1.50 = $300</p>
              <p className="text-sm text-gray-500 mt-2">Note: Higher prices apply for stain removal or prep work.</p>
              <div className="mt-4">
                <h3 className="font-semibold text-[#4E3629] mb-3 text-lg">Optional Add-Ons:</h3>
                <ul className="list-disc list-inside text-gray-600 text-base space-y-2">
                  <li><strong>Prep Work</strong>: $30/hr for clearing items before cleaning</li>
                </ul>
              </div>
            </div>
          </section>

          {/* House Walls */}
          <section className="bg-white rounded-lg p-6 shadow-md flex flex-col items-center">
            <Image src="/images/housewalls.png" alt="House Wall Soft Wash" width={3000} height={200} className="rounded-lg object-cover mb-4" />
            <div>
              <h2 className="text-3xl font-bold text-[#BD5700] mb-2">House Walls</h2>
              <p className="text-gray-700 text-base">
                Soft washing safely cleans siding, stucco, and other surfaces to eliminate mold and restore beauty.
              </p>
              <p className="text-gray-800 mt-3 font-semibold text-lg">Average Price: $0.35 per sq. ft.</p>
              <p className="text-gray-600 mt-1 font-semibold text-lg">Example: 2,000 sq. ft. × $0.35 = $700</p>
              <p className="text-sm text-gray-500 mt-2">Pro Tip: Soft washing lasts longer and protects delicate surfaces.</p>
              <div className="mt-4">
                <h3 className="font-semibold text-[#4E3629] mb-3 text-lg">Optional Add-Ons:</h3>
                <ul className="list-disc list-inside text-gray-600 text-base space-y-2">
                  <li><strong>Prep Work</strong>: $30/hr if extra items need clearing</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Combo Package */}
        <section className="text-center space-y-4 bg-[#fffaf5] p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-[#4E3629]">Curb Appeal Refresh Package</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Get your driveway, walkway, and sidewalk cleaned together for a discounted bundled price. Save more while your home shines brighter from every angle.
          </p>
          <p className="text-xl text-[#BD5700] font-bold">Ask about our current promo rates!</p>
        </section>
      </div>

      <div id="commercial" className="hidden space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Storefront/Walkway Cleaning */}
          <section className="bg-white rounded-lg p-6 shadow-md flex flex-col items-center">
            <Image src="/images/storefront.png" alt="Storefront Cleaning" width={300} height={200} className="rounded-lg object-cover mb-4" />
            <div>
              <h2 className="text-3xl font-bold text-[#BD5700] mb-2">Storefront & Walkway</h2>
              <p className="text-gray-700 text-base">
                Maintain a clean and welcoming entrance with sidewalk and walkway pressure washing. Ideal for retail spaces, restaurants, and small businesses.
              </p>
              <p className="text-gray-800 mt-3 font-semibold text-lg">Average Price: $0.50 per sq. ft.</p>
              <p className="text-gray-600 mt-1 font-semibold text-lg">Example: 1,200 sq. ft. × $0.50 = $600</p>
              <div className="mt-4">
                <h3 className="font-semibold text-[#4E3629] mb-3 text-lg">Optional Add-Ons:</h3>
                <ul className="list-disc list-inside text-gray-600 text-base space-y-2">
                  <li><strong>Stain Treatment</strong>: $60 per stain (e.g., gum, oil, or grease spots)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Parking Lot Cleaning */}
          <section className="bg-white rounded-lg p-6 shadow-md flex flex-col items-center">
            <Image src="/images/parkinglot.png" alt="Parking Lot Cleaning" width={300} height={200} className="rounded-lg object-cover mb-4" />
            <div>
              <h2 className="text-3xl font-bold text-[#BD5700] mb-2">Parking Lot</h2>
              <p className="text-gray-700 text-base">
                Clear away dirt, oil stains, and debris from your commercial parking areas. Perfect for improving appearance and safety.
              </p>
              <p className="text-gray-800 mt-3 font-semibold text-lg">Average Price: $0.40 per sq. ft.</p>
              <p className="text-gray-600 mt-1 font-semibold text-lg">Example: 2,500 sq. ft. × $0.40 = $1,000</p>
              <p className="text-sm text-gray-500 mt-2">Hourly Option: $100–$125/hr for complex layouts or large areas.</p>
              <div className="mt-4">
                <h3 className="font-semibold text-[#4E3629] mb-3 text-lg">Optional Add-Ons:</h3>
                <ul className="list-disc list-inside text-gray-600 text-base space-y-2">
                  <li><strong>Stain Treatment</strong>: $60 per stain (ideal for oil or grease build-up)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Store Wall Cleaning */}
          <section className="bg-white rounded-lg p-6 shadow-md flex flex-col items-center">
            <Image src="/images/storewalls.png" alt="Store Wall Cleaning" width={300} height={200} className="rounded-lg object-cover mb-4" />
            <div>
              <h2 className="text-3xl font-bold text-[#BD5700] mb-2">Store Walls</h2>
              <p className="text-gray-700 text-base">
                Soft wash for exteriors to remove mold, mildew, and grime. Ideal for brick, stucco, and painted surfaces.
              </p>
              <p className="text-gray-800 mt-3 font-semibold text-lg">Average Price: $0.55 per sq. ft.</p>
              <p className="text-gray-600 mt-1 font-semibold text-lg">Example: 1,000 sq. ft. × $0.55 = $550</p>
            </div>
          </section>

          {/* Signage Cleaning */}
          <section className="bg-white rounded-lg p-6 shadow-md flex flex-col items-center">
            <Image src="/images/signage.png" alt="Signage Cleaning" width={300} height={200} className="rounded-lg object-cover mb-4" />
            <div>
              <h2 className="text-3xl font-bold text-[#BD5700] mb-2">Signage Cleaning</h2>
              <p className="text-gray-700 text-base">
                Make your signage clear and vibrant again. We carefully clean business signs to remove dirt, bird droppings, and buildup.
              </p>
              <p className="text-gray-800 mt-3 font-semibold text-lg">Flat Rate: $75 per sign</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}