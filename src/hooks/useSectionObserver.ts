import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useAppStore } from '@/store/useAppStore'

export function useSectionObserver() {
  const setCurrentSection = useAppStore((state) => state.setCurrentSection)

  // Create observers for each section
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.5 })
  const { ref: aboutRef, inView: aboutInView } = useInView({ threshold: 0.3 })
  const { ref: skillsRef, inView: skillsInView } = useInView({ threshold: 0.3 })
  const { ref: projectsRef, inView: projectsInView } = useInView({ threshold: 0.2 })
  const { ref: experienceRef, inView: experienceInView } = useInView({ threshold: 0.2 })
  const { ref: contactRef, inView: contactInView } = useInView({ threshold: 0.3 })

  useEffect(() => {
    // Determine which section is most visible
    if (heroInView) setCurrentSection('hero')
    else if (aboutInView) setCurrentSection('about')
    else if (skillsInView) setCurrentSection('skills')
    else if (projectsInView) setCurrentSection('projects')
    else if (experienceInView) setCurrentSection('experience')
    else if (contactInView) setCurrentSection('contact')
  }, [heroInView, aboutInView, skillsInView, projectsInView, experienceInView, contactInView, setCurrentSection])

  return {
    heroRef,
    aboutRef,
    skillsRef,
    projectsRef,
    experienceRef,
    contactRef,
  }
}
