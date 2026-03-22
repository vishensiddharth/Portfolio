'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Education() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="education" className="py-24 relative overflow-hidden">
      <div className="orb w-[300px] h-[300px] bg-accent3/5 bottom-0 left-1/2" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-number mb-3">05 / EDUCATION</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text mb-4">
            Academic <span className="gradient-text">Background</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ y: -4 }}
          className="glass-card rounded-2xl p-8 border border-border hover:border-accent3/30 transition-all duration-300 max-w-2xl"
        >
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-xl bg-accent3/10 border border-accent3/20 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🎓</span>
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                <h3 className="font-display text-xl font-bold text-text">
                  Bachelor of Computer Applications
                </h3>
                <span className="px-3 py-1 rounded-full bg-accent3/10 border border-accent3/20 text-accent3 text-sm font-mono whitespace-nowrap">
                  2017 — 2020
                </span>
              </div>
              <p className="text-muted text-sm mb-1">Specialisation in App Development & Web Development</p>
              <p className="text-accent text-sm font-semibold mb-4">Rama University</p>

              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent3/5 border border-accent3/20 w-fit">
                <span className="text-xl">🏆</span>
                <div>
                  <div className="text-accent3 font-bold text-sm">Gold Medalist</div>
                  <div className="text-muted text-xs">Top of graduating class</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
