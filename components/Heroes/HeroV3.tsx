'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../ui/button'

export default function Hero() {

  return (
    <div className="bg-white">
      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white lg:block"
            >
              <polygon points="0,0 90,0 50,100 0,100" />
            </svg>

            <div className="relative px-6 py-16 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                <div className="hidden sm:mb-10 sm:flex">
                  <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                    Transform your property instantly.{' '}
                    <a href="#" className="font-semibold whitespace-nowrap text-indigo-600">
                      <span aria-hidden="true" className="absolute inset-0" />
                      See our work <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
                <h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl">
                Because First Impressions{""}
                <span> Start at the Curb </span>
                </h1>
                <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                Your neighbors will ask who cleaned it — trust us.
                </p>
                <div className="mt-10 flex items-center gap-x-2">
                    <Button className="bg-brand text-white" asChild>
                    <Link href="/quote">Free Quote</Link>
                  </Button>
                  <Button className="text-sm/6 font-semibold text-gray-900" asChild variant="link">
                 <Link href="/about"> Learn more <span aria-hidden="true">→</span></Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <Image
            alt="Tex N Wash cleaning service"
            src="/images/herov3.png"
            width={800}
            height={600}
            className="aspect-3/2 object-cover object-top lg:aspect-auto lg:size-full"
          />
        </div>
      </div>
    </div>
  )
}


