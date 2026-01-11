import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorVariant = useAppStore((state) => state.cursorVariant)
  const setMousePosition = useAppStore((state) => state.setMousePosition)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e
      setMousePosition({ x: clientX, y: clientY })
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${clientX - 20}px, ${clientY - 20}px)`
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${clientX - 4}px, ${clientY - 4}px)`
      }
    }

    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [setMousePosition])

  const variants = {
    default: {
      width: 40,
      height: 40,
      backgroundColor: 'transparent',
      border: '2px solid rgba(168, 85, 247, 0.5)',
      mixBlendMode: 'difference' as const,
    },
    hover: {
      width: 60,
      height: 60,
      backgroundColor: 'rgba(168, 85, 247, 0.2)',
      border: '2px solid rgba(168, 85, 247, 0.8)',
      mixBlendMode: 'difference' as const,
    },
    text: {
      width: 100,
      height: 100,
      backgroundColor: 'rgba(236, 72, 153, 0.1)',
      border: '2px solid rgba(236, 72, 153, 0.5)',
      mixBlendMode: 'difference' as const,
    },
    hidden: {
      width: 0,
      height: 0,
      opacity: 0,
    },
  }

  return (
    <>
      {/* Main cursor ring */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
        animate={cursorVariant}
        variants={variants}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
      
      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-accent-purple rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{ transition: 'transform 0.05s linear' }}
      />
    </>
  )
}
