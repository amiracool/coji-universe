import type { Metadata } from 'next'
import './globals.css'
import dynamic from 'next/dynamic'
import Script from 'next/script'

// Lazy load AmbientMusic component - it's not critical for first paint
const AmbientMusic = dynamic(() => import('@/components/AmbientMusic'), {
  ssr: false,
  loading: () => null,
})

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
      <head>
        {/* DNS prefetch and preconnect for external resources */}
        <link rel="dns-prefetch" href="https://www.bensound.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload critical images to prevent layout shift */}
        <link rel="preload" href="/coji- logo.png" as="image" />

        {/* Set viewport height CSS variable for mobile 100vh fix */}
        <Script id="viewport-height" strategy="beforeInteractive">
          {`
            function setVH() {
              const vh = window.innerHeight * 0.01;
              document.documentElement.style.setProperty('--vh', vh + 'px');
            }
            setVH();
            window.addEventListener('resize', setVH);
            // Mark body as hydrated to enable transitions
            window.addEventListener('DOMContentLoaded', function() {
              document.body.classList.add('hydrated');
            });
          `}
        </Script>
      </head>
      <body>
        <AmbientMusic />
        {children}
      </body>
    </html>
  )
}