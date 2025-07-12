import React from 'react'
import Image from 'next/image'

export default function ServiceHighlights() {
  return (
    <section className="relative py-12 md:py-20 px-4 bg-white">
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gray-100 opacity-30 rounded-r-full pointer-events-none -z-10" />
      {/* Title */}
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#4E3629] inline-block relative after:content-[''] after:block after:h-1 after:bg-[#c3b091] after:w-16 md:after:w-24 after:mx-auto after:mt-2 md:after:mt-4">
          Choose The Best Wash for Your Property
        </h2>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-12 md:mb-20">
        {[
          { title: 'Residential Washing', description: 'House, driveway, and patio cleaning.', image: '/images/restnx.png' },
          { title: 'Commercial Cleaning', description: 'Storefronts, sidewalks, and parking lots.', image: '/images/cctnw.png' },
          { title: 'Detail & Extras', description: 'Complete the Clean – For the Finishing Touch.', image: '/images/detnw.png' },
        ].map((service, index) => (
          <div key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow rounded overflow-hidden">
            <div className="h-60 md:h-80 relative">
              <Image src={service.image} alt={service.title} layout="fill" objectFit="cover" />
            </div>
            <div className="p-4">
              <h3 className="text-lg md:text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-sm md:text-base text-gray-600">{service.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Why Tex N Wash */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Text */}
        <div className="max-w-xl text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Tex N Wash?</h2>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            At Tex N Wash, we treat every home and business like it&apos;s our own. Backed by professional-grade equipment and years of local experience, we go beyond just a surface clean. From concrete to siding, we target deep grime, buildup, and stains that other companies miss. We show up on time, communicate clearly, and leave your space sparkling — every single time.
          </p>
        </div>
        {/* Image */}
        <div className="w-full md:w-1/2 h-60 md:h-80 relative">
          <Image src="/images/ytnw.png" alt="Why Tex N Wash" layout="fill" objectFit="cover" className="rounded" />
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 md:mt-20 bg-[#c3b091] text-white py-8 md:py-12 px-4 text-center rounded-lg shadow-lg">
        <h3 className="text-2xl md:text-4xl font-bold mb-4">Ready to Make Your Property Shine?</h3>
        <p className="text-base md:text-lg mb-6">Let us do the dirty work — book your free quote today!</p>
        <a href="/quote" className="inline-block bg-[#4E3629] text-white font-semibold py-3 px-6 rounded hover:bg-[#271a15] transition-colors">
          Get Your Free Quote
        </a>
      </div>
    </section>
  )
}