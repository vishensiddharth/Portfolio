'use client'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="py-16 border-t border-border relative overflow-hidden">
      <div className="orb w-[300px] h-[200px] bg-accent/4 top-0 left-1/2 -translate-x-1/2" />

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="gradient-text">Build</span> Together
          </h2>
          <p className="text-muted mb-8 max-w-md mx-auto">
            Open to exciting roles, and collaboration. Let's create something great.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <motion.a
              href="mailto:vishensiddharth@gmail.com"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 rounded-xl font-semibold text-[#080C14] bg-accent hover:bg-cyan-300 transition-all duration-300 glow-cyan"
            >
              vishensiddharth@gmail.com
            </motion.a>
            <motion.a
              href="tel:+919162218895"
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-8 py-3 rounded-xl font-semibold text-accent border border-accent/30 hover:bg-accent/5 transition-all duration-300"
            >
              +91 91622 18895
            </motion.a>
          </div>

          <div className="flex items-center justify-center gap-6 mb-10">
            <a href="https://www.linkedin.com/in/siddharth-singh-12360315a/" target="_blank" rel="noreferrer"
              className="text-muted hover:text-accent transition-colors font-mono text-sm">
              LinkedIn ↗
            </a>
            <span className="text-border">·</span>
            <span className="text-muted font-mono text-sm">Bengaluru, India</span>
            <span className="text-border">·</span>
            <span className="text-muted font-mono text-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Available
            </span>
          </div>

          <div className="border-t border-border pt-6">
            <p className="text-muted text-xs font-mono">
              © {new Date().getFullYear()} Siddharth Singh . All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
