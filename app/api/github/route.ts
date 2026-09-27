import { NextResponse } from 'next/server'

export const revalidate = 3600 // Cache for 1 hour

export async function GET() {
  const username = 'vishensiddharth'

  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
      next: { revalidate: 3600 },
      headers: {
        'User-Agent': 'Portfolio-App',
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch from contributions API: ${res.statusText}`)
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error)
    
    // Provide a graceful fallback dataset so UI never breaks
    return NextResponse.json({
      total: { lastYear: 15 },
      contributions: generateFallbackContributions(),
      isFallback: true,
    })
  }
}

function generateFallbackContributions() {
  const today = new Date()
  const days = []
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    // subtle sparse commits for fallback
    const count = (i % 29 === 0) ? 2 : (i % 67 === 0) ? 4 : 0
    const level = count >= 4 ? 4 : count >= 2 ? 2 : count > 0 ? 1 : 0
    days.push({ date: dateStr, count, level })
  }
  return days
}
