import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Education from '@/components/Education'
import Footer from '@/components/Footer'
import Cursor from '@/components/Cursor'
import CommandPalette from '@/components/CommandPalette'

export default function Home() {
  return (
    <>
      <Cursor />
      <CommandPalette />
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Education />
      </main>
      <Footer />
    </>
  )
}
