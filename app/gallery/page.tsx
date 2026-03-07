"use client";

import Image from "next/image";
import { useState, useEffect, useMemo, useCallback } from "react";

export default function GalleryPage() {
  const initialSlides = useMemo(() => [
    { type: "image", src: "/images/action1.jpg" },
    { type: "image", src: "/images/action2.jpg" },
    { type: "image", src: "/images/action3.jpg" },
    { type: "image", src: "/images/action4.jpg" },
    { type: "image", src: "/images/action5.jpg" },
    { type: "image", src: "/images/action8.jpg" },
    { type: "image", src: "/images/action9.jpg" },
    { type: "image", src: "/images/action10.jpg" },
    { type: "image", src: "/images/action11.jpg" },
    { type: "image", src: "/images/action12.jpg" },
    { type: "image", src: "/images/action13.jpg" },
    { type: "video", src: "/videos/vid1.mp4" },
    { type: "video", src: "/videos/vid2.mp4" },
    { type: "video", src: "/videos/vid3.mp4" },
    { type: "video", src: "/videos/vid4.mp4" }
  ], []);

  const [queue, setQueue] = useState(initialSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const [slideDuration, setSlideDuration] = useState(5000);

  useEffect(() => {
    setQueue(initialSlides.slice().sort(() => Math.random() - 0.5));
  }, [initialSlides]);

  const goToSlide = useCallback((next: number) => {
    setCurrentSlide(next);
    setProgressKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const current = queue[currentSlide];
    if (current.type === "image") setSlideDuration(5000);
  }, [currentSlide, queue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentSlide + 1 >= queue.length) {
        const reshuffled = initialSlides.slice().sort(() => Math.random() - 0.5);
        setQueue(reshuffled);
        goToSlide(0);
      } else {
        goToSlide(currentSlide + 1);
      }
    }, slideDuration);
    return () => clearTimeout(timer);
  }, [currentSlide, queue, initialSlides, slideDuration, goToSlide]);

  return (
    <div className="bg-white">

      {/* Page Header */}
      <div className="border-b border-gray-100 py-12 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Our Work</h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Real results from real Fort Worth properties. See what a proper clean looks like.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-14 space-y-20">

        {/* Slideshow */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900">In Action</h2>
            <span className="text-sm text-gray-400">{currentSlide + 1} / {queue.length}</span>
          </div>

          <div className="relative w-full h-[700px] rounded-2xl overflow-hidden bg-gray-900 shadow-lg">
            {queue.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? "opacity-100 z-[1]" : "opacity-0 z-0"
                }`}
              >
                {slide.type === "image" ? (
                  <Image
                    src={slide.src}
                    alt={`Job photo ${index + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className="object-contain"
                  />
                ) : index === currentSlide ? (
                  <video
                    key={slide.src}
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-contain bg-black"
                    onLoadedMetadata={(e) => {
                      const duration = Math.round(e.currentTarget.duration * 1000);
                      setSlideDuration(duration);
                      setProgressKey((k) => k + 1);
                    }}
                  >
                    <source src={slide.src} type="video/mp4" />
                  </video>
                ) : null}
              </div>
            ))}

            {/* Progress bar */}
            <div
              key={progressKey}
              className="absolute bottom-0 left-0 h-[3px] bg-[#BD5700] animate-progress-bar z-10"
              style={{ animationDuration: `${slideDuration}ms` }}
            />

            {/* Nav buttons */}
            <button
              aria-label="Previous slide"
              onClick={() => goToSlide((currentSlide - 1 + queue.length) % queue.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-[#BD5700] text-white rounded-full flex items-center justify-center transition-colors z-10"
            >
              ←
            </button>
            <button
              aria-label="Next slide"
              onClick={() => goToSlide((currentSlide + 1) % queue.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-[#BD5700] text-white rounded-full flex items-center justify-center transition-colors z-10"
            >
              →
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-1.5 mt-4">
            {queue.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentSlide ? "bg-[#BD5700] w-6" : "bg-gray-300 w-1.5"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Before & After */}
        <div>
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Before &amp; After</h2>
            <p className="text-gray-500 text-sm">The difference a proper clean makes</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-gray-400 inline-block" />
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Before</span>
              </div>
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                <Image src="/images/before1.jpg" fill sizes="50vw" alt="Before cleaning" className="object-cover" />
              </div>
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                <Image src="/images/before2.jpg" fill sizes="50vw" alt="Before cleaning" className="object-cover" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#BD5700] inline-block" />
                <span className="text-sm font-semibold text-[#BD5700] uppercase tracking-widest">After</span>
              </div>
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                <Image src="/images/after1.jpg" fill sizes="50vw" alt="After cleaning" className="object-cover" />
              </div>
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                <Image src="/images/after2.jpg" fill sizes="50vw" alt="After cleaning" className="object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Follow Us */}
        <div className="border-t border-gray-100 pt-12 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-1">See More of Our Work</h3>
          <p className="text-gray-500 text-sm mb-8">Behind-the-scenes, job highlights, and customer reviews</p>

          <div className="flex justify-center gap-4 mb-8">
            <a
              href="https://www.instagram.com/texnwash/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-11 h-11 border border-gray-200 hover:border-[#BD5700] hover:bg-[#BD5700]/5 rounded-full flex items-center justify-center transition-colors"
            >
              <Image src="/images/instagram.png" alt="Instagram" width={20} height={20} />
            </a>
            <a
              href="https://www.tiktok.com/@texnwash?_t=ZP-8xQSKcTy0OV&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-11 h-11 border border-gray-200 hover:border-[#BD5700] hover:bg-[#BD5700]/5 rounded-full flex items-center justify-center transition-colors"
            >
              <Image src="/images/tiktok.png" alt="TikTok" width={20} height={20} />
            </a>
            <a
              href="https://www.facebook.com/people/Tex-N-Wash/pfbid0EvRoWbi8Vx12Z8YZMXwNsYb2tQMWdniRsUYQzvEuUpBbKakZKmFb7Xv1Kl/?ref=_ig_profile_ac"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-11 h-11 border border-gray-200 hover:border-[#BD5700] hover:bg-[#BD5700]/5 rounded-full flex items-center justify-center transition-colors"
            >
              <Image src="/images/facebook.png" alt="Facebook" width={20} height={20} />
            </a>
          </div>

          <a
            href="https://www.google.com/search?q=texnwash.com+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-[#BD5700] text-[#BD5700] hover:bg-[#BD5700] hover:text-white px-8 py-3 rounded-full text-sm font-semibold transition-colors"
          >
            Read Our Google Reviews
          </a>
        </div>

      </div>
    </div>
  );
}
