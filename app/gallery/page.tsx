"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function GalleryPage() {
  const initialSlides = [
    { type: "image", src: "/images/action1.png" },
    { type: "image", src: "/images/action2.png" },
    { type: "image", src: "/images/action3.png" },
    { type: "image", src: "/images/action4.png" },
    { type: "image", src: "/images/action5.png" },
    { type: "image", src: "/images/action8.png" },
    { type: "image", src: "/images/action9.png" },
    { type: "image", src: "/images/action10.png" },
    { type: "image", src: "/images/action11.png" },
    { type: "image", src: "/images/action12.png" },
    { type: "image", src: "/images/action13.png" },
    { type: "video", src: "/videos/vid1.mp4" },
    { type: "video", src: "/videos/vid2.mp4" },
    { type: "video", src: "/videos/vid3.mp4" },
    { type: "video", src: "/videos/vid4.mp4" }
  ];

  const [queue, setQueue] = useState(() => {
    const shuffled = initialSlides.slice().sort(() => Math.random() - 0.5);
    return shuffled;
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSlideProgress, setCurrentSlideProgress] = useState(0);

  useEffect(() => {
    const current = queue[currentSlide];
    const duration = current.type === "image" ? 5000 : 20000;
    const timer = setTimeout(() => {
      if (currentSlide + 1 >= queue.length) {
        // reshuffle after finishing
        const reshuffled = initialSlides.slice().sort(() => Math.random() - 0.5);
        setQueue(reshuffled);
        setCurrentSlide(0);
      } else {
        setCurrentSlide((prev) => prev + 1);
      }
    }, duration);
    return () => clearTimeout(timer);
  }, [currentSlide, queue]);

  useEffect(() => {
    setCurrentSlideProgress(0);
    const current = queue[currentSlide];
    const duration = current.type === "image" ? 5 : 20;
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 0.1;
      setCurrentSlideProgress(progress);
      if (progress >= duration) {
        clearInterval(progressInterval);
      }
    }, 100);
    return () => clearInterval(progressInterval);
  }, [currentSlide, queue]);

  return (
    <section className="bg-white text-[#4E3629] py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold border-b-4 border-[#BD5700] inline-block tracking-wide">Our Work Gallery</h1>
          <p className="text-lg text-gray-700 italic">See the Tex N Wash difference — real results, real customers.</p>
        </div>

        {/* Slideshow Section */}
        <div className="space-y-4 relative max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-[#BD5700] text-center">In Action</h2>
          <div className="relative w-full h-[500px] rounded-2xl shadow-xl overflow-hidden bg-gradient-to-r from-[#f4f1ee] via-[#e6ddd3] to-[#f4f1ee]">
            {/* Decorative blobs */}
            <div className="absolute w-40 h-40 bg-[#BD5700] rounded-full opacity-10 blur-3xl top-10 left-10 z-0"></div>
            <div className="absolute w-32 h-32 bg-[#4E3629] rounded-full opacity-10 blur-2xl bottom-10 right-10 z-0"></div>
            {queue.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                {slide.type === "image" ? (
                  <Image
                    src={slide.src}
                    alt={`Action Photo ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <video
                    src={slide.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            ))}
            <div className="absolute bottom-0 left-0 h-1 bg-[#BD5700] transition-all duration-1000 ease-linear"
                 style={{
                   width: queue[currentSlide] && queue[currentSlide].type === "image"
                     ? `${(currentSlideProgress / 5) * 100}%`
                     : `${(currentSlideProgress / 20) * 100}%`
                 }}
            />
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + queue.length) % queue.length)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#BD5700] text-white px-3 py-1 rounded z-10"
            >
              ←
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % queue.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#BD5700] text-white px-3 py-1 rounded z-10"
            >
              →
            </button>
          </div>
        </div>

        {/* Before & After Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4 bg-gradient-to-br from-[#f4f1ee] to-[#e6ddd3] p-4 rounded-2xl shadow-inner">
            <h2 className="text-2xl font-semibold text-[#BD5700]">Before</h2>
            <Image src="/images/before1.png" width={600} height={400} alt="Before cleaning" className="rounded shadow-md" />
            <Image src="/images/before2.png" width={600} height={400} alt="Before cleaning" className="rounded shadow-md" />
          </div>
          <div className="space-y-4 bg-gradient-to-br from-[#f4f1ee] to-[#e6ddd3] p-4 rounded-2xl shadow-inner">
            <h2 className="text-2xl font-semibold text-[#4E3629]">After</h2>
            <Image src="/images/after1.png" width={600} height={400} alt="After cleaning" className="rounded shadow-md" />
            <Image src="/images/after2.png" width={600} height={400} alt="After cleaning" className="rounded shadow-md" />
          </div>
        </div>

      </div>
    </section>
  );
}