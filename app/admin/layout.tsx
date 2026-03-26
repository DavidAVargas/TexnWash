import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/is-admin";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  const user = userId ? await currentUser() : null;
  const email = user?.emailAddresses?.[0]?.emailAddress;

  if (!userId || !isAdmin(email)) {
    redirect("/community");
  }

  return (
    <div>
      <div className="bg-[#1a0f00] px-6 py-3 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-[#BD5700]">Admin</span>
        <Link
          href="/community"
          className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1"
        >
          ← Back to Portal
        </Link>
      </div>
      {children}
    </div>
  );
}
