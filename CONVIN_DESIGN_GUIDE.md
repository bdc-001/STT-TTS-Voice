# Convin Voice AI Platform - Design Guide

**Version 1.0** | Last Updated: 2024

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Components](#components)
6. [Shadows & Elevation](#shadows--elevation)
7. [Border Radius](#border-radius)
8. [Animations & Interactions](#animations--interactions)
9. [Icons & Imagery](#icons--imagery)
10. [Responsive Design](#responsive-design)
11. [Dark Mode](#dark-mode)
12. [Accessibility](#accessibility)
13. [Implementation Guidelines](#implementation-guidelines)

---

## Design Philosophy

### Core Principles

**1. Developer-First Experience**
- Immediate value demonstration through interactive playgrounds
- Clear, scannable documentation with code examples
- Technical sophistication without complexity

**2. Professional Technical Aesthetic**
- Clean, modern interface inspired by Stripe, Vercel, and OpenAI
- Subtle voice/audio visual metaphors (waveforms, sound waves)
- Emphasis on functionality over decoration

**3. Interactive & Engaging**
- Live demos showcasing API capabilities
- Real-time feedback and visualizations
- Purposeful animations that enhance understanding

**4. Consistency & Clarity**
- Unified design language across all touchpoints
- Clear visual hierarchy
- Predictable interaction patterns

---

## Color System

### Primary Colors

| Color | Hex | HSL | Usage |
|-------|-----|-----|-------|
| **Primary Blue** | `#1A62F2` | `217 89% 53%` | Primary buttons, links, icons, brand elements |
| **White Background** | `#FFFFFF` | `0 0% 100%` | Main backgrounds, cards, containers |
| **Text Color** | `#333333` | `0 0% 20%` | Body text, primary content |
| **Subheading** | `#666666` | `0 0% 40%` | Secondary text, descriptions |

### Semantic Colors

| Color | Hex | HSL | Usage |
|-------|-----|-----|-------|
| **Success Green** | `#1AC468` | `145 75% 44%` | Success states, positive indicators, checkmarks |
| **Error Red** | `#F93739` | `359 93% 60%` | Error messages, warnings, destructive actions |
| **Accent Yellow** | `#F8AA0D` | `41 95% 51%` | Highlights, special elements, badges |
| **Accent Purple** | `#F030FE` | `294 99% 59%` | Secondary accents, TTS features |

### Interactive States

| State | Hex | HSL | Usage |
|-------|-----|-----|-------|
| **Hover State** | `#BAD0FB` | `220 89% 86%` | Hover backgrounds for cards, buttons, navigation items |
| **Hover Text** | `#333333` | `0 0% 20%` | Text color on hover backgrounds |

### Neutral Colors

| Color | Hex | HSL | Usage |
|-------|-----|-----|-------|
| **Border** | `#E5E5E5` | `0 0% 90%` | Borders, dividers |
| **Muted Background** | `#FFFFFF` | `0 0% 100%` | Subtle backgrounds, input fields |
| **Muted Text** | `#666666` | `0 0% 40%` | Placeholder text, captions |
| **Card Border** | `#EDEDED` | `0 0% 93%` | Card borders |

### Gradient System

**Blue to White Gradient**
- Start: `#1A62F2` (Primary Blue)
- Mid: `hsl(217, 89%, 70%)` (Light Blue)
- End: `#FFFFFF` (White)
- Direction: `135deg` (diagonal)
- Usage: Hero sections, animated backgrounds, special CTAs

**CSS Implementation:**
```css
.gradient-voice-ai {
  background: linear-gradient(135deg, 
    hsl(217, 89%, 53%) 0%, 
    hsl(217, 89%, 70%) 50%, 
    hsl(0, 0%, 100%) 100%);
  background-size: 200% 200%;
  animation: gradient-shift 8s ease infinite;
}
```

### Color Usage Guidelines

**Primary Blue (#1A62F2)**
- ✅ Primary action buttons
- ✅ Active navigation states
- ✅ Links and interactive text
- ✅ Icons and iconography
- ✅ Brand elements (logo, badges)
- ✅ Focus rings and outlines

**Hover State (#BAD0FB)**
- ✅ Card hover backgrounds
- ✅ Navigation item hover states
- ✅ Dropdown menu item hover
- ✅ Button hover (outline variant)
- ✅ Interactive element feedback

**Accent Colors**
- **Yellow (#F8AA0D)**: Special highlights, badges, important callouts
- **Purple (#F030FE)**: TTS features, secondary CTAs, special sections
- **Green (#1AC468)**: Success states, positive metrics, checkmarks
- **Red (#F93739)**: Errors, warnings, destructive actions

**Neutral Grays**
- Use for borders, dividers, subtle backgrounds
- Maintain sufficient contrast (minimum 4.5:1 for text)

---

## Typography

### Font Family

**Primary Font: Figtree**
- Source: Google Fonts
- Weights: 300, 400, 500, 600, 700, 800, 900
- Fallback: Inter, sans-serif
- Usage: All UI text, headings, body copy

**Monospace Font: JetBrains Mono**
- Usage: Code examples, API endpoints, technical documentation

**Serif Font: Georgia**
- Usage: Reserved for special cases (rarely used)

### Font Sizes

| Size | Value | Usage |
|------|-------|-------|
| **xs** | `0.75rem` (12px) | Captions, labels, small text |
| **sm** | `0.875rem` (14px) | Body text, descriptions, secondary content |
| **base** | `1rem` (16px) | Default body text |
| **lg** | `1.125rem` (18px) | Emphasized body text |
| **xl** | `1.25rem` (20px) | Subheadings |
| **2xl** | `1.5rem` (24px) | Section headings |
| **3xl** | `1.875rem` (30px) | Page headings |
| **4xl** | `2.25rem` (36px) | Hero subheadings |
| **5xl** | `3rem` (48px) | Hero headings (mobile) |
| **6xl** | `3.75rem` (60px) | Hero headings (desktop) |
| **7xl** | `4.5rem` (72px) | Large hero headings |

### Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| **Light** | 300 | Rarely used, decorative text |
| **Regular** | 400 | Body text, descriptions |
| **Medium** | 500 | Emphasized body text |
| **Semibold** | 600 | Subheadings, labels |
| **Bold** | 700 | Headings, important text |
| **Extra Bold** | 800 | Hero headings, strong emphasis |
| **Black** | 900 | Rarely used, maximum emphasis |

### Line Height

- **Tight**: `1.25` - Headings, short lines
- **Normal**: `1.5` - Body text, paragraphs
- **Relaxed**: `1.75` - Long-form content, descriptions

### Letter Spacing

- **Normal**: `0em` - Default for most text
- **Wide**: `0.05em` - Uppercase labels, badges
- **Tight**: `-0.02em` - Large headings

### Typography Scale Examples

**Hero Heading:**
```tsx
<h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
  Voice AI Platform
</h1>
```

**Section Heading:**
```tsx
<h2 className="text-3xl lg:text-5xl font-bold leading-tight">
  Everything you need
</h2>
```

**Body Text:**
```tsx
<p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
  Build intelligent voice experiences...
</p>
```

**Card Title:**
```tsx
<h3 className="text-xl sm:text-2xl font-bold text-foreground">
  Feature Name
</h3>
```

---

## Spacing & Layout

### Spacing Scale

Based on Tailwind's spacing system (4px base unit):

| Scale | Value | Usage |
|-------|-------|-------|
| **0** | `0px` | No spacing |
| **1** | `4px` | Tight spacing, icon padding |
| **2** | `8px` | Small gaps, button padding |
| **3** | `12px` | Component internal spacing |
| **4** | `16px` | Standard spacing, card padding |
| **6** | `24px` | Section spacing, card gaps |
| **8** | `32px` | Large component spacing |
| **12** | `48px` | Section gaps |
| **16** | `64px` | Major section spacing |
| **20** | `80px` | Hero section padding |
| **24** | `96px` | Extra large spacing |
| **32** | `128px` | Maximum spacing |

### Layout Patterns

**Container:**
```tsx
<div className="container mx-auto px-4">
  {/* Content */}
</div>
```

**Grid System:**
- 12-column responsive grid
- Gutter: `16px` (gap-4) or `24px` (gap-6)
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)

**Card Spacing:**
```tsx
<Card className="p-6 lg:p-10">
  <CardHeader className="pb-4">
    {/* Header content */}
  </CardHeader>
  <CardContent className="space-y-4">
    {/* Content with vertical spacing */}
  </CardContent>
</Card>
```

**Section Spacing:**
```tsx
<section className="py-20 lg:py-32">
  {/* Section content */}
</section>
```

### Responsive Spacing

Use responsive utilities for different screen sizes:
- `p-4 sm:p-6 lg:p-8` - Padding increases with screen size
- `gap-4 sm:gap-6 lg:gap-8` - Gaps increase with screen size
- `py-12 lg:py-20` - Vertical padding increases on larger screens

---

## Components

### Buttons

**Variants:**

1. **Primary (Default)**
   - Background: `#1A62F2` (Primary Blue)
   - Text: White
   - Border: Primary blue with slight darkening
   - Usage: Main CTAs, primary actions

```tsx
<Button className="bg-primary hover:bg-primary/90 text-white">
  Launch Platform
</Button>
```

2. **Outline**
   - Background: Transparent
   - Border: `border-primary/30`
   - Text: Foreground color
   - Hover: `bg-hover` with `border-primary/50`
   - Usage: Secondary actions, less prominent CTAs

```tsx
<Button variant="outline" className="border-2 border-primary/30 hover:bg-hover">
  Get Started Free
</Button>
```

3. **Ghost**
   - Background: Transparent
   - Border: Transparent
   - Text: Foreground color
   - Hover: Subtle background
   - Usage: Tertiary actions, icon buttons

**Sizes:**

| Size | Height | Padding | Usage |
|------|--------|---------|-------|
| **sm** | `32px` (min-h-8) | `px-3` | Compact spaces, inline actions |
| **default** | `36px` (min-h-9) | `px-4` | Standard buttons |
| **lg** | `40px` (min-h-10) | `px-8` | Hero CTAs, prominent actions |
| **icon** | `36px` | `h-9 w-9` | Icon-only buttons |

**Button States:**
- **Default**: Primary color background
- **Hover**: Slightly darker (`primary/90`), shadow enhancement
- **Active**: Pressed state with elevation
- **Disabled**: 50% opacity, no pointer events
- **Focus**: Ring outline in primary color

**Button with Icon:**
```tsx
<Button className="group">
  Launch Platform
  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
</Button>
```

### Cards

**Base Card:**
- Background: White (`bg-white` or `bg-card`)
- Border: `border-border` (subtle gray)
- Border Radius: `rounded-xl` (12px)
- Shadow: `shadow-sm` (subtle elevation)
- Padding: `p-6` (24px) or `p-6 lg:p-10` (responsive)

**Card with Hover:**
```tsx
<Card className="bg-white hover:bg-hover border hover:border-primary/40 transition-all duration-300">
  {/* Content */}
</Card>
```

**Card Structure:**
```tsx
<Card>
  <CardHeader className="pb-4">
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    {/* Content */}
  </CardContent>
</Card>
```

**Card Variants:**
- **Default**: White background, subtle border
- **Interactive**: Hover state with `bg-hover`, border highlight
- **Elevated**: Enhanced shadow (`shadow-xl` or `shadow-2xl`)
- **Gradient Background**: For special sections (rare)

### Badges

**Variants:**

1. **Primary Badge:**
```tsx
<Badge className="bg-primary text-white border-0 shadow-lg shadow-primary/20">
  <Sparkles className="h-3 w-3 mr-1" />
  AI-Powered
</Badge>
```

2. **Status Badge:**
```tsx
<Badge className="bg-chart-3/20 text-chart-3 border-chart-3/30">
  <div className="w-2 h-2 bg-chart-3 rounded-full mr-2 animate-pulse" />
  Live
</Badge>
```

3. **Outline Badge:**
```tsx
<Badge variant="outline" className="border-primary/20 text-primary">
  New Feature
</Badge>
```

### Navigation

**Header Navigation:**
- Sticky positioning (`sticky top-0`)
- Backdrop blur (`backdrop-blur-xl`)
- Semi-transparent background (`bg-background/80`)
- Height: `h-16` (64px) or `h-18` (72px) on large screens

**Sidebar Navigation:**
- Width: `w-64` (256px)
- Background: White (`bg-card`)
- Border: Right border (`border-r`)
- Item hover: `bg-hover` (#BAD0FB)
- Active state: `bg-hover` with `font-medium`

**Navigation Item:**
```tsx
<a className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-hover transition-colors">
  <Icon className="h-4 w-4" />
  <span>Item Name</span>
</a>
```

### Forms & Inputs

**Input Field:**
- Background: `bg-muted` (white)
- Border: `border-border` (subtle gray)
- Border Radius: `rounded-md` (6px)
- Padding: `px-3 py-2`
- Focus: Ring in primary color

**Textarea:**
- Same styling as input
- Minimum height: `min-h-[100px]`
- Resizable: `resize-none` (or allow vertical resize)

**Select/Dropdown:**
- Same base styling as input
- Dropdown menu: White background with shadow
- Menu items: Hover state with `bg-hover`

### Dropdown Menus

**Menu Container:**
- Background: White (`bg-popover`)
- Border: Subtle border
- Shadow: `shadow-md` or `shadow-lg`
- Border Radius: `rounded-md` (6px)
- Padding: `p-1` (4px)

**Menu Item:**
- Padding: `px-2 py-1.5`
- Hover: `bg-hover` (#BAD0FB)
- Focus: `bg-hover` with ring
- Text: Foreground color

---

## Shadows & Elevation

### Shadow Scale

| Shadow | Value | Usage |
|--------|-------|-------|
| **2xs** | `0px 1px 2px rgba(0,0,0,0.05)` | Subtle elevation |
| **xs** | `0px 1px 3px rgba(0,0,0,0.05)` | Light elevation |
| **sm** | `0px 2px 4px rgba(0,0,0,0.05)` | Default card shadow |
| **md** | `0px 4px 8px rgba(0,0,0,0.05)` | Elevated cards |
| **lg** | `0px 10px 15px rgba(0,0,0,0.05)` | Prominent cards |
| **xl** | `0px 20px 25px rgba(0,0,0,0.05)` | Hero cards, modals |
| **2xl** | `0px 25px 50px rgba(0,0,0,0.05)` | Maximum elevation |

### Colored Shadows

**Primary Shadow:**
```tsx
className="shadow-lg shadow-primary/30"
```

**Usage:**
- Primary buttons: `shadow-lg shadow-primary/30`
- Cards with primary accent: `shadow-xl shadow-primary/10`
- Hover states: Enhanced shadow on hover

### Elevation System

The design uses an automatic elevation system for interactive elements:

**Hover Elevate:**
```tsx
<div className="hover-elevate">
  {/* Adds subtle background on hover */}
</div>
```

**Active Elevate:**
```tsx
<button className="active-elevate-2">
  {/* Adds stronger background on active */}
</button>
```

---

## Border Radius

### Radius Scale

| Size | Value | Usage |
|------|-------|-------|
| **sm** | `3px` (0.1875rem) | Small elements, tags |
| **md** | `6px` (0.375rem) | Buttons, inputs, default |
| **lg** | `8px` (0.5rem) | Standard buttons, cards |
| **xl** | `12px` (1rem) | Cards, containers |
| **2xl** | `16px` (1rem) | Large cards, hero sections |
| **3xl** | `24px` (1.5rem) | Extra large cards, special sections |
| **full** | `9999px` | Pills, avatars, fully rounded |

### Usage Guidelines

**Buttons:**
- Default: `rounded-md` (6px)
- Large: `rounded-lg` (8px) or `rounded-xl` (12px)
- Pills: `rounded-full`

**Cards:**
- Standard: `rounded-xl` (12px)
- Hero cards: `rounded-3xl` (24px)
- Special sections: `rounded-2xl` (16px)

**Inputs:**
- Default: `rounded-md` (6px)
- Large inputs: `rounded-lg` (8px)

---

## Animations & Interactions

### Transition Durations

| Duration | Value | Usage |
|----------|-------|-------|
| **Fast** | `150ms` | Quick interactions, hover states |
| **Standard** | `300ms` | Most transitions, hover effects |
| **Slow** | `500ms` | Page transitions, complex animations |

### Common Animations

**1. Hover Scale:**
```tsx
className="transition-all duration-300 hover:scale-105"
```

**2. Hover Translate:**
```tsx
className="group-hover:translate-x-1 transition-transform"
```

**3. Fade In:**
```tsx
className="animate-in fade-in duration-300"
```

**4. Pulse:**
```tsx
className="animate-pulse"
// Custom duration: style={{ animationDuration: '4s' }}
```

**5. Gradient Shift:**
```css
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

### Interaction Patterns

**Button Hover:**
- Background darkens slightly (`primary/90`)
- Shadow enhances
- Optional scale (`scale-105`)
- Icon translates (if present)

**Card Hover:**
- Background changes to hover color (`bg-hover`)
- Border highlights (`border-primary/40`)
- Shadow increases
- Optional lift (`-translate-y-1` or `-translate-y-2`)

**Link Hover:**
- Color changes to primary
- Underline appears (`hover:underline`)
- Smooth transition

**Icon Hover:**
- Scale up (`scale-110`)
- Color change (if applicable)
- Smooth transition

### Animation Principles

1. **Purposeful**: Every animation serves a purpose
2. **Subtle**: Avoid excessive motion
3. **Fast**: Keep durations under 300ms for interactions
4. **Smooth**: Use ease-in-out or ease for natural feel
5. **Consistent**: Use same durations across similar elements

---

## Icons & Imagery

### Icon System

**Library:** Lucide React
- Consistent stroke width (2px)
- Consistent sizing system
- Monochrome with color variants

### Icon Sizes

| Size | Value | Usage |
|------|-------|-------|
| **xs** | `12px` (h-3 w-3) | Small badges, inline text |
| **sm** | `16px` (h-4 w-4) | Buttons, navigation, lists |
| **md** | `20px` (h-5 w-5) | Headers, cards |
| **lg** | `24px` (h-6 w-6) | Feature icons, large buttons |
| **xl** | `32px` (h-8 w-8) | Hero sections, prominent features |

### Icon Usage

**With Text:**
```tsx
<div className="flex items-center gap-2">
  <Icon className="h-4 w-4 text-primary" />
  <span>Label</span>
</div>
```

**Icon Button:**
```tsx
<Button size="icon" variant="ghost">
  <Icon className="h-4 w-4" />
</Button>
```

**Icon in Badge:**
```tsx
<Badge>
  <Icon className="h-3 w-3 mr-1" />
  Label
</Badge>
```

### Icon Colors

- **Default**: Inherit text color
- **Primary**: `text-primary` (#1A62F2)
- **Muted**: `text-muted-foreground` (#666666)
- **Success**: `text-chart-3` (#1AC468)
- **Error**: `text-destructive` (#F93739)
- **Accent**: `text-accent` (#F8AA0D) or `text-chart-2` (#F030FE)

### Background Icons

**Icon with Background:**
```tsx
<div className="p-2 bg-primary/10 rounded-lg">
  <Icon className="h-4 w-4 text-primary" />
</div>
```

**Background Opacities:**
- Light: `/10` (10% opacity)
- Medium: `/20` (20% opacity)
- Strong: `/30` (30% opacity)

### Imagery Guidelines

**Visual Style:**
- Abstract, technical aesthetic
- Waveform visualizations for voice/AI themes
- No photography - maintain technical focus
- Geometric shapes and patterns
- Gradient orbs for background decoration

**Waveform Background:**
- Animated canvas-based waveforms
- Blue color scheme matching primary
- Subtle, non-distracting
- Used in hero sections

---

## Responsive Design

### Breakpoints

| Breakpoint | Value | Usage |
|------------|-------|-------|
| **sm** | `640px` | Small tablets, large phones |
| **md** | `768px` | Tablets |
| **lg** | `1024px` | Small desktops |
| **xl** | `1280px` | Desktops |
| **2xl** | `1536px` | Large desktops |

### Responsive Patterns

**Mobile-First Approach:**
- Design for mobile first
- Enhance for larger screens
- Use `sm:`, `md:`, `lg:` prefixes

**Typography:**
```tsx
className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl"
```

**Spacing:**
```tsx
className="p-4 sm:p-6 lg:p-8"
className="gap-4 sm:gap-6 lg:gap-8"
```

**Layout:**
```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
```

**Visibility:**
```tsx
<div className="hidden md:flex">
  {/* Desktop only */}
</div>
<div className="md:hidden">
  {/* Mobile only */}
</div>
```

### Container Widths

**Full Width:**
```tsx
<div className="w-full">
```

**Container (Centered, Max Width):**
```tsx
<div className="container mx-auto px-4">
```

**Max Width Containers:**
```tsx
<div className="max-w-5xl mx-auto">
<div className="max-w-7xl mx-auto">
```

---

## Dark Mode

### Color Adaptations

**Background:**
- Light: `#FFFFFF` (White)
- Dark: `hsl(0, 0%, 7%)` (Very dark gray)

**Foreground:**
- Light: `#333333` (Dark gray)
- Dark: `hsl(0, 0%, 95%)` (Light gray)

**Cards:**
- Light: `#FFFFFF` (White)
- Dark: `hsl(0, 0%, 10%)` (Dark gray)

**Borders:**
- Light: `hsl(0, 0%, 90%)` (Light gray)
- Dark: `hsl(0, 0%, 20%)` (Medium gray)

### Dark Mode Guidelines

1. **Maintain Contrast**: Ensure text remains readable
2. **Preserve Brand Colors**: Primary blue remains the same
3. **Adjust Shadows**: Lighter shadows in dark mode
4. **Test Thoroughly**: Verify all components in both modes

### Implementation

**Toggle Component:**
```tsx
<ThemeToggle />
```

**Class-Based Dark Mode:**
- Uses `dark:` prefix in Tailwind
- Toggle adds/removes `dark` class on root element

**Example:**
```tsx
<div className="bg-white dark:bg-slate-950">
  <p className="text-foreground dark:text-foreground">
    Content
  </p>
</div>
```

---

## Accessibility

### Color Contrast

**Minimum Requirements:**
- **AA Standard**: 4.5:1 for normal text
- **AAA Standard**: 7:1 for normal text
- **Large Text**: 3:1 for AA, 4.5:1 for AAA

**Our Colors:**
- Text (#333) on White: 12.63:1 ✅ AAA
- Text (#333) on Hover (#BAD0FB): 5.8:1 ✅ AA+
- Primary (#1A62F2) on White: 4.56:1 ✅ AA
- White on Primary: 4.56:1 ✅ AA

### Focus States

**Focus Rings:**
- Color: Primary blue (#1A62F2)
- Width: 2px
- Offset: 2px
- Visible on all interactive elements

**Implementation:**
```tsx
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
```

### Keyboard Navigation

- All interactive elements must be keyboard accessible
- Tab order follows visual hierarchy
- Skip links for main content
- ARIA labels for icon-only buttons

### Screen Reader Support

- Semantic HTML elements
- ARIA labels where needed
- Alt text for images
- Descriptive link text

### Motion Preferences

Respect `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Implementation Guidelines

### CSS Variables

All colors are defined as CSS variables in `index.css`:

```css
:root {
  --primary: 217 89% 53%; /* #1A62F2 */
  --hover: 220 89% 86%; /* #BAD0FB */
  --foreground: 0 0% 20%; /* #333333 */
  /* ... */
}
```

**Usage in Tailwind:**
```tsx
className="bg-primary text-foreground"
```

### Component Structure

**Consistent Patterns:**
1. Import components from `@/components/ui/*`
2. Use semantic HTML elements
3. Apply consistent spacing classes
4. Include hover and focus states
5. Add data-testid for testing

**Example Component:**
```tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function FeatureCard() {
  return (
    <Card className="bg-white hover:bg-hover border hover:border-primary/40 transition-all duration-300">
      <CardHeader>
        <CardTitle>Feature Name</CardTitle>
      </CardHeader>
      <CardContent>
        <Button className="bg-primary hover:bg-primary/90">
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
}
```

### Code Organization

**File Structure:**
```
client/src/
  components/
    ui/          # Base UI components
    [Feature]/   # Feature-specific components
  pages/         # Page components
  lib/           # Utilities
```

### Best Practices

1. **Consistency**: Use design system tokens, not hardcoded values
2. **Responsive**: Always consider mobile-first
3. **Accessibility**: Include focus states and ARIA labels
4. **Performance**: Optimize animations and images
5. **Testing**: Test in both light and dark modes
6. **Documentation**: Comment complex interactions

### Common Patterns

**Hero Section:**
- Large heading with gradient text
- Descriptive subheading
- Primary and secondary CTAs
- Quick stats or features
- Interactive demo preview

**Feature Cards:**
- Icon with colored background
- Title and description
- Feature list with checkmarks
- Hover state with lift effect

**Pricing Cards:**
- Icon and plan name
- Price prominently displayed
- Feature list
- CTA button
- "Most Popular" badge if applicable

---

## Design Tokens Summary

### Quick Reference

**Colors:**
- Primary: `#1A62F2`
- Hover: `#BAD0FB`
- Text: `#333333`
- Subheading: `#666666`
- Success: `#1AC468`
- Error: `#F93739`
- Accent Yellow: `#F8AA0D`
- Accent Purple: `#F030FE`

**Typography:**
- Font: Figtree (300-900)
- Base Size: 16px
- Scale: 1.25 ratio

**Spacing:**
- Base Unit: 4px
- Common: 4, 6, 8, 12, 16, 24

**Border Radius:**
- Buttons: 6-12px
- Cards: 12-24px

**Shadows:**
- Cards: `shadow-sm` to `shadow-xl`
- Buttons: `shadow-lg shadow-primary/30`

---

## Conclusion

This design guide serves as the single source of truth for the Convin Voice AI Platform's visual identity. When in doubt, refer to this guide to ensure consistency across all touchpoints.

**Remember:**
- Consistency builds trust
- Accessibility is not optional
- Mobile-first always
- Test in both light and dark modes
- Keep it simple and purposeful

For questions or clarifications, refer to the implementation in the codebase or consult with the design team.

---

**Document Version:** 1.0  
**Last Updated:** 2024  
**Maintained By:** Convin Design Team

