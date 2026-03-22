'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const skillGroups = [
  {
    category: 'Mobile & PWA',
    icon: '📱',
    color: 'accent',
    skills: ['React Native', 'PWA', 'Expo', 'React CLI', 'Mobile-First Design'],
  },
  {
    category: 'Frontend',
    icon: '🎨',
    color: 'accent2',
    skills: ['React.js', 'Next.js', 'Redux', 'Zusrtand', 'JavaScript ES6+', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    icon: '⚙️',
    color: 'accent3',
    skills: ['Node.js', 'REST APIs', 'MongoDB', 'Express.js'],
  },
  {
    category: 'E-commerce',
    icon: '🛒',
    color: 'accent',
    skills: ['Magento Cloud', 'Akinon', 'Headless Commerce', 'PWA Studio', 'ScandiPWA', 'Hyva'],
  },
  { 
    category: 'CI/CD & Tools',
    icon: '🚀',
    color: 'accent2',
    skills: ['GitHub Actions', 'Bitbucket Pipelines', 'Git', 'CI/CD', 'Agile/Scrum', 'Code Review'],
  },
  {
    category: 'Leadership',
    icon: '👥',
    color: 'accent3',
    skills: ['Team Lead', 'Mentoring', 'Code Review', 'Architecture Design', 'Sprint Planning'],
  },
]

const colorMap: Record<string, string> = {
  accent: 'border-accent/20 text-accent bg-accent/5 hover:border-accent/50 hover:bg-accent/10',
  accent2: 'border-accent2/20 text-accent2 bg-accent2/5 hover:border-accent2/50 hover:bg-accent2/10',
  accent3: 'border-accent3/20 text-accent3 bg-accent3/5 hover:border-accent3/50 hover:bg-accent3/10',
}

const cardBorderMap: Record<string, string> = {
  accent: 'hover:border-accent/30',
  accent2: 'hover:border-accent2/30',
  accent3: 'hover:border-accent3/30',
}

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="skills" className="p-12 md:py-24 relative overflow-hidden">
      <div className="orb w-[400px] h-[400px] bg-accent2/5 top-0 right-0" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-number mb-3">02 / SKILLS</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text mb-4">
            Tech <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="text-muted max-w-xl">
            A curated stack of tools and technologies I use to build performant, scalable products.
          </p>
        </motion.div>

        {/* Skill grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className={`glass-card rounded-2xl p-6 border border-border transition-all duration-300 ${cardBorderMap[group.color]}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{group.icon}</span>
                <h3 className="font-display font-semibold text-text">{group.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1 rounded-full text-xs font-mono border transition-all duration-300 cursor-default ${colorMap[group.color]}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
