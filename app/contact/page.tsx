"use client";

import Image from "next/image";
import React, { useState } from "react";
import Swal from "sweetalert2";
import ReCaptcha, { resetReCaptcha } from "@/components/recaptcha";

export default function Contact() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");

  return (
    <div className="bg-white">

      {/* Header */}
      <div className="border-b border-gray-100 py-12 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Get in Touch</h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Questions or ready to book? We&apos;re just a message away.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-2 gap-12">

          {/* Contact Form */}
          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const honeypot = form.honey.value;

              if (honeypot !== "") return;

              const fullName = form.fullName.value;
              const email = form.email.value;
              const message = form.message.value;
              const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
              const wordCount = message.trim().split(/\s+/).length;

              if (fullName.length < 2 || /[^a-zA-Z\s'\-]/.test(fullName)) {
                Swal.fire({ icon: "warning", title: "Invalid Name", text: "Please enter your full name with letters only.", confirmButtonColor: "#BD5700" });
                return;
              }
              if (!emailRegex.test(email)) {
                Swal.fire({ icon: "warning", title: "Invalid Email", text: "Please enter a valid email address.", confirmButtonColor: "#BD5700" });
                return;
              }
              if (wordCount < 3) {
                Swal.fire({ icon: "warning", title: "Message Too Short", text: "Please enter at least three words.", confirmButtonColor: "#BD5700" });
                return;
              }
              if (!recaptchaToken) {
                Swal.fire({ icon: "warning", title: "reCAPTCHA Required", text: "Please check the \"I'm not a robot\" box.", confirmButtonColor: "#BD5700" });
                return;
              }

              try {
                const response = await fetch("/api/contact", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ fullName, email, message, recaptchaToken }),
                });
                if (response.ok) {
                  Swal.fire({ icon: "success", title: "Message Sent!", text: "Thanks for reaching out. We'll get back to you shortly.", confirmButtonColor: "#BD5700" });
                  setFullName("");
                  setEmail("");
                  setMessage("");
                  setRecaptchaToken("");
                  resetReCaptcha();
                  form.reset();
                } else {
                  throw new Error("Network error");
                }
              } catch {
                Swal.fire({ icon: "error", title: "Something went wrong", text: "Please try again or contact us directly by phone.", confirmButtonColor: "#BD5700" });
              }
            }}
          >
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              aria-label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#BD5700] transition-colors"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              aria-label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#BD5700] transition-colors"
            />
            <textarea
              name="message"
              rows={5}
              placeholder="Your Message"
              aria-label="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#BD5700] transition-colors resize-none"
            />
            <input type="text" name="honey" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
            <ReCaptcha
              onVerify={(token) => setRecaptchaToken(token)}
              onExpire={() => setRecaptchaToken("")}
            />
            <button
              type="submit"
              disabled={!fullName || !email || !message}
              className="w-full bg-[#BD5700] hover:bg-[#BD5700]/90 text-white font-semibold px-6 py-3 rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-8">

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Contact</h3>
              <div className="space-y-2">
                <a href="mailto:contact@texnwash.com" className="flex items-center gap-2 text-gray-700 hover:text-[#BD5700] transition-colors text-sm">
                  contact@texnwash.com
                </a>
                <a href="tel:+12102012123" className="flex items-center gap-2 text-gray-700 hover:text-[#BD5700] transition-colors text-sm">
                  (210) 201-2123
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Hours</h3>
              <div className="space-y-1 text-sm text-gray-700">
                <p>Mon – Sat: 8am – 9pm</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Service Area</h3>
              <p className="text-sm text-gray-700">Fort Worth, TX and surrounding areas</p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Follow Us</h3>
              <div className="flex gap-3">
                <a href="https://www.instagram.com/texnwash/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                  className="w-10 h-10 border border-gray-200 hover:border-[#BD5700] hover:bg-[#BD5700]/5 rounded-full flex items-center justify-center transition-colors">
                  <Image src="/images/instagram.png" alt="Instagram" width={18} height={18} />
                </a>
                <a href="https://www.tiktok.com/@texnwash?_t=ZP-8xQSKcTy0OV&_r=1" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                  className="w-10 h-10 border border-gray-200 hover:border-[#BD5700] hover:bg-[#BD5700]/5 rounded-full flex items-center justify-center transition-colors">
                  <Image src="/images/tiktok.png" alt="TikTok" width={18} height={18} />
                </a>
                <a href="https://www.facebook.com/people/Tex-N-Wash/pfbid0EvRoWbi8Vx12Z8YZMXwNsYb2tQMWdniRsUYQzvEuUpBbKakZKmCbwPEVmFb7Xv1Kl/?ref=_ig_profile_ac" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                  className="w-10 h-10 border border-gray-200 hover:border-[#BD5700] hover:bg-[#BD5700]/5 rounded-full flex items-center justify-center transition-colors">
                  <Image src="/images/facebook.png" alt="Facebook" width={18} height={18} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Reviews</h3>
              <p className="text-sm text-gray-500 mb-3">See what others are saying or leave your own review.</p>
              <a
                href="https://www.google.com/search?q=texnwash.com+reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-[#BD5700] text-[#BD5700] hover:bg-[#BD5700] hover:text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
              >
                Google Reviews
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
