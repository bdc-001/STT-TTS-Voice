# Visual Style Guide - Convin Voice AI Platform

## Design Philosophy
The platform follows a modern, technical aesthetic inspired by the provided reference visualization, featuring:
- **Gradient-based color system** (Blue → Purple → Pink)
- **Glassmorphism effects** with backdrop blur
- **Interactive animations** and hover states
- **Sophisticated waveform visualizations**
- **Professional developer-focused UI**

---

## Color System

### Primary Gradients
```css
/* Blue */
Light Mode: hsl(217, 89%, 51%)  /* #1A73E8 */
Dark Mode:  hsl(217, 80%, 70%)

/* Purple */
Light Mode: hsl(260, 60%, 55%)
Dark Mode:  hsl(260, 50%, 65%)

/* Pink */
Light Mode: hsl(340, 85%, 65%)
Dark Mode:  hsl(340, 80%, 70%)
```

### Gradient Combinations
- **Primary CTA**: Blue → Purple → Pink
- **Hero Text**: Blue → Purple → Pink (as text gradient)
- **Card Accents**: Individual colors (Blue, Purple, Pink, Cyan, Violet, Rose)
- **Icons**: Matching gradient colors per feature

---

## Typography

### Font System
- **Sans-serif**: Figtree (primary), Inter (fallback)
- **Monospace**: JetBrains Mono (code)

### Scale
- **Hero Heading**: 4xl - 7xl (responsive)
- **Section Heading**: 3xl - 5xl
- **Subheading**: xl - 2xl
- **Body**: base - lg
- **Small**: sm - xs

### Weights
- **Bold**: 700 (headings)
- **Semibold**: 600 (subheadings)
- **Medium**: 500 (labels)
- **Regular**: 400 (body)

---

## Component Patterns

### Buttons

#### Primary Button (Gradient)
```tsx
<Button className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
  hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 
  text-white rounded-xl shadow-lg shadow-purple-500/30">
  Launch Platform
</Button>
```

#### Secondary Button (Outline)
```tsx
<Button className="border-2 border-white/30 text-white 
  hover:bg-white/10 hover:border-white/50 backdrop-blur-sm">
  Get Started Free
</Button>
```

### Cards

#### Standard Card
```tsx
<Card className="group hover:shadow-xl hover:-translate-y-1 
  transition-all duration-300 
  bg-gradient-to-br from-blue-500/10 to-blue-600/5 
  backdrop-blur-sm border-blue-500/20">
```

#### Hero Demo Card
```tsx
<Card className="backdrop-blur-xl bg-white/10 dark:bg-slate-900/40 
  rounded-3xl shadow-2xl border border-white/20 
  hover:border-white/30 transition-all duration-300">
```

### Badges

#### Primary Badge
```tsx
<Badge className="bg-gradient-to-r from-blue-500 to-purple-500 
  text-white border-0 shadow-lg shadow-blue-500/20">
  AI-Powered
</Badge>
```

#### Secondary Badge
```tsx
<Badge className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 
  text-primary border-primary/20">
  Platform Features
</Badge>
```

---

## Animations

### Keyframes
```css
/* Gradient Animation */
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Wave Flow */
@keyframes wave-flow {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Pulse Glow */
@keyframes pulse-glow {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

/* Float */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
```

### Transitions
- **Default**: 200ms ease-out
- **Hover effects**: 300ms ease-in-out
- **Page transitions**: 150ms ease-out

---

## Layout Patterns

### Hero Section
- **Background**: Dark gradient (slate-900 → slate-800)
- **Overlay**: Animated waveform canvas
- **Gradient Orbs**: Pulsing blue/purple/pink circles
- **Text Color**: White on dark
- **CTA Buttons**: Gradient with shadow

### Feature Section
- **Background**: Subtle gradient (background → muted/20)
- **Cards**: Individual gradient colors
- **Spacing**: Generous (8-12 units)
- **Grid**: 1-3 columns (responsive)

### Pricing Section
- **Background**: Gradient with decorative orbs
- **Popular Card**: Scale 105% with purple border
- **Hover**: Lift effect (-translate-y-2)
- **Shadow**: Enhanced on hover

---

## Interactive States

### Hover Effects
- **Scale**: 1.05 - 1.1
- **Shadow**: Enhanced (shadow-xl, shadow-2xl)
- **Translation**: -translate-y-1 to -translate-y-2
- **Opacity**: Background changes (hover:bg-color/10)

### Active States
- **Tabs**: Gradient background
- **Buttons**: Slightly darker gradient
- **Links**: Color change to gradient color

### Focus States
- **Outline**: Ring with gradient color
- **Border**: Enhanced border color
- **Background**: Subtle background change

---

## Spacing System

### Base Units (Tailwind)
- **Micro**: 1-2 (4-8px) - Button padding, icon gaps
- **Component**: 4-8 (16-32px) - Card padding, section spacing
- **Layout**: 12-24 (48-96px) - Section margins, page padding

### Responsive Spacing
- **Mobile**: Reduced by 25-50%
- **Tablet**: Standard
- **Desktop**: Enhanced by 25%

---

## Iconography

### Icon Containers
```tsx
<div className="p-2 bg-blue-500/20 rounded-lg 
  group-hover:scale-110 transition-transform">
  <Icon className="h-5 w-5 text-blue-500" />
</div>
```

### Icon Sizes
- **Hero**: 6-8 (24-32px)
- **Feature**: 5-6 (20-24px)
- **Button**: 4-5 (16-20px)
- **Small**: 3-4 (12-16px)

---

## Waveform Visualization

### Canvas Implementation
- **Layered sine waves**: 3-4 layers per color
- **Audio bars**: 50 bars with gradient coloring
- **Geometric elements**: Floating hexagons
- **Particles**: Small dots with opacity
- **Animation**: Smooth 60fps

### Colors
- **Blue waves**: 40px amplitude
- **Purple waves**: 50px amplitude
- **Pink waves**: 45px amplitude
- **Bars**: Gradient from blue → purple → pink

---

## Accessibility

### Contrast Ratios
- **Text on background**: 4.5:1 minimum
- **Large text**: 3:1 minimum
- **Gradient text**: Ensure readability
- **Interactive elements**: Clear focus states

### Focus Management
- **Keyboard navigation**: Full support
- **Focus rings**: Visible with gradient color
- **Skip links**: For screen readers
- **ARIA labels**: On interactive elements

---

## Dark Mode

### Background Colors
- **Primary**: slate-950 → slate-900
- **Secondary**: slate-900 → slate-800
- **Cards**: slate-900/40 with backdrop blur

### Text Colors
- **Primary**: white
- **Secondary**: slate-300
- **Muted**: slate-400

### Gradients
- **Same hues**: Slightly lighter in dark mode
- **Opacity**: Adjusted for visibility

---

## Responsive Breakpoints

```css
/* Mobile */
< 640px: Single column, reduced spacing, smaller text

/* Tablet */
640px - 1024px: 2 columns, standard spacing

/* Desktop */
> 1024px: 3 columns, enhanced spacing, larger hero

/* Large Desktop */
> 1536px: Max-width containers, generous margins
```

---

## Best Practices

### DO
✅ Use gradient backgrounds for emphasis
✅ Apply hover effects for interactivity
✅ Maintain consistent spacing
✅ Use backdrop blur for glassmorphism
✅ Implement smooth transitions
✅ Add loading states for dynamic content

### DON'T
❌ Overuse animations (keep subtle)
❌ Mix gradient styles inconsistently
❌ Ignore mobile responsiveness
❌ Use pure black backgrounds
❌ Forget accessibility considerations
❌ Skip hover/focus states

---

## Code Examples

### Gradient Text
```tsx
<span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
  bg-clip-text text-transparent">
  Gradient Text
</span>
```

### Glassmorphism Card
```tsx
<div className="backdrop-blur-xl bg-white/10 dark:bg-slate-900/40 
  rounded-3xl border border-white/20">
  Content
</div>
```

### Animated Background
```tsx
<div className="absolute inset-0">
  <WaveformBackground />
  <div className="absolute inset-0 bg-gradient-to-t 
    from-background/50 via-transparent to-background/30" />
</div>
```

---

## Performance Considerations

### Animations
- Use `transform` and `opacity` for smooth 60fps
- Avoid animating `width`, `height`, or `margin`
- Use `will-change` sparingly
- Implement `requestAnimationFrame` for canvas

### Images
- Lazy load below-fold images
- Use WebP format when possible
- Provide responsive image sizes
- Implement blur-up loading

### CSS
- Minimize custom animations
- Use Tailwind utilities
- Avoid deep nesting
- Leverage CSS variables for themes

---

## Browser Support

### Modern Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Features
- CSS Gradients ✅
- Backdrop Filter ✅
- CSS Grid ✅
- Canvas API ✅
- CSS Animations ✅

---

## Maintenance

### Updating Colors
1. Modify CSS variables in `index.css`
2. Update Tailwind config if needed
3. Test in both light and dark modes
4. Verify contrast ratios

### Adding Components
1. Follow established patterns
2. Use gradient system consistently
3. Implement hover states
4. Add responsive breakpoints
5. Test accessibility

### Performance Monitoring
- Measure animation frame rates
- Check bundle size impact
- Monitor Core Web Vitals
- Test on various devices

