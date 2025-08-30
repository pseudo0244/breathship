# Brand Guidelines - Breathship

## Brand Colors

- **Primary Green**: `#535C3A` - Used for headings, primary buttons, and main brand elements
- **Brand Beige**: `#FAF4F0` - Used for backgrounds, light text, and secondary elements
- **Brand Brown**: `#AC683B` - Used for accents, hover states, and decorative elements

## Typography

- **Headings**: Cormorant-Bold - Used for all main headings (h1, h2, h3)
- **Sub-headings**: Cormorant-Regular - Used for section titles and secondary headings
- **Body Text**: Proxima Nova-Regular - Used for all body text, paragraphs, and general content

## Brand Assets

### Logo
- File: `src/public/logo.png`
- Used in header and footer
- Maintains consistent sizing and positioning

### Background Pattern
- File: `src/public/pattern2.jpg`
- Used as hero section background with black overlay for readability

### Decorative Icons
The following icons are used as decorative elements throughout the site:
- `brownleaf.png` - Brown leaf icon
- `brownstar.png` - Brown star icon  
- `brownsun.png` - Brown sun icon
- `greenleaf.png` - Green leaf icon
- `greenstar.png` - Green star icon
- `greensun.png` - Green sun icon

## Design Philosophy - Human Touch

### Organic Movement
- Decorative icons have subtle floating animations with natural movement
- Different timing and easing for each element creates organic feel
- Gentle rotation and vertical movement mimics natural elements

### Hand-Drawn Elements
- Subtle border circles and organic shapes throughout
- Gradient accent lines that feel hand-drawn
- Decorative frames with slight rotations for human imperfection

### Natural Spacing
- Generous padding and margins for breathing room
- Organic grid layouts with natural proportions
- Layered depth with backdrop blur effects

### Warm Interactions
- Smooth hover animations with scale and shadow effects
- Gentle transitions with easeOut timing
- Interactive elements that respond naturally to user input

## Component Styling

### Buttons
- **Primary CTA**: Green background (`#535C3A`) with beige text (`#FAF4F0`)
- **Hover State**: Brown background (`#AC683B`) with beige text
- **Outline Buttons**: Green border and text, brown background on hover
- **Enhanced**: Shadow effects, scale transforms, and smooth transitions

### Header
- Background: Semi-transparent beige with blur effect
- Logo: Left-aligned with brand name in Cormorant-Bold
- Navigation: Proxima Nova font with green text and hover states

### Footer
- Background: Dark green (`#535C3A`)
- Text: Beige (`#FAF4F0`) with brown hover states
- Logo and branding consistent with header

### Hero Section
- Background: Pattern image with black overlay (70% opacity)
- Text: Beige color for readability
- Floating decorative icons with organic movement
- Hand-drawn style decorative circles
- Enhanced badges with backdrop blur and borders

### Cards
- Enhanced shadows and hover effects
- Subtle borders and organic styling
- Scale and shadow transforms on hover
- Backdrop blur effects for depth

## Implementation Notes

### Font Loading
The brand fonts need to be added to the project:
- Cormorant-Bold.woff2 / .woff
- Cormorant-Regular.woff2 / .woff  
- ProximaNova-Regular.woff2 / .woff

Place these files in a `/fonts/` directory and update the CSS imports accordingly.

### Tailwind Configuration
Brand colors and fonts are configured in `tailwind.config.js`:
- `brand-green`: #535C3A
- `brand-beige`: #FAF4F0
- `brand-brown`: #AC683B
- Font families: `cormorant-bold`, `cormorant-regular`, `proxima-nova`

### CSS Classes
Utility classes are available:
- `.font-cormorant-bold`
- `.font-cormorant-regular`
- `.font-proxima-nova`
- `.text-brand-green`
- `.text-brand-beige`
- `.text-brand-brown`
- `.bg-brand-green`
- `.bg-brand-beige`
- `.bg-brand-brown`

### Animation Guidelines
- Use `easeInOut` for organic movement
- Vary animation durations (5-9 seconds) for natural feel
- Add delays to create staggered effects
- Keep movements subtle and gentle

## Usage Examples

```jsx
// Heading with brand styling
<h1 className="text-4xl font-cormorant-bold text-brand-green">
  Your Heading
</h1>

// Body text with brand styling
<p className="text-lg font-proxima-nova text-brand-green/80">
  Your content here
</p>

// Brand button with enhanced styling
<Button variant="brand-green" className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
  Call to Action
</Button>

// Decorative icon with organic movement
<motion.img 
  src="src/public/brownleaf.png" 
  alt="" 
  className="w-12 h-12 opacity-20"
  animate={{ 
    y: [0, -8, 0],
    rotate: [0, 3, 0]
  }}
  transition={{ 
    duration: 7, 
    repeat: Infinity, 
    ease: "easeInOut" 
  }}
/>

// Organic accent line
<div className="w-24 h-1 bg-gradient-to-r from-brand-green/40 to-brand-brown/40 rounded-full"></div>

// Hand-drawn style decorative element
<div className="w-32 h-32 border border-brand-green/8 rounded-full opacity-20"></div>
```

## Human Touch Principles

1. **Imperfection is Beautiful**: Slight rotations, varied timing, and organic shapes
2. **Natural Movement**: Gentle animations that mimic natural elements
3. **Warm Interactions**: Responsive hover states and smooth transitions
4. **Breathing Room**: Generous spacing and natural proportions
5. **Layered Depth**: Backdrop blur, shadows, and subtle borders
6. **Organic Elements**: Hand-drawn style decorations and gradient accents
