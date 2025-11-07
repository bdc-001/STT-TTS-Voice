# Design Guidelines: Convin Voice AI Platform

## Design Approach
**Selected Approach:** Reference-Based Design inspired by modern developer platforms like Stripe, Vercel, and OpenAI's interface, with emphasis on technical sophistication and interactive demonstrations.

**Key Design Principles:**
- Developer-first experience with immediate value demonstration
- Interactive playground approach showcasing API capabilities
- Professional technical aesthetic with subtle voice/audio visual metaphors
- Clear hierarchy emphasizing API management and usage analytics

## Core Design Elements

### A. Color Palette
**Primary Brand Colors:**
- Primary: 240 100% 65% (Modern blue for trust and technology)
- Secondary: 260 60% 55% (Purple accent for AI/innovation)
- Dark mode primary: 240 80% 70%
- Dark mode secondary: 260 50% 65%

**Supporting Colors:**
- Success: 142 80% 50% (API status indicators)
- Warning: 45 95% 60% (Rate limits, billing alerts)
- Error: 0 85% 60% (Failed requests, validation errors)
- Neutral grays: 220 15% 25% to 220 15% 95%

**Gradients:** Subtle blue-to-purple gradients for hero sections and key CTAs. Background treatments use very subtle gradients (240 20% 98% to 260 10% 99%) for light mode.

### B. Typography
**Font System:** Inter via Google Fonts CDN
- Headlines: 600-700 weight, generous line spacing
- Body: 400-500 weight, optimized for code readability
- Code/API: JetBrains Mono for all code examples and API endpoints
- Sizes: Consistent scale using 1.25 ratio (14px, 18px, 22px, 28px, 36px, 44px)

### C. Layout System
**Spacing System:** Tailwind units of 1, 2, 4, 6, 8, 12, 16, 24
- Micro spacing: 1, 2 (buttons, form elements)
- Component spacing: 4, 6, 8 (cards, sections)
- Layout spacing: 12, 16, 24 (major sections, page margins)

**Grid:** 12-column responsive grid with consistent 6-unit gutters

### D. Component Library

**Navigation:**
- Sticky header with logo, main navigation, and user account dropdown
- Sidebar navigation for dashboard with collapsible sections
- Breadcrumb navigation for deep API documentation

**Interactive Demos:**
- Audio waveform visualizations for STT/TTS demos
- Real-time transcription display with highlighting
- Voice selector with audio preview capabilities
- Drag-and-drop audio upload zones

**Data Displays:**
- Usage analytics charts with smooth animations
- API endpoint status indicators with real-time updates
- Code syntax highlighting for multiple languages
- Interactive API testing playground

**Forms & Controls:**
- API key generation with secure copy functionality
- Billing management with subscription tier comparison
- Audio recording controls with visual feedback
- File upload with progress indicators

**Cards & Layouts:**
- Feature showcase cards with hover effects
- Pricing tier cards with highlight states
- API documentation cards with expandable sections
- Dashboard metric cards with trend indicators

### E. Animations
**Minimal, Purposeful Motion:**
- Subtle fade-ins for content loading (200ms ease-out)
- Smooth hover states for interactive elements (150ms)
- Audio waveform animations during playback
- Progress indicators for API calls and file uploads
- NO complex page transitions or decorative animations

## Page-Specific Guidelines

**Landing/Marketing Pages:**
- Hero section with interactive voice demo
- Maximum 4 sections: Hero, Features, Pricing, Developer Resources
- Bold gradients and higher contrast for conversion focus
- Generous whitespace with strategic color placement

**Developer Console:**
- Dashboard-style layout with sidebar navigation
- Emphasis on data visualization and real-time metrics
- Consistent spacing using 8-unit grid system
- Dark mode optimized for extended developer use

**API Documentation:**
- Clean, scannable layout with syntax highlighting
- Interactive code examples with multiple language tabs
- Sticky navigation for long documentation pages
- Search functionality with instant results

## Images
- **Hero Image:** Large, modern illustration of sound waves or voice visualization (abstract, technical aesthetic)
- **Feature Icons:** Simple line icons representing STT, TTS, analytics, and API management
- **Dashboard Graphics:** Data visualization charts, waveform displays, and usage metrics
- **No photography** - maintain technical, developer-focused visual language throughout