import type { Metadata } from 'next'
import './globals.css'
import AmbientMusic from '@/components/AmbientMusic'

export const metadata: Metadata = {
  title: 'Coji Universe',
  description: 'Your neurodivergent life & chronic illness management hub: plan life, not burnout',
  icons: {
    icon: '/coji- logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AmbientMusic />
        {children}
      </body>
    </html>
  )
}