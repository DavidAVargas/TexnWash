import Image from 'next/image'
import React from 'react'

export default function SponsorDivider() {
  return (
    <section className="bg-gray-100 py-8 md:py-12 relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center md:justify-between items-center gap-4 md:gap-6 flex-wrap">
          <Image 
            src="/images/fwsp.png" 
            alt="Sponsor 1" 
            className="h-8 md:h-12 object-contain" 
            width={100} 
            height={100} 
          />
          <Image 
            src="/images/gwsp.png" 
            alt="Sponsor 2" 
            className="h-8 md:h-12 object-contain" 
            width={100} 
            height={100} 
          />
          <Image 
            src="/images/hsp.png" 
            alt="Sponsor 3" 
            className="h-8 md:h-12 object-contain" 
            width={100} 
            height={100} 
          />
          <Image 
            src="/images/cfbsp.png" 
            alt="Sponsor 4" 
            className="h-17 md:h-20 object-contain" 
            width={150} 
            height={100} 
          />
          <Image 
            src="/images/nsp.png" 
            alt="Sponsor 5" 
            className="h-12 md:h-20 object-contain" 
            width={100} 
            height={100} 
          />
        </div>
      </div>
    </section>
  )
}
