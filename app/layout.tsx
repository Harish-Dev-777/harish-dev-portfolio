import type { Metadata } from "next";
import { Inter, Poppins, Archivo, Roboto_Condensed } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
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

import Script from 'next/script';
import { ThemeProvider } from "../components/theme-provider";
import IntroTransition from "@/components/web/intro-transition";
import ThemeSwitch from "@/components/ui/theme-switch";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${archivo.variable} ${poppins.variable} ${cabinet.variable} ${robotoCondensed.variable} h-full antialiased`}
    >
      <head>
        <script
          id="theme-switcher-v3"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var supportDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && supportDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-roboto-condensed min-h-full flex flex-col relative text-foreground">
        <IntroTransition />
        <ThemeProvider>
          {children}
          {/* Global Theme Toggle */}
          <div className="fixed bottom-8 right-8 z-[100]">
            <ThemeSwitch />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
