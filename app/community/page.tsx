import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function CommunityPage() {
  const { userId } = await auth();
  const user = userId ? await currentUser() : null;
  const isAdmin = user?.publicMetadata?.role === "admin";

  if (!userId) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            The Tex N Wash Community
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our community of Fort Worth homeowners and get exclusive perks,
            priority service, and insider tips for keeping your property looking
            its best.
          </p>
          <div className="mt-8">
            <Button asChild className="bg-brand hover:bg-brand/90 text-white text-lg px-8 py-3 h-auto">
              <Link href="/sign-up">Join Free</Link>
            </Button>
            <p className="mt-3 text-sm text-gray-500">
              Already a member?{" "}
              <Link href="/sign-in" className="text-brand hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            {
              icon: "💰",
              title: "Member Discounts",
              desc: "Exclusive pricing on all services — save up to 15% on every booking.",
            },
            {
              icon: "📅",
              title: "Priority Booking",
              desc: "Skip the waitlist. Members get first access to open slots.",
            },
            {
              icon: "📸",
              title: "Before & After Photos",
              desc: "View your personal before and after photos for every clean we do.",
            },
          ].map((perk) => (
            <div
              key={perk.title}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="text-3xl mb-3">{perk.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1">{perk.title}</h3>
              <p className="text-sm text-gray-600">{perk.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Welcome back, {user?.firstName ?? "Admin"}
        </h1>
        <p className="text-gray-600 mb-8">You&apos;re signed in as an admin.</p>
        <Button asChild className="bg-brand hover:bg-brand/90">
          <Link href="/admin">Go to Admin Dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          Welcome, {user?.firstName ?? "member"}!
        </h1>
        <p className="text-gray-600">Your Tex N Wash Community portal.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: "💰",
            title: "Member Discounts",
            desc: "Show your member status when booking to unlock exclusive pricing.",
            cta: "Book a Service",
            href: "/quote",
          },
          {
            icon: "📅",
            title: "Priority Booking",
            desc: "Mention you&apos;re a community member and we&apos;ll fit you in first.",
            cta: "Request Appointment",
            href: "/quote",
          },
          {
            icon: "📸",
            title: "Before & After Photos",
            desc: "Your personal photo record for every clean — coming soon.",
            cta: null,
            href: null,
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col"
          >
            <div className="text-3xl mb-3">{card.icon}</div>
            <h3 className="font-semibold text-gray-900 mb-1">{card.title}</h3>
            <p className="text-sm text-gray-600 flex-1">{card.desc}</p>
            {card.cta && card.href && (
              <div className="mt-4">
                <Button asChild variant="outline" size="sm" className="border-brand text-brand hover:bg-brand/5">
                  <Link href={card.href}>{card.cta}</Link>
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
