import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sphere, Box, Torus, Stars, PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { personalInfo } from '@/data/content'
import { useAppStore } from '@/store/useAppStore'

// ULTRA OPTIMIZED
function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <Sphere args={[1.5, 16, 16]}>
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.2} roughness={0.6} metalness={0.4} />
        </Sphere>
      </Float>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Torus args={[2.5, 0.1, 6, 32]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.2} metalness={0.6} roughness={0.4} />
        </Torus>
      </Float>
      {[0, 3].map((i) => {
        const angle = (i / 6) * Math.PI * 2
        return (
          <Float key={i} speed={0.8} rotationIntensity={0.8} floatIntensity={0.8}>
            <Box args={[0.3, 0.3, 0.3]} position={[Math.cos(angle) * 4, Math.sin(angle * 2) * 2, Math.sin(angle) * 4]}>
              <meshStandardMaterial color={i === 0 ? '#22d3ee' : '#10b981'} metalness={0.5} roughness={0.5} />
            </Box>
          </Float>
        )
      })}
    </group>
  )
}

function ParticleField() {
  const count = 150
  const particlesRef = useRef<THREE.Points>(null)
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const r = Math.random() * 15 + 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i3 + 2] = r * Math.cos(phi)
      const c = Math.random() < 0.5
      col[i3] = c ? 0.66 : 0.93
      col[i3 + 1] = c ? 0.33 : 0.28
      col[i3 + 2] = c ? 0.97 : 0.60
    }
    return [pos, col]
  }, [])
  useFrame((state) => {
    if (particlesRef.current) particlesRef.current.rotation.y = state.clock.elapsedTime * 0.01
  })
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.15
  })
  return (
    <group ref={groupRef} position={[5, 0, -3]} scale={0.7}>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const t = i / 6
        const y = (t - 0.5) * 4
        const angle = t * Math.PI * 4
        return (
          <group key={i}>
            <Sphere args={[0.08, 6, 6]} position={[Math.cos(angle) * 0.8, y, Math.sin(angle) * 0.8]}>
              <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.2} />
            </Sphere>
            <Sphere args={[0.08, 6, 6]} position={[Math.cos(angle + Math.PI) * 0.8, y, Math.sin(angle + Math.PI) * 0.8]}>
              <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.2} />
            </Sphere>
          </group>
        )
      })}
    </group>
  )
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.3} />
      <Stars radius={60} depth={30} count={400} factor={2} saturation={0} fade speed={0.3} />
      <FloatingShapes />
      <ParticleField />
      <DNAHelix />
      <EffectComposer><Bloom luminanceThreshold={0.4} luminanceSmoothing={0.7} intensity={0.5} /></EffectComposer>
    </>
  )
}

function TypeWriter({ words }: { words: string[] }) {
  return (
    <motion.div className="h-[1.5em] overflow-hidden">
      <motion.div animate={{ y: words.map((_, i) => -i * 1.5 + 'em') }} transition={{ y: { duration: words.length * 2, repeat: Infinity, ease: 'linear', times: words.map((_, i) => i / words.length) } }}>
        {words.map((word, i) => (<div key={i} className="h-[1.5em] leading-[1.5em]">{word}</div>))}
      </motion.div>
    </motion.div>
  )
}

export default function HeroSection() {
  const setCursorVariant = useAppStore((state) => state.setCursorVariant)
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }
  const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } } }
  const roles = ['Full-Stack Developer', 'AI/ML Enthusiast', 'Problem Solver', 'Tech Innovator']

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="absolute inset-0 bg-dark-900" />}>
          <Canvas dpr={[1, 1.5]} performance={{ min: 0.5 }} gl={{ powerPreference: "high-performance", antialias: false, stencil: false, alpha: false }} shadows={false}>
            <Scene />
          </Canvas>
        </Suspense>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 via-transparent to-dark-900 z-[1]" />
      <div className="absolute inset-0 hero-gradient z-[1]" />
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            {personalInfo.availability}
          </span>
        </motion.div>
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6" onMouseEnter={() => setCursorVariant('text')} onMouseLeave={() => setCursorVariant('default')}>
          <span className="glitch text-white" data-text={personalInfo.name}>{personalInfo.name}</span>
        </motion.h1>
        <motion.div variants={itemVariants} className="text-2xl md:text-4xl lg:text-5xl font-display font-bold mb-8 text-gradient">
          <TypeWriter words={roles} />
        </motion.div>
        <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">{personalInfo.tagline}</motion.p>
        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center">
          <motion.a href="#projects" className="group relative px-8 py-4 rounded-xl font-medium overflow-hidden" onMouseEnter={() => setCursorVariant('hover')} onMouseLeave={() => setCursorVariant('default')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <div className="absolute inset-0 bg-gradient-to-r from-accent-purple to-accent-pink" />
            <div className="absolute inset-0 bg-gradient-to-r from-accent-pink to-accent-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative flex items-center gap-2">View My Work<svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></span>
          </motion.a>
          <motion.a href="#contact" className="px-8 py-4 rounded-xl font-medium glass hover:bg-white/10 transition-all duration-300" onMouseEnter={() => setCursorVariant('hover')} onMouseLeave={() => setCursorVariant('default')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Get In Touch</motion.a>
        </motion.div>
        <motion.div variants={itemVariants} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-2 text-gray-500">
            <span className="text-sm font-medium">Scroll to explore</span><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
