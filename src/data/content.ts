// Personal Information
export const personalInfo = {
  name: "Nikhil Kadam",
  title: "Full Stack Developer & AI Innovator",
  tagline: "Building The Future With Code & AI",
  email: "nikhilkadam@example.com",
  location: "India 🇮🇳",
  availability: "Open for opportunities",
  bio: `I'm a passionate Full Stack Developer who transforms ideas into 
        extraordinary digital experiences. Specializing in AI Integration, 
        Full Stack Web Development, Cross-Platform Mobile Apps, and Cloud 
        Architecture. I build products that blend cutting-edge tech with 
        exceptional user experience. Currently exploring AI/ML, Microservices 
        & Cloud Native Applications.`,
  resumeUrl: "/resume.pdf",
  social: {
    github: "https://github.com/theanarchist123",
    linkedin: "https://www.linkedin.com/in/nikhil-kadam-20584930a/",
    twitter: "https://x.com/NikhilK97045129",
    dribbble: "https://dribbble.com",
    instagram: "https://www.instagram.com/immortalleagacy",
  }
}

// Navigation Items
export const navItems = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]

// Skills Data
export const skillCategories = [
  {
    category: "Frontend",
    icon: "🎨",
    color: "#a855f7",
    skills: [
      { name: "React/Next.js", level: 95, icon: "⚛️" },
      { name: "TypeScript", level: 92, icon: "📘" },
      { name: "JavaScript", level: 98, icon: "💛" },
      { name: "Tailwind CSS", level: 95, icon: "🎨" },
      { name: "HTML/CSS", level: 98, icon: "🌐" },
    ]
  },
  {
    category: "Backend",
    icon: "⚙️",
    color: "#ec4899",
    skills: [
      { name: "Node.js", level: 95, icon: "🟢" },
      { name: "Express.js", level: 92, icon: "🚂" },
      { name: "Java", level: 85, icon: "☕" },
      { name: "MongoDB", level: 92, icon: "🍃" },
      { name: "PostgreSQL", level: 88, icon: "🐘" },
      { name: "MySQL", level: 85, icon: "🐬" },
    ]
  },
  {
    category: "Mobile",
    icon: "📱",
    color: "#22d3ee",
    skills: [
      { name: "React Native", level: 90, icon: "📱" },
      { name: "Flutter", level: 85, icon: "🦋" },
    ]
  },
  {
    category: "AI & Cloud",
    icon: "🤖",
    color: "#10b981",
    skills: [
      { name: "AI/ML Integration", level: 88, icon: "🧠" },
      { name: "LLM & Prompt Eng.", level: 85, icon: "💬" },
      { name: "AWS", level: 82, icon: "☁️" },
      { name: "Docker", level: 85, icon: "🐳" },
      { name: "Firebase", level: 88, icon: "🔥" },
      { name: "Vercel", level: 92, icon: "▲" },
    ]
  }
]

// Technologies for floating animation
export const technologies = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js",
  "Express", "MongoDB", "PostgreSQL", "MySQL", "Supabase",
  "React Native", "Flutter", "Tailwind", "Docker", "AWS",
  "Firebase", "Vercel", "Git", "Java", "AI/ML"
]

// Projects Data
export const projects = [
  {
    id: 1,
    title: "Hogwarts",
    subtitle: "AI Storybook Generator",
    description: "Transform text prompts into complete storybooks in just 3 minutes! Features Groq Llama 3.3 70B for multi-chapter narratives, Google Imagen AI for auto-illustrations, immersive flip-book reader, AI-powered inline text editing, and export as EPUB, DOCX, PDF.",
    image: "https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=800&h=600&fit=crop",
    video: null,
    technologies: ["Next.js", "TypeScript", "Groq AI", "Google Imagen", "Tailwind"],
    category: "AI/ML",
    color: "#a855f7",
    github: "https://github.com/theanarchist123",
    live: "https://example.com",
    featured: true,
    stats: {
      chapters: "Multi",
      formats: "3+",
      speed: "3 min"
    }
  },
  {
    id: 2,
    title: "LedgerMind",
    subtitle: "AI Expense Tracker",
    description: "Turn messy receipts into actionable insights! Features 95%+ accurate AI-powered OCR, smart ML-based categorization, natural language queries, emotional spending pattern analysis, and carbon footprint tracking.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
    video: null,
    technologies: ["React", "Node.js", "ML/AI", "OCR", "MongoDB"],
    category: "FinTech",
    color: "#ec4899",
    github: "https://github.com/theanarchist123",
    live: "https://example.com",
    featured: true,
    stats: {
      accuracy: "95%+",
      insights: "AI",
      tracking: "Smart"
    }
  },
  {
    id: 3,
    title: "Tourvisto",
    subtitle: "Travel & Tourism Platform",
    description: "Complete travel booking and exploration platform with destination discovery engine, unified booking system, community-driven reviews, and fully responsive design.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
    video: null,
    technologies: ["Next.js", "MongoDB", "Express", "Node.js", "React"],
    category: "Travel",
    color: "#22d3ee",
    github: "https://github.com/theanarchist123",
    live: "https://example.com",
    featured: true,
    stats: {
      destinations: "100+",
      bookings: "Easy",
      reviews: "Community"
    }
  },
  {
    id: 4,
    title: "Converso",
    subtitle: "Real-time Chat Application",
    description: "Cross-platform messaging with multimedia support. Features real-time Socket.io messaging, multimedia sharing, group chat functionality, and push notification system.",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=600&fit=crop",
    video: null,
    technologies: ["React Native", "MongoDB", "Socket.io", "Node.js", "Express"],
    category: "Mobile",
    color: "#10b981",
    github: "https://github.com/theanarchist123",
    live: "https://example.com",
    featured: true,
    stats: {
      realtime: "⚡",
      platforms: "Cross",
      features: "Rich"
    }
  },
  {
    id: 5,
    title: "Bayleaf Salon",
    subtitle: "Salon Management System",
    description: "Complete salon management solution with smart appointment scheduling, staff & resource management, customer portal with history, and business analytics dashboard.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop",
    video: null,
    technologies: ["Java", "MySQL", "JDBC", "Swing", "Analytics"],
    category: "Business",
    color: "#f59e0b",
    github: "https://github.com/theanarchist123",
    live: "https://example.com",
    featured: false,
    stats: {
      scheduling: "Smart",
      analytics: "Full",
      management: "Complete"
    }
  }
]

// Experience Data
export const experiences = [
  {
    id: 1,
    company: "Personal Projects",
    logo: "🚀",
    role: "Full Stack Developer",
    type: "Self-Directed",
    duration: "2023 - Present",
    location: "India",
    description: "Building innovative AI-powered applications and full-stack solutions. Currently developing Hogwarts (AI Storybook Generator) and LedgerMind (AI Expense Tracker) with cutting-edge tech stacks.",
    achievements: [
      "Built AI Storybook Generator with Groq Llama 3.3 70B",
      "Developed ML-powered expense tracker with 95%+ OCR accuracy",
      "Created cross-platform chat app with React Native",
      "Implemented scalable MERN stack architectures"
    ],
    technologies: ["Next.js", "React", "Node.js", "AI/ML", "TypeScript"]
  },
  {
    id: 2,
    company: "Open Source Contributions",
    logo: "💻",
    role: "Active Contributor",
    type: "Community",
    duration: "2022 - Present",
    location: "Remote",
    description: "Contributing to open source projects and building tools that help developers. Focused on creating reusable components and libraries.",
    achievements: [
      "Published reusable component libraries",
      "Collaborated with developers worldwide",
      "Contributed to community-driven projects",
      "Shared knowledge through documentation"
    ],
    technologies: ["React", "TypeScript", "Node.js", "Git", "GitHub"]
  },
  {
    id: 3,
    company: "Learning & Growth",
    logo: "📚",
    role: "Continuous Learner",
    type: "Self-Development",
    duration: "Ongoing",
    location: "India",
    description: "Constantly expanding skillset with focus on modern technologies, system design patterns, and cloud infrastructure.",
    achievements: [
      "Mastering LLM Integration & Prompt Engineering",
      "Learning System Design & Architecture Patterns",
      "Exploring AWS, Docker & Kubernetes",
      "Strengthening Data Structures & Algorithms"
    ],
    technologies: ["LLMs", "AWS", "Docker", "Kubernetes", "DSA"]
  },
  {
    id: 4,
    company: "Freelance Development",
    logo: "🎯",
    role: "Independent Developer",
    type: "Contract",
    duration: "2022 - Present",
    location: "Remote",
    description: "Providing full-stack development services for clients. Building web applications, mobile apps, and integrating AI solutions.",
    achievements: [
      "Delivered multiple client projects successfully",
      "Built responsive web applications with modern frameworks",
      "Implemented payment integrations and auth systems",
      "Maintained high code quality standards"
    ],
    technologies: ["React", "Next.js", "MongoDB", "Express", "Firebase"]
  }
]

// Testimonials
export const testimonials = [
  {
    id: 1,
    name: "Tech Community",
    role: "Open Source",
    avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop",
    content: "Nikhil's contributions to open source are exceptional. Clean code, great documentation, and always willing to help. A true asset to the developer community.",
    rating: 5
  },
  {
    id: 2,
    name: "Client Feedback",
    role: "Freelance Projects",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
    content: "Working with Nikhil was transformative. The code quality, communication, and problem-solving abilities are unmatched. Delivered beyond expectations!",
    rating: 5
  },
  {
    id: 3,
    name: "Peer Developer",
    role: "Collaboration",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop",
    content: "The most talented developer I've collaborated with. Nikhil doesn't just write code – he architects solutions that scale beautifully and stand the test of time.",
    rating: 5
  }
]

// Stats for About section
export const stats = [
  { value: "50+", label: "Projects Completed", icon: "🚀" },
  { value: "8+", label: "Years Experience", icon: "⚡" },
  { value: "100K+", label: "Lines of Code", icon: "💻" },
  { value: "30+", label: "Happy Clients", icon: "❤️" },
]

// Fun facts / Interests
export const interests = [
  { name: "Open Source", icon: "🌍", description: "Contributing to projects that matter" },
  { name: "AI/ML", icon: "🤖", description: "Exploring the future of intelligence" },
  { name: "Gaming", icon: "🎮", description: "Building immersive experiences" },
  { name: "Music", icon: "🎵", description: "Coding with perfect playlists" },
  { name: "Coffee", icon: "☕", description: "Fueled by premium beans" },
  { name: "Travel", icon: "✈️", description: "Working from anywhere" },
]
