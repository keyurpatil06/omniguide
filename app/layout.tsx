import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Walmart OmniGuide',
  description: 'Redefining retail convenience with smart, immersive tech',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
