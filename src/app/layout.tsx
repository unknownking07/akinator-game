import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Akinator Genie - Farcaster Mini App',
  description: 'Guess famous personalities with the mystical genie!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Remove the old script tag and use the Script component */}
        <Script src="https://miniapps.farcaster.xyz/sdk.js" strategy="afterInteractive" />
      </head>
      <body className={`${inter.className} bg-gradient-to-br from-violet-900 via-violet-800 to-purple-900 min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
