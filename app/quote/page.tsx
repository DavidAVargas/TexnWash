"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useUser } from "@clerk/nextjs";
import Swal from "sweetalert2";
import { Calendar } from "@/components/ui/calendar";
import ReCaptcha, { resetReCaptcha } from "@/components/recaptcha";

type Feature = { place_name: string };
type AddOn = { emoji: string; label: string; price: string };
type Service = { emoji: string; label: string; value: string; price: string };

const RESIDENTIAL_SERVICES: Service[] = [
  { emoji: "🧱", label: "Driveway / Concrete", value: "Driveway", price: "$0.28 / sq ft" },
  { emoji: "🏠", label: "House Walls", value: "House Wash", price: "$0.40 / sq ft" },
  { emoji: "🌿", label: "Fence & Deck", value: "Fence / Deck", price: "$1.50 / sq ft" },
  { emoji: "🗑️", label: "Trash Bin Cleaning", value: "Trash Bin Cleaning", price: "$35 / bin (add-on)" },
  { emoji: "✨", label: "Curb Appeal Package", value: "Curb Appeal Refresh Package", price: "Bundle — Save $50" },
];

const COMMERCIAL_SERVICES: Service[] = [
  { emoji: "🏪", label: "Storefront & Walkway", value: "Storefront & Walkway", price: "$0.60 / sq ft" },
  { emoji: "🅿️", label: "Parking Lot", value: "Parking Lot", price: "$0.45 / sq ft" },
  { emoji: "🧱", label: "Store Walls", value: "Store Walls", price: "$0.65 / sq ft" },
  { emoji: "🪧", label: "Signage Cleaning", value: "Signage Cleaning", price: "$100 / sign" },
];

const ADDON_MAP: Record<string, AddOn[]> = {
  "Driveway": [
    { emoji: "🌱", label: "Weed Removal in Cracks", price: "$75 flat, +$30/hr if extensive" },
    { emoji: "🛢️", label: "Oil & Grease Stain Treatment", price: "$60 per stain" },
    { emoji: "🪑", label: "Outdoor Furniture Moving", price: "$30 / hr" },
  ],
  "House Wash": [
    { emoji: "🪑", label: "Outdoor Furniture Moving", price: "$30 / hr" },
  ],
  "Fence / Deck": [
    { emoji: "🪑", label: "Outdoor Furniture Moving", price: "$30 / hr" },
  ],
  "Trash Bin Cleaning": [
    { emoji: "💪", label: "Heavy / Severely Dirty Bin", price: "+$15 per bin" },
  ],
  "Curb Appeal Refresh Package": [
    { emoji: "🌱", label: "Weed Removal in Cracks", price: "$75 flat, +$30/hr if extensive" },
    { emoji: "🛢️", label: "Oil & Grease Stain Treatment", price: "$60 per stain" },
    { emoji: "🪑", label: "Outdoor Furniture Moving", price: "$30 / hr" },
  ],
  "Storefront & Walkway": [
    { emoji: "🧹", label: "Stain Treatment (gum, oil, grease)", price: "$75 per stain" },
  ],
  "Parking Lot": [
    { emoji: "🛢️", label: "Oil & Grease Stain Treatment", price: "$75 per stain" },
  ],
  "Store Walls": [
    { emoji: "🧪", label: "Mold & Mildew Pre-Treatment", price: "$50 flat" },
  ],
  "Signage Cleaning": [
    { emoji: "🐦", label: "Bird Dropping Removal", price: "+$25" },
  ],
};

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#BD5700] transition-colors text-sm bg-white";

export default function QuotePage() {
  const { user } = useUser();
  const isSignedIn = !!user;

  const [activeTab, setActiveTab] = useState<"residential" | "commercial">("residential");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [address, setAddress] = useState("");
  const [squareFootage, setSquareFootage] = useState("");
  const [preferredDate, setPreferredDate] = useState<Date | undefined>();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [notes, setNotes] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [suggestions, setSuggestions] = useState<Feature[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);

  // Pre-fill from Clerk
  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setEmail(user.primaryEmailAddress?.emailAddress || "");
    }
  }, [user]);

  // Deduplicated add-ons based on selected services
  const availableAddOns = useMemo(() => {
    const seen = new Set<string>();
    const result: AddOn[] = [];
    for (const svc of selectedServices) {
      for (const addon of ADDON_MAP[svc] || []) {
        if (!seen.has(addon.label)) {
          seen.add(addon.label);
          result.push(addon);
        }
      }
    }
    return result;
  }, [selectedServices]);

  const handleTabChange = (tab: "residential" | "commercial") => {
    setActiveTab(tab);
    setSelectedServices([]);
    setSelectedAddOns([]);
  };

  const toggleService = (value: string) => {
    setSelectedServices((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
    setSelectedAddOns([]);
  };

  const toggleAddOn = (label: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(label) ? prev.filter((a) => a !== label) : [...prev, label]
    );
  };

  const handleAddressInput = useCallback(async (query: string) => {
    setAddress(query);
    if (query.trim().length < 3) { setShowSuggestions(false); return; }
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query.trim())}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}&autocomplete=true&country=us&proximity=-97.3308,32.7555`
      );
      const data = await res.json();
      setSuggestions(data.features || []);
      setShowSuggestions(data.features?.length > 0);
    } catch {
      setShowSuggestions(false);
    }
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        addressInputRef.current &&
        e.target !== addressInputRef.current
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedServices.length === 0) {
      Swal.fire({ icon: "warning", title: "Select a Service", text: "Please select at least one service.", confirmButtonColor: "#BD5700" });
      return;
    }
    if (!preferredDate) {
      Swal.fire({ icon: "warning", title: "Pick a Date", text: "Please select a preferred service date.", confirmButtonColor: "#BD5700" });
      return;
    }
    if (fullName.trim().split(/\s+/).length < 2 || /[^a-zA-Z\s'\-]/.test(fullName)) {
      Swal.fire({ icon: "warning", title: "Invalid Name", text: "Please enter your first and last name.", confirmButtonColor: "#BD5700" });
      return;
    }
    if (phone.replace(/\D/g, "").length !== 10) {
      Swal.fire({ icon: "warning", title: "Invalid Phone", text: "Please enter a valid 10-digit phone number.", confirmButtonColor: "#BD5700" });
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      Swal.fire({ icon: "warning", title: "Invalid Email", text: "Please enter a valid email address.", confirmButtonColor: "#BD5700" });
      return;
    }
    if (address.length < 5) {
      Swal.fire({ icon: "warning", title: "Address Required", text: "Please enter your property address.", confirmButtonColor: "#BD5700" });
      return;
    }
    if (!termsAccepted) {
      Swal.fire({ icon: "warning", title: "Terms Required", text: "Please read and accept the service terms.", confirmButtonColor: "#BD5700" });
      return;
    }
    if (!isSignedIn && !recaptchaToken) {
      Swal.fire({ icon: "warning", title: "reCAPTCHA Required", text: "Please check the \"I'm not a robot\" box.", confirmButtonColor: "#BD5700" });
      return;
    }

    setIsSubmitting(true);
    try {
      const body: Record<string, unknown> = {
        type: activeTab,
        services: selectedServices.join(", "),
        addOns: selectedAddOns.length > 0 ? selectedAddOns.join(", ") : "None selected",
        squareFootage: squareFootage || "Not provided",
        preferredDate: preferredDate.toLocaleDateString("en-US", {
          weekday: "long", year: "numeric", month: "long", day: "numeric",
        }),
        fullName,
        email,
        phone,
        address,
        notes: notes || "None",
        termsAccepted: "Yes",
        ...(activeTab === "commercial" && businessName && { businessName }),
      };
      if (!isSignedIn) body.recaptchaToken = recaptchaToken;

      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        Swal.fire({ icon: "success", title: "Quote Requested!", text: "We'll reach out shortly to confirm your appointment.", confirmButtonColor: "#BD5700" });
        setSelectedServices([]);
        setSelectedAddOns([]);
        setAddress("");
        setSquareFootage("");
        setPreferredDate(undefined);
        setPhone("");
        setNotes("");
        setTermsAccepted(false);
        setRecaptchaToken("");
        if (!isSignedIn) { setFullName(""); setEmail(""); }
        resetReCaptcha();
      } else {
        throw new Error("Failed");
      }
    } catch {
      Swal.fire({ icon: "error", title: "Something went wrong", text: "Please try again or contact us directly.", confirmButtonColor: "#BD5700" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = activeTab === "residential" ? RESIDENTIAL_SERVICES : COMMERCIAL_SERVICES;

  return (
    <div className="bg-white">

      {/* Header */}
      <div className="border-b border-gray-100 py-12 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Get Your Free Quote</h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          No payment needed — tell us what you need and we&apos;ll get back to you fast.
        </p>
        <div className="flex items-center justify-center gap-2 bg-orange-50 rounded-full px-5 py-2.5 text-sm text-gray-600 mx-auto w-fit mt-5">
          <span className="text-[#BD5700] font-bold">📍</span>
          <span>Currently serving Fort Worth and surrounding areas only</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">

        {/* Signed-in banner */}
        {isSignedIn && (
          <div className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-2xl px-5 py-3.5 mb-8">
            <span className="text-green-500 text-lg">✓</span>
            <div>
              <p className="text-sm font-semibold text-gray-900">Signed in as {user.fullName}</p>
              <p className="text-xs text-gray-500">Your info is pre-filled and reCAPTCHA is waived</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* ── Section 1: Services ── */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">What do you need cleaned?</p>

            {/* Tab toggle */}
            <div className="inline-flex bg-gray-100 rounded-full p-1 mb-5">
              <button
                type="button"
                onClick={() => handleTabChange("residential")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${activeTab === "residential" ? "bg-[#BD5700] text-white" : "text-gray-500 hover:text-gray-700"}`}
              >
                🏠 Residential
              </button>
              <button
                type="button"
                onClick={() => handleTabChange("commercial")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${activeTab === "commercial" ? "bg-[#BD5700] text-white" : "text-gray-500 hover:text-gray-700"}`}
              >
                🏢 Commercial
              </button>
            </div>

            {/* Service cards */}
            <div className="grid grid-cols-2 gap-3">
              {services.map((svc) => (
                <button
                  key={svc.value}
                  type="button"
                  onClick={() => toggleService(svc.value)}
                  className={`text-left p-4 rounded-2xl border-2 transition-all ${
                    selectedServices.includes(svc.value)
                      ? "border-[#BD5700] bg-orange-50"
                      : "border-gray-100 hover:border-gray-200 bg-white"
                  }`}
                >
                  <div className="text-xl mb-1.5">{svc.emoji}</div>
                  <div className="font-semibold text-gray-900 text-sm leading-tight">{svc.label}</div>
                  <div className="text-xs text-[#BD5700] font-medium mt-1">{svc.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* ── Section 2: Add-Ons (conditional) ── */}
          {selectedServices.length > 0 && availableAddOns.length > 0 && (
            <div className="border-t border-gray-100 pt-10">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Optional Add-Ons</p>
              <p className="text-xs text-gray-400 mb-4">Select any that apply — these will be included in your quote.</p>
              <div className="space-y-2.5">
                {availableAddOns.map((addon) => (
                  <label
                    key={addon.label}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      selectedAddOns.includes(addon.label)
                        ? "border-[#BD5700] bg-orange-50"
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="accent-[#BD5700] w-4 h-4 shrink-0"
                      checked={selectedAddOns.includes(addon.label)}
                      onChange={() => toggleAddOn(addon.label)}
                    />
                    <span className="text-lg">{addon.emoji}</span>
                    <span className="flex-1 text-sm text-gray-700">{addon.label}</span>
                    <span className="text-sm font-semibold text-[#BD5700] shrink-0">{addon.price}</span>
                  </label>
                ))}
              </div>
              <div className="mt-4 flex items-start gap-2 bg-gray-50 rounded-xl px-4 py-3 text-xs text-gray-500">
                <span className="shrink-0 mt-0.5">ⓘ</span>
                <span>Additional add-ons may be identified on-site. We&apos;ll always discuss and get your approval before adding anything to your invoice.</span>
              </div>
            </div>
          )}

          {/* ── Section 3: Property Details ── */}
          <div className="border-t border-gray-100 pt-10 space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Property Details</p>

            <div className="relative">
              <input
                ref={addressInputRef}
                type="text"
                placeholder="Property Address"
                aria-label="Property Address"
                value={address}
                onChange={(e) => handleAddressInput(e.target.value)}
                className={inputClass}
                required
              />
              {showSuggestions && (
                <div ref={suggestionsRef} className="absolute bg-white border border-gray-200 rounded-xl shadow-lg mt-1 z-50 w-full max-h-60 overflow-y-auto">
                  {suggestions.map((feature, i) => (
                    <div
                      key={i}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 border-b border-gray-100 last:border-0"
                      onClick={() => { setAddress(feature.place_name); setShowSuggestions(false); }}
                    >
                      {feature.place_name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <input
              type="number"
              placeholder="Approximate Square Footage (optional)"
              aria-label="Square Footage"
              value={squareFootage}
              onChange={(e) => setSquareFootage(e.target.value)}
              className={inputClass}
              min="1"
            />
            <p className="text-xs text-gray-400">
              Don&apos;t know your square footage? No problem — we&apos;ll measure on-site.
            </p>
          </div>

          {/* ── Section 4: Preferred Date ── */}
          <div className="border-t border-gray-100 pt-10">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Preferred Date</p>
            <p className="text-xs text-gray-400 mb-5">Mon – Sat only · We&apos;ll confirm the exact time by text or call</p>
            <div className="flex justify-center">
              <div className="[&_[data-selected-single=true]]:bg-[#BD5700] [&_[data-selected-single=true]]:text-white border border-gray-100 rounded-2xl overflow-hidden">
                <Calendar
                  mode="single"
                  selected={preferredDate}
                  onSelect={setPreferredDate}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today || date.getDay() === 0;
                  }}
                />
              </div>
            </div>
            {preferredDate && (
              <div className="mt-4 flex items-center gap-2 bg-orange-50 rounded-xl px-4 py-3 text-sm text-gray-700">
                <span className="text-[#BD5700]">📅</span>
                <span>
                  Selected:{" "}
                  <strong>
                    {preferredDate.toLocaleDateString("en-US", {
                      weekday: "long", month: "long", day: "numeric", year: "numeric",
                    })}
                  </strong>
                </span>
              </div>
            )}
          </div>

          {/* ── Section 5: Contact Info ── */}
          <div className="border-t border-gray-100 pt-10 space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Your Info</p>

            {!isSignedIn && (
              <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 mb-2">
                <p className="text-sm text-gray-600">Have an account? Sign in to skip this step.</p>
                <a href="/sign-in" className="text-sm font-semibold text-[#BD5700] hover:underline shrink-0 ml-3">
                  Sign In →
                </a>
              </div>
            )}

            <input
              type="text"
              placeholder="Full Name"
              aria-label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`${inputClass} ${isSignedIn ? "bg-gray-50 text-gray-500" : ""}`}
              readOnly={isSignedIn}
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              aria-label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${inputClass} ${isSignedIn ? "bg-gray-50 text-gray-500" : ""}`}
              readOnly={isSignedIn}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              aria-label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
              required
            />
            {activeTab === "commercial" && (
              <input
                type="text"
                placeholder="Business Name"
                aria-label="Business Name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className={inputClass}
              />
            )}
          </div>

          {/* ── Section 6: Notes ── */}
          <div className="border-t border-gray-100 pt-10 space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Additional Notes</p>
            <textarea
              placeholder="Anything else we should know? (optional)"
              aria-label="Additional notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className={`${inputClass} resize-none`}
            />
            <div className="flex items-start gap-2 text-xs text-gray-400">
              <span className="shrink-0">📸</span>
              <span>
                Have photos? Feel free to text them to us at{" "}
                <strong className="text-gray-600">(210) 201-2123</strong> after submitting — it helps us give you a more accurate quote.
              </span>
            </div>
          </div>

          {/* Honeypots */}
          <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} aria-hidden="true" />
          <input type="text" name="nickname" style={{ display: "none" }} tabIndex={-1} aria-hidden="true" />

          {/* ── Section 7: Terms ── */}
          <div className="border-t border-gray-100 pt-10">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Service Terms</p>

            <div className="border border-gray-100 rounded-2xl overflow-hidden">
              <button
                type="button"
                onClick={() => setShowTerms(!showTerms)}
                className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <span>Read our service terms</span>
                <span className={`text-gray-400 transition-transform duration-200 ${showTerms ? "rotate-180" : ""}`}>▼</span>
              </button>

              {showTerms && (
                <div className="px-5 pb-5 pt-4 space-y-4 border-t border-gray-100 text-sm text-gray-600 leading-relaxed">
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Payment</p>
                    <p>Payment is due upon job completion via Chase Business Invoicing. All services include the required 8.25% Texas sales tax. Card payments include a 3.5% + $0.10 processing fee per transaction.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">On-Site Add-Ons</p>
                    <p>If additional work is identified during service, it will be discussed and agreed upon before proceeding. Nothing will be added to your invoice without your approval.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Cancellations & Rescheduling</p>
                    <p>We ask for at least 24 hours notice to cancel or reschedule. Failure to provide notice may result in a cancellation fee.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Property Access</p>
                    <p>By submitting this form, you authorize Tex N Wash to access the property listed above for the service on the requested date.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Photo & Video Documentation</p>
                    <p>We photograph and/or video every job for our records and marketing. Please note in the Additional Notes field if you&apos;d prefer to opt out.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Stain Results</p>
                    <p>Some stains (rust, deep oil, paint) may not fully remove. We will advise you on arrival if we believe results may be limited before beginning work.</p>
                  </div>
                  <p className="text-xs text-gray-400 pt-2">
                    Questions? Contact us at contact@texnwash.com or (210) 201-2123.
                  </p>
                </div>
              )}
            </div>

            <label className="flex items-start gap-3 mt-4 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="accent-[#BD5700] w-4 h-4 mt-0.5 shrink-0"
              />
              <span className="text-sm text-gray-600">
                I have read and agree to the service terms. I understand this is a quote request, not a confirmed booking.
              </span>
            </label>
          </div>

          {/* ── Section 8: Security + Submit ── */}
          <div className="border-t border-gray-100 pt-10 space-y-4">
            {!isSignedIn && (
              <ReCaptcha
                onVerify={(token) => setRecaptchaToken(token)}
                onExpire={() => setRecaptchaToken("")}
              />
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#BD5700] hover:bg-[#BD5700]/90 text-white font-semibold px-6 py-3.5 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base"
            >
              {isSubmitting ? "Sending..." : "Request My Free Quote →"}
            </button>
            <p className="text-xs text-center text-gray-400">
              By submitting you agree to our service terms above. We&apos;ll never share your info.
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}
