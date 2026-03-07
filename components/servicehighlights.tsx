import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function ServiceHighlights() {
  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-[#BD5700] font-semibold text-sm uppercase tracking-widest mb-2">Fort Worth, TX</p>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-none">
              What We<br />Clean.
            </h2>
          </div>
          <Link
            href="/services"
            className="self-start md:self-auto inline-block bg-[#BD5700] hover:bg-[#BD5700]/90 text-white font-semibold py-3 px-7 rounded-full transition-colors text-sm"
          >
            View Our Services →
          </Link>
        </div>

        {/* Asymmetric Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Large card — Residential */}
          <div className="group relative rounded-2xl overflow-hidden bg-[#3d1f00] h-[420px] md:row-span-2 md:h-auto">
            <Image
              src="/images/restnx.png"
              alt="Residential Washing"
              fill
              className="object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-7">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Residential Washing</h3>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                House washing, driveway cleaning, patio and fence restoration. Your home, spotless.
              </p>
            </div>
          </div>

          {/* Commercial */}
          <div className="group relative rounded-2xl overflow-hidden bg-[#3d1f00] h-64">
            <Image
              src="/images/cctnw.png"
              alt="Commercial Cleaning"
              fill
              className="object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-xl font-bold text-white mb-1">Commercial Cleaning</h3>
              <p className="text-gray-300 text-sm">Storefronts, sidewalks &amp; parking lots.</p>
            </div>
          </div>

          {/* Detail & Extras */}
          <div className="group relative rounded-2xl overflow-hidden bg-[#3d1f00] h-64">
            <Image
              src="/images/detnw.png"
              alt="Detail & Extras"
              fill
              className="object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-xl font-bold text-white mb-1">Detail &amp; Extras</h3>
              <p className="text-gray-300 text-sm">The finishing touches that complete the clean.</p>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '100+', label: 'Properties Cleaned' },
            { value: '5★', label: 'Google Rating' },
            { value: 'Fort Worth', label: 'Locally Based' },
            { value: 'Free', label: 'Quotes & Estimates' },
          ].map((stat) => (
            <div key={stat.label} className="border border-gray-100 rounded-2xl p-5 text-center">
              <p className="text-2xl font-black text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* CTA Strip */}
        <div className="relative bg-[#3d1f00] rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_#BD5700_0%,_transparent_60%)] opacity-30" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-10">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                Ready to make your property shine?
              </h3>
              <p className="text-gray-400 text-sm">We show up on time and leave it spotless — every single time.</p>
            </div>
            <Link
              href="/quote"
              className="shrink-0 inline-block bg-[#BD5700] hover:bg-[#BD5700]/90 text-white font-semibold py-3 px-8 rounded-full transition-colors whitespace-nowrap"
            >
              Get Your Free Quote
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
