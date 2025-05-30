import React from 'react'
import Image from 'next/image'

export default function ServiceHighlights() {
  return (
    <section className="py-20 px-4">
      {/* Title */}
      <h2 className="text-4xl font-bold text-center mb-12">Choose The Best Wash for Your Property</h2>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
        {[
          { title: 'Residential Washing', description: 'House, driveway, and patio cleaning.', image: '/images/logo.png' },
          { title: 'Commercial Cleaning', description: 'Storefronts, sidewalks, and parking lots.', image: '/images/logo.png' },
          { title: 'Window & Detail Work', description: 'Windows, trim, and detail touch-ups.', image: '/images/logo.png' },
        ].map((service, index) => (
          <div key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow rounded overflow-hidden">
            <div className="h-40 relative">
              <Image src={service.image} alt={service.title} layout="fill" objectFit="cover" />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Why Tex N Wash */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Text */}
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold mb-4">Why Tex N Wash?</h2>
          <p className="text-lg text-gray-700 mb-4">
            We're a local, professional pressure washing service focused on quality, trust, and making your property shine.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Fast, free quotes</li>
            <li>Flexible scheduling</li>
            <li>100% satisfaction guarantee</li>
            <li>Locally owned and operated</li>
          </ul>
        </div>
        {/* Image */}
        <div className="w-full md:w-1/2 h-80 relative">
          <Image src="/images/logo.png" alt="Why Tex N Wash" layout="fill" objectFit="cover" className="rounded" />
        </div>
      </div>
    </section>
  )
}