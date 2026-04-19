import type { Metadata } from "next";
import { Roboto_Condensed, Caveat, Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-handwritten",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const cabinet = localFont({
  src: [
    {
      path: "../public/fonts/CabinetGrotesk-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/CabinetGrotesk-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/CabinetGrotesk-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/CabinetGrotesk-Extrabold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/CabinetGrotesk-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-cabinet",
});

export const metadata: Metadata = {
  title: "Harish Portfolio",
  description: "Web Developer and Freelancer Portfolio",
};

import { ThemeProvider } from "../components/theme-provider";
import IntroTransition from "@/components/web/intro-transition";
import ThemeSwitch from "@/components/ui/theme-switch";
import { ScrollSocials } from "@/components/web/scroll-socials";
import { MusicToggle } from "@/components/web/music-toggle";
import { ConvexClientProvider } from "@/components/convex-client-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cabinet.variable} ${robotoCondensed.variable} ${caveat.variable} ${poppins.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&d)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-roboto-condensed min-h-full flex flex-col relative text-foreground">
        <IntroTransition />
        <ConvexClientProvider>
          <ThemeProvider>
            {children}
            {/* Global UI Elements */}
            <ScrollSocials />
            <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-center space-y-4">
              <MusicToggle />
              <ThemeSwitch />
            </div>
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
