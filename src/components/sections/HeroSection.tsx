import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  Float, 
  MeshDistortMaterial, 
  MeshWobbleMaterial,
  Sphere,
  Box,
  Torus,
  Icosahedron,
  Stars,
  Environment,
  PerspectiveCamera
} from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { personalInfo } from '@/data/content'
import { useAppStore } from '@/store/useAppStore'

// Floating geometric shapes
function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main glowing sphere */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1.5, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#a855f7"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            emissive="#a855f7"
            emissiveIntensity={0.5}
          />
        </Sphere>
      </Float>

      {/* Orbiting torus */}
      <Float speed={3} rotationIntensity={2} floatIntensity={1}>
        <Torus args={[2.5, 0.1, 16, 100]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color="#ec4899"
            emissive="#ec4899"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.1}
          />
        </Torus>
      </Float>

      {/* Second orbiting ring */}
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <Torus args={[3, 0.08, 16, 100]} position={[0, 0, 0]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.1}
          />
        </Torus>
      </Float>

      {/* Floating cubes */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2
        const radius = 4
        return (
          <Float key={i} speed={1 + i * 0.2} rotationIntensity={2} floatIntensity={2}>
            <Box
              args={[0.3, 0.3, 0.3]}
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle * 2) * 2,
                Math.sin(angle) * radius
              ]}
            >
              <MeshWobbleMaterial
                color={['#a855f7', '#ec4899', '#22d3ee', '#10b981', '#f59e0b', '#6366f1'][i]}
                factor={0.5}
                speed={2}
                metalness={0.8}
                roughness={0.2}
              />
            </Box>
          </Float>
        )
      })}

      {/* Icosahedron decorations */}
      {[...Array(4)].map((_, i) => {
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4
        const radius = 5.5
        return (
          <Float key={`ico-${i}`} speed={1.5} rotationIntensity={3} floatIntensity={2}>
            <Icosahedron
              args={[0.2]}
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle * 1.5) * 2.5,
                Math.sin(angle) * radius
              ]}
            >
              <meshStandardMaterial
                color="#fff"
                emissive={['#a855f7', '#ec4899', '#22d3ee', '#10b981'][i]}
                emissiveIntensity={0.8}
                metalness={0.9}
                roughness={0.1}
              />
            </Icosahedron>
          </Float>
        )
      })}
    </group>
  )
}

// Particle field
function ParticleField() {
  const count = 2000
  const particlesRef = useRef<THREE.Points>(null)

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const radius = Math.random() * 15 + 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)

      // Random colors from our palette
      const colorChoice = Math.random()
      if (colorChoice < 0.25) {
        colors[i3] = 0.66; colors[i3 + 1] = 0.33; colors[i3 + 2] = 0.97 // purple
      } else if (colorChoice < 0.5) {
        colors[i3] = 0.93; colors[i3 + 1] = 0.28; colors[i3 + 2] = 0.60 // pink
      } else if (colorChoice < 0.75) {
        colors[i3] = 0.13; colors[i3 + 1] = 0.83; colors[i3 + 2] = 0.93 // cyan
      } else {
        colors[i3] = 0.06; colors[i3 + 1] = 0.73; colors[i3 + 2] = 0.51 // green
      }
    }

    return [positions, colors]
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

// Mouse-following light
function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null)
  const { viewport } = useThree()
  const mousePosition = useAppStore((state) => state.mousePosition)

  useFrame(() => {
    if (lightRef.current) {
      const x = (mousePosition.x / window.innerWidth) * 2 - 1
      const y = -(mousePosition.y / window.innerHeight) * 2 + 1
      lightRef.current.position.x = x * viewport.width * 0.5
      lightRef.current.position.y = y * viewport.height * 0.5
    }
  })

  return (
    <pointLight
      ref={lightRef}
      color="#a855f7"
      intensity={2}
      distance={10}
      position={[0, 0, 5]}
    />
  )
}

// DNA Helix
function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null)
  const segments = 30
  const radius = 0.8
  const height = 8

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <group ref={groupRef} position={[6, 0, -3]}>
      {[...Array(segments)].map((_, i) => {
        const t = i / segments
        const y = (t - 0.5) * height
        const angle = t * Math.PI * 4
        
        return (
          <group key={i}>
            {/* First strand */}
            <Sphere
              args={[0.08]}
              position={[Math.cos(angle) * radius, y, Math.sin(angle) * radius]}
            >
              <meshStandardMaterial
                color="#a855f7"
                emissive="#a855f7"
                emissiveIntensity={0.5}
              />
            </Sphere>
            {/* Second strand */}
            <Sphere
              args={[0.08]}
              position={[Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius]}
            >
              <meshStandardMaterial
                color="#ec4899"
                emissive="#ec4899"
                emissiveIntensity={0.5}
              />
            </Sphere>
            {/* Connecting bars */}
            {i % 3 === 0 && (
              <Box
                args={[radius * 2, 0.03, 0.03]}
                position={[0, y, 0]}
                rotation={[0, angle, 0]}
              >
                <meshStandardMaterial
                  color="#22d3ee"
                  emissive="#22d3ee"
                  emissiveIntensity={0.3}
                  transparent
                  opacity={0.7}
                />
              </Box>
            )}
          </group>
        )
      })}
    </group>
  )
}

// 3D Scene
function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />
      
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} color="#fff" />
      <pointLight position={[-10, -10, -5]} intensity={0.3} color="#a855f7" />
      <pointLight position={[10, -10, 5]} intensity={0.3} color="#ec4899" />
      
      <MouseLight />
      
      {/* Stars background */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      
      {/* Main elements */}
      <FloatingShapes />
      <ParticleField />
      <DNAHelix />
      
      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          intensity={1}
        />
      </EffectComposer>
      
      <Environment preset="night" />
    </>
  )
}

// Typing animation component
function TypeWriter({ words }: { words: string[] }) {
  return (
    <motion.div className="h-[1.5em] overflow-hidden">
      <motion.div
        animate={{
          y: words.map((_, i) => -i * 1.5 + 'em'),
        }}
        transition={{
          y: {
            duration: words.length * 2,
            repeat: Infinity,
            ease: 'linear',
            times: words.map((_, i) => i / words.length),
          },
        }}
      >
        {words.map((word, i) => (
          <div key={i} className="h-[1.5em] leading-[1.5em]">
            {word}
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}

// Main Hero Section
export default function HeroSection() {
  const setCursorVariant = useAppStore((state) => state.setCursorVariant)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const roles = [
    'Full-Stack Developer',
    'Creative Technologist',
    'UI/UX Enthusiast',
    'Open Source Contributor',
    'Problem Solver',
  ]

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas dpr={[1, 2]}>
          <Scene />
        </Canvas>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 via-transparent to-dark-900 z-[1]" />
      <div className="absolute inset-0 hero-gradient z-[1]" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        {/* Availability badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            {personalInfo.availability}
          </span>
        </motion.div>

        {/* Name with glitch effect */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6"
          onMouseEnter={() => setCursorVariant('text')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          <span className="glitch text-white" data-text={personalInfo.name}>
            {personalInfo.name}
          </span>
        </motion.h1>

        {/* Animated role */}
        <motion.div
          variants={itemVariants}
          className="text-2xl md:text-3xl lg:text-4xl font-light mb-8"
        >
          <span className="text-gray-400">I'm a </span>
          <span className="text-gradient-animated font-semibold">
            <TypeWriter words={roles} />
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {personalInfo.tagline}. I craft exceptional digital experiences 
          that push the boundaries of what's possible on the web.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="#projects"
            className="group relative px-8 py-4 rounded-xl font-semibold text-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-accent-purple via-accent-pink to-accent-cyan" />
            <span className="absolute inset-[2px] bg-dark-900 rounded-[10px]" />
            <span className="absolute inset-0 bg-gradient-to-r from-accent-purple via-accent-pink to-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 flex items-center gap-2 text-white group-hover:text-white">
              View My Work
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </motion.a>

          <motion.a
            href="#contact"
            className="group px-8 py-4 rounded-xl font-semibold text-lg glass hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            Let's Talk
            <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-gray-500"
          >
            <span className="text-sm uppercase tracking-widest">Scroll</span>
            <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1.5 h-1.5 bg-accent-purple rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating tech badges */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {['React', 'TypeScript', 'Node.js', 'AWS', 'GraphQL'].map((tech, i) => (
          <motion.div
            key={tech}
            className="absolute px-3 py-1 rounded-full glass text-xs font-mono"
            style={{
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          >
            {tech}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
