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
          { title: 'Residential Washing', description: 'House, driveway, and patio cleaning.', image: '/images/restnx.png' },
          { title: 'Commercial Cleaning', description: 'Storefronts, sidewalks, and parking lots.', image: '/images/cctnw.png' },
          { title: 'Detail & Extras', description: 'Complete the Clean – For the Finishing Touch.', image: '/images/detnw.png' },
        ].map((service, index) => (
          <div key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow rounded overflow-hidden">
            <div className="h-80 relative">
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
            At Tex N Wash, we treat every home and business like it's our own. Backed by professional-grade equipment and years of local experience, we go beyond just a surface clean. From concrete to siding, we target deep grime, buildup, and stains that other companies miss. We show up on time, communicate clearly, and leave your space sparkling — every single time.
          </p>
        </div>
        {/* Image */}
        <div className="w-full md:w-1/2 h-80 relative">
          <Image src="/images/ytnw.png" alt="Why Tex N Wash" layout="fill" objectFit="cover" className="rounded" />
        </div>
      </div>
    </section>
  )
}