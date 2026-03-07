import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";

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
            Be part of 100+ Fort Worth homeowners who get exclusive perks, priority booking, and a personal record of every clean we do for your property.
          </p>
        </div>

        {/* CTA and Benefits Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Sign Up CTA */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-2xl font-semibold mb-4">Get Started Today</h3>
            <p className="text-gray-600 mb-8 max-w-sm">
              Create your free account in seconds using Google or Apple. No credit card required.
            </p>
            <Button asChild className="bg-[#BD5700] hover:bg-[#BD5700]/90 text-white text-lg px-10 py-4 h-auto rounded-full">
              <Link href="/sign-up">Join Free</Link>
            </Button>
            <p className="mt-4 text-sm text-gray-500">
              Already a member?{" "}
              <Link href="/sign-in" className="text-[#BD5700] hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>

          {/* Benefits List */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold mb-8 text-center lg:text-left">What You&apos;ll Get</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#BD5700] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">✓</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-1 text-[#4E3629]">Exclusive Discounts</h4>
                  <p className="text-gray-600">Members-only pricing and special offers on every service</p>
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
                  <h4 className="text-xl font-semibold mb-1 text-[#4E3629]">Before &amp; After Photos</h4>
                  <p className="text-gray-600">View your personal before and after photos for every clean we do</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#BD5700] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">✓</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-1 text-[#4E3629]">Expert Tips</h4>
                  <p className="text-gray-600">Professional advice to keep your property looking sharp year-round</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-[#BD5700] mb-4">
            Why Join the Tex N Wash Community?
          </h3>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            At Tex N Wash, we believe in rewarding loyalty. Community members get exclusive pricing, priority scheduling during peak seasons, and a personal photo record of every job we complete on their property.
          </p>
        </div>
      </div>
    </section>
  );
}
