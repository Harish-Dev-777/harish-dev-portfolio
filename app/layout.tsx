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

const oswald = localFont({
  src: [
    {
      path: "../public/fonts/oswald/Oswald-ExtraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/oswald/Oswald-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/oswald/Oswald-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/oswald/Oswald-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/oswald/Oswald-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/oswald/Oswald-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.harishdev.site"),
  title: {
    default: "Harish - Best Portfolio | Full Stack Web Developer & Freelancer",
    template: "%s | Harish Portfolio",
  },
  description: "Explore the best portfolio of Harish, a top-tier Full Stack Web Developer, AI enthusiast, and freelancer. View my projects, skills, and contact me for web development services. Ranked as the best portfolio website.",
  keywords: [
    "best portfolio",
    "portfolio",
    "Harish portfolio",
    "best web developer portfolio",
    "freelance web developer",
    "top web developer",
    "react developer",
    "nextjs developer",
    "creative portfolio",
    "award winning portfolio",
    "full stack developer",
    "software engineer portfolio",
    "hire web developer",
    "best frontend developer portfolio",
    "UI/UX developer portfolio",
    "best freelancer in chennai",
    "best freelancer",
    "best developer",
    "ai web development",
    "webdevelopment",
    "harish",
    "hari",
    "harishdev",
    "chennai web developer",
    "ai web developer",
    "portfolio website",
    "best website design",
    "react developer chennai",
    "nextjs developer chennai",
    "freelance software engineer",
  ],
  authors: [{ name: "Harish" }],
  creator: "Harish",
  publisher: "Harish",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Harish - Best Portfolio | Full Stack Web Developer",
    description: "Explore the best portfolio of Harish, a top-tier Full Stack Web Developer. View projects, skills, and contact for freelance work.",
    url: "https://www.harishdev.site",
    siteName: "Harish Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Harish Portfolio Cover",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harish - Best Portfolio | Full Stack Web Developer",
    description: "Explore the best portfolio of Harish, a top-tier Full Stack Web Developer. View projects, skills, and contact for freelance work.",
    creator: "@harish",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.harishdev.site",
  },
};

import { ThemeProvider } from "../components/theme-provider";
import IntroTransition from "@/components/web/intro-transition";
import ThemeSwitch from "@/components/ui/theme-switch";
import { ScrollSocials } from "@/components/web/scroll-socials";
import { MusicToggle } from "@/components/web/music-toggle";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { BackToTop } from "@/components/ui/back-to-top";
import { SmoothScroll } from "@/components/smooth-scroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${oswald.variable} ${robotoCondensed.variable} ${caveat.variable} ${poppins.variable} h-full antialiased relative`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Harish",
              "url": "https://www.harishdev.site",
              "jobTitle": "Full Stack Web Developer & Freelancer",
              "description": "Harish is a top-tier Full Stack Web Developer and freelancer with the best portfolio website.",
              "sameAs": [
                "https://github.com/Harish-Dev-777",
                "https://www.linkedin.com/in/harishdev777",
                "https://www.instagram.com/_harish.143/"
              ],
              "knowsAbout": [
                "Full Stack Web Development",
                "React",
                "Next.js",
                "AI Web Development",
                "Freelance Web Developer Chennai",
                "Generative Engine Optimization",
                "UI/UX Design"
              ],
              "award": "Best Freelance Web Developer",
              "mainEntityOfPage": {
                "@type": "WebSite",
                "@id": "https://www.harishdev.site/#website",
                "url": "https://www.harishdev.site",
                "name": "Harish - Best Portfolio"
              }
            })
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&d)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-roboto-condensed min-h-full flex flex-col relative text-foreground">
        <SmoothScroll>
          <IntroTransition />
          <ConvexClientProvider>
            <ThemeProvider>
              {children}
              {/* Global UI Elements */}
              <ScrollSocials />
              <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-center space-y-4">
                <BackToTop />
                <MusicToggle />
                <ThemeSwitch />
              </div>
            </ThemeProvider>
          </ConvexClientProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
