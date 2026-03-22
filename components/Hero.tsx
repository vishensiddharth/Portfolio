'use client'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-grid" id="about">

      {/* Background orbs */}
      <div className="orb w-[600px] h-[600px] bg-accent/5 top-[-200px] left-[-200px]" />
      <div className="orb w-[400px] h-[400px] bg-accent2/8 bottom-[-100px] right-[-100px]" />
      <div className="orb w-[300px] h-[300px] bg-accent3/5 top-[30%] right-[10%]" />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-accent/40"
          style={{
            left: `${10 + (i * 8) % 85}%`,
            top: `${15 + (i * 13) % 75}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + (i % 3),
            delay: i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent text-xs font-mono tracking-widest uppercase">Available for opportunities</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-5xl md:text-7xl font-bold leading-none mb-4"
            >
              <span className="text-text">Siddharth</span>
              <br />
              <span className="gradient-text">Singh</span>
            </motion.h1>

            {/* Animated role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl text-muted font-body mb-6 h-8"
            >
              <TypeAnimation
                sequence={[
                  'Team Lead @ Codilar Technologies',
                  2000,
                  'Frontend & Full Stack Engineer',
                  2000,
                  'React Native Specialist',
                  2000,
                  'Next.js & Magento Expert',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-accent font-mono text-lg md:text-xl"
              />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-muted text-base leading-relaxed mb-8 max-w-lg"
            >
              5+ years crafting high-impact e-commerce and consumer apps for global brands.
              Expert in React Native, Next.js, Magento Cloud & Akinon. Gold Medalist in BCA.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-8 mb-8"
            >
              {[
                { value: '5+', label: 'Years Exp.' },
                { value: '4+', label: 'Major Projects' },
                { value: '1M+', label: 'Users Reached' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-3xl font-bold gradient-text-cyan">{stat.value}</div>
                  <div className="text-muted text-xs font-mono tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="mailto:vishensiddharth@gmail.com"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-xl font-semibold text-[#080C14] bg-accent hover:bg-cyan-300 transition-all duration-300 glow-cyan flex items-center gap-2"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Get in Touch
              </motion.a>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-xl font-semibold text-accent border border-accent/30 hover:border-accent/60 hover:bg-accent/5 transition-all duration-300 flex items-center gap-2"
              >
                View Projects
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex gap-4 mt-8"
            >
              <a href="https://www.linkedin.com/in/siddharth-singh-12360315a/" target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-all duration-300">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="mailto:vishensiddharth@gmail.com"
                className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-all duration-300">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <a href="tel:+919162218895"
                className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-all duration-300">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Right — Avatar / Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center"
          >
            <div className="relative">
              {/* Rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-20px] rounded-full border border-dashed border-accent/20"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-40px] rounded-full border border-dashed border-accent2/10"
              />

              {/* Avatar circle */}
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full glass-card animated-border flex items-center justify-center glow-cyan-strong">
                <div className="rounded-full bg-gradient-to-br from-accent/20 via-accent2/20 to-accent3/20 flex items-center justify-center">
                   <img
                      src="/photo.png"
                      alt="Siddharth Singh"
                      className="w-full h-full object-cover object-top"
                   />
                </div>
              </div>

              {/* Floating tech badges */}
              {[
                { label: 'React Native', pos: 'top-90 -left-16', color: 'accent' },
                { label: 'Next.js', pos: 'top-8 -right-16', color: 'accent2' },
                { label: 'Magento', pos: 'bottom-8 -left-14', color: 'accent3' },
                { label: 'Node.js', pos: 'bottom-0 -right-12', color: 'accent' },
              ].map((badge, i) => (
                <motion.div
                  key={badge.label}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3 + i, delay: i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                  className={`absolute ${badge.pos} glass-card px-3 py-1.5 rounded-lg border border-${badge.color}/20 whitespace-nowrap`}
                >
                  <span className={`text-xs font-mono text-${badge.color}`}>{badge.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-muted text-xs font-mono tracking-widest">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-4 h-7 rounded-full border border-muted/40 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-accent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
