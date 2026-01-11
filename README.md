# 🚀 Nikhil Kadam's Portfolio Website

A stunning, AI-powered portfolio website showcasing cutting-edge web technologies and innovative projects.

![Portfolio Preview](https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=1200&h=600&fit=crop)

## ✨ Features

- **3D Interactive Hero Section** - Three.js powered floating shapes, particles, and DNA helix animation
- **Smooth Animations** - Framer Motion animations throughout all sections
- **Glassmorphism UI** - Modern glass effects and gradient accents
- **Custom Cursor** - Interactive custom cursor with hover effects
- **Smooth Scrolling** - Lenis smooth scroll integration
- **Fully Responsive** - Works flawlessly on all devices
- **Performance Optimized** - Code splitting and lazy loading

## 🛠️ Tech Stack

### Core
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe code
- **Vite** - Lightning-fast build tool

### Styling & Animation
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **GSAP** - Advanced animations

### 3D Graphics
- **Three.js** - 3D rendering
- **React Three Fiber** - React renderer for Three.js
- **Drei** - Useful helpers for R3F
- **Postprocessing** - Bloom and visual effects

### State & Utils
- **Zustand** - Lightweight state management
- **Lenis** - Smooth scrolling
- **React Intersection Observer** - Scroll detection

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server
The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
portfolio/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── layout/     # Navigation, Footer
│   │   ├── sections/   # Hero, About, Skills, etc.
│   │   └── ui/         # CustomCursor, LoadingScreen, etc.
│   ├── data/           # Content data (content.ts)
│   ├── hooks/          # Custom React hooks
│   ├── store/          # Zustand state management
│   ├── styles/         # Global styles
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── .vscode/            # VS Code settings
├── vercel.json         # Vercel deployment config
└── package.json        # Dependencies
```

## 📝 Customization

### Update Personal Info
Edit `/src/data/content.ts`:
- Personal information
- Skills and technologies
- Projects
- Experience
- Testimonials

### Change Colors
Edit `/src/styles/globals.css`:
- Accent colors (purple, pink, cyan, emerald)
- Background gradients
- Glass effects

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy portfolio"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel auto-detects Vite configuration
   - Click "Deploy"

3. **Done!**
   - Your site will be live at `https://your-project.vercel.app`
   - Automatic deployments on every push

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Deploy to Other Platforms

#### Netlify
```bash
npm run build
# Upload 'dist' folder to Netlify
```

#### GitHub Pages
```bash
# Add to vite.config.ts: base: '/repo-name/'
npm run build
# Deploy 'dist' folder to gh-pages branch
```

## 🎨 Sections

1. **Hero** - 3D interactive landing with floating shapes
2. **About** - Personal introduction with 3D icosahedron
3. **Skills** - Tech stack showcase with categories
4. **Projects** - Portfolio projects gallery
5. **Experience** - Professional timeline
6. **Contact** - Get in touch section
7. **Footer** - Social links and site info

## 📊 Performance

- **Lighthouse Score**: 90+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: Optimized with code splitting

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration
- `tailwind.config.js` - Tailwind customization
- `tsconfig.json` - TypeScript config
- `vercel.json` - Vercel deployment settings
- `.eslintrc.cjs` - ESLint rules

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🐛 Known Issues

- None currently! 🎉

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 👤 Author

**Nikhil Kadam**
- GitHub: [@theanarchist123](https://github.com/theanarchist123)
- LinkedIn: [Nikhil Kadam](https://linkedin.com/in/nikhil-kadam-1a8914282)
- Twitter: [@_Nikhil_kadam_](https://twitter.com/_Nikhil_kadam_)

## 🙏 Acknowledgments

- Three.js community
- React Three Fiber team
- Framer Motion
- Tailwind CSS
- Vercel for hosting

---

**Made with ❤️ and ☕ by Nikhil Kadam**

⭐ Star this repo if you found it helpful!
