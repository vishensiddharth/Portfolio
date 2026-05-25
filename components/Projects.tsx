'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const projects = [
  {
    name: 'LuLu Online',
    tagline: "GCC's largest grocery & retail platform",
    description: 'Large-scale e-commerce on Akinon serving millions of GCC users with real-time inventory, multi-language support, and high-performance checkout.',
    tech: ['React Native', 'Akinon', 'Redux'],
    color: '#00D4FF',
    colorDim: 'rgba(0,212,255,0.12)',
    colorBorder: 'rgba(0,212,255,0.25)',
    highlight: '1M+ Users',
    emoji: '🛒',
    mockup: 'phone',
    screenshot: '/lulu.png',
  },
  {
    name: 'Ajmal Perfume',
    tagline: 'Luxury perfume omnichannel experience',
    description: 'Mobile and web solution on Magento Cloud with rich product catalogues, personalised recommendations, and seamless payment processing.',
    tech: ['React Native', 'Magento Cloud', 'Next.js'],
    color: '#A855F7',
    colorDim: 'rgba(168,85,247,0.12)',
    colorBorder: 'rgba(168,85,247,0.25)',
    highlight: 'Omnichannel',
    emoji: '✨',
    mockup: 'phone',
    screenshot: '/ajmal.png',
  },
  {
    name: 'Ooka',
    tagline: 'Next-gen retail mobile & web app',
    description: 'Omnichannel retail on Magento Cloud with blazing-fast Next.js storefront and React Native app, focused on UX and performance.',
    tech: ['React Native', 'Magento Cloud', 'Next.js'],
    color: '#F59E0B',
    colorDim: 'rgba(245,158,11,0.12)',
    colorBorder: 'rgba(245,158,11,0.25)',
    highlight: 'Headless',
    emoji: '🚀',
    mockup: 'phone',
    screenshot: '/ooka.png',
  },
  {
    name: 'Wingreens',
    tagline: 'Offline-first Progressive Web App',
    description: 'PWA for Wingreens Farms with offline-first capabilities, dynamic listings and highly optimised load performance using React.js and Redux.',
    tech: ['React.js', 'PWA', 'Redux'],
    color: '#22C55E',
    colorDim: 'rgba(34,197,94,0.12)',
    colorBorder: 'rgba(34,197,94,0.25)',
    highlight: 'PWA First',
    emoji: '🌿',
    mockup: 'desktop',
    screenshot: '/wingreens.png',
  },
]

// ── Phone Mockup ─────────────────────────────────────────────
function PhoneMockup({ project, active }: { project: typeof projects[0], active: boolean }) {
  return (
    <div className="relative">
      {/* Glow */}
      <div
        className="absolute inset-[-20px] rounded-[3rem] transition-all duration-700 pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${project.color}18 0%, transparent 70%)`, filter: 'blur(20px)' }}
      />
      {/* Frame */}
      <div
        className="relative w-[200px] h-[410px] rounded-[2.5rem] overflow-hidden"
        style={{
          background: '#0a0e1a',
          boxShadow: `0 0 0 1.5px rgba(255,255,255,0.08), 0 0 0 3px rgba(0,0,0,0.8), 0 0 40px ${project.color}22`,
        }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-20 h-5 bg-[#0a0e1a] rounded-b-2xl" />
        {/* Side buttons */}
        <div className="absolute -right-[3px] top-20 w-[3px] h-10 rounded-l-sm" style={{ background: 'rgba(255,255,255,0.1)' }} />
        <div className="absolute -left-[3px] top-16 w-[3px] h-7 rounded-r-sm" style={{ background: 'rgba(255,255,255,0.1)' }} />
        <div className="absolute -left-[3px] top-28 w-[3px] h-7 rounded-r-sm" style={{ background: 'rgba(255,255,255,0.1)' }} />
        {/* Screenshot */}
        <div className="absolute inset-0 pt-5 overflow-hidden">
          <motion.img
            src={project.screenshot}
            alt={project.name}
            className="w-full object-cover object-top"
            style={{ width: '100%', display: 'block', height: 'auto' }}
            animate={active ? { y: ['0%', '-60%', '0%'] } : { y: '0%' }}
transition={{ duration: 14, ease: 'linear', repeat: Infinity, repeatDelay: 2 }}
          />
        </div>
        {/* Home indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-white/20 z-20" />
      </div>
      {/* Rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-[-16px] rounded-[3rem] pointer-events-none"
        style={{ border: `1px dashed ${project.color}30` }}
      />
    </div>
  )
}

// ── Desktop/Laptop Mockup ────────────────────────────────────
function DesktopMockup({ project, active }: { project: typeof projects[0], active: boolean }) {
  return (
    <div className="relative w-full max-w-[460px]">
      {/* Glow */}
      <div
        className="absolute inset-[-10px] rounded-xl pointer-events-none transition-all duration-700"
        style={{ background: `radial-gradient(ellipse, ${project.color}15 0%, transparent 70%)`, filter: 'blur(24px)' }}
      />
      {/* Laptop lid */}
      <div
        className="relative rounded-t-xl overflow-hidden"
        style={{
          background: '#1a1f2e',
          border: '2px solid rgba(255,255,255,0.08)',
          borderBottom: 'none',
        }}
      >
        {/* Screen bezel top */}
        <div style={{ background: '#0d1018', height: 8, borderBottom: '1px solid rgba(255,255,255,0.03)' }} />
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-3 py-2" style={{ background: '#111520', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          {/* URL bar */}
          <div className="flex-1 mx-2 px-3 py-0.5 rounded-md flex items-center gap-1.5" style={{ background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)' }}>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={2}>
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
            <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>wingreensworld.com</span>
          </div>
          {/* Reload icon */}
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth={2}>
            <path strokeLinecap="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
        </div>

        {/* Scrolling screenshot */}
        <div className="overflow-hidden" style={{ height: 300 }}>
          <motion.img
            src={project.screenshot}
            alt={project.name}
            className="w-full"
            style={{ display: 'block', transformOrigin: 'top center' }}
            animate={active ? { y: [0, -900, 0] } : { y: 0 }}
            transition={{ duration: 12, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2 }}
          />
          <div style={{ background: '#0d1018', height: 8, borderTop: '1px solid rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <div style={{ width: 8, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.15)' }} />
          </div>
        </div>
      </div>

    
      {/* Laptop hinge */}
      <div style={{ background: '#111520', height: 6, border: '2px solid rgba(255,255,255,0.08)', borderTop: '1px solid rgba(255,255,255,0.04)', borderRadius: '0 0 2px 2px' }} />
      {/* Laptop keyboard base */}
      <div style={{ background: '#141824', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '0 0 10px 10px', height: 20, margin: '0 -10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Trackpad */}
      <div style={{ width: 50, height: 10, borderRadius: 4, background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)' }} /></div>
      {/* Laptop foot shadow */}
      <div style={{ height: 4, margin: '0 20px', background: 'rgba(0,0,0,0.4)', borderRadius: '0 0 50% 50%', filter: 'blur(4px)' }} />
      </div>
  )
}

// ── Main Component ───────────────────────────────────────────
export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!inView) return
    const loadGSAP = async () => {
      const { gsap } = await import('gsap')
      const el = titleRef.current
      if (!el) return
      const chars = el.querySelectorAll('.char')
      gsap.fromTo(chars,
        { y: 60, opacity: 0, rotateX: -90 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.6, stagger: 0.04, ease: 'back.out(1.7)', delay: 0.2 }
      )
    }
    loadGSAP()
  }, [inView])

  useEffect(() => {
    if (paused) return
    const interval = setInterval(() => {
      setDirection(1)
      setActive(prev => (prev + 1) % projects.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [paused])

  const goTo = (i: number) => {
    setDirection(i > active ? 1 : -1)
    setActive(i)
    setPaused(true)
    setTimeout(() => setPaused(false), 8000)
  }

  const titleChars = 'Key Projects'.split('').map((ch, i) => (
    <span key={i} className="char inline-block" style={{ opacity: 0 }}>
      {ch === ' ' ? '\u00A0' : ch}
    </span>
  ))

  const current = projects[active]

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="orb w-[400px] h-[400px] bg-accent2/5 top-1/2 right-0" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-number mb-3">04 / PROJECTS</div>
          <h2
            ref={titleRef}
            className="font-display text-4xl md:text-5xl font-bold text-text mb-4"
            style={{ perspective: '400px' }}
          >
            {titleChars}
          </h2>
          <p className="text-muted max-w-xl">
            Production apps used by millions — built with performance, scalability and great UX in mind.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Left — Cards */}
          <div className="flex flex-col gap-4">
            {projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => goTo(i)}
                className="cursor-pointer rounded-2xl p-5 border transition-all duration-400"
                style={{
                  background: active === i ? project.colorDim : 'rgba(13,20,32,0.6)',
                  borderColor: active === i ? project.colorBorder : 'rgba(30,45,69,0.6)',
                  transform: active === i ? 'translateX(6px)' : 'translateX(0)',
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{project.emoji}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-bold text-text text-base">{project.name}</h3>
                        {/* Desktop badge for Wingreens */}
                        {project.mockup === 'desktop' && (
                          <span className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E', border: '0.5px solid rgba(34,197,94,0.2)' }}>
                            web
                          </span>
                        )}
                      </div>
                      <p className="text-xs mt-0.5" style={{ color: project.color }}>{project.tagline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-xs font-mono" style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30` }}>
                      {project.highlight}
                    </span>
                    <motion.div animate={{ rotate: active === i ? 90 : 0 }} transition={{ duration: 0.3 }}>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-muted">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>
                </div>

                <AnimatePresence>
                  {active === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-muted text-xs leading-relaxed mt-3">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {project.tech.map(t => (
                          <span key={t} className="px-2 py-0.5 rounded-md text-xs font-mono" style={{ background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {/* Progress dots */}
            <div className="flex gap-2 mt-2 pl-1">
              {projects.map((p, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: active === i ? 20 : 6,
                    height: 6,
                    background: active === i ? p.color : 'rgba(255,255,255,0.15)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right — Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center items-center min-h-[460px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-3"
              >
                {current.mockup === 'phone' ? (
                  <PhoneMockup project={current} active={true} />
                ) : (
                  <DesktopMockup project={current} active={true} />
                )}

                {/* Label */}
                <div className="text-center mt-2">
                  <div className="font-mono text-xs transition-all duration-300" style={{ color: current.color }}>
                    {current.name}
                  </div>
                  <div className="text-muted text-xs mt-0.5 font-mono">
                    {current.tech.join(' · ')}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  )
}