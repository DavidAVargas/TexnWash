"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import { UploadDropzone } from "@/lib/uploadthing";

const SERVICE_TYPES = [
  "Driveway / Concrete",
  "House Wash",
  "Roof Cleaning",
  "Deck / Patio",
  "Fence",
  "Commercial",
  "Other",
];

export default function NewPhotoSetPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [form, setForm] = useState({
    customerName: params.get("name") ?? "",
    customerEmail: params.get("email") ?? "",
    address: "",
    serviceType: "",
    jobDate: "",
    notes: "",
  });
  const [beforeUrls, setBeforeUrls] = useState<string[]>([]);
  const [afterUrls, setAfterUrls] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!beforeUrls.length || !afterUrls.length) {
      Swal.fire(
        "Missing Photos",
        "Please upload at least one before and one after photo.",
        "warning"
      );
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          beforePhotos: beforeUrls,
          afterPhotos: afterUrls,
        }),
      });

      if (res.ok) {
        await Swal.fire("Saved!", "Photo set has been added to the customer's account.", "success");
        router.push("/admin");
      } else {
        const data = await res.json();
        Swal.fire("Error", data.error ?? "Failed to save photo set.", "error");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <div className="mb-8">
        <a href="/admin" className="text-sm text-[#BD5700] hover:underline">
          ← Back to Dashboard
        </a>
        <h1 className="text-2xl font-bold text-gray-900 mt-3">Add Before &amp; After Photos</h1>
        <p className="text-sm text-gray-500 mt-1">
          Upload job photos for a customer. They will appear in their community portal.
        </p>
        <p className="text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mt-2">
          JPG, PNG, and WEBP only. HEIC (iPhone) photos must be converted first — share them to your Mac and they&apos;ll convert automatically, or use a free converter.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wider">
            Customer Info
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="customerName"
                required
                value={form.customerName}
                onChange={handleChange}
                placeholder="Jane Smith"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#BD5700]/40"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="customerEmail"
                required
                value={form.customerEmail}
                onChange={handleChange}
                placeholder="jane@example.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#BD5700]/40"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Address</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="123 Main St, Fort Worth, TX"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#BD5700]/40"
            />
          </div>
        </div>

        {/* Job Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wider">
            Job Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
              <select
                name="serviceType"
                required
                value={form.serviceType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#BD5700]/40 bg-white"
              >
                <option value="">Select a service</option>
                {SERVICE_TYPES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Date</label>
              <input
                type="date"
                name="jobDate"
                required
                value={form.jobDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#BD5700]/40"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Any notes about the job..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#BD5700]/40 resize-none"
            />
          </div>
        </div>

        {/* Before Photos */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wider">
              Before Photos
            </h2>
            {beforeUrls.length > 0 && (
              <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                {beforeUrls.length} uploaded
              </span>
            )}
          </div>
          <UploadDropzone
            endpoint="jobPhoto"
            onClientUploadComplete={(res) => {
              setBeforeUrls(res.map((f) => f.ufsUrl ?? f.url));
            }}
            onUploadError={(err) => {
              Swal.fire("Upload Error", err.message, "error");
            }}
            appearance={{
              container: "border-2 border-dashed border-gray-200 rounded-lg bg-gray-50",
              label: "text-sm text-gray-500",
              uploadIcon: "text-gray-300",
              button: "bg-[#BD5700] text-white rounded-full px-4 py-1.5 text-sm font-medium",
            }}
          />
        </div>

        {/* After Photos */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wider">
              After Photos
            </h2>
            {afterUrls.length > 0 && (
              <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                {afterUrls.length} uploaded
              </span>
            )}
          </div>
          <UploadDropzone
            endpoint="jobPhoto"
            onClientUploadComplete={(res) => {
              setAfterUrls(res.map((f) => f.ufsUrl ?? f.url));
            }}
            onUploadError={(err) => {
              Swal.fire("Upload Error", err.message, "error");
            }}
            appearance={{
              container: "border-2 border-dashed border-gray-200 rounded-lg bg-gray-50",
              label: "text-sm text-gray-500",
              uploadIcon: "text-gray-300",
              button: "bg-[#BD5700] text-white rounded-full px-4 py-1.5 text-sm font-medium",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-[#BD5700] hover:bg-[#BD5700]/90 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          {submitting ? "Saving..." : "Save Photo Set"}
        </button>
      </form>
    </div>
  );
}
