"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Button } from "./ui/button";
import { Menu, PointerIcon, X } from "lucide-react";

const menuItems = [
  { name: "Home", url: "/", newTab: false },
  { name: "Services", url: "/services", newTab: false },
  { name: "Gallery", url: "/gallery", newTab: false },
  { name: "About", url: "/about", newTab: false },
  { name: "Contact", url: "/contact", newTab: false },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-4 md:p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/tw-removebg-preview.png"
              alt="Tex N Wash Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100"
          >
            <span className="sr-only">Open main menu</span>
            <Menu aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.url}
              className="text-sm font-semibold text-gray-900 hover:text-brand transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button asChild className="bg-brand hover:bg-brand/90">
            <Link href={"/quote"}>
              Free Quote
              <PointerIcon className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50 bg-black/20" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Tex N Wash</span>
              <Image
                src="/images/tw-removebg-preview.png"
                alt="Tex N Wash Logo"
                width={32}
                height={32}
                className="h-8 w-auto object-contain"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100"
            >
              <span className="sr-only">Close menu</span>
              <X aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.url}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Button asChild className="bg-brand hover:bg-brand/90 w-full">
                  <Link href={"/quote"} onClick={() => setMobileMenuOpen(false)}>
                    <PointerIcon className="mr-2 size-4" />
                    Free Quote
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
