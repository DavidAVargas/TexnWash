"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Tip = { text: string; cta?: { label: string; href: string } };
type Season = "spring" | "summer" | "fall" | "winter";

const SEASON_INFO: Record<Season, { emoji: string; label: string }> = {
  spring: { emoji: "🌸", label: "Spring" },
  summer: { emoji: "☀️", label: "Summer" },
  fall: { emoji: "🍂", label: "Fall" },
  winter: { emoji: "❄️", label: "Winter" },
};

const TIPS: Record<Season, Tip[]> = {
  spring: [
    { text: "Pollen and winter grime stick to siding fast. A spring wash before it bakes in saves effort all season." },
    { text: "Check your north-facing walls — algae starts growing in spring and spreads quickly if left untreated." },
    { text: "Your driveway took a beating over winter. Wash now to remove salt stains before they set permanently." },
    { text: "Spring is our busiest season — book now to lock in your preferred date before slots fill up.", cta: { label: "Book Now", href: "/quote" } },
    { text: "A clean property after winter makes a huge difference in curb appeal. Ready to get yours looking sharp?", cta: { label: "Get a Quote", href: "/quote" } },
    { text: "Decks and patios build up mildew over winter. We can have yours looking brand new for outdoor season.", cta: { label: "Book a Clean", href: "/quote" } },
  ],
  summer: [
    { text: "Algae thrives in summer heat — especially on shaded walls and fences. Catch it early before it spreads." },
    { text: "Outdoor entertaining season is here. Make sure your patio and deck are guest-ready." },
    { text: "Bug nests and spider webs build up fast in summer eaves. A quick rinse keeps them from coming back." },
    { text: "Heat bakes dirt into concrete fast. The longer you wait, the harder it is to remove.", cta: { label: "Book Now", href: "/quote" } },
    { text: "Summer is peak season — we fill up fast. Lock in your slot now.", cta: { label: "Book Now", href: "/quote" } },
    { text: "Your driveway sees heavy summer traffic. Keep it clean and professional-looking.", cta: { label: "Get a Quote", href: "/quote" } },
  ],
  fall: [
    { text: "Leaves and debris stain concrete and clog drains — clear them before winter makes it worse." },
    { text: "Fall moisture is perfect for mold and mildew to spread on siding. Treat it now before it sets in." },
    { text: "Prep your driveway for winter — clean concrete handles ice and salt better." },
    { text: "Book a fall clean before the holiday rush. October slots go fast.", cta: { label: "Book Now", href: "/quote" } },
    { text: "Get your property guest-ready for the holidays with a full exterior clean.", cta: { label: "Get a Quote", href: "/quote" } },
    { text: "Remove summer buildup before it freezes in over winter — we make it easy.", cta: { label: "Book a Clean", href: "/quote" } },
  ],
  winter: [
    { text: "Road salt and ice melt quietly eat into your driveway concrete — a winter wash prevents long-term damage." },
    { text: "Even in winter, algae and mold grow on shaded surfaces. Don't wait until spring to treat them." },
    { text: "Winter is the perfect time to plan ahead. Spring books up 4–6 weeks in advance." },
    { text: "Salt stains are easier to remove before they fully set in — we can take care of it now.", cta: { label: "Get a Quote", href: "/quote" } },
    { text: "Protect your property investment year-round with a winter pressure wash.", cta: { label: "Book a Clean", href: "/quote" } },
    { text: "Reserve your spring slot now before it fills up.", cta: { label: "Book Now", href: "/quote" } },
  ],
};

function getCurrentSeason(): Season {
  const m = new Date().getMonth();
  if ([2, 3, 4].includes(m)) return "spring";
  if ([5, 6, 7].includes(m)) return "summer";
  if ([8, 9, 10].includes(m)) return "fall";
  return "winter";
}

export default function SeasonalTipsCarousel() {
  const season = getCurrentSeason();
  const tips = TIPS[season];
  const info = SEASON_INFO[season];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % tips.length), 6000);
    return () => clearInterval(timer);
  }, [tips.length]);

  const tip = tips[current];

  return (
    <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{info.emoji}</span>
          <span className="text-xs font-bold uppercase tracking-widest text-[#BD5700]">{info.label} Tips</span>
        </div>
        <div className="flex items-center gap-1.5">
          {tips.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all ${i === current ? "w-4 h-2 bg-[#BD5700]" : "w-2 h-2 bg-[#BD5700]/30"}`}
            />
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-700 leading-relaxed min-h-[3rem] mb-4">{tip.text}</p>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setCurrent((p) => (p - 1 + tips.length) % tips.length)}
            className="w-8 h-8 rounded-full border border-orange-200 flex items-center justify-center text-[#BD5700] hover:bg-orange-100 transition-colors text-sm"
          >
            ←
          </button>
          <button
            onClick={() => setCurrent((p) => (p + 1) % tips.length)}
            className="w-8 h-8 rounded-full border border-orange-200 flex items-center justify-center text-[#BD5700] hover:bg-orange-100 transition-colors text-sm"
          >
            →
          </button>
        </div>
        {tip.cta && (
          <Link
            href={tip.cta.href}
            className="bg-[#BD5700] hover:bg-[#BD5700]/90 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
          >
            {tip.cta.label}
          </Link>
        )}
      </div>
    </div>
  );
}
