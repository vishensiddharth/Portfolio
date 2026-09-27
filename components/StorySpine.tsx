'use client'
import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

interface Chapter {
  id: string
  number: string
  title: string
  subtitle: string
  icon: string
}

const CHAPTERS: Chapter[] = [
  { id: 'about', number: '01', title: 'Origin & Vision', subtitle: 'Introduction & Core Focus', icon: '⚡' },
  { id: 'skills', number: '02', title: 'Tech Arsenal', subtitle: 'Orbital Tech & Proficiency', icon: '🪐' },
  { id: 'experience', number: '03', title: 'Career Trajectory', subtitle: 'Under Armour & Codilar', icon: '💼' },
  { id: 'projects', number: '04', title: 'Flagship Builds', subtitle: 'LuLu, Ajmal, Ooka & Wingreens', icon: '🚀' },
  { id: 'github-activity', number: '05', title: 'Code Activity', subtitle: 'Live GitHub Commits', icon: '📈' },
  { id: 'education', number: '06', title: 'Foundation', subtitle: 'Academic Background', icon: '🎓' },
  { id: 'contact', number: '07', title: 'The Next Chapter', subtitle: "Let's Build Together", icon: '📬' },
]

export default function StorySpine() {
  const [activeChapter, setActiveChapter] = useState('about')
  const [hoveredChapter, setHoveredChapter] = useState<string | null>(null)
  const [storyModeEnabled, setStoryModeEnabled] = useState(true)

  // Smooth scroll progress for top bar
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35

      for (let i = CHAPTERS.length - 1; i >= 0; i--) {
        const el = document.getElementById(CHAPTERS[i].id)
        if (el) {
          const top = el.offsetTop
          if (scrollPosition >= top) {
            setActiveChapter(CHAPTERS[i].id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const currentIdx = CHAPTERS.findIndex(c => c.id === activeChapter)
  const currentChapter = CHAPTERS[currentIdx] || CHAPTERS[0]

  return (
    <>
      {/* ── Top Reading Progress Bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] origin-left pointer-events-none"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #00D4FF 0%, #7C3AED 50%, #F59E0B 100%)',
          boxShadow: '0 0 10px rgba(0, 212, 255, 0.7)',
        }}
      />

      {/* ── Left-Edge Vertical Chapter Spine (Desktop) ── */}
      <aside
        aria-label="Story mode navigation"
        className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center select-none"
      >
        {/* Story Spine Line */}
        <div className="relative flex flex-col items-center gap-7">
          {/* Vertical connecting line */}
          <div className="absolute top-2 bottom-2 w-[1px] bg-white/10 z-0" />

          {/* Active section highlight line segment */}
          <div
            className="absolute top-2 w-[2px] bg-gradient-to-b from-accent via-accent2 to-accent z-0 transition-all duration-500"
            style={{
              height: `${(currentIdx / (CHAPTERS.length - 1)) * 100}%`,
              boxShadow: '0 0 8px rgba(0, 212, 255, 0.5)',
            }}
          />

          {/* Chapter Nodes */}
          {CHAPTERS.map((chapter, idx) => {
            const isActive = chapter.id === activeChapter
            const isHovered = hoveredChapter === chapter.id

            return (
              <div
                key={chapter.id}
                className="relative flex items-center z-10"
                onMouseEnter={() => setHoveredChapter(chapter.id)}
                onMouseLeave={() => setHoveredChapter(null)}
              >
                {/* Node Button */}
                <button
                  onClick={() => scrollTo(chapter.id)}
                  aria-label={`Scroll to Chapter ${chapter.number}: ${chapter.title}`}
                  className="group relative flex items-center justify-center p-1.5 focus:outline-none"
                >
                  <div
                    className={`rounded-full transition-all duration-300 flex items-center justify-center ${
                      isActive
                        ? 'w-7 h-7 bg-[#080C14] border-2 border-accent text-accent shadow-[0_0_15px_rgba(0,212,255,0.6)]'
                        : 'w-3 h-3 bg-white/20 border border-white/20 group-hover:bg-accent/60 group-hover:scale-125'
                    }`}
                  >
                    {isActive ? (
                      <span className="text-[10px] font-mono font-bold leading-none">{chapter.number}</span>
                    ) : null}
                  </div>

                  {/* Pulsing halo on active node */}
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-accent/20 animate-ping pointer-events-none" />
                  )}
                </button>

                {/* Chapter Label Popout on Active or Hover */}
                {(isActive || isHovered) && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => scrollTo(chapter.id)}
                    className="absolute left-10 py-1.5 px-3 rounded-lg bg-[rgba(8,12,20,0.92)] border border-accent/25 backdrop-blur-md shadow-xl whitespace-nowrap cursor-pointer hover:border-accent/60 transition-colors"
                  >
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-[10px] text-accent/80 font-bold uppercase tracking-wider">
                        CH {chapter.number}
                      </span>
                      <span className="text-white/30 text-xs">•</span>
                      <span className="text-xs font-semibold text-text">{chapter.title}</span>
                    </div>
                    {isHovered && (
                      <div className="text-[10px] text-muted font-sans mt-0.5">{chapter.subtitle}</div>
                    )}
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>
      </aside>

      {/* ── Floating Chapter HUD (Bottom Left) ── */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-3">
        <motion.div
          key={activeChapter}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-3 px-3.5 py-2 rounded-xl border border-white/10 bg-[rgba(8,12,20,0.85)] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        >
          {/* Chapter Icon & Indicator */}
          <div className="w-6 h-6 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-xs">
            {currentChapter.icon}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 font-mono">
              <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
                CH {currentChapter.number}
              </span>
              <span className="text-white/20 text-[10px]">•</span>
              <span className="text-[11px] font-medium text-text">{currentChapter.title}</span>
            </div>
            <span className="text-[9px] text-muted font-mono">{currentChapter.subtitle}</span>
          </div>

          {/* Quick jump arrows */}
          <div className="flex items-center gap-1 pl-2 border-l border-white/10">
            <button
              onClick={() => {
                if (currentIdx > 0) scrollTo(CHAPTERS[currentIdx - 1].id)
              }}
              disabled={currentIdx === 0}
              aria-label="Previous Chapter"
              className="w-5 h-5 rounded flex items-center justify-center text-muted hover:text-accent hover:bg-white/5 disabled:opacity-20 transition-all text-xs"
            >
              ↑
            </button>
            <button
              onClick={() => {
                if (currentIdx < CHAPTERS.length - 1) scrollTo(CHAPTERS[currentIdx + 1].id)
              }}
              disabled={currentIdx === CHAPTERS.length - 1}
              aria-label="Next Chapter"
              className="w-5 h-5 rounded flex items-center justify-center text-muted hover:text-accent hover:bg-white/5 disabled:opacity-20 transition-all text-xs"
            >
              ↓
            </button>
          </div>
        </motion.div>
      </div>
    </>
  )
}
