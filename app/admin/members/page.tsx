import { auth, currentUser, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/is-admin";
import Link from "next/link";
import { format } from "date-fns";
import TierControls from "./_components/TierControls";

export default async function AdminMembersPage() {
  const { userId } = await auth();
  const user = userId ? await currentUser() : null;
  const email = user?.emailAddresses?.[0]?.emailAddress;

  if (!userId || !isAdmin(email)) redirect("/community");

  const client = await clerkClient();
  const { data: users } = await client.users.getUserList({ limit: 100, orderBy: "-created_at" });

  const members = users;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-8">
        <Link href="/admin" className="text-sm text-[#BD5700] hover:underline">
          ← Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-3">Community Members</h1>
        <p className="text-sm text-gray-500 mt-1">
          {members.length} member{members.length !== 1 ? "s" : ""} in the community.
        </p>
      </div>

      {members.length === 0 ? (
        <div className="text-center py-20 text-gray-400 text-sm">No members yet.</div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 shadow-sm">
          {members.map((member) => {
            const name = `${member.firstName || ""} ${member.lastName || ""}`.trim() || "No name set";
            const memberEmail = member.emailAddresses?.[0]?.emailAddress ?? "";
            const tier = (member.publicMetadata?.loyaltyTier as number) ?? 1;
            const serviceCount = (member.publicMetadata?.serviceCount as number) ?? 0;
            const joined = new Date(member.createdAt);
            const socials = (member.unsafeMetadata ?? {}) as { instagram?: string; tiktok?: string; facebook?: string };

            const socialLinks = [
              { icon: "📸", label: "Instagram", handle: socials.instagram, url: socials.instagram ? `https://instagram.com/${socials.instagram.replace("@", "")}` : null },
              { icon: "🎵", label: "TikTok", handle: socials.tiktok, url: socials.tiktok ? `https://tiktok.com/@${socials.tiktok.replace("@", "")}` : null },
              { icon: "👤", label: "Facebook", handle: socials.facebook, url: socials.facebook ? `https://facebook.com/${socials.facebook.replace("@", "")}` : null },
            ].filter((s) => s.handle);

            return (
              <div key={member.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900 text-sm truncate">{name}</p>
                    <span className="shrink-0 text-xs bg-[#BD5700]/10 text-[#BD5700] font-semibold px-2 py-0.5 rounded-full">Member</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{memberEmail}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Joined {format(joined, "MMM d, yyyy")}</p>
                  {socialLinks.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1.5">
                      {socialLinks.map(({ icon, label, handle, url }) => (
                        <a
                          key={label}
                          href={url!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-[#BD5700] hover:underline"
                        >
                          <span>{icon}</span>
                          <span>{handle}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <TierControls userId={member.id} currentTier={tier} currentServiceCount={serviceCount} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
