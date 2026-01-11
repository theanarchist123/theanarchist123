# 🚀 Vercel Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- This portfolio code pushed to a GitHub repository

## Quick Deploy (Recommended)

### Option 1: Deploy via Vercel Dashboard

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect it's a Vite project

3. **Configure (Auto-detected)**
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes
   - Your site will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - First deployment will ask configuration questions
   - Subsequent deployments: just run `vercel` again

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Custom Domain Setup

1. Go to your project dashboard on Vercel
2. Navigate to **Settings** → **Domains**
3. Add your custom domain
4. Update your domain's DNS settings:
   - Add CNAME record: `www` → `cname.vercel-dns.com`
   - Add A record: `@` → `76.76.21.21`
5. Wait for DNS propagation (can take up to 24 hours)

## Environment Variables

If you need to add environment variables:

1. Go to **Settings** → **Environment Variables**
2. Add variables for Production, Preview, and Development
3. Redeploy for changes to take effect

## Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every push to other branches or pull requests

## Build Settings

Current configuration in `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

## Performance Optimizations

This portfolio is already optimized with:
- ✅ Code splitting with Vite
- ✅ Lazy loading for Three.js components
- ✅ Optimized images via Unsplash CDN
- ✅ Framer Motion tree-shaking
- ✅ Tailwind CSS purging

## Troubleshooting

### Build fails with "Module not found"
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### 404 on routes
- Ensure `vercel.json` has the rewrite rule for SPA routing

### Build succeeds but site shows blank page
- Check browser console for errors
- Verify all environment variables are set
- Check that `dist` folder is being generated

## Post-Deployment Checklist

- [ ] Site loads correctly at Vercel URL
- [ ] All sections scroll smoothly
- [ ] 3D animations work
- [ ] Contact form functions (if implemented)
- [ ] Mobile responsive
- [ ] Performance score (run Lighthouse)
- [ ] Custom domain configured (optional)

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Support](https://vercel.com/support)

---

**Your portfolio is now live! 🎉**

Share your deployed URL:
- LinkedIn: Add to your profile
- GitHub: Update README with live link
- Resume: Include portfolio link
