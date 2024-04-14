import type { Metadata, Viewport } from 'next';
import { AI } from './action';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Inter as FontSans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const title = 'Utopia Web Research'
const description =
  'AI-powered web research engine.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    creator: 'Utopia Expreess'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body 
              className={cn(
                "scroll-smooth min-h-screen bg-background font-sans antialiased bg-gradient-to-tl from-fuchsia-50 to-slate-300 dark:bg-gradient-to-tl dark:from-fuchsia-50 dark:to-slate-300",
                fontSans.variable
              )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <AI>{children}</AI>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  )
}
