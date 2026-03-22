import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Siddharth Singh — Team Lead, Frontend & Full Stack Engineer',
  description: 'Portfolio & Resume of Siddharth Singh, Team Lead at Codilar Technologies. Expert in React Native, React.js, Next.js, and modern web development.',
  keywords: ['Siddharth Singh', 'React Native', 'Next.js', 'Team Lead', 'Frontend Engineer', 'Full Stack'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
