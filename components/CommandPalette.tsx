'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Command {
  id: string
  label: string
  description: string
  icon: string
  action: () => void
  keywords: string[]
}

const NAV_SECTIONS = [
  { id: 'hero',       label: 'Home',       icon: '🏠', description: 'Back to the top',            keywords: ['home', 'top', 'start'] },
  { id: 'skills',     label: 'Skills',     icon: '⚡', description: 'Tech Arsenal & Proficiency',  keywords: ['skills', 'tech', 'stack', 'tools', 'arsenal'] },
  { id: 'experience',     label: 'Experience',      icon: '💼', description: 'Work History & Timeline',     keywords: ['experience', 'work', 'job', 'history', 'career'] },
  { id: 'projects',       label: 'Projects',        icon: '🚀', description: 'Featured Projects',           keywords: ['projects', 'portfolio', 'work', 'builds'] },
  { id: 'github-activity', label: 'GitHub Activity', icon: '📈', description: 'Live Commits & Contributions', keywords: ['github', 'activity', 'commits', 'contributions', 'heatmap', 'open source'] },
  { id: 'education',      label: 'Education',       icon: '🎓', description: 'Academic Background',         keywords: ['education', 'degree', 'college', 'university'] },
  { id: 'contact',    label: 'Contact',    icon: '📬', description: 'Get in touch',                keywords: ['contact', 'email', 'reach', 'hire', 'message'] },
]

const QUICK_ACTIONS = [
  {
    id: 'resume',
    label: 'Download Resume',
    icon: '📄',
    description: 'Download PDF resume',
    keywords: ['resume', 'cv', 'download', 'pdf'],
  },
  {
    id: 'github',
    label: 'Open GitHub',
    icon: '🐙',
    description: 'github.com/vishensiddharth',
    keywords: ['github', 'code', 'repos', 'git'],
  },
  {
    id: 'linkedin',
    label: 'Open LinkedIn',
    icon: '💼',
    description: 'Connect on LinkedIn',
    keywords: ['linkedin', 'connect', 'network'],
  },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setOpen(false)
    setQuery('')
  }

  const commands: Command[] = [
    ...NAV_SECTIONS.map(s => ({
      id: s.id,
      label: s.label,
      description: s.description,
      icon: s.icon,
      keywords: s.keywords,
      action: () => scrollTo(s.id),
    })),
    {
      id: 'resume',
      label: 'Download Resume',
      description: 'Download PDF resume',
      icon: '📄',
      keywords: QUICK_ACTIONS[0].keywords,
      action: () => { window.open('/resume.pdf', '_blank'); setOpen(false) },
    },
    {
      id: 'github',
      label: 'Open GitHub',
      description: 'github.com/vishensiddharth',
      icon: '🐙',
      keywords: QUICK_ACTIONS[1].keywords,
      action: () => { window.open('https://github.com/vishensiddharth', '_blank'); setOpen(false) },
    },
    {
      id: 'linkedin',
      label: 'Open LinkedIn',
      description: 'Connect on LinkedIn',
      icon: '💼',
      keywords: QUICK_ACTIONS[2].keywords,
      action: () => { window.open('https://linkedin.com/in/vishensiddharth', '_blank'); setOpen(false) },
    },
  ]

  const filtered = query.trim() === ''
    ? commands
    : commands.filter(c =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.description.toLowerCase().includes(query.toLowerCase()) ||
        c.keywords.some(k => k.includes(query.toLowerCase()))
      )

  // Keep selection in bounds
  useEffect(() => {
    setSelected(0)
  }, [query])

  // Open/close keyboard shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(o => !o)
        setQuery('')
        setSelected(0)
      }
      if (e.key === 'Escape') {
        setOpen(false)
        setQuery('')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Auto-focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  // Arrow key navigation + Enter
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected(s => Math.min(s + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected(s => Math.max(s - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      filtered[selected]?.action()
    }
  }

  return (
    <>
      {/* Trigger hint — bottom right */}
      <div
        className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer select-none"
        style={{
          background: 'rgba(13,20,32,0.85)',
          border: '1px solid rgba(0,212,255,0.15)',
          backdropFilter: 'blur(12px)',
          fontSize: 11,
          color: 'rgba(0,212,255,0.6)',
          fontFamily: 'monospace',
          transition: 'all 0.2s ease',
        }}
        onClick={() => { setOpen(true); setQuery('') }}
      >
        <span>⌘ K</span>
        <span style={{ color: 'rgba(255,255,255,0.3)' }}>to search</span>
      </div>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-50"
              style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
              onClick={() => { setOpen(false); setQuery('') }}
            />

            {/* Palette */}
            <motion.div
              key="palette"
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="fixed z-50 top-[20%] left-1/2 w-full max-w-lg"
              style={{ transform: 'translateX(-50%)' }}
            >
              <div
                style={{
                  background: 'rgba(8,12,20,0.97)',
                  border: '1px solid rgba(0,212,255,0.2)',
                  borderRadius: 16,
                  boxShadow: '0 25px 80px rgba(0,0,0,0.7), 0 0 40px rgba(0,212,255,0.08)',
                  overflow: 'hidden',
                }}
              >
                {/* Search input */}
                <div className="flex items-center gap-3 px-4 py-4 border-b" style={{ borderColor: 'rgba(0,212,255,0.1)' }}>
                  <svg width="16" height="16" fill="none" stroke="rgba(0,212,255,0.5)" strokeWidth={2} viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" strokeLinecap="round" />
                  </svg>
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Search sections, actions…"
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: '#E2E8F0',
                      fontFamily: 'monospace',
                      fontSize: 14,
                    }}
                  />
                  <kbd style={{
                    fontSize: 10,
                    color: 'rgba(0,212,255,0.4)',
                    fontFamily: 'monospace',
                    background: 'rgba(0,212,255,0.06)',
                    border: '1px solid rgba(0,212,255,0.15)',
                    borderRadius: 4,
                    padding: '2px 6px',
                  }}>ESC</kbd>
                </div>

                {/* Results */}
                <div style={{ maxHeight: 320, overflowY: 'auto', padding: '8px' }}>
                  {filtered.length === 0 ? (
                    <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, fontFamily: 'monospace', padding: '20px', textAlign: 'center' }}>
                      No results for &ldquo;{query}&rdquo;
                    </div>
                  ) : (
                    filtered.map((cmd, i) => (
                      <button
                        key={cmd.id}
                        onClick={cmd.action}
                        onMouseEnter={() => setSelected(i)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          padding: '10px 12px',
                          borderRadius: 10,
                          border: 'none',
                          cursor: 'pointer',
                          background: i === selected
                            ? 'rgba(0,212,255,0.1)'
                            : 'transparent',
                          outline: i === selected ? '1px solid rgba(0,212,255,0.2)' : 'none',
                          transition: 'background 0.1s ease',
                          textAlign: 'left',
                        }}
                      >
                        <span style={{ fontSize: 18, flexShrink: 0 }}>{cmd.icon}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: i === selected ? '#00D4FF' : '#E2E8F0', fontFamily: 'monospace' }}>
                            {cmd.label}
                          </div>
                          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>
                            {cmd.description}
                          </div>
                        </div>
                        {i === selected && (
                          <kbd style={{
                            fontSize: 10,
                            color: 'rgba(0,212,255,0.6)',
                            fontFamily: 'monospace',
                            background: 'rgba(0,212,255,0.08)',
                            border: '1px solid rgba(0,212,255,0.2)',
                            borderRadius: 4,
                            padding: '2px 6px',
                            flexShrink: 0,
                          }}>↵</kbd>
                        )}
                      </button>
                    ))
                  )}
                </div>

                {/* Footer hint */}
                <div
                  className="flex items-center gap-4 px-4 py-2.5 border-t"
                  style={{ borderColor: 'rgba(0,212,255,0.1)', fontSize: 10, color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' }}
                >
                  <span><kbd style={{ background: 'rgba(255,255,255,0.06)', padding: '1px 4px', borderRadius: 3, border: '1px solid rgba(255,255,255,0.1)' }}>↑↓</kbd> navigate</span>
                  <span><kbd style={{ background: 'rgba(255,255,255,0.06)', padding: '1px 4px', borderRadius: 3, border: '1px solid rgba(255,255,255,0.1)' }}>↵</kbd> select</span>
                  <span><kbd style={{ background: 'rgba(255,255,255,0.06)', padding: '1px 4px', borderRadius: 3, border: '1px solid rgba(255,255,255,0.1)' }}>ESC</kbd> close</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
