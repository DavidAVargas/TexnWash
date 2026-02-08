import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#4E3629] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-start">
        {/* Logo and Tagline */}
        <div>
          <Image src="/images/big-tex-nbg.svg" alt="Tex N Wash Logo" width={150} height={80} />
          <p className="mt-4 text-sm text-gray-300">Proudly serving Fort Worth and surrounding areas.</p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p>Email: <a href="mailto:contact@texnwash.com" className="text-gray-300 hover:underline">contact@texnwash.com</a></p>
          <p>Phone: <a href="tel:+12102012123" className="text-gray-300 hover:underline">(210) 201-2123</a></p>
          <div className="flex space-x-4 mt-4">
            <a href="https://www.instagram.com/texnwash/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Image src="/images/instagram.png" alt="Instagram" width={24} height={24} className="h-6 w-6" />
            </a>
            <a href="https://www.tiktok.com/@texnwash?_t=ZP-8xQSKcTy0OV&_r=1" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <Image src="/images/tiktok.png" alt="TikTok" width={24} height={24} className="h-6 w-6" />
            </a>
            <a href="https://www.facebook.com/people/Tex-N-Wash/pfbid0EvRoWbi8Vx12Z8YZMXwNsYb2tQMWdniRsUYQzvEuUpBbKakZKmCbwPEVmFb7Xv1Kl/?ref=_ig_profile_ac" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Image src="/images/facebook.png" alt="Facebook" width={24} height={24} className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Google Reviews */}
        <div>
          <h3 className="text-lg font-semibold mb-2">What People Say</h3>
          <p className="text-gray-300 mb-2">Read and leave a review:</p>
          <a href="https://www.google.com/search?q=texnwash.com+reviews" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#c3b091] text-black px-4 py-2 rounded hover:bg-[#b49f83] transition-colors">
            Google Reviews
          </a>
        </div>
      </div>

      <div className="text-center text-white text-sm mt-10 flex flex-col items-center">
        <p>&copy; {new Date().getFullYear()} Tex N Wash. All rights reserved.</p>
        <a href="https://github.com/DavidAVargas" target="_blank" rel="noopener noreferrer" className="flex items-center mt-2 text-white hover:text-white">
          <Image src="/images/github.png" alt="GitHub" width={20} height={20} className="h-5 w-5 mr-1" />
          Made by David A Vargas
        </a>
      </div>
    </footer>
  );
}
