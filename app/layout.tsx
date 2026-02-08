import type { Metadata, Viewport } from "next";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header";
import Footer from "@/components/footer";
import { inter } from "@/utils/font";


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Tex N Wash - Professional Cleaning Services",
  description: "Professional residential and commercial cleaning services in Fort Worth. House washing, driveway cleaning, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* MailerLite Universal */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
              .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
              n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
              (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
              ml('account', '1645980');
            `
          }}
        />
        {/* End MailerLite Universal */}
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
              <main className="overflow-x-hidden">
              {children}
              </main>
              <Footer/>
            </div>
          </ThemeProvider>
        
      </body>
    </html>
  );
}
