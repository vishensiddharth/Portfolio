'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className={`mx-4 md:mx-auto md:max-w-6xl rounded-2xl transition-all duration-500 ${
          scrolled
            ? 'bg-[rgba(8,12,20,0.85)] backdrop-blur-xl border border-[#1E2D45] px-6 py-3'
            : 'bg-transparent px-6 py-3'
        }`}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#"
              className="font-mono font-bold text-lg tracking-tight"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-muted">&lt;</span>
              <span className="gradient-text-cyan">Siddharth</span>
              <span className="text-accent2 mx-0.5">/</span>
              <span className="text-muted">&gt;</span>
            </motion.a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.3 }}
                  className="nav-link text-muted hover:text-text text-sm font-medium tracking-wide transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="mailto:vishensiddharth@gmail.com"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-[#080C14] bg-accent hover:bg-cyan-300 transition-all duration-300 glow-cyan"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                Hire Me
              </motion.a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 bg-accent origin-center transition-all"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-6 h-0.5 bg-text transition-all"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 bg-muted origin-center transition-all"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 mobile-menu flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                onClick={() => setMenuOpen(false)}
                className="text-3xl font-display font-bold text-text hover:text-accent transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="mailto:vishensiddharth@gmail.com"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => setMenuOpen(false)}
              className="mt-4 px-8 py-3 rounded-xl font-semibold text-[#080C14] bg-accent text-lg"
            >
              Hire Me
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
