"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import type { IPhotoSet } from "@/lib/models/PhotoSet";

interface GroupedCustomer {
  customerName: string;
  customerEmail: string;
  photoSets: IPhotoSet[];
}

export function SearchablePhotoList({ customers }: { customers: GroupedCustomer[] }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const filtered = query.trim()
    ? customers.filter(
        (c) =>
          c.customerName.toLowerCase().includes(query.toLowerCase()) ||
          c.customerEmail.toLowerCase().includes(query.toLowerCase())
      )
    : customers;

  async function handleDelete(id: string) {
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
    router.refresh();
  }

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#BD5700]/40 bg-white shadow-sm"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg"
          >
            ×
          </button>
        )}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          {customers.length === 0 ? (
            <>
              <p className="text-4xl mb-3">📸</p>
              <p className="font-medium">No photo sets yet.</p>
            </>
          ) : (
            <p>No customers match &ldquo;{query}&rdquo;</p>
          )}
        </div>
      )}

      {filtered.map((customer) => (
        <div key={customer.customerEmail} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Customer header */}
          <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-100">
            <div>
              <p className="font-semibold text-gray-900">{customer.customerName}</p>
              <p className="text-xs text-gray-500">{customer.customerEmail}</p>
            </div>
            <Link
              href={`/admin/photos/new?email=${encodeURIComponent(customer.customerEmail)}&name=${encodeURIComponent(customer.customerName)}`}
              className="text-xs bg-[#BD5700] text-white font-semibold px-3 py-1.5 rounded-full hover:bg-[#BD5700]/90 transition-colors"
            >
              + Add Job
            </Link>
          </div>

          {/* Jobs */}
          <div className="divide-y divide-gray-50">
            {customer.photoSets.map((set) => (
              <div key={set._id} className="px-6 py-4 flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900 text-sm">
                      {format(new Date(set.jobDate), "MMMM d, yyyy")}
                    </span>
                    <span className="text-xs bg-[#BD5700]/10 text-[#BD5700] px-2 py-0.5 rounded-full font-medium">
                      {set.serviceType}
                    </span>
                  </div>
                  {set.address && (
                    <p className="text-xs text-gray-500 mb-1">📍 {set.address}</p>
                  )}
                  <p className="text-xs text-gray-400">
                    {set.beforePhotos.length} before · {set.afterPhotos.length} after
                    {set.notes && <> · <span className="italic">{set.notes}</span></>}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    href={`/admin/photos/${set._id}/edit`}
                    className="text-xs text-[#BD5700] hover:underline font-semibold border border-[#BD5700]/30 px-3 py-1.5 rounded-lg hover:bg-[#BD5700]/5 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(set._id)}
                    className="text-xs text-gray-400 hover:text-red-500 font-medium transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
