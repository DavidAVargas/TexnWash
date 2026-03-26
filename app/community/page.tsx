import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { isAdmin as isAdminUser } from "@/lib/is-admin";
import Image from "next/image";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { connectDB } from "@/lib/mongodb";
import { PhotoSet, type IPhotoSet } from "@/lib/models/PhotoSet";
import SocialHandlesForm from "./_components/SocialHandlesForm";
import SeasonalTipsCarousel from "./_components/SeasonalTipsCarousel";

export default async function CommunityPage({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }>;
}) {
  const params = await searchParams;
  const { userId } = await auth();
  const user = userId ? await currentUser() : null;
  const isAdmin = isAdminUser(user?.emailAddresses?.[0]?.emailAddress);
  const isPreview = params?.preview === "true";

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
                <p className="text-white/80 leading-relaxed">
                  Members unlock exclusive pricing that gets better the longer they stay with us. No coupons, no codes, no asking — your discount is applied automatically every time you book. The details are for members only.
                </p>
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
                  icon: "🌦️",
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
                {
                  icon: "🔒",
                  title: "More Perks Coming Soon",
                  desc: "We're always adding new benefits for our community. Join now and be the first to get access.",
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

  if (isAdmin && !isPreview) {
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
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-[#BD5700] hover:bg-[#BD5700]/90 rounded-full px-8">
              <Link href="/admin">Go to Admin Dashboard →</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-8 border-gray-300">
              <Link href="/community?preview=true">View Member Portal</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const memberName = user?.fullName ?? user?.firstName ?? "Member";
  const memberEmail = user?.emailAddresses?.[0]?.emailAddress ?? "";
  const initials = (user?.firstName?.[0] ?? "") + (user?.lastName?.[0] ?? "");
  const socials = (user?.unsafeMetadata ?? {}) as { instagram?: string; tiktok?: string; facebook?: string };
  const manualTier = (user?.publicMetadata?.loyaltyTier as number) ?? 0;

  // Fetch this member's photo sets from MongoDB (skip in admin preview mode)
  let photoSets: IPhotoSet[] = [];
  if (memberEmail && !isPreview) {
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

  const rawServiceCount = user?.publicMetadata?.serviceCount;
  const serviceCount = rawServiceCount !== undefined && rawServiceCount !== null
    ? (rawServiceCount as number)
    : photoSets.length;
  const autoTier = serviceCount >= 5 ? 3 : serviceCount >= 3 ? 2 : serviceCount >= 1 ? 1 : 0;
  const loyaltyTier = Math.max(autoTier, manualTier);

  const nextMilestone =
    serviceCount < 1 ? { at: 1, discount: "5%", remaining: 1 - serviceCount } :
    serviceCount < 3 ? { at: 3, discount: "10%", remaining: 3 - serviceCount } :
    serviceCount < 5 ? { at: 5, discount: "15%", remaining: 5 - serviceCount } :
    null;

  return (
    <div>
      {/* Admin Preview Banner */}
      {isPreview && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-6 py-3 flex items-center justify-between">
          <p className="text-sm text-yellow-800 font-medium">Previewing as member — this is what customers see.</p>
          <Button asChild size="sm" variant="outline" className="rounded-full border-yellow-400 text-yellow-800 hover:bg-yellow-100">
            <Link href="/community">Exit Preview</Link>
          </Button>
        </div>
      )}

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
              {/* Loyalty Tier */}
              <div className="shrink-0 bg-white/5 border border-white/10 rounded-2xl p-4 min-w-[160px]">
                <p className="text-xs text-gray-400 font-medium mb-2 text-center">Loyalty Tier</p>
                <div className="space-y-1.5">
                  {([
                    { t: 1, label: "1st Service", discount: "5% off" },
                    { t: 2, label: "3rd Service", discount: "10% off" },
                    { t: 3, label: "5th Service+", discount: "15% off" },
                  ] as { t: number; label: string; discount: string }[]).map(({ t, label, discount }) => (
                    <div
                      key={t}
                      className={`flex items-center justify-between rounded-lg px-3 py-1.5 text-xs ${
                        t === loyaltyTier
                          ? "bg-[#BD5700] text-white font-semibold"
                          : t < loyaltyTier
                          ? "bg-white/10 text-gray-400 line-through"
                          : "bg-white/5 text-gray-500"
                      }`}
                    >
                      <span>{label}</span>
                      <span>{discount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Service Journey */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Your Service Journey</h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  {nextMilestone
                    ? `${serviceCount} service${serviceCount !== 1 ? "s" : ""} completed — ${nextMilestone.remaining} more to unlock ${nextMilestone.discount} off`
                    : `${serviceCount} services completed — you're at max loyalty (15% off every service)`}
                </p>
              </div>
              <span className="text-2xl font-black text-[#BD5700]">{serviceCount}</span>
            </div>

            {/* Step track */}
            <div className="flex items-end gap-2">
              {[
                { step: 1, milestone: "5% off" },
                { step: 2, milestone: null },
                { step: 3, milestone: "10% off" },
                { step: 4, milestone: null },
                { step: 5, milestone: "15% off" },
              ].map(({ step, milestone }) => {
                const done = serviceCount >= step;
                const isNext = serviceCount === step - 1;
                return (
                  <div key={step} className="flex-1 flex flex-col items-center gap-1.5">
                    {milestone && (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${done ? "bg-[#BD5700] text-white" : "bg-gray-100 text-gray-400"}`}>
                        {milestone}
                      </span>
                    )}
                    {!milestone && <span className="h-5" />}
                    <div className={`w-full h-10 rounded-xl flex items-center justify-center text-sm font-bold border-2 transition-all ${
                      done
                        ? "bg-[#BD5700] border-[#BD5700] text-white"
                        : isNext
                        ? "bg-gray-50 border-gray-300 border-dashed text-gray-300"
                        : "bg-gray-50 border-gray-200 text-gray-300"
                    }`}>
                      {step === 5 ? "5+" : step}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA when no services yet */}
            {serviceCount === 0 && (
              <div className="mt-5 flex items-center justify-between bg-[#BD5700]/5 border border-[#BD5700]/20 rounded-xl px-4 py-3">
                <p className="text-xs text-gray-700">
                  <span className="font-semibold text-[#BD5700]">Community perk:</span> Book your first service and unlock 5% off instantly.
                </p>
                <Link
                  href="/quote"
                  className="shrink-0 ml-4 bg-[#BD5700] hover:bg-[#BD5700]/90 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
                >
                  Book Now
                </Link>
              </div>
            )}
          </div>

          {/* Seasonal Tips */}
          <SeasonalTipsCarousel />

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
                icon: "🌦️",
                title: "Priority Rescheduling",
                desc: "Bad weather? Members get first pick on rescheduled slots so you never lose your spot.",
                cta: null,
                href: null,
                badge: "Active",
              },
              {
                icon: "🏠",
                title: "Property Profile",
                desc: "We'll keep notes on your property — surfaces, problem areas, special instructions — so every visit we already know your place.",
                cta: null,
                href: null,
                badge: "Coming Soon",
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
                icon: "⭐",
                title: "Review Reward",
                desc: "Leave us a Google review and we'll thank you with a special discount on your next service.",
                cta: "Leave a Review",
                href: "https://g.page/r/CSd5bbR6nHl4EBM/review",
                badge: "Active",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-10 h-10 bg-[#BD5700]/10 rounded-xl flex items-center justify-center text-lg">
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

          {/* Social Handles */}
          <SocialHandlesForm
            instagram={socials.instagram}
            tiktok={socials.tiktok}
            facebook={socials.facebook}
          />

        </div>
      </div>
    </div>
  );
}
