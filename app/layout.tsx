import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

import '@/app/globals.css'
import { cn } from '@/lib/utils'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/sonner'
import { FooterText } from '@/components/footer'
import React from 'react'
import { Vortex } from '@/components/ui/vortex'
import { Footer } from '@/components/footer'

export const metadata = {
  metadataBase: process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : undefined,
  title: {
    default: 'SOC Coach Bot',
    template: `%s - School of Code`
  },
  description: 'School of Code.',
  icons: {
    icon: '/soc_logo.png',
    shortcut: '/soc_logo.png',
    apple: '/soc_logo.png'
  }
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'font-sans antialiased',
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <Toaster position="top-center" />
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />

            <div className="fixed bottom-0 w-full">
              <main className="flex flex-col flex-1 ">
                {children}
              </main>
            </div>
          </div>
          <TailwindIndicator />
        </Providers>
        <Footer />
      </body>
    </html>
  )
}
