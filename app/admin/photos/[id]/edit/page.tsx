"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Swal from "sweetalert2";
import { UploadDropzone } from "@/lib/uploadthing";
import type { IPhotoSet } from "@/lib/models/PhotoSet";

const SERVICE_TYPES = [
  "Driveway / Concrete",
  "House Wash",
  "Roof Cleaning",
  "Deck / Patio",
  "Fence",
  "Commercial",
  "Other",
];

export default function EditPhotoSetPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [job, setJob] = useState<IPhotoSet | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/photos/${id}`)
      .then((r) => r.json())
      .then(setJob);
  }, [id]);

  async function patch(body: Record<string, unknown>) {
    const res = await fetch(`/api/photos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const updated = await res.json();
    setJob(updated);
    return updated;
  }

  async function removePhoto(side: "before" | "after", url: string) {
    const result = await Swal.fire({
      title: "Remove this photo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#BD5700",
      confirmButtonText: "Remove",
    });
    if (!result.isConfirmed) return;
    if (side === "before") await patch({ removeBefore: url });
    else await patch({ removeAfter: url });
  }

  async function saveFields(e: React.FormEvent) {
    e.preventDefault();
    if (!job) return;
    setSaving(true);
    await patch({
      customerName: job.customerName,
      address: job.address,
      serviceType: job.serviceType,
      jobDate: job.jobDate,
      notes: job.notes,
    });
    setSaving(false);
    Swal.fire({ title: "Saved!", icon: "success", timer: 1200, showConfirmButton: false });
  }

  async function deleteJob() {
    const result = await Swal.fire({
      title: "Delete this entire job?",
      text: "All photos will be lost. This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete",
    });
    if (!result.isConfirmed) return;
    await fetch(`/api/photos/${id}`, { method: "DELETE" });
    router.push("/admin/photos");
  }

  if (!job) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <a href="/admin/photos" className="text-sm text-[#BD5700] hover:underline">
            ← Back to All Photos
          </a>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Edit Job</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {job.customerName} · {job.customerEmail}
          </p>
        </div>
        <button
          onClick={deleteJob}
          className="text-sm text-red-500 hover:text-red-700 font-medium border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-lg transition-colors"
        >
          Delete Job
        </button>
      </div>

      <div className="space-y-6">
        {/* Job Details */}
        <form onSubmit={saveFields} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wider">Job Details</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
            <input
              type="text"
              value={job.customerName}
              onChange={(e) => setJob({ ...job, customerName: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#BD5700]/40"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Address</label>
            <input
              type="text"
              value={job.address ?? ""}
              onChange={(e) => setJob({ ...job, address: e.target.value })}
              placeholder="123 Main St, Fort Worth, TX"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#BD5700]/40"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
              <select
                value={job.serviceType}
                onChange={(e) => setJob({ ...job, serviceType: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#BD5700]/40 bg-white"
              >
                {SERVICE_TYPES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Date</label>
              <input
                type="date"
                value={new Date(job.jobDate).toISOString().split("T")[0]}
                onChange={(e) => setJob({ ...job, jobDate: new Date(e.target.value) })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#BD5700]/40"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={job.notes ?? ""}
              onChange={(e) => setJob({ ...job, notes: e.target.value })}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#BD5700]/40 resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="bg-[#BD5700] hover:bg-[#BD5700]/90 disabled:opacity-60 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
          >
            {saving ? "Saving..." : "Save Details"}
          </button>
        </form>

        {/* Before Photos */}
        <PhotoSection
          title="Before Photos"
          urls={job.beforePhotos}
          onRemove={(url) => removePhoto("before", url)}
          onAdd={async (urls) => await patch({ addBefore: urls })}
        />

        {/* After Photos */}
        <PhotoSection
          title="After Photos"
          urls={job.afterPhotos}
          onRemove={(url) => removePhoto("after", url)}
          onAdd={async (urls) => await patch({ addAfter: urls })}
        />
      </div>
    </div>
  );
}

function PhotoSection({
  title,
  urls,
  onRemove,
  onAdd,
}: {
  title: string;
  urls: string[];
  onRemove: (url: string) => void;
  onAdd: (urls: string[]) => Promise<void>;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wider">{title}</h2>
        <span className="text-xs text-gray-400">{urls.length} photo{urls.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Current photos */}
      {urls.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {urls.map((url, i) => (
            <div key={i} className="relative group">
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={url}
                  alt={`Photo ${i + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => onRemove(url)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add more */}
      <div>
        <p className="text-xs text-gray-500 mb-2">Add more photos:</p>
        <UploadDropzone
          endpoint="jobPhoto"
          onClientUploadComplete={async (res) => {
            await onAdd(res.map((f) => f.ufsUrl ?? f.url));
          }}
          onUploadError={(err) => { Swal.fire("Upload Error", err.message, "error"); }}
          appearance={{
            container: "border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 !py-6",
            label: "text-sm text-gray-400",
            uploadIcon: "text-gray-300",
            button: "bg-[#BD5700] text-white rounded-full px-4 py-1.5 text-xs font-medium",
          }}
        />
      </div>
    </div>
  );
}
