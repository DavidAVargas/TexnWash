"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Button } from "./ui/button";
import { Menu, PointerIcon, X } from "lucide-react";
// import Container from "./container";

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
    // <header className="py-4 text-black shadow-md">
    //   <Container className="relative flex items-center justify-between gap-4">
    //     {/* Logo */}
    //     <Link href="/" className="flex items-center">
    //       <Image
    //         src="/images/tw-removebg-preview.png" //need a better logo for this
    //         alt="Tex N Wash Logo"
    //         width={40}
    //         height={40}
    //         className="object-contain"
    //       />
    //     </Link>

    //     {/* Nav Bar */}
    //     <nav className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    //       <ul className="flex justify-center space-x-6 text-lg">
    //         {/* Map through menu items */}
    //         {menuItems.map(({ name, url, newTab }) => (
    //           <li key={name}>
    //             <Link
    //               href={url}
    //               target={newTab ? "_blank" : "_self"}
    //               className="hover:text-brand"
    //             >
    //               {name}
    //             </Link>
    //           </li>
    //         ))}
    //       </ul>
    //     </nav>

    //     {/* Buttons */}
    //     <div className="flex space-x-4">
    //       <Button asChild className="bg-brand">
    //         <Link href={"/quote"}>
    //           <span>
    //             <PointerIcon />
    //           </span>
    //           Free Quote
    //         </Link>
    //       </Button>
    //     </div>
    //   </Container>
    // </header>
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
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
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Menu aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.url}
              className="text-sm/6 font-semibold text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button asChild className="bg-brand">
            <Link href={"/quote"}>
              Free Quote
              <span>
                <PointerIcon />
              </span>
            </Link>
          </Button>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <X aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <Button asChild className="bg-brand">
                  <Link href={"/quote"}>
                    <span>
                      <PointerIcon />
                    </span>
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
