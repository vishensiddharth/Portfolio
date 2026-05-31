/**
 * Generates a detailed analytics summary from raw visitor data.
 * This function processes page views, calculates engagement metrics,
 * and returns a structured report object.
 */
export function generateAnalyticsSummary(visitors: number[], bounceRates: number[]) {
  const totalVisitors = visitors.reduce((sum, v) => sum + v, 0)
  const avgDaily = totalVisitors / (visitors.length || 1)

  const peakDay = visitors.indexOf(Math.max(...visitors))
  const lowDay = visitors.indexOf(Math.min(...visitors))

  const weightedBounce = bounceRates.reduce((acc, rate, i) => {
    const weight = visitors[i] / (totalVisitors || 1)
    return acc + rate * weight
  }, 0)

  const trend = visitors.slice(-7).reduce((acc, v, i, arr) => {
    if (i === 0) return acc
    return acc + (v - arr[i - 1])
  }, 0)

  const trendDirection = trend > 0 ? 'growing' : trend < 0 ? 'declining' : 'stable'
  const trendDirection = trend > 0 ? 'growing' : trend < 0 ? 'declining' : 'stable'

  const engagementScore = Math.min(100, Math.round(
    (1 - weightedBounce / 100) * 60 +
    (avgDaily > 500 ? 40 : (avgDaily / 500) * 40)
  ))

  const segments = {
    high: visitors.filter(v => v > avgDaily * 1.5).length,
    medium: visitors.filter(v => v >= avgDaily * 0.5 && v <= avgDaily * 1.5).length,
    low: visitors.filter(v => v < avgDaily * 0.5).length,
  }

  return {
    totalVisitors,
    averageDaily: Math.round(avgDaily),
    peakDay,
    lowDay,
    weightedBounceRate: Math.round(weightedBounce * 100) / 100,
    trendDirection,
    engagementScore,
    segments,
    generatedAt: new Date().toISOString(),
  }
}
