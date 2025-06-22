"use client";

import React from "react";

export default function Contact() {
  return (
    <section className="bg-white text-[#4E3629] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-center text-[#4E3629]">
          Get in Touch with Tex N Wash
        </h1>
        <p className="text-lg text-center mb-10 text-[#4E3629]">
          Questions? Quotes? We’re just a message away. Let’s keep your property looking its best!
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-gray-300 rounded text-black"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 border border-gray-300 rounded text-black"
            />
            <textarea
              rows={5}
              placeholder="Your Message"
              className="w-full px-4 py-3 border border-gray-300 rounded text-black"
            />
            <button
              type="submit"
              className="bg-[#BD5700] hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded transition-colors"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="text-[#4E3629] space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#BD5700]">Contact Info</h3>
              <p>Email: <a href="mailto:contact@texnwash.com" className="hover:underline">contact@texnwash.com</a></p>
              <p>Phone: <a href="tel:+12102012123" className="hover:underline">(210) 201-2123</a></p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#BD5700]">Hours of Operation</h3>
              <p>Mon - Sat: 8am – 9pm</p>
              <p>Sunday: Closed</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#BD5700]">Service Area</h3>
              <p>Fort Worth, TX and surrounding areas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
