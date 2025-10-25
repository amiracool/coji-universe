import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Coji Universe',
  description: 'Your neurodivergent life & chronic illness management hub: plan life, not burnout',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}