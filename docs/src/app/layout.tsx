import type {ReactNode} from "react";
import type {Metadata} from "next";
import { Head } from 'nextra/components'
import { ThemeProvider } from 'next-themes'
import 'nextra-theme-docs/style.css'
import '@patrojs/react/style.css'
import './globals.css'

const siteUrl = 'https://patrojs.vercel.app'

export const metadata: Metadata = {
  title: {
    default: 'PatroJS - Nepali Date Picker for Web frameworks',
    template: '%s | PatroJS'
  },
  description: 'A modern Bikram Sambat date picker with Nepali locale support, custom theming, and seamless web framework integration.',
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'PatroJS - Nepali Date Picker for web framework',
    description: 'A modern Bikram Sambat date picker with Nepali locale support, custom theming, and seamless web framework integration.',
    url: siteUrl,
    siteName: 'PatroJS',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PatroJS - Nepali Date Picker for web frameworks',
    description: 'A modern Bikram Sambat date picker with Nepali locale support, custom theming, and seamless React integration.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
