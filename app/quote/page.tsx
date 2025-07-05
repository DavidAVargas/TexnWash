"use client";

import { useState } from "react";
import Swal from "sweetalert2";

export default function QuotePage() {
  const [activeTab, setActiveTab] = useState("residential");
  const [serviceSelected, setServiceSelected] = useState(false);

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
        //   action="https://formspree.io/f/mzzgqrya"
          method="POST"
          onSubmit={(e) => {
            const form = e.target as HTMLFormElement;
            const fullName = form.fullName.value.trim();
            const phone = form.phone.value.trim();
            const email = form.email.value.trim();
            const address = form.address.value.trim();
            const phoneRegex = /^\d{10}$/;
            const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

            if (
              fullName.split(" ").length < 2 ||
              /[^a-zA-Z\s]/.test(fullName)
            ) {
              Swal.fire({
                icon: "warning",
                title: "Invalid Name",
                text: "Please enter your first and last name with letters only.",
                confirmButtonColor: "#BD5700",
              });
              e.preventDefault();
              return;
            }
            if (!phoneRegex.test(phone)) {
              Swal.fire({
                icon: "warning",
                title: "Invalid Phone",
                text: "Please enter a valid 10-digit phone number.",
                confirmButtonColor: "#BD5700",
              });
              e.preventDefault();
              return;
            }
            if (!emailRegex.test(email)) {
              Swal.fire({
                icon: "warning",
                title: "Invalid Email",
                text: "Please enter a valid email address.",
                confirmButtonColor: "#BD5700",
              });
              e.preventDefault();
              return;
            }
            if (address.length < 5 || address.split(" ").length < 2) {
              Swal.fire({
                icon: "warning",
                title: "Invalid Address",
                text: "Please enter a more complete property address.",
                confirmButtonColor: "#BD5700",
              });
              e.preventDefault();
              return;
            }
          }}
        >
          {activeTab === "residential" && (
            <>
              <h2 className="text-2xl font-semibold">Select Residential Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="services"
                    value="Driveway / Sidewalks"
                    className="accent-[#BD5700]"
                    onChange={(e) => {
                      const anyChecked = document.querySelectorAll('input[name="services"]:checked').length > 0;
                      setServiceSelected(anyChecked);
                    }}
                  /> Driveway / Sidewalks
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="services"
                    value="House Wash"
                    className="accent-[#BD5700]"
                    onChange={(e) => {
                      const anyChecked = document.querySelectorAll('input[name="services"]:checked').length > 0;
                      setServiceSelected(anyChecked);
                    }}
                  /> House Wash
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="services"
                    value="Garbage Bin Cleaning"
                    className="accent-[#BD5700]"
                    onChange={(e) => {
                      const anyChecked = document.querySelectorAll('input[name="services"]:checked').length > 0;
                      setServiceSelected(anyChecked);
                    }}
                  /> Garbage Bin Cleaning
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="services"
                    value="Fence / Deck"
                    className="accent-[#BD5700]"
                    onChange={(e) => {
                      const anyChecked = document.querySelectorAll('input[name="services"]:checked').length > 0;
                      setServiceSelected(anyChecked);
                    }}
                  /> Fence / Deck
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="services"
                    value="Curb Appeal Refresh Package"
                    className="accent-[#BD5700]"
                    onChange={(e) => {
                      const anyChecked = document.querySelectorAll('input[name="services"]:checked').length > 0;
                      setServiceSelected(anyChecked);
                    }}
                  /> Curb Appeal Refresh Package
                </label>
              </div>
            </>
          )}
          {activeTab === "commercial" && (
            <>
              <h2 className="text-2xl font-semibold">Select Commercial Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="services"
                    value="Storefront / Walkway"
                    className="accent-[#BD5700]"
                    onChange={(e) => {
                      const anyChecked = document.querySelectorAll('input[name="services"]:checked').length > 0;
                      setServiceSelected(anyChecked);
                    }}
                  /> Storefront / Walkway
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="services"
                    value="Parking Lot"
                    className="accent-[#BD5700]"
                    onChange={(e) => {
                      const anyChecked = document.querySelectorAll('input[name="services"]:checked').length > 0;
                      setServiceSelected(anyChecked);
                    }}
                  /> Parking Lot
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="services"
                    value="Store Walls"
                    className="accent-[#BD5700]"
                    onChange={(e) => {
                      const anyChecked = document.querySelectorAll('input[name="services"]:checked').length > 0;
                      setServiceSelected(anyChecked);
                    }}
                  /> Store Walls
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="services"
                    value="Signage Cleaning"
                    className="accent-[#BD5700]"
                    onChange={(e) => {
                      const anyChecked = document.querySelectorAll('input[name="services"]:checked').length > 0;
                      setServiceSelected(anyChecked);
                    }}
                  /> Signage Cleaning
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
              className={`border border-[#C3B091] p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#BD5700] ${
                !serviceSelected ? "opacity-50 text-gray-400" : "text-black"
              }`}
              required
              disabled={!serviceSelected}
            />
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              className={`border border-[#C3B091] p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#BD5700] ${
                !serviceSelected ? "opacity-50 text-gray-400" : "text-black"
              }`}
              required
              disabled={!serviceSelected}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              name="phone"
              className={`border border-[#C3B091] p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#BD5700] ${
                !serviceSelected ? "opacity-50 text-gray-400" : "text-black"
              }`}
              required
              disabled={!serviceSelected}
            />
            <input
              type="text"
              placeholder="Property Address"
              name="address"
              className={`border border-[#C3B091] p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#BD5700] ${
                !serviceSelected ? "opacity-50 text-gray-400" : "text-black"
              }`}
              required
              disabled={!serviceSelected}
            />
            {activeTab === "commercial" && (
              <input
                type="text"
                placeholder="Business Name"
                name="businessName"
                className={`border border-[#C3B091] p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#BD5700] ${
                  !serviceSelected ? "opacity-50 text-gray-400" : "text-black"
                }`}
                disabled={!serviceSelected}
              />
            )}
          </div>

          <textarea
            placeholder="Any additional notes?"
            name="notes"
            className={`border border-[#C3B091] p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#BD5700] ${
              !serviceSelected ? "opacity-50 text-gray-400" : "text-black"
            }`}
            disabled={!serviceSelected}
          />

          {/* Honeypot and hidden trap fields */}
          <input
            type="text"
            name="_gotcha"
            style={{ display: "none" }}
            tabIndex={-1}
          />
          <input
            type="text"
            name="nickname"
            style={{ display: "none" }}
            tabIndex={-1}
          />

          <button
            type="submit"
            className={`font-semibold px-6 py-3 rounded transition-colors ${
              serviceSelected
                ? "bg-[#BD5700] hover:bg-black text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!serviceSelected}
          >
            Request Quote
          </button>
        </form>
      </div>
    </section>
  );
}