"use client";
import React from 'react'
import Image from 'next/image'
import { Star, StarHalf } from 'lucide-react'

const reviews = [
  { name: 'Sarah M.', rating: 5, text: 'Tex N Wash made my driveway look brand new. Super professional and fast!', location: 'Fort Worth, TX' },
  { name: 'James R.', rating: 4.5, text: 'Great service! My patio looks amazing now.', location: 'Fort Worth, TX' },
  { name: 'Lisa G.', rating: 4, text: 'Very happy with the results. Would recommend to my neighbors.', location: 'Fort Worth, TX' },
  { name: 'Carlos D.', rating: 5, text: 'Top-notch work. The team was friendly and efficient.', location: 'Fort Worth, TX' },
  { name: 'Amanda C.', rating: 4.5, text: 'Excellent job on our exterior walls. Will book again!', location: 'Fort Worth, TX' },
  { name: 'Robert B.', rating: 5, text: 'Highly recommend Tex N Wash! They exceeded expectations.', location: 'Fort Worth, TX' },
  { name: 'Jessica T.', rating: 4, text: 'Reliable and reasonably priced. My home looks great.', location: 'Fort Worth, TX' },
  { name: 'Evan H.', rating: 5, text: 'Quick and efficient! They really care about doing a good job.', location: 'Fort Worth, TX' },
  { name: 'Michelle W.', rating: 4.5, text: 'Our gutters and driveway look fantastic!', location: 'Fort Worth, TX' },
  { name: 'Derrick P.', rating: 4, text: 'Solid work and fair pricing. Im a happy customer.', location: 'Fort Worth, TX' },
]

function renderStars(rating: number) {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<Star key={i} className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" fill="currentColor" />)
    } else if (rating + 0.5 === i) {
      stars.push(<StarHalf key={i} className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" fill="currentColor" />)
    } else {
      stars.push(<Star key={i} className="w-3 h-3 md:w-4 md:h-4 text-gray-300" />)
    }
  }
  return stars
}

export default function ReviewsHome() {
  return (
    <section className="bg-gray-50 py-8 md:py-12 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center">What Fort Worth Homeowners Are Saying</h2>
        <div className="relative">
          <div className="flex space-x-4 md:space-x-6 animate-scroll-slow">
            {[...reviews, ...reviews].map((review, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-3 md:p-4 shadow-sm min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-sm flex-shrink-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <Image
                      src={`https://i.pravatar.cc/150?img=${index + 10}`}
                      alt={review.name}
                      width={40}
                      height={40}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                    />
                    <h3 className="font-semibold text-sm md:text-base">{review.name}</h3>
                  </div>
                  <div className="flex space-x-0.5 md:space-x-1">{renderStars(review.rating)}</div>
                </div>
                <p className="text-xs md:text-sm text-gray-700 mb-1">"{review.text}"</p>
                <p className="text-xs text-gray-500">{review.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-slow {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-slow {
          display: flex;
          animation: scroll-slow 40s linear infinite;
        }
        @media (max-width: 768px) {
          .animate-scroll-slow {
            animation: scroll-slow 50s linear infinite;
          }
        }
      `}</style>
    </section>
  )
}
