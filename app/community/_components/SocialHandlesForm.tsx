"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  instagram?: string;
  tiktok?: string;
  facebook?: string;
}

export default function SocialHandlesForm({ instagram = "", tiktok = "", facebook = "" }: Props) {
  const [ig, setIg] = useState(instagram);
  const [tt, setTt] = useState(tiktok);
  const [fb, setFb] = useState(facebook);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function handleSave() {
    setStatus("saving");
    try {
      const res = await fetch("/api/user/socials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ instagram: ig, tiktok: tt, facebook: fb }),
      });
      setStatus(res.ok ? "saved" : "error");
      if (res.ok) setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-[#BD5700]/10 rounded-xl flex items-center justify-center text-xl shrink-0">
          📲
        </div>
        <div>
          <h3 className="font-bold text-gray-900 mb-1">Want Us to Follow You Back?</h3>
          <p className="text-sm text-gray-500">
            Add your handles below and we&apos;ll follow you on Instagram, TikTok, and Facebook —
            giving you direct DM access to our team. Completely optional. Leave blank to stay private.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {[
          { label: "Instagram", icon: "📸", value: ig, setter: setIg, placeholder: "@yourhandle" },
          { label: "TikTok", icon: "🎵", value: tt, setter: setTt, placeholder: "@yourhandle" },
          { label: "Facebook", icon: "👤", value: fb, setter: setFb, placeholder: "Profile name or URL" },
        ].map(({ label, icon, value, setter, placeholder }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="w-8 text-center text-lg shrink-0">{icon}</span>
            <span className="w-24 text-sm font-medium text-gray-700 shrink-0">{label}</span>
            <input
              type="text"
              value={value}
              onChange={(e) => setter(e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#BD5700] transition-colors"
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-6">
        {status === "saved" && (
          <p className="text-sm text-green-600 font-medium">Saved! We&apos;ll follow you shortly.</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-500 font-medium">Something went wrong. Try again.</p>
        )}
        {(status === "idle" || status === "saving") && <span />}
        <Button
          onClick={handleSave}
          disabled={status === "saving"}
          className="bg-[#BD5700] hover:bg-[#BD5700]/90 text-white rounded-full px-6"
        >
          {status === "saving" ? "Saving..." : "Save Handles"}
        </Button>
      </div>
    </div>
  );
}
