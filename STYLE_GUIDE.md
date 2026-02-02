# Portfolio Website - Style Guide

## 🎨 Design System Overview

### Color Palette
- **Background**: `#0a0a0a` (Deep black)
- **Primary**: `#6366f1` (Indigo 500)
- **Secondary**: `#a855f7` (Purple 500)
- **Accent**: `#ec4899` (Pink 500)
- **Text Primary**: `#e2e8f0` (Slate 200)
- **Text Muted**: `#94a3b8` (Gray 400)

### Gradients
- **Main Gradient**: `linear-gradient(to right, #6366f1, #a855f7, #ec4899)`
- **Background Glows**: Radial gradients with indigo/purple at 8% opacity

### Typography
- **Font Family**: 'Outfit' (Google Fonts)
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold), 800 (Extrabold)
- **Section Titles**: 3.5rem, 800 weight, -0.02em letter spacing
- **Hero Title**: 5xl-7xl (responsive)

### Spacing System
- **xs**: 0.5rem
- **sm**: 1rem
- **md**: 2rem
- **lg**: 5rem
- **xl**: 10rem

## 🎭 Component Styles

### Navbar
- **Default State**: Semi-transparent glass (`bg-white/5`) with backdrop blur
- **Scrolled State**: Darker glass (`bg-black/80`) with pill shape and shadow
- **Animation**: Slides down from top on page load
- **Hover Effects**: Underline animation on links, glow on CTA button

### Hero Section
- **Layout**: Two-column grid (text + visual)
- **Visual Element**: Rotating circles with code-block card
- **Animations**: Fade-in with stagger, slide from left
- **Background**: Large gradient orbs (indigo/purple)

### Skills Section
- **Layout**: 3-column grid of glass cards
- **Cards**: Glassmorphism with category headers
- **Skill Tags**: Pill-shaped badges with hover states
- **Animation**: Staggered fade-in on scroll

### Experience Section
- **Layout**: Vertical timeline (alternating sides on desktop)
- **Timeline**: Central line with gradient dots
- **Cards**: Glass cards with company info and bullet points
- **Animation**: Slide-in from sides on scroll

### Projects Section
- **Layout**: 3-column grid
- **Cards**: Glass cards with gradient header area
- **Hover**: Icon reveal, title color change, arrow animation
- **Tags**: Colored badges matching theme

### Contact Section
- **Layout**: Centered content with large typography
- **CTA**: Glowing button with shadow effect
- **Social Icons**: Circular buttons with hover lift
- **Footer**: Minimal border-top with copyright

## ✨ Effects & Interactions

### Glassmorphism
```css
background: linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01));
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: 24px;
```

### Hover States
- **Cards**: Lift up 5px, scale 1.01, enhanced border
- **Buttons**: Lift up 2px, glow shadow
- **Links**: Animated underline, color change

### Animations
- **Framer Motion**: Used for entrance animations, scroll triggers
- **CSS Transitions**: 0.3-0.5s cubic-bezier easing
- **Rotating Elements**: Infinite rotation on hero circles

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Adaptations
- Single column layouts
- Larger touch targets
- Full-screen mobile menu
- Reduced spacing (lg: 3rem, xl: 4rem)
- Smaller typography (section titles: 2rem)

## 🎯 Key Design Principles

1. **Premium Feel**: Dark theme with vibrant accents
2. **Glassmorphism**: Frosted glass effects throughout
3. **Smooth Animations**: Framer Motion for polished interactions
4. **Accessibility**: Proper contrast ratios, semantic HTML
5. **Performance**: Optimized animations, lazy loading
6. **Consistency**: Unified color palette and spacing system

## 🔧 Technical Stack

- **Framework**: React + Vite
- **Styling**: Tailwind CSS + Custom CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Font**: Google Fonts (Outfit)
