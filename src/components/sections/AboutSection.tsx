import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Icosahedron, Float, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { personalInfo } from '@/data/content'
import { useAppStore } from '@/store/useAppStore'

// ULTRA OPTIMIZED
function FloatingIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.5}>
      <Icosahedron ref={meshRef} args={[1, 1]}>
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.2} wireframe wireframeLinewidth={1} metalness={0.6} roughness={0.4} />
      </Icosahedron>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <FloatingIcosahedron />
    </>
  )
}

export default function AboutSection() {
  const setCursorVariant = useAppStore((state) => state.setCursorVariant)
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } } }
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }

  return (
    <section id="about" className="relative py-32 px-4 overflow-hidden">
      <div className="absolute top-1/2 right-0 w-1/2 h-1/2 -translate-y-1/2 opacity-40">
        <Canvas dpr={[1, 1.5]} performance={{ min: 0.5 }} gl={{ powerPreference: "high-performance", antialias: false, stencil: false }} shadows={false}>
          <Scene />
        </Canvas>
      </div>
      <div className="max-w-7xl mx-auto">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6" onMouseEnter={() => setCursorVariant('text')} onMouseLeave={() => setCursorVariant('default')}>
                <span className="text-gradient">About Me</span>
              </h2>
            </motion.div>
            <motion.p variants={itemVariants} className="text-gray-400 text-lg leading-relaxed" onMouseEnter={() => setCursorVariant('text')} onMouseLeave={() => setCursorVariant('default')}>{personalInfo.bio}</motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <motion.a href="#contact" className="group relative px-6 py-3 rounded-xl font-medium overflow-hidden" onMouseEnter={() => setCursorVariant('hover')} onMouseLeave={() => setCursorVariant('default')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-purple to-accent-pink" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent-pink to-accent-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative">Get In Touch</span>
              </motion.a>
              <motion.a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-xl font-medium glass hover:bg-white/10 transition-all duration-300" onMouseEnter={() => setCursorVariant('hover')} onMouseLeave={() => setCursorVariant('default')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Download Resume</motion.a>
            </motion.div>
          </div>
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
            {[...Array(4)].map((_, index) => (
              <motion.div key={index} className="relative group" onMouseEnter={() => setCursorVariant('hover')} onMouseLeave={() => setCursorVariant('default')} whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/20 to-accent-pink/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative glass rounded-2xl p-6 h-full border border-white/5 group-hover:border-white/10 transition-all duration-300">
                  <div className="text-4xl mb-4">{['🚀', '⚡', '💻', '❤️'][index]}</div>
                  <div className="text-3xl font-bold text-gradient mb-2">{['50+', '8+', '100K+', '30+'][index]}</div>
                  <div className="text-sm text-gray-400">{['Projects', 'Years Exp', 'Lines Code', 'Happy Clients'][index]}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
