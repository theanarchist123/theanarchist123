import { useEffect, Suspense, lazy } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

// Eagerly loaded components
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/ui/CustomCursor'
import ScrollProgress from '@/components/ui/ScrollProgress'
import LoadingScreen from '@/components/ui/LoadingScreen'

// Lazy loaded sections for performance
const HeroSection = lazy(() => import('@/components/sections/HeroSection'))
const AboutSection = lazy(() => import('@/components/sections/AboutSection'))
const SkillsSection = lazy(() => import('@/components/sections/SkillsSection'))
const ProjectsSection = lazy(() => import('@/components/sections/ProjectsSection'))
const ExperienceSection = lazy(() => import('@/components/sections/ExperienceSection'))
const ContactSection = lazy(() => import('@/components/sections/ContactSection'))

// Loading fallback for lazy components
function SectionLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-accent-purple/30 border-t-accent-purple rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  const { isLoading, setIsLoading } = useAppStore()
  
  // Initialize smooth scrolling
  useSmoothScroll()

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [setIsLoading])

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Easter egg: Konami code or other fun interactions
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault()
        // Could open a command palette
        console.log('🚀 Command palette would open here!')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="relative min-h-screen bg-dark-900 text-white overflow-x-hidden">
      {/* Loading screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Scroll progress indicator */}
      <ScrollProgress />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="relative">
        <Suspense fallback={<SectionLoader />}>
          <HeroSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <SkillsSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ProjectsSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ExperienceSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />

      {/* Noise overlay for texture */}
      <div 
        className="fixed inset-0 pointer-events-none z-[9997] opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Global gradient overlays */}
      <div className="fixed inset-0 pointer-events-none z-[9996]">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-dark-900 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent" />
      </div>
    </div>
  )
}
