"use client";

import React from "react";

export default function NewsLetter() {
  return (
    <section className="bg-white text-[#4E3629] py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main Content */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Join the <span className="text-[#BD5700]">Tex N Wash</span> Community
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Be part of 100+ homeowners who stay in the loop! Get exclusive discounts, seasonal offers, and the latest service updates delivered straight to your inbox.
          </p>
        </div>

        {/* Form and Benefits Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Email Form */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-center">Get Started Today</h3>
            <div className="mb-6">
              <iframe 
                width="100%" 
                height="280" 
                src="https://64b83d16.sibforms.com/serve/MUIFANjQ-zV7qn_KJm4y8F-wNCY5i-gliYpxwyHY9SpXiYoNtt_mSWij8iGHkJgjMaAMxB_dp1f74wn7I2HxlMRay6jCcjxnPAlujhZ_ZFTvbCbperMdVA674OjQ1NjFNOKJmE1GmDqZ9qqYOVjnANg0LWN8BPZYhyfDmrvXCMlCDHMOW2mq1VnZ9WrlmsIO0ShLpoQ_VDBqCtgW" 
                frameBorder="0" 
                scrolling="no" 
                allowFullScreen 
                style={{ 
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  maxWidth: '100%',
                  width: '100%',
                  height: '290px',
                  border: 'none',
                  borderRadius: '12px'
                }}
                title="Email Signup Form"
              />
            </div>
          </div>

          {/* Benefits List */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold mb-8 text-center lg:text-left">What You'll Get</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#BD5700] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">✓</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-1 text-[#4E3629]">Exclusive Discounts</h4>
                  <p className="text-gray-600">Members-only cleaning discounts and special offers</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#BD5700] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">✓</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-1 text-[#4E3629]">Early Access</h4>
                  <p className="text-gray-600">First dibs on seasonal promotions and new services</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#BD5700] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">✓</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-1 text-[#4E3629]">Expert Tips</h4>
                  <p className="text-gray-600">Professional advice to keep your home looking sharp</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#BD5700] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">✓</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-1 text-[#4E3629]">VIP Treatment</h4>
                  <p className="text-gray-600">Direct contact with our local cleaning experts</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-[#BD5700] mb-4">
            Why Join Our Email List?
          </h3>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            At Tex N Wash, we believe in rewarding loyalty. Subscribers not only stay up-to-date with the latest services and promotions, but also get first dibs on appointment slots during peak seasons. Don't miss out — your property deserves VIP treatment.
          </p>
        </div>
      </div>
    </section>
  );
}