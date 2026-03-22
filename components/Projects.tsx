'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const projects = [
  {
    name: 'LuLu Online',
    tagline: `GCC's largest online grocery & retail platform`,
    description: 'Large-scale e-commerce app for LuLu Group International serving millions of users across the GCC region. Built with real-time inventory management, multi-language support, and high-performance checkout flows.',
    tech: ['React Native', 'Akinon', 'Redux'],
    color: 'accent',
    emoji: '🛒',
    highlight: '1M+ Users',
  },
  {
    name: 'Ajmal Perfume',
    tagline: `Luxury perfume omnichannel experience`,
    description: 'End-to-end mobile app and website for Ajmal Perfumes on Magento Cloud. Features rich product catalogues, personalised recommendations, and seamless payment processing across web and mobile.',
    tech: ['React Native', 'Magento Cloud', 'Next.js'],
    color: 'accent2',
    emoji: '✨',
    highlight: 'Omnichannel',
  },
  {
    name: 'Ooka',
    tagline: `Next-gen retail mobile & web app`,
    description: 'Omnichannel retail application on Magento Cloud with a blazing-fast Next.js storefront and React Native mobile app. Focused on smooth UX, performance optimization and scalability.',
    tech: ['React Native', 'Magento Cloud', 'Next.js'],
    color: 'accent3',
    emoji: '🚀',
    highlight: 'Headless',
  },
  {
    name: 'Wingreens',
    tagline: `Offline-first Progressive Web App`,
    description: 'Progressive Web App for Wingreens Farms with offline-first capabilities, dynamic product listings, and highly optimised load performance using React.js and Redux state management.',
    tech: ['React.js', 'PWA', 'Redux'],
    color: 'accent',
    emoji: '🌿',
    highlight: 'PWA First',
  },
]

const colorMap: Record<string, { tag: string; border: string; glow: string; badge: string }> = {
  accent: {
    tag: 'border-accent/20 text-accent bg-accent/5',
    border: 'hover:border-accent/30',
    glow: 'group-hover:shadow-[0_0_30px_rgba(0,212,255,0.08)]',
    badge: 'bg-accent/10 text-accent border-accent/20',
  },
  accent2: {
    tag: 'border-accent2/20 text-accent2 bg-accent2/5',
    border: 'hover:border-accent2/30',
    glow: 'group-hover:shadow-[0_0_30px_rgba(124,58,237,0.08)]',
    badge: 'bg-accent2/10 text-accent2 border-accent2/20',
  },
  accent3: {
    tag: 'border-accent3/20 text-accent3 bg-accent3/5',
    border: 'hover:border-accent3/30',
    glow: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.08)]',
    badge: 'bg-accent3/10 text-accent3 border-accent3/20',
  },
}

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="orb w-[400px] h-[400px] bg-accent2/5 top-1/2 right-0" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-number mb-3">04 / PROJECTS</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text mb-4">
            Key <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted max-w-xl">
            Production apps used by millions — built with performance, scalability and great UX in mind.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => {
            const c = colorMap[project.color]
            return (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className={`group glass-card rounded-2xl p-7 border border-border ${c.border} ${c.glow} transition-all duration-400 cursor-default`}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{project.emoji}</span>
                    <div>
                      <h3 className="font-display text-xl font-bold text-text group-hover:text-accent transition-colors duration-300">
                        {project.name}
                      </h3>
                      <p className="text-muted text-xs mt-0.5">{project.tagline}</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-mono border ${c.badge}`}>
                    {project.highlight}
                  </span>
                </div>

                <p className="text-muted text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map(t => (
                    <span key={t} className={`px-3 py-1 rounded-full text-xs font-mono border ${c.tag} transition-all duration-200`}>
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
