import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#2d1500] text-white">

      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="md:col-span-1">
          <Image src="/images/big-tex-nbg.svg" alt="Tex N Wash Logo" width={130} height={70} />
          <p className="mt-4 text-sm text-white/60 leading-relaxed">
            Professional pressure washing serving Fort Worth and surrounding areas.
          </p>
          <div className="flex gap-3 mt-5">
            <a href="https://www.instagram.com/texnwash/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="w-9 h-9 bg-white/10 hover:bg-[#BD5700] rounded-full flex items-center justify-center transition-colors">
              <Image src="/images/instagram.png" alt="Instagram" width={16} height={16} />
            </a>
            <a href="https://www.tiktok.com/@texnwash?_t=ZP-8xQSKcTy0OV&_r=1" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
              className="w-9 h-9 bg-white/10 hover:bg-[#BD5700] rounded-full flex items-center justify-center transition-colors">
              <Image src="/images/tiktok.png" alt="TikTok" width={16} height={16} />
            </a>
            <a href="https://www.facebook.com/people/Tex-N-Wash/pfbid0EvRoWbi8Vx12Z8YZMXwNsYb2tQMWdniRsUYQzvEuUpBbKakZKmCbwPEVmFb7Xv1Kl/?ref=_ig_profile_ac" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              className="w-9 h-9 bg-white/10 hover:bg-[#BD5700] rounded-full flex items-center justify-center transition-colors">
              <Image src="/images/facebook.png" alt="Facebook" width={16} height={16} />
            </a>
          </div>
        </div>

        {/* Pages */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Pages</h4>
          <ul className="space-y-2.5">
            {[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: "Gallery", href: "/gallery" },
              { label: "About", href: "/about" },
              { label: "Community", href: "/community" },
            ].map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Contact</h4>
          <ul className="space-y-2.5">
            <li>
              <a href="mailto:contact@texnwash.com" className="text-sm text-white/60 hover:text-white transition-colors">
                contact@texnwash.com
              </a>
            </li>
            <li>
              <a href="tel:+12102012123" className="text-sm text-white/60 hover:text-white transition-colors">
                (210) 201-2123
              </a>
            </li>
            <li>
              <span className="text-sm text-white/60">Fort Worth, TX</span>
            </li>
          </ul>
        </div>

        {/* Reviews CTA */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Reviews</h4>
          <p className="text-sm text-white/60 mb-4 leading-relaxed">
            Happy with our work? Leave us a review — it means the world.
          </p>
          <a
            href="https://g.page/r/CSd5bbR6nHl4EBM/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-[#BD5700] text-[#BD5700] hover:bg-[#BD5700] hover:text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            Google Reviews
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-6 py-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Tex N Wash. All rights reserved.
          </p>
          <a
            href="https://github.com/DavidAVargas"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            <Image src="/images/github.png" alt="GitHub" width={14} height={14} />
            Made by David A Vargas
          </a>
        </div>
      </div>

    </footer>
  );
}
