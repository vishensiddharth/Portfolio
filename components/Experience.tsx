'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const underArmourBullets = [
  {
    icon: '🛒',
    text: 'Building and maintaining high-performance e-commerce storefronts using Salesforce Commerce Cloud (SFCC), delivering seamless shopping experiences for global customers.',
  },
  {
    icon: '⚛️',
    text: 'Developing modern, responsive front-end interfaces with Next.js and React, ensuring fast page loads, SSR/SSG optimisation, and accessibility compliance.',
  },
  {
    icon: '🔗',
    text: 'Designing and consuming GraphQL APIs to power dynamic product pages, cart, checkout, and personalisation features across web storefronts.',
  },
  {
    icon: '🖥️',
    text: 'Engineering scalable back-end services and middleware with Node.js, integrating third-party systems such as payment gateways, inventory, and loyalty platforms.',
  },
  {
    icon: '🔄',
    text: 'Collaborating cross-functionally with product, design, and QA teams in an Agile environment, participating in sprint planning, code reviews, and continuous delivery pipelines.',
  },
  {
    icon: '⚡',
    text: 'Optimising Core Web Vitals and storefront performance through code splitting, lazy loading, caching strategies, and CDN configuration.',
  },
]

const codilarBullets = [
  {
    icon: '👥',
    text: 'Led a team building cross-platform mobile apps (React Native) and web applications (React.js, Next.js) for international retail and e-commerce clients.',
  },
  {
    icon: '🛍️',
    text: 'Architected LuLu Online — large-scale grocery e-commerce on Akinon serving millions of GCC users with real-time inventory and high-performance checkout.',
  },
  {
    icon: '✨',
    text: 'Delivered Ajmal Perfume & Ooka apps and websites on Magento Cloud + Next.js with React Native mobile apps for seamless omnichannel experiences.',
  },
  {
    icon: '🌿',
    text: 'Built Wingreens PWA using React.js and Redux with offline-first capabilities and optimised load performance.',
  },
  {
    icon: '⚡',
    text: 'Drove performance improvements — optimised bundle sizes, lazy loading & API handling, reducing page load times by up to 40%.',
  },
  {
    icon: '🔄',
    text: 'Designed and implemented CI/CD pipelines via GitHub Actions & Bitbucket Pipelines, automating build, test and deployment workflows.',
  },
  {
    icon: '🏗️',
    text: 'Established coding standards, conducted code reviews, mentored junior developers and integrated third-party APIs and payment gateways.',
  },
]

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="orb w-[500px] h-[500px] bg-accent/4 bottom-0 left-[-100px]" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-number mb-3">03 / EXPERIENCE</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text mb-4">
            Work <span className="gradient-text">History</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute left-0 md:left-8 top-0 bottom-0 w-px timeline-line origin-top hidden sm:block"
          />

          <div className="sm:pl-16 md:pl-24 flex flex-col gap-10">

            {/* ── Under Armour (Current) ── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              {/* Timeline dot — pulsing (active) */}
              <div className="absolute -left-[52px] md:-left-[68px] top-6 w-4 h-4 rounded-full bg-accent glow-cyan hidden sm:block">
                <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-30" />
              </div>

              <div className="glass-card rounded-2xl p-8 border border-border hover:border-accent/20 transition-all duration-300">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-text mb-1">Senior Software Engineer</h3>
                    <div className="text-accent font-semibold text-lg">Under Armour</div>
                    <div className="text-muted text-sm mt-1 flex items-center gap-2">
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Bengaluru, India
                    </div>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-2">
                    <span className="px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-mono">
                      17 Aug 2026 — Present
                    </span>
                    <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      Full-time · Current
                    </span>
                  </div>
                </div>

                {/* Bullets */}
                <div className="space-y-4">
                  {underArmourBullets.map((b, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                      className="flex items-start gap-3 group"
                    >
                      <span className="text-lg mt-0.5 flex-shrink-0">{b.icon}</span>
                      <p className="text-muted group-hover:text-text transition-colors duration-300 text-sm leading-relaxed">
                        {b.text}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="mt-6 pt-6 border-t border-border flex flex-wrap gap-2">
                  {['Next.js', 'Node.js', 'GraphQL', 'SFCC', 'React', 'TypeScript', 'REST APIs', 'CI/CD'].map(t => (
                    <span key={t} className="px-2.5 py-1 text-xs font-mono rounded-md bg-surface border border-border text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Codilar Technologies (Past) ── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="relative"
            >
              {/* Timeline dot — static (past) */}
              <div className="absolute -left-[52px] md:-left-[68px] top-6 w-4 h-4 rounded-full bg-muted/40 border border-border hidden sm:block" />

              <div className="glass-card rounded-2xl p-8 border border-border hover:border-accent/20 transition-all duration-300">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-text mb-1">Team Lead</h3>
                    <div className="text-accent font-semibold text-lg">Codilar Technologies</div>
                    <div className="text-muted text-sm mt-1 flex items-center gap-2">
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Bengaluru, India
                    </div>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-2">
                    <span className="px-4 py-1.5 rounded-full bg-muted/10 border border-border text-muted text-sm font-mono">
                      15 Mar 2021 — 14 Aug 2026
                    </span>
                    <span className="px-3 py-1 rounded-full bg-muted/10 border border-border text-muted text-xs font-mono">
                      Full-time · 5 yrs 5 mos
                    </span>
                  </div>
                </div>

                {/* Bullets */}
                <div className="space-y-4">
                  {codilarBullets.map((b, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.55 + i * 0.08 }}
                      className="flex items-start gap-3 group"
                    >
                      <span className="text-lg mt-0.5 flex-shrink-0">{b.icon}</span>
                      <p className="text-muted group-hover:text-text transition-colors duration-300 text-sm leading-relaxed">
                        {b.text}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="mt-6 pt-6 border-t border-border flex flex-wrap gap-2">
                  {['React Native', 'React.js', 'Next.js', 'Akinon', 'Magento Cloud', 'Node.js', 'Redux', 'CI/CD'].map(t => (
                    <span key={t} className="px-2.5 py-1 text-xs font-mono rounded-md bg-surface border border-border text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
