# Siddharth Singh — Animated Resume Website

A stunning, animated portfolio/resume website built with **Next.js 14**, **Framer Motion**, and **Tailwind CSS**.

## ✨ Features

- 🎨 Dark luxury design with cyan/purple/amber accent palette
- 💫 Smooth Framer Motion animations on scroll + page load
- 🖱️ Custom animated cursor (desktop)
- 📱 Fully responsive — pixel perfect on mobile & desktop
- ⚡ Type animation in hero section
- 🌟 Floating particles, gradient orbs, noise texture
- 🧭 Sticky navbar with blur backdrop + mobile menu
- 📦 Static export ready (can host on Vercel, Netlify, GitHub Pages)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

### Static Export (for GitHub Pages, Netlify etc.)

```bash
npm run build
# Output is in the /out folder
```

## 📁 Project Structure

```
resume-site/
├── app/
│   ├── globals.css      # All global styles, animations, utilities
│   ├── layout.tsx       # Root layout + metadata
│   └── page.tsx         # Main page assembling all sections
├── components/
│   ├── Navbar.tsx       # Sticky nav with mobile menu
│   ├── Hero.tsx         # Hero with type animation + floating badges
│   ├── Skills.tsx       # Tech stack grid
│   ├── Experience.tsx   # Work history timeline
│   ├── Projects.tsx     # Key projects cards
│   ├── Education.tsx    # Education section
│   ├── Footer.tsx       # Contact + footer
│   └── Cursor.tsx       # Custom animated cursor
├── tailwind.config.js
├── next.config.js
├── tsconfig.json
└── package.json
```

## 🎨 Customisation

### Adding your photo
Replace the avatar initials in `components/Hero.tsx`:
```tsx
// Find the avatar section and replace with:
<Image src="/your-photo.jpg" alt="Siddharth Singh" fill className="rounded-full object-cover" />
```
Then add your photo as `public/photo.jpg`.

### Updating content
All content is in the component files — just update the data arrays at the top of each file.

## 🌐 Deploy on Vercel

1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Deploy — zero config needed!

---

Built with ❤️ for Siddharth Singh
phase 2 will update soon
added testing doscument
