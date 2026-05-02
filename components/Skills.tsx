'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

const orbits = [
  {
    radius: 80,
    speed: 20,
    skills: [
      { name: 'React', color: '#61DAFB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Node.js', color: '#68A063', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    ],
  },
  {
    radius: 150,
    speed: 35,
    skills: [
      { name: 'Next.js', color: '#ffffff', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
      { name: 'TypeScript', color: '#3178C6', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'MongoDB', color: '#4DB33D', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    ],
  },
  {
    radius: 230,
    speed: 50,
    skills: [
      { name: 'Redux', color: '#764ABC', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
      { name: 'JavaScript', color: '#F7DF1E', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'Git', color: '#F05032', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'CSS3', color: '#1572B6', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    ],
  },
  {
    radius: 310,
    speed: 70,
    skills: [
      { name: 'React Native', color: '#61DAFB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'HTML5', color: '#E34F26', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'GitHub', color: '#ffffff', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'PWA', color: '#5A0FC8', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg' },
      { name: 'Docker', color: '#2496ED', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    ],
  },
]

interface SkillNodeProps {
  name: string
  color: string
  icon: string
  angle: number
  radius: number
  orbitIndex: number
}

function SkillNode({ name, color, icon, angle, radius, orbitIndex }: SkillNodeProps) {
  const [hovered, setHovered] = useState(false)
  const nodeRef = useRef<HTMLDivElement>(null)

  const rad = (angle * Math.PI) / 180
  const x = Math.cos(rad) * radius
  const y = Math.sin(rad) * radius

  const size = orbitIndex === 0 ? 44 : orbitIndex === 1 ? 40 : orbitIndex === 2 ? 36 : 32

  return (
    <div
      ref={nodeRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        zIndex: hovered ? 10 : 1,
        cursor: 'pointer',
      }}
    >
      {/* Tooltip */}
      {hovered && (
        <div style={{
          position: 'absolute',
          bottom: '110%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(8,12,20,0.95)',
          border: `1px solid ${color}44`,
          borderRadius: 8,
          padding: '4px 10px',
          whiteSpace: 'nowrap',
          fontSize: 11,
          fontWeight: 600,
          color: color,
          fontFamily: 'monospace',
          boxShadow: `0 0 12px ${color}33`,
          pointerEvents: 'none',
          zIndex: 20,
        }}>
          {name}
        </div>
      )}

      {/* Icon bubble */}
      <div style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle at 35% 35%, ${color}22, rgba(8,12,20,0.9))`,
        border: `1.5px solid ${hovered ? color : color + '44'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        boxShadow: hovered
          ? `0 0 20px ${color}66, 0 0 40px ${color}22`
          : `0 0 8px ${color}22`,
        transform: hovered ? 'scale(1.3)' : 'scale(1)',
      }}>
        <img
          src={icon}
          alt={name}
          style={{
            width: size * 0.55,
            height: size * 0.55,
            objectFit: 'contain',
            filter: name === 'Next.js' || name === 'GitHub' ? 'invert(1)' : 'none',
          }}
        />
      </div>

      {/* Glow dot */}
      <div style={{
        position: 'absolute',
        inset: -3,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}33, transparent 70%)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const sectionRef = useRef<HTMLDivElement>(null)
  const orbitRefs = useRef<(HTMLDivElement | null)[]>([])
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [angles, setAngles] = useState(
    orbits.map((o) =>
      o.skills.map((_, i) => (360 / o.skills.length) * i)
    )
  )
  const pausedRef = useRef(false)
  const frameRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)

  // GSAP entrance
  useEffect(() => {
    if (!inView) return
    const init = async () => {
      const { gsap } = await import('gsap')

      // Title chars
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll('.char')
        gsap.fromTo(chars,
          { y: 50, opacity: 0, rotateX: -90 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.7, stagger: 0.05, ease: 'back.out(1.7)', delay: 0.1 }
        )
      }

      // Orbit rings fade in
      orbitRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, delay: 0.3 + i * 0.15, ease: 'back.out(1.4)' }
        )
      })

      // Center pulse
      gsap.to('.orbit-center', {
        boxShadow: '0 0 40px rgba(0,212,255,0.4), 0 0 80px rgba(0,212,255,0.15)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }
    init()
  }, [inView])

  // Animation loop
  useEffect(() => {
    const animate = (time: number) => {
      if (!pausedRef.current) {
        const delta = lastTimeRef.current ? (time - lastTimeRef.current) / 1000 : 0
        lastTimeRef.current = time
        setAngles(prev =>
          prev.map((orbitAngles, oi) =>
            orbitAngles.map(a => (a + (360 / orbits[oi].speed) * delta) % 360)
          )
        )
      } else {
        lastTimeRef.current = time
      }
      frameRef.current = requestAnimationFrame(animate)
    }
    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  const titleChars = 'Tech Arsenal'.split('').map((ch, i) => (
    <span key={i} className="char inline-block" style={{ opacity: 0 }}>
      {ch === ' ' ? '\u00A0' : ch}
    </span>
  ))

  const totalSkills = orbits.reduce((acc, o) => acc + o.skills.length, 0)

  return (
    <section id="skills" className="py-24 relative overflow-hidden" ref={sectionRef}>
      <div className="orb w-[500px] h-[500px] bg-accent/4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <div className="mb-6">
          <div className="section-number mb-3">02 / SKILLS</div>
          <h2
            ref={titleRef}
            className="font-display text-4xl md:text-5xl font-bold text-text mb-3"
            style={{ perspective: '400px' }}
          >
            {titleChars}
          </h2>
          <p className="text-muted max-w-xl text-sm">
            Hover any planet to identify the tech. {totalSkills} technologies orbiting my stack.
          </p>
        </div>

        {/* Orbit system */}
        <div
          className="relative flex items-center justify-center"
          style={{ height: 700 }}
          onMouseEnter={() => { pausedRef.current = true }}
          onMouseLeave={() => { pausedRef.current = false }}
        >
          {/* Orbit rings */}
          {orbits.map((orbit, oi) => (
            <div
              key={oi}
              ref={el => { orbitRefs.current[oi] = el }}
              style={{
                position: 'absolute',
                width: orbit.radius * 2,
                height: orbit.radius * 2,
                borderRadius: '50%',
                border: '1px dashed rgba(0,212,255,0.08)',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}

          {/* Center */}
          <div
            className="orbit-center absolute"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 90,
              height: 90,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, rgba(0,212,255,0.2), rgba(8,12,20,0.95))',
              border: '1.5px solid rgba(0,212,255,0.4)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 5,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: '#00D4FF', fontFamily: 'monospace', letterSpacing: 1 }}>SS</div>
            <div style={{ fontSize: 7, color: 'rgba(0,212,255,0.5)', fontFamily: 'monospace', marginTop: 2 }}>FULL STACK</div>
          </div>

          {/* Skill nodes */}
          {orbits.map((orbit, oi) =>
            orbit.skills.map((skill, si) => (
              <SkillNode
                key={`${oi}-${si}`}
                name={skill.name}
                color={skill.color}
                icon={skill.icon}
                angle={angles[oi][si]}
                radius={orbit.radius}
                orbitIndex={oi}
              />
            ))
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {orbits.map((orbit, oi) =>
            orbit.skills.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{
                  background: `${skill.color}0D`,
                  border: `1px solid ${skill.color}22`,
                  fontSize: 11,
                  color: skill.color,
                  fontFamily: 'monospace',
                }}
              >
                <img
                  src={skill.icon}
                  alt={skill.name}
                  style={{
                    width: 12,
                    height: 12,
                    filter: skill.name === 'Next.js' || skill.name === 'GitHub' ? 'invert(1)' : 'none',
                  }}
                />
                {skill.name}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}