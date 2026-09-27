'use client'
import { useEffect, useRef, useState } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  alpha: number
  size: number
}

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const particleId = useRef(0)
  const mousePos = useRef({ x: 0, y: 0 })
  const lastParticlePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      mousePos.current = { x: mouseX, y: mouseY }
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`

      // Spawn particle if mouse moved enough
      const dx = mouseX - lastParticlePos.current.x
      const dy = mouseY - lastParticlePos.current.y
      if (Math.sqrt(dx * dx + dy * dy) > 12) {
        lastParticlePos.current = { x: mouseX, y: mouseY }
        const id = particleId.current++
        setParticles(prev => [
          ...prev.slice(-18), // keep max 18 particles
          {
            id,
            x: mouseX,
            y: mouseY,
            alpha: 1,
            size: Math.random() * 4 + 3,
          },
        ])
      }
    }

    // Hover effects on interactive elements
    const onEnterInteractive = () => {
      if (ring) {
        ring.style.width = '56px'
        ring.style.height = '56px'
        ring.style.borderColor = 'rgba(0,212,255,0.8)'
        ring.style.background = 'rgba(0,212,255,0.05)'
      }
    }
    const onLeaveInteractive = () => {
      if (ring) {
        ring.style.width = '32px'
        ring.style.height = '32px'
        ring.style.borderColor = 'rgba(0,212,255,0.5)'
        ring.style.background = 'transparent'
      }
    }

    const bindInteractive = () => {
      const els = document.querySelectorAll('a, button, [role="button"], input, textarea, select')
      els.forEach(el => {
        el.addEventListener('mouseenter', onEnterInteractive)
        el.addEventListener('mouseleave', onLeaveInteractive)
      })
      return els
    }

    const interactiveEls = bindInteractive()

    const animate = () => {
      ringX += (mouseX - ringX - 16) * 0.12
      ringY += (mouseY - ringY - 16) * 0.12
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    animate()

    // Fade particles over time
    const fadeInterval = setInterval(() => {
      setParticles(prev =>
        prev
          .map(p => ({ ...p, alpha: p.alpha - 0.06 }))
          .filter(p => p.alpha > 0)
      )
    }, 40)

    return () => {
      window.removeEventListener('mousemove', onMove)
      clearInterval(fadeInterval)
      interactiveEls.forEach(el => {
        el.removeEventListener('mouseenter', onEnterInteractive)
        el.removeEventListener('mouseleave', onLeaveInteractive)
      })
    }
  }, [])

  return (
    <>
      {/* Particle trail */}
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'fixed',
            left: p.x - p.size / 2,
            top: p.y - p.size / 2,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: `rgba(0,212,255,${p.alpha * 0.7})`,
            boxShadow: `0 0 ${p.size * 2}px rgba(0,212,255,${p.alpha * 0.5})`,
            pointerEvents: 'none',
            zIndex: 99990,
            transform: `scale(${p.alpha})`,
            transition: 'transform 0.1s ease',
          }}
        />
      ))}

      {/* Cursor dot */}
      <div ref={dotRef} className="cursor-dot" />
      {/* Cursor ring */}
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background 0.2s ease' }}
      />
    </>
  )
}
