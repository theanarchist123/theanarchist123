import { useRef, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { skillCategories } from '@/data/content'
import { useAppStore } from '@/store/useAppStore'

// Particle sphere background
function ParticleSphere() {
  const ref = useRef<THREE.Points>(null)
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(3000)
    for (let i = 0; i < 1000; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 3 + Math.random() * 2
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    return positions
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.2
    }
  })

  return (
    <Points ref={ref} positions={particlesPosition} stride={3}>
      <PointMaterial
        transparent
        color="#a855f7"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  )
}

// Animated skill bar
function SkillBar({ skill, index }: { skill: { name: string; level: number; icon: string }; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const setCursorVariant = useAppStore((state) => state.setCursorVariant)

  return (
    <motion.div
      ref={ref}
      className="group"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setCursorVariant('hover')}
      onMouseLeave={() => setCursorVariant('default')}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{skill.icon}</span>
          <span className="font-medium text-gray-200 group-hover:text-white transition-colors">
            {skill.name}
          </span>
        </div>
        <span className="text-sm font-mono text-accent-purple">
          {skill.level}%
        </span>
      </div>
      <div className="h-2 bg-dark-600 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent-purple via-accent-pink to-accent-cyan"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}

// Skill category card
function SkillCard({ category, index }: { category: typeof skillCategories[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const setCursorVariant = useAppStore((state) => state.setCursorVariant)

  return (
    <motion.div
      ref={ref}
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      {/* Gradient border */}
      <div 
        className="absolute -inset-[1px] rounded-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
        style={{ background: `linear-gradient(135deg, ${category.color}, transparent)` }}
      />
      
      <div className="relative p-8 rounded-3xl glass-dark hover:bg-dark-700/50 transition-all duration-500">
        {/* Category header */}
        <div className="flex items-center gap-4 mb-8">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${category.color}20` }}
          >
            {category.icon}
          </div>
          <div>
            <h3 
              className="text-xl font-display font-bold"
              style={{ color: category.color }}
              onMouseEnter={() => setCursorVariant('text')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              {category.category}
            </h3>
            <p className="text-sm text-gray-500">
              {category.skills.length} technologies
            </p>
          </div>
        </div>

        {/* Skills list */}
        <div className="space-y-4">
          {category.skills.map((skill, i) => (
            <SkillBar key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Floating tech icons
function FloatingTechIcons() {
  const icons = [
    { icon: '⚛️', x: '10%', y: '20%', delay: 0 },
    { icon: '📘', x: '85%', y: '15%', delay: 0.5 },
    { icon: '🟢', x: '5%', y: '60%', delay: 1 },
    { icon: '🐍', x: '90%', y: '70%', delay: 1.5 },
    { icon: '☁️', x: '15%', y: '85%', delay: 2 },
    { icon: '🐳', x: '80%', y: '85%', delay: 2.5 },
  ]

  return (
    <>
      {icons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl opacity-20"
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: item.delay,
          }}
        >
          {item.icon}
        </motion.div>
      ))}
    </>
  )
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const setCursorVariant = useAppStore((state) => state.setCursorVariant)

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <ParticleSphere />
        </Canvas>
      </div>

      {/* Floating icons */}
      <FloatingTechIcons />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent-cyan font-mono text-sm tracking-widest uppercase mb-4 block">
            Tech Stack
          </span>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
            onMouseEnter={() => setCursorVariant('text')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit spanning frontend magic, backend architecture, 
            mobile development, and cloud infrastructure.
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, i) => (
            <SkillCard key={category.category} category={category} index={i} />
          ))}
        </div>

        {/* Tools marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20"
        >
          <p className="text-center text-gray-500 text-sm uppercase tracking-widest mb-8">
            Tools & Technologies I Use Daily
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {['VS Code', 'Git', 'Figma', 'Docker', 'Linux', 'Postman', 'Jira', 'Notion', 'Slack', 'AWS Console'].map((tool, i) => (
              <motion.span
                key={tool}
                className="px-4 py-2 rounded-full glass text-sm font-medium hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.05 }}
                whileHover={{ scale: 1.1 }}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Certifications/Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-8 p-6 rounded-2xl glass">
            <div className="text-center px-6 border-r border-white/10">
              <span className="text-3xl font-bold text-gradient">AWS</span>
              <p className="text-xs text-gray-500 mt-1">Certified</p>
            </div>
            <div className="text-center px-6 border-r border-white/10">
              <span className="text-3xl font-bold text-gradient">K8s</span>
              <p className="text-xs text-gray-500 mt-1">CKA</p>
            </div>
            <div className="text-center px-6 border-r border-white/10">
              <span className="text-3xl font-bold text-gradient">GCP</span>
              <p className="text-xs text-gray-500 mt-1">Professional</p>
            </div>
            <div className="text-center px-6">
              <span className="text-3xl font-bold text-gradient">Meta</span>
              <p className="text-xs text-gray-500 mt-1">Certified</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
