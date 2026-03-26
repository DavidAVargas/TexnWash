"use client";

import { useState } from "react";

const TIERS = [
  { tier: 1, label: "Tier 1", discount: "5%" },
  { tier: 2, label: "Tier 2", discount: "10%" },
  { tier: 3, label: "Tier 3", discount: "15%" },
];

export default function TierControls({
  userId,
  currentTier,
  currentServiceCount,
}: {
  userId: string;
  currentTier: number;
  currentServiceCount: number;
}) {
  const [tier, setTier] = useState(currentTier);
  const [count, setCount] = useState(currentServiceCount);
  const [saving, setSaving] = useState(false);

  async function save(updates: { tier?: number; serviceCount?: number }) {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/set-loyalty-tier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId: userId, ...updates }),
      });
      if (res.ok) {
        if (updates.tier !== undefined) setTier(updates.tier);
        if (updates.serviceCount !== undefined) setCount(updates.serviceCount);
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Service count stepper */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400 font-medium w-24">Services:</span>
        <button
          onClick={() => save({ serviceCount: Math.max(0, count - 1) })}
          disabled={saving || count === 0}
          className="w-7 h-7 rounded-full border border-gray-200 text-gray-600 hover:border-[#BD5700] hover:text-[#BD5700] disabled:opacity-40 text-sm font-bold transition-colors"
        >
          −
        </button>
        <span className="w-6 text-center text-sm font-bold text-gray-900">{count}</span>
        <button
          onClick={() => save({ serviceCount: count + 1 })}
          disabled={saving}
          className="w-7 h-7 rounded-full border border-gray-200 text-gray-600 hover:border-[#BD5700] hover:text-[#BD5700] text-sm font-bold transition-colors"
        >
          +
        </button>
      </div>

      {/* Tier override */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-gray-400 font-medium w-24">Tier override:</span>
        {TIERS.map(({ tier: t, label, discount }) => (
          <button
            key={t}
            onClick={() => save({ tier: tier === t ? 0 : t })}
            disabled={saving}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors disabled:opacity-60 ${
              tier === t
                ? "bg-[#BD5700] text-white border-[#BD5700]"
                : "bg-white text-gray-600 border-gray-200 hover:border-[#BD5700] hover:text-[#BD5700]"
            }`}
          >
            {label} · {discount}
          </button>
        ))}
      </div>
    </div>
  );
}
