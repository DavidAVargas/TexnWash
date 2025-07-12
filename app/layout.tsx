import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header";
import Footer from "@/components/footer";
import { inter } from "@/utils/font";


export const metadata: Metadata = {
  title: "Tex N Wash - Professional Cleaning Services",
  description: "Professional residential and commercial cleaning services in Fort Worth. House washing, driveway cleaning, and more.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body
        className={`${inter.variable} antialiased overflow-x-hidden`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <div className="grid min-h-[100dvh] grid-rows-[auto_1fr_auto]">
              <Header/>
              <main className="pt-1 overflow-x-hidden">
              {children}
              </main>
              <Footer/>
            </div>
          </ThemeProvider>
        
      </body>
    </html>
  );
}
