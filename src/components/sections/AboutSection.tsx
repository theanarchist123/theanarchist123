import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Icosahedron, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { personalInfo, stats, interests } from '@/data/content'
import { useAppStore } from '@/store/useAppStore'

// 3D Avatar/Shape for About section
function AvatarShape() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Icosahedron
        ref={meshRef}
        args={[2, 4]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <MeshDistortMaterial
          color={hovered ? '#ec4899' : '#a855f7'}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive={hovered ? '#ec4899' : '#a855f7'}
          emissiveIntensity={0.3}
        />
      </Icosahedron>
    </Float>
  )
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const setCursorVariant = useAppStore((state) => state.setCursorVariant)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 section-gradient" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left side - 3D Visual */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Decorative rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 rounded-full border border-accent-purple/20 animate-spin-slow" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-96 h-96 rounded-full border border-accent-pink/10 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
              </div>
              
              {/* 3D Canvas */}
              <div className="absolute inset-0">
                <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} color="#a855f7" />
                  <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />
                  <AvatarShape />
                </Canvas>
              </div>

              {/* Floating skill badges */}
              {['React', 'TypeScript', 'Node.js', 'Python'].map((skill, i) => (
                <motion.div
                  key={skill}
                  className="absolute px-4 py-2 rounded-full glass text-sm font-mono font-medium"
                  style={{
                    top: `${20 + (i % 2) * 60}%`,
                    left: i < 2 ? '0%' : 'auto',
                    right: i >= 2 ? '0%' : 'auto',
                  }}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.3,
                  }}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div variants={containerVariants} className="space-y-8">
            {/* Section header */}
            <motion.div variants={itemVariants}>
              <span className="text-accent-purple font-mono text-sm tracking-widest uppercase mb-4 block">
                About Me
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Crafting Digital
                <span className="text-gradient block">Experiences</span>
              </h2>
            </motion.div>

            {/* Bio */}
            <motion.p variants={itemVariants} className="text-lg text-gray-400 leading-relaxed">
              {personalInfo.bio}
            </motion.p>

            {/* Additional info */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <svg className="w-5 h-5 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <svg className="w-5 h-5 text-accent-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{personalInfo.email}</span>
              </div>
            </motion.div>

            {/* Stats grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-4 rounded-2xl glass group hover:bg-white/10 transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  <span className="text-3xl mb-2 block group-hover:scale-125 transition-transform duration-300">
                    {stat.icon}
                  </span>
                  <span className="text-2xl font-bold text-gradient block">
                    {stat.value}
                  </span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Interests section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-24"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-display font-bold">
              Beyond the Code
            </h3>
            <p className="text-gray-400 mt-2">What drives me outside of work</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {interests.map((interest) => (
              <motion.div
                key={interest.name}
                variants={itemVariants}
                className="group relative p-6 rounded-2xl glass text-center hover:bg-white/10 transition-all duration-500"
                whileHover={{ y: -10 }}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <span className="text-4xl block mb-3 group-hover:scale-125 transition-transform duration-300">
                  {interest.icon}
                </span>
                <h4 className="font-semibold text-white mb-1">{interest.name}</h4>
                <p className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {interest.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Marquee of technologies */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-24 overflow-hidden"
        >
          <div className="marquee">
            <div className="marquee-content">
              {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'GraphQL', 'PostgreSQL', 'Redis', 'Kubernetes'].map((tech) => (
                <span
                  key={tech}
                  className="mx-8 text-2xl font-display font-bold text-gray-700 hover:text-gradient transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="marquee-content" aria-hidden="true">
              {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'GraphQL', 'PostgreSQL', 'Redis', 'Kubernetes'].map((tech) => (
                <span
                  key={tech}
                  className="mx-8 text-2xl font-display font-bold text-gray-700 hover:text-gradient transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
