"use client";

import Image from "next/image";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function Contact() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <section className="bg-white text-[#4E3629] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-center text-[#4E3629]">
          Get in Touch with Tex N Wash
        </h1>
        <p className="text-lg text-center mb-10 text-[#4E3629]">
          Questions? Quotes? We&apos;re just a message away. Let&apos;s keep your property looking its best!
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const honeypot = form.honey.value;

              if (honeypot !== "") {
                return;
              }

              const fullName = form.fullName.value;
              const email = form.email.value;
              const message = form.message.value;
              const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
              const wordCount = message.trim().split(/\s+/).length;

              if (fullName.length < 2 || /[^a-zA-Z\s]/.test(fullName)) {
                Swal.fire({
                  icon: "warning",
                  title: "Invalid Name",
                  text: "Please enter your full name with letters only.",
                  confirmButtonColor: "#BD5700",
                });
                return;
              }
              if (!emailRegex.test(email)) {
                Swal.fire({
                  icon: "warning",
                  title: "Invalid Email",
                  text: "Please enter a valid email address.",
                  confirmButtonColor: "#BD5700",
                });
                return;
              }
              if (wordCount < 3) {
                Swal.fire({
                  icon: "warning",
                  title: "Message Too Short",
                  text: "Please enter at least three words.",
                  confirmButtonColor: "#BD5700",
                });
                return;
              }

              try {
                const response = await fetch("https://formspree.io/f/xpwreryr", {
                  method: "POST",
                  body: new FormData(form),
                  headers: { Accept: "application/json" },
                });
                if (response.ok) {
                  Swal.fire({
                    icon: "success",
                    title: "Message Sent!",
                    text: "Thanks for reaching out. We'll get back to you shortly.",
                    confirmButtonColor: "#BD5700",
                  });
                  setFullName("");
                  setEmail("");
                  setMessage("");
                  form.reset();
                } else {
                  throw new Error("Network error");
                }
              } catch {
                Swal.fire({
                  icon: "error",
                  title: "Something went wrong",
                  text: "Please try again or contact us directly by phone.",
                  confirmButtonColor: "#BD5700",
                });
              }
            }}
          >
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded text-black"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded text-black"
            />
            <textarea
              name="message"
              rows={5}
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded text-black"
            />
            {/* honeypot */}
            <input type="text" name="honey" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
            <button
              type="submit"
              disabled={!fullName || !email || !message}
              className="bg-[#BD5700] hover:bg-black text-white font-semibold px-6 py-3 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

            <div>
              <h3 className="text-xl font-bold text-[#BD5700]">Follow Our Journey</h3>
              <p>Stay connected and see our latest work:</p>
              <div className="flex space-x-4 mt-2">
                <a href="https://www.instagram.com/texnwash/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Image src="/images/instagram.png" alt="Instagram" className="size-6" width={24} height={24} />
                </a>
                <a href="https://www.tiktok.com/@texnwash?_t=ZP-8xQSKcTy0OV&_r=1" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                  <Image src="/images/tiktok.png" alt="TikTok" className="size-6" width={24} height={24} />
                </a> 
                <a href="https://www.facebook.com/people/Tex-N-Wash/pfbid0EvRoWbi8Vx12Z8YZMXwNsYb2tQMWdniRsUYQzvEuUpBbKakZKmCbwPEVmFb7Xv1Kl/?ref=_ig_profile_ac" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Image src="/images/facebook.png" alt="Facebook" className="size-6" width={24} height={24} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#BD5700] mt-6">What People Say</h3>
              <p>Check out what others are saying or leave your own review:</p>
              <a
                href="https://www.google.com/search?q=texnwash.com+reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 bg-[#c3b091] text-black px-4 py-2 rounded hover:bg-[#b49f83] transition-colors"
              >
                Google Reviews
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
