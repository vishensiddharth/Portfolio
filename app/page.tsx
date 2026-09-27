import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import GitHubHeatmap from '@/components/GitHubHeatmap'
import Education from '@/components/Education'
import Footer from '@/components/Footer'
import Cursor from '@/components/Cursor'
import CommandPalette from '@/components/CommandPalette'
import StorySpine from '@/components/StorySpine'

export default function Home() {
  return (
    <>
      <Cursor />
      <StorySpine />
      <CommandPalette />
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <GitHubHeatmap />
        <Education />
      </main>
      <Footer />
    </>
  )
}
