"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    const result = await Swal.fire({
      title: "Delete this photo set?",
      text: "This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#BD5700",
      confirmButtonText: "Yes, delete it",
    });

    if (!result.isConfirmed) return;

    const res = await fetch(`/api/photos/${id}`, { method: "DELETE" });
    if (res.ok) {
      Swal.fire({ title: "Deleted!", icon: "success", timer: 1200, showConfirmButton: false });
      router.refresh();
    } else {
      Swal.fire("Error", "Failed to delete.", "error");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
    >
      Delete
    </button>
  );
}
