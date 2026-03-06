import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const { userId } = await auth();
  const user = userId ? await currentUser() : null;

  if (!userId || user?.publicMetadata?.role !== "admin") {
    redirect("/community");
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.firstName ?? "Admin"}.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: "📋",
            title: "Leads / CRM",
            desc: "View and manage incoming quote requests and customer leads.",
          },
          {
            icon: "👥",
            title: "Community Members",
            desc: "See who has joined the Texan Watch Community.",
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
      </div>
    </div>
  );
}
