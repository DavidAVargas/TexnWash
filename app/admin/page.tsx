import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/is-admin";

export default async function AdminPage() {
  const { userId } = await auth();
  const user = userId ? await currentUser() : null;
  const email = user?.emailAddresses?.[0]?.emailAddress;

  if (!userId || !isAdmin(email)) {
    redirect("/community");
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.firstName ?? "Admin"}.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: "📋",
            title: "Leads / CRM",
            desc: "View and manage incoming quote requests and customer leads.",
          },
          {
            icon: "👥",
            title: "Community Members",
            desc: "See who has joined the Tex N Wash Community.",
          },
          {
            icon: "📊",
            title: "Analytics",
            desc: "Track site traffic, form submissions, and service demand.",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="text-3xl mb-3">{card.icon}</div>
            <h3 className="font-semibold text-gray-900 mb-1">{card.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{card.desc}</p>
            <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500 font-medium">
              Coming soon
            </span>
          </div>
        ))}

        {/* Before & After Photos — live */}
        <div className="rounded-xl border border-[#BD5700]/30 bg-white p-6 shadow-sm flex flex-col">
          <div className="text-3xl mb-3">📸</div>
          <h3 className="font-semibold text-gray-900 mb-1">Before &amp; After Photos</h3>
          <p className="text-sm text-gray-600 mb-4 flex-1">
            Upload job photos for a customer. They see them in their member portal.
          </p>
          <div className="flex gap-2">
            <Link
              href="/admin/photos"
              className="inline-block text-center rounded-full border border-[#BD5700] px-4 py-1.5 text-xs text-[#BD5700] font-semibold hover:bg-[#BD5700]/5 transition-colors"
            >
              View All
            </Link>
            <Link
              href="/admin/photos/new"
              className="inline-block text-center rounded-full bg-[#BD5700] px-4 py-1.5 text-xs text-white font-semibold hover:bg-[#BD5700]/90 transition-colors"
            >
              + Add
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
