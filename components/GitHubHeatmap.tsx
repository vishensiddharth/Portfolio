'use client'
import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface DayContribution {
  date: string
  count: number
  level: number
}

interface ContributionsData {
  total: {
    lastYear?: number
    [year: string]: number | undefined
  }
  contributions: DayContribution[]
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS_OF_WEEK = ['', 'Mon', '', 'Wed', '', 'Fri', '']

export default function GitHubHeatmap() {
  const [data, setData] = useState<ContributionsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number; x: number; y: number } | null>(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    async function fetchContributions() {
      try {
        const res = await fetch('/api/github')
        if (!res.ok) throw new Error('Network error')
        const json = await res.json()
        setData(json)
      } catch (e) {
        console.error('Failed to load GitHub activity', e)
      } finally {
        setLoading(false)
      }
    }
    fetchContributions()
  }, [])

  // Group contributions into 52/53 columns of 7 days
  const weeks = useMemo(() => {
    if (!data?.contributions || data.contributions.length === 0) return []
    const result: DayContribution[][] = []
    let currentWeek: DayContribution[] = []

    data.contributions.forEach((day, index) => {
      currentWeek.push(day)
      if (currentWeek.length === 7 || index === data.contributions.length - 1) {
        result.push(currentWeek)
        currentWeek = []
      }
    })
    return result
  }, [data])

  // Compute stats
  const stats = useMemo(() => {
    if (!data?.contributions) return { total: 0, activeDays: 0, maxStreak: 0, currentStreak: 0 }
    let total = 0
    let activeDays = 0
    let maxStreak = 0
    let streak = 0

    data.contributions.forEach(d => {
      total += d.count
      if (d.count > 0) {
        activeDays++
        streak++
        if (streak > maxStreak) maxStreak = streak
      } else {
        streak = 0
      }
    })

    return {
      total: data.total?.lastYear ?? total,
      activeDays,
      maxStreak,
      currentStreak: streak,
    }
  }, [data])

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-accent/30 border border-accent/40'
      case 2:
        return 'bg-accent/60 border border-accent/70'
      case 3:
        return 'bg-accent/80 border border-accent shadow-[0_0_8px_rgba(0,212,255,0.4)]'
      case 4:
        return 'bg-accent border border-white shadow-[0_0_12px_rgba(0,212,255,0.7)]'
      default:
        return 'bg-surface/50 border border-white/5 hover:border-white/20'
    }
  }

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr)
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    } catch {
      return dateStr
    }
  }

  return (
    <section id="github-activity" className="py-20 relative overflow-hidden" ref={ref}>
      <div className="orb w-[500px] h-[500px] bg-accent/4 top-1/2 right-[-150px]" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="section-number mb-3">04.5 / OPEN SOURCE & CODE ACTIVITY</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-text mb-3">
                GitHub <span className="gradient-text">Activity</span>
              </h2>
              <p className="text-muted text-sm max-w-xl">
                Continuous integration, active commits, and open-source explorations across repositories.
              </p>
            </div>
            <a
              href="https://github.com/vishensiddharth"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-accent/20 hover:border-accent/50 text-accent font-mono text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,212,255,0.2)]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>@vishensiddharth</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M7 17l9.2-9.2M17 17V8H8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
        >
          <div className="glass-card rounded-xl p-5 border border-border">
            <div className="text-muted text-xs font-mono uppercase tracking-wider mb-1">Contributions</div>
            <div className="font-display text-2xl font-bold text-accent">
              {loading ? '...' : stats.total}
            </div>
            <div className="text-muted/60 text-xs mt-1">Past 12 months</div>
          </div>
          <div className="glass-card rounded-xl p-5 border border-border">
            <div className="text-muted text-xs font-mono uppercase tracking-wider mb-1">Active Days</div>
            <div className="font-display text-2xl font-bold text-text">
              {loading ? '...' : stats.activeDays}
            </div>
            <div className="text-muted/60 text-xs mt-1">Days with commits</div>
          </div>
          <div className="glass-card rounded-xl p-5 border border-border">
            <div className="text-muted text-xs font-mono uppercase tracking-wider mb-1">Longest Streak</div>
            <div className="font-display text-2xl font-bold text-text">
              {loading ? '...' : `${stats.maxStreak} ${stats.maxStreak === 1 ? 'day' : 'days'}`}
            </div>
            <div className="text-muted/60 text-xs mt-1">Continuous push</div>
          </div>
          <div className="glass-card rounded-xl p-5 border border-border">
            <div className="text-muted text-xs font-mono uppercase tracking-wider mb-1">Status</div>
            <div className="font-display text-2xl font-bold text-green-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              Active
            </div>
            <div className="text-muted/60 text-xs mt-1">Public profile</div>
          </div>
        </motion.div>

        {/* Contribution Matrix Glass Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card rounded-2xl p-6 md:p-8 border border-border relative overflow-x-auto"
        >
          {loading ? (
            <div className="h-44 flex flex-col items-center justify-center gap-3 text-muted font-mono text-sm">
              <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              <span>Fetching live GitHub activity...</span>
            </div>
          ) : (
            <div className="min-w-[720px]">
              {/* Months Row */}
              <div className="flex text-[11px] font-mono text-muted/60 mb-2 pl-8">
                {MONTHS.map((m, i) => (
                  <div key={i} className="flex-1 text-left">
                    {m}
                  </div>
                ))}
              </div>

              {/* Grid of days */}
              <div className="flex gap-1.5">
                {/* Day labels (Mon, Wed, Fri) */}
                <div className="flex flex-col gap-1.5 text-[9px] font-mono text-muted/50 pr-2 select-none justify-between h-[105px]">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                </div>

                {/* 52 Columns */}
                <div className="flex gap-1 flex-1">
                  {weeks.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-1 flex-1">
                      {week.map((day) => (
                        <div
                          key={day.date}
                          onMouseEnter={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect()
                            setHoveredDay({
                              date: day.date,
                              count: day.count,
                              x: rect.left + rect.width / 2,
                              y: rect.top - 8,
                            })
                          }}
                          onMouseLeave={() => setHoveredDay(null)}
                          className={`w-full aspect-square rounded-[3px] transition-all duration-200 cursor-pointer ${getLevelColor(
                            day.level
                          )}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer / Legend */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-border text-xs font-mono text-muted">
                <span>Learn how contributions are calculated on GitHub</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px]">Less</span>
                  <span className="w-3 h-3 rounded-[2px] bg-surface/50 border border-white/5" />
                  <span className="w-3 h-3 rounded-[2px] bg-accent/30 border border-accent/40" />
                  <span className="w-3 h-3 rounded-[2px] bg-accent/60 border border-accent/70" />
                  <span className="w-3 h-3 rounded-[2px] bg-accent/80 border border-accent" />
                  <span className="w-3 h-3 rounded-[2px] bg-accent border border-white shadow-[0_0_6px_rgba(0,212,255,0.7)]" />
                  <span className="text-[11px]">More</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Floating Hover Tooltip */}
      {hoveredDay && (
        <div
          style={{
            position: 'fixed',
            left: hoveredDay.x,
            top: hoveredDay.y,
            transform: 'translate(-50%, -100%)',
            pointerEvents: 'none',
            zIndex: 9999,
          }}
          className="px-3 py-1.5 rounded-lg bg-[#080C14] border border-accent/40 text-xs font-mono text-text shadow-xl backdrop-blur-md whitespace-nowrap"
        >
          <span className="text-accent font-semibold">
            {hoveredDay.count === 0 ? 'No contributions' : `${hoveredDay.count} contribution${hoveredDay.count > 1 ? 's' : ''}`}
          </span>{' '}
          on {formatDate(hoveredDay.date)}
        </div>
      )}
    </section>
  )
}
