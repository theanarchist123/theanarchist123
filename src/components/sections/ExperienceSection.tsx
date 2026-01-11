import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { experiences, testimonials } from '@/data/content'
import { useAppStore } from '@/store/useAppStore'

// Timeline item component
function TimelineItem({ experience, index }: { experience: typeof experiences[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const setCursorVariant = useAppStore((state) => state.setCursorVariant)
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Timeline line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-purple via-accent-pink to-accent-cyan hidden md:block" />
      
      {/* Timeline dot */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-accent-purple z-10 hidden md:block"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
      >
        <span className="absolute inset-0 rounded-full bg-accent-purple animate-ping opacity-75" />
      </motion.div>

      {/* Content */}
      <div className={`w-full md:w-[calc(50%-2rem)] ${isEven ? 'md:text-right' : 'md:text-left'}`}>
        <motion.div
          className="group p-6 rounded-2xl glass-dark hover:bg-dark-700/50 transition-all duration-500"
          whileHover={{ y: -5 }}
          onMouseEnter={() => setCursorVariant('hover')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          {/* Header */}
          <div className={`flex items-center gap-4 mb-4 ${isEven ? 'md:flex-row-reverse' : ''}`}>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-purple/20 to-accent-pink/20 flex items-center justify-center text-2xl">
              {experience.logo}
            </div>
            <div className={isEven ? 'md:text-right' : ''}>
              <h3 className="text-xl font-display font-bold text-white group-hover:text-gradient transition-all duration-300">
                {experience.role}
              </h3>
              <p className="text-accent-purple font-medium">{experience.company}</p>
            </div>
          </div>

          {/* Meta info */}
          <div className={`flex items-center gap-4 text-sm text-gray-500 mb-4 ${isEven ? 'md:justify-end' : ''}`}>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {experience.duration}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {experience.location}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-400 mb-4 leading-relaxed">
            {experience.description}
          </p>

          {/* Achievements */}
          <ul className={`space-y-2 mb-4 ${isEven ? 'md:text-right' : ''}`}>
            {experience.achievements.map((achievement, i) => (
              <motion.li
                key={i}
                className={`flex items-start gap-2 text-sm text-gray-500 ${isEven ? 'md:flex-row-reverse' : ''}`}
                initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 20 : -20 }}
                transition={{ duration: 0.4, delay: index * 0.2 + 0.4 + i * 0.1 }}
              >
                <svg className="w-4 h-4 text-accent-cyan flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{achievement}</span>
              </motion.li>
            ))}
          </ul>

          {/* Technologies */}
          <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : ''}`}>
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 rounded-md bg-dark-600 text-xs font-mono text-gray-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Empty space for alternating layout */}
      <div className="hidden md:block w-[calc(50%-2rem)]" />
    </motion.div>
  )
}

// Testimonial card
function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
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
      onMouseEnter={() => setCursorVariant('hover')}
      onMouseLeave={() => setCursorVariant('default')}
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent-purple/20 via-accent-pink/20 to-accent-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      
      <div className="relative p-6 rounded-2xl glass-dark hover:bg-dark-700/50 transition-all duration-500">
        {/* Quote icon */}
        <svg className="w-10 h-10 text-accent-purple/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        
        {/* Content */}
        <p className="text-gray-300 leading-relaxed mb-6 italic">
          "{testimonial.content}"
        </p>
        
        {/* Rating */}
        <div className="flex gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        
        {/* Author */}
        <div className="flex items-center gap-4">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-accent-purple/30"
          />
          <div>
            <h4 className="font-semibold text-white">{testimonial.name}</h4>
            <p className="text-sm text-gray-500">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const setCursorVariant = useAppStore((state) => state.setCursorVariant)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 section-gradient" />
      
      {/* Floating decorations */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 rounded-full bg-accent-purple/10 blur-3xl"
        style={{ y }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-40 h-40 rounded-full bg-accent-pink/10 blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-accent-emerald font-mono text-sm tracking-widest uppercase mb-4 block">
            Career Journey
          </span>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
            onMouseEnter={() => setCursorVariant('text')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A journey through my professional career, highlighting key roles 
            and achievements at leading tech companies.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative space-y-12 md:space-y-24">
          {experiences.map((experience, i) => (
            <TimelineItem key={experience.id} experience={experience} index={i} />
          ))}
        </div>

        {/* Testimonials section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-32"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-display font-bold mb-4">
              What People <span className="text-gradient">Say</span>
            </h3>
            <p className="text-gray-400">
              Testimonials from clients and colleagues
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Download resume CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-accent-purple to-accent-pink hover:opacity-90 transition-opacity group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Full Resume
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
