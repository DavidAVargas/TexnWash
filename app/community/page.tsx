import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { isAdmin as isAdminUser } from "@/lib/is-admin";
import Image from "next/image";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { connectDB } from "@/lib/mongodb";
import { PhotoSet, type IPhotoSet } from "@/lib/models/PhotoSet";

export default async function CommunityPage() {
  const { userId } = await auth();
  const user = userId ? await currentUser() : null;
  const isAdmin = isAdminUser(user?.emailAddresses?.[0]?.emailAddress);

  if (!userId) {
    return (
      <div>
        {/* Hero */}
        <div className="relative bg-[#1a0f00] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#BD5700_0%,_transparent_60%)] opacity-40" />
          <div className="relative mx-auto max-w-5xl px-6 py-24 text-center">
            <span className="inline-block bg-[#BD5700]/20 text-[#BD5700] border border-[#BD5700]/30 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              Free to Join
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              The Tex N Wash<br />
              <span className="text-[#BD5700]">Community</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
              Join 100+ Fort Worth homeowners who get exclusive perks, priority
              booking, and a personal record of every clean we do for their property.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                className="bg-[#BD5700] hover:bg-[#BD5700]/90 text-white text-lg px-10 py-4 h-auto rounded-full shadow-lg shadow-[#BD5700]/30"
              >
                <Link href="/sign-up">Join Free</Link>
              </Button>
              <Link
                href="/sign-in"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Already a member? Sign in →
              </Link>
            </div>
          </div>
        </div>

        {/* Perks */}
        <div className="bg-gray-50 py-20 px-6">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Everything you get as a member
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                We built this community to reward the homeowners who trust us with their property.
              </p>
            </div>

            {/* Featured perks — full width cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Before & After — hero featured card */}
              <div className="relative bg-[#1a0f00] rounded-2xl p-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#BD5700] opacity-10 rounded-full translate-x-16 -translate-y-16" />
                <span className="inline-block bg-[#BD5700] text-white text-xs font-bold px-3 py-1 rounded-full mb-5 uppercase tracking-wider">
                  Members Only
                </span>
                <div className="text-4xl mb-4">📸</div>
                <h3 className="text-2xl font-bold text-white mb-3">Before &amp; After Photos</h3>
                <p className="text-gray-300 leading-relaxed">
                  Every time we clean your property, we take before and after photos and add them to your personal member account. See the transformation — and share it if you want. Your property&apos;s history, always at your fingertips.
                </p>
              </div>

              {/* Member Discounts — featured card */}
              <div className="relative bg-[#BD5700] rounded-2xl p-8 overflow-hidden">
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -translate-x-16 translate-y-16" />
                <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-5 uppercase tracking-wider">
                  Loyalty Pricing
                </span>
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-2xl font-bold text-white mb-3">Member Pricing</h3>
                <p className="text-white/80 leading-relaxed mb-5">
                  Your discount grows the more you use us. No coupons, no codes — it&apos;s applied automatically every time you book.
                </p>
                <div className="space-y-2">
                  {[
                    { label: "1st Service", value: "5% off" },
                    { label: "3rd Service", value: "10% off" },
                    { label: "5th Service+", value: "15% off" },
                  ].map((tier) => (
                    <div key={tier.label} className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-2.5">
                      <span className="text-white/80 text-sm">{tier.label}</span>
                      <span className="text-white font-bold text-sm">{tier.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Standard perks grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: "📅",
                  title: "Priority Booking",
                  desc: "Skip the waitlist. Members get first access to open slots, especially during peak season.",
                },
                {
                  icon: "🌧️",
                  title: "Priority Rescheduling",
                  desc: "Bad weather? Members get first pick on rescheduled slots so you never lose your spot.",
                },
                {
                  icon: "🏠",
                  title: "Property Profile",
                  desc: "We keep notes on your property — surfaces, problem areas, special instructions. Every visit we already know your place.",
                },
                {
                  icon: "🔔",
                  title: "Seasonal Reminders",
                  desc: "We reach out before each season so your property is always ready — no guesswork on your end.",
                },
                {
                  icon: "🎁",
                  title: "Referral Rewards",
                  desc: "Refer a neighbor and earn credit toward your next service. Share the love, get rewarded.",
                },
                {
                  icon: "📲",
                  title: "We Follow You Back",
                  desc: "Add your social handles in your portal and we'll follow you on Instagram, TikTok, and Facebook for direct DM access.",
                },
                {
                  icon: "⭐",
                  title: "Review Reward",
                  desc: "Leave us a Google review and we'll thank you with a special discount on your next service.",
                },
              ].map((perk) => (
                <div
                  key={perk.title}
                  className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-11 h-11 bg-[#BD5700]/10 rounded-xl flex items-center justify-center text-xl mb-4">
                    {perk.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1.5 text-sm">{perk.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{perk.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button
                asChild
                className="bg-[#BD5700] hover:bg-[#BD5700]/90 text-white px-10 py-4 h-auto rounded-full text-lg shadow-lg shadow-[#BD5700]/20"
              >
                <Link href="/sign-up">Join the Community — It&apos;s Free</Link>
              </Button>
              <p className="text-gray-400 text-sm mt-3">No credit card required. Sign up with Google in seconds.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#BD5700]/10 rounded-full flex items-center justify-center text-3xl mx-auto mb-5">
            👋
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName ?? "Admin"}
          </h1>
          <p className="text-gray-500 mb-8">You&apos;re signed in as an admin.</p>
          <Button asChild className="bg-[#BD5700] hover:bg-[#BD5700]/90 rounded-full px-8">
            <Link href="/admin">Go to Admin Dashboard →</Link>
          </Button>
        </div>
      </div>
    );
  }

  const month = new Date().getMonth();
  const seasonTip =
    month >= 2 && month <= 4
      ? { emoji: "🌸", season: "Spring", tip: "Winter buildup is at its worst right now. A spring clean is the #1 thing Fort Worth homeowners book this time of year." }
      : month >= 5 && month <= 7
      ? { emoji: "☀️", season: "Summer", tip: "Summer heat bakes in dirt and mildew fast. Keep your property looking sharp all season long." }
      : month >= 8 && month <= 10
      ? { emoji: "🍂", season: "Fall", tip: "Clear away summer buildup before the cold sets in. Fall is a great time to prep your driveway and deck." }
      : { emoji: "❄️", season: "Winter", tip: "Winter grime and oil stains build up fast. Get ahead of the season with a pre-spring clean." };

  const memberName = user?.fullName ?? user?.firstName ?? "Member";
  const memberEmail = user?.emailAddresses?.[0]?.emailAddress ?? "";
  const initials = (user?.firstName?.[0] ?? "") + (user?.lastName?.[0] ?? "");

  // Fetch this member's photo sets from MongoDB
  let photoSets: IPhotoSet[] = [];
  if (memberEmail) {
    try {
      await connectDB();
      const raw = await PhotoSet.find({ customerEmail: memberEmail })
        .sort({ jobDate: -1 })
        .lean();
      photoSets = JSON.parse(JSON.stringify(raw));
    } catch {
      // non-blocking — show Coming Soon if DB unavailable
    }
  }

  return (
    <div>
      {/* Welcome Banner */}
      <div className="bg-[#1a0f00] px-6 py-12">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-[#BD5700] text-sm font-semibold uppercase tracking-widest mb-1">
              Member Portal
            </p>
            <h1 className="text-3xl font-bold text-white">
              Welcome back, {user?.firstName ?? "member"}!
            </h1>
            <p className="text-gray-400 mt-1 text-sm">Tex N Wash Community</p>
          </div>
          <Button asChild className="bg-[#BD5700] hover:bg-[#BD5700]/90 rounded-full self-start sm:self-auto">
            <Link href="/quote">Book a Service</Link>
          </Button>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-5xl space-y-6">

          {/* Member Card */}
          <div className="relative bg-[#1a0f00] rounded-3xl overflow-hidden p-8">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#BD5700_0%,_transparent_55%)] opacity-20" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#BD5700] opacity-5 -translate-x-20 translate-y-20" />
            <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-2xl bg-[#BD5700] flex items-center justify-center text-white text-xl font-bold shrink-0">
                {initials || "👤"}
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#BD5700]">Community Member</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-xs text-green-400 font-medium">Active</span>
                </div>
                <p className="text-2xl font-bold text-white truncate">{memberName}</p>
                {memberEmail && (
                  <p className="text-gray-400 text-sm mt-0.5 truncate">{memberEmail}</p>
                )}
              </div>
              {/* Discount badge */}
              <div className="shrink-0 text-center bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
                <p className="text-3xl font-black text-[#BD5700]">5–15%</p>
                <p className="text-xs text-gray-400 mt-0.5 font-medium">Loyalty Pricing</p>
              </div>
            </div>
          </div>

          {/* Seasonal Tip */}
          <div className="flex items-start gap-4 bg-orange-50 border border-orange-100 rounded-2xl px-6 py-5">
            <span className="text-2xl shrink-0">{seasonTip.emoji}</span>
            <div>
              <p className="text-sm font-bold text-gray-900 mb-0.5">{seasonTip.season} Tip</p>
              <p className="text-sm text-gray-600 leading-relaxed">{seasonTip.tip}</p>
            </div>
            <Button asChild size="sm" className="bg-[#BD5700] hover:bg-[#BD5700]/90 text-white rounded-full shrink-0 self-center ml-auto">
              <Link href="/quote">Book Now</Link>
            </Button>
          </div>

          {/* Perk Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "💰",
                title: "Loyalty Pricing",
                desc: "Your discount grows with every service — 5% on your 1st, 10% on your 3rd, and 15% from your 5th service onward. No codes needed.",
                cta: "Get a Quote",
                href: "/quote",
                badge: "Active",
              },
              {
                icon: "📅",
                title: "Priority Booking",
                desc: "As a community member you get first access to open appointment slots — especially during peak season.",
                cta: "Book Now",
                href: "/quote",
                badge: "Active",
              },
              {
                icon: "📸",
                title: "Before & After Photos",
                desc:
                  photoSets.length > 0
                    ? `${photoSets.length} job${photoSets.length > 1 ? "s" : ""} on record for your property.`
                    : "Your personal photo record for every clean we complete on your property.",
                cta: photoSets.length > 0 ? "View Gallery" : null,
                href: photoSets.length > 0 ? "#gallery" : null,
                badge: photoSets.length > 0 ? "Active" : "Coming Soon",
              },
              {
                icon: "🌧️",
                title: "Priority Rescheduling",
                desc: "Bad weather? Members get first pick on rescheduled slots so you never lose your spot.",
                cta: null,
                href: null,
                badge: "Active",
              },
              {
                icon: "🏠",
                title: "Property Profile",
                desc: "We keep notes on your property — surfaces, problem areas, special instructions — so every visit we already know your place.",
                cta: null,
                href: null,
                badge: "Active",
              },
              {
                icon: "🔔",
                title: "Seasonal Reminders",
                desc: "We reach out before each season so your property is always ready — no guesswork on your end.",
                cta: null,
                href: null,
                badge: "Active",
              },
              {
                icon: "🎁",
                title: "Referral Rewards",
                desc: "Refer a neighbor and earn credit toward your next service. Share the love, get rewarded.",
                cta: null,
                href: null,
                badge: "Active",
              },
              {
                icon: "📲",
                title: "We Follow You Back",
                desc: "Add your social handles below and we'll follow you on Instagram, TikTok, and Facebook.",
                cta: null,
                href: null,
                badge: "Active",
              },
              {
                icon: "⭐",
                title: "Review Reward",
                desc: "Leave us a Google review and we'll thank you with a special discount on your next service.",
                cta: "Leave a Review",
                href: "https://maps.app.goo.gl/h7vFS8ZFDHFfZU4n7",
                badge: "Active",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm flex flex-col"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 bg-[#BD5700]/10 rounded-xl flex items-center justify-center text-xl">
                    {card.icon}
                  </div>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      card.badge === "Active"
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {card.badge}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{card.desc}</p>
                {card.cta && card.href && (
                  <div className="mt-6">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-[#BD5700] text-[#BD5700] hover:bg-[#BD5700]/5 rounded-full"
                    >
                      <Link href={card.href}>{card.cta}</Link>
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Before & After Gallery */}
          {photoSets.length > 0 && (
            <div id="gallery" className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#BD5700]/10 rounded-lg flex items-center justify-center text-base">📸</span>
                Your Property Photos
              </h2>
              <div className="space-y-8">
                {photoSets.map((set) => (
                  <div key={set._id} className="border border-gray-100 rounded-xl p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="text-sm font-semibold text-gray-900">
                        {format(new Date(set.jobDate), "MMMM d, yyyy")}
                      </span>
                      <span className="text-xs bg-[#BD5700]/10 text-[#BD5700] px-2 py-0.5 rounded-full font-medium">
                        {set.serviceType}
                      </span>
                    </div>
                    {set.notes && (
                      <p className="text-sm text-gray-500 mb-4">{set.notes}</p>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                          Before
                        </p>
                        <div className="grid grid-cols-2 gap-1.5">
                          {set.beforePhotos.map((url, i) => (
                            <div
                              key={i}
                              className="aspect-square rounded-lg overflow-hidden bg-gray-100"
                            >
                              <Image
                                src={url}
                                alt={`Before photo ${i + 1}`}
                                width={200}
                                height={200}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                          After
                        </p>
                        <div className="grid grid-cols-2 gap-1.5">
                          {set.afterPhotos.map((url, i) => (
                            <div
                              key={i}
                              className="aspect-square rounded-lg overflow-hidden bg-gray-100"
                            >
                              <Image
                                src={url}
                                alt={`After photo ${i + 1}`}
                                width={200}
                                height={200}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Direct Line */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="w-12 h-12 bg-[#BD5700]/10 rounded-xl flex items-center justify-center text-xl shrink-0">
              📞
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-widest text-[#BD5700] mb-1">Members Only</p>
              <h3 className="font-bold text-gray-900 mb-1">Direct Line to Our Team</h3>
              <p className="text-sm text-gray-500">
                Skip the contact form. Text or call us directly at{" "}
                <a href="tel:+12102012123" className="font-semibold text-gray-800 hover:text-[#BD5700] transition-colors">
                  (210) 201-2123
                </a>{" "}
                — mention you&apos;re a community member for priority response.
              </p>
            </div>
            <a
              href="sms:+12102012123"
              className="shrink-0 inline-block bg-[#BD5700] hover:bg-[#BD5700]/90 text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
            >
              Text Us →
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
