# Hero Section - Implementation Guide

## 📍 Location
```
src/pages/home/sections/Hero.jsx
```

## ✨ Features

### 1. Background Video
- **File**: `src/assets/videos/hero-bg-video.mp4`
- **Properties**:
  - Auto-plays on load
  - Loops continuously
  - Muted (for autoplay compliance)
  - `playsInline` for mobile devices
  - Object-fit: cover (fills container)

### 2. Layout Structure
```
Hero Container (rounded-3xl, shadow-2xl)
├── Video Background (absolute, full size)
├── Dark Overlay (bg-black, 40% opacity)
└── Content (centered, z-index 10)
    ├── Heading (responsive text sizes)
    ├── Description
    └── Button Group
        ├── Explore Us (white bg)
        └── Contact Us (gradient bg)
```

### 3. Responsive Design
```jsx
// Container Height
h-[600px]       // Mobile (< 768px)
md:h-[700px]    // Desktop (≥ 768px)

// Heading Size
text-4xl        // Mobile
md:text-5xl     // Tablet
lg:text-6xl     // Desktop
xl:text-7xl     // Large screens

// Description Size
text-base       // Mobile
md:text-lg      // Tablet
lg:text-xl      // Desktop

// Button Layout
flex-col        // Mobile (stacked)
sm:flex-row     // Desktop (side by side)
```

## 🎨 Styling Details

### Container
```jsx
className="px-4 mt-4"  // Section padding and margin
```

```jsx
className="relative w-full h-[600px] md:h-[700px] rounded-3xl overflow-hidden shadow-2xl"
```

### Video
```jsx
className="absolute inset-0 w-full h-full object-cover"
```
- `absolute inset-0`: Positions video to fill container
- `object-cover`: Maintains aspect ratio while filling space

### Overlay
```jsx
className="absolute inset-0 bg-black bg-opacity-40"
```
- Adds 40% black overlay for text readability

### Content Container
```jsx
className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 md:px-12"
```
- `z-10`: Above video and overlay
- `flex-col`: Vertical stacking
- `items-center justify-center`: Center content
- Responsive padding: `px-6` → `md:px-12`

## 🔘 Button Styles

### Explore Us Button (White Background)
```jsx
<button
  className="relative overflow-hidden rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-0 pr-2 pl-6 py-2.5 group bg-white"
  style={{ color: 'var(--primary)' }}
>
  <span className="relative z-10 font-semibold">Explore Us</span>
  <div
    className="ml-3 w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-45"
    style={{ 
      background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))',
      color: 'white'
    }}
  >
    <ArrowDown size={20} strokeWidth={2.5} />
  </div>
</button>
```

**Key Features:**
- White background
- Primary color text
- Gradient icon circle (primary)
- Arrow Down icon
- Rotates 45° on hover
- Scales to 105% on hover

### Contact Us Button (Gradient Background)
```jsx
<button
  className="relative overflow-hidden rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-0 pr-2 pl-6 py-2.5 group"
  style={{
    background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))',
    color: 'white',
  }}
>
  <span className="relative z-10">Contact Us</span>
  <div
    className="ml-3 w-10 h-10 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:rotate-45"
    style={{ color: 'var(--primary)' }}
  >
    <ArrowUpRight size={20} strokeWidth={2.5} />
  </div>
</button>
```

**Key Features:**
- Gradient background (primary 100% → 60%)
- White text
- White icon circle
- Primary color icon
- Arrow Up-Right icon
- Rotates 45° on hover
- Scales to 105% on hover

## 🎯 Button Animation Breakdown

### Hover Effects
```css
/* Button */
hover:scale-105        /* Scales up 5% */
hover:shadow-2xl       /* Adds large shadow */
duration-300           /* Animation duration */

/* Icon Circle */
group-hover:rotate-45  /* Rotates icon 45° when button hovered */
transition-transform   /* Smooth rotation */
```

### Button Structure
```
Button Container (group)
├── Text Span (z-10)
└── Icon Container (w-10 h-10, rounded-full)
    └── Lucide Icon
```

## 📐 Spacing & Sizing

### Section Spacing
```jsx
px-4   // Horizontal padding from viewport edges
mt-4   // Top margin from TopNav
```

### Content Spacing
```jsx
mb-6    // Heading bottom margin
mb-10   // Description bottom margin
gap-4   // Gap between buttons
```

### Container Sizing
```jsx
max-w-5xl  // Heading max width
max-w-3xl  // Description max width
```

## 🎬 Video Implementation

### Import
```jsx
import heroVideo from '../../../assets/videos/hero-bg-video.mp4'
```

### Usage
```jsx
<video
  autoPlay
  loop
  muted
  playsInline
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src={heroVideo} type="video/mp4" />
  Your browser does not support the video tag.
</video>
```

### Video Attributes Explained
- `autoPlay`: Starts playing automatically
- `loop`: Repeats indefinitely
- `muted`: Required for autoplay in most browsers
- `playsInline`: Prevents fullscreen on mobile iOS

## 🎨 Decorative Elements

Optional floating decorative circles (like in the design):

```jsx
{/* Top Right */}
<div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
  <div className="w-6 h-6 rounded-full bg-white"></div>
</div>

{/* Bottom Right */}
<div className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
  <div className="w-6 h-6 rounded-full bg-white"></div>
</div>
```

## 📱 Mobile Optimization

### Text Sizes
```jsx
// Heading
text-4xl     // 2.25rem (36px) - Mobile
md:text-5xl  // 3rem (48px) - Tablet
lg:text-6xl  // 3.75rem (60px) - Desktop
xl:text-7xl  // 4.5rem (72px) - Large

// Description
text-base    // 1rem (16px) - Mobile
md:text-lg   // 1.125rem (18px) - Tablet
lg:text-xl   // 1.25rem (20px) - Desktop
```

### Button Layout
```jsx
// Stacked on mobile
flex flex-col sm:flex-row gap-4

// Full width on mobile (optional)
className="w-full sm:w-auto"
```

### Container Height
```jsx
// Shorter on mobile for better UX
h-[600px]    // Mobile (600px)
md:h-[700px] // Desktop (700px)
```

## 🎨 Customization

### Change Text
```jsx
// Heading
<h1>Your Custom Heading</h1>

// Description
<p>Your custom description text here.</p>
```

### Change Video
1. Replace video file in `src/assets/videos/`
2. Update import:
```jsx
import heroVideo from '../../../assets/videos/your-video.mp4'
```

### Adjust Overlay Darkness
```jsx
// Current: 40% opacity
className="absolute inset-0 bg-black bg-opacity-40"

// Lighter (20%)
className="absolute inset-0 bg-black bg-opacity-20"

// Darker (60%)
className="absolute inset-0 bg-black bg-opacity-60"
```

### Change Border Radius
```jsx
// Current
rounded-3xl  // 1.5rem (24px)

// Options
rounded-2xl  // 1rem (16px)
rounded-xl   // 0.75rem (12px)
rounded-lg   // 0.5rem (8px)
```

### Change Height
```jsx
// Current
h-[600px] md:h-[700px]

// Shorter
h-[500px] md:h-[600px]

// Taller
h-[700px] md:h-[800px]

// Full viewport height
h-screen
```

## 🔍 Troubleshooting

### Video Not Playing
1. Check file path is correct
2. Ensure video file exists in assets folder
3. Verify video format is supported (MP4 recommended)
4. Check browser console for errors

### Video Not Looping
```jsx
// Ensure loop attribute is present
<video loop>
```

### Video Covers Content
```jsx
// Ensure content has higher z-index
className="relative z-10"
```

### Buttons Not Clickable
```jsx
// Ensure button is above overlay (z-index)
// Ensure cursor: pointer (should be global)
```

### Text Not Readable
```jsx
// Increase overlay darkness
bg-opacity-40 → bg-opacity-60

// Or add text shadow
className="drop-shadow-lg"
```

## 🚀 Performance Tips

1. **Optimize Video File**
   - Keep file size under 5MB if possible
   - Use compressed MP4 format
   - Consider lower resolution for mobile

2. **Lazy Load (Optional)**
   ```jsx
   <video loading="lazy">
   ```

3. **Poster Image (Optional)**
   ```jsx
   <video poster="/path/to/poster.jpg">
   ```
   Shows image before video loads

## 📦 Dependencies

```json
{
  "lucide-react": "latest"  // For icons
}
```

### Icons Used
```jsx
import { ArrowUpRight, ArrowDown } from 'lucide-react'
```

## 💡 Tips

1. **Video Format**: MP4 with H.264 codec is most compatible
2. **File Size**: Keep video under 10MB for fast loading
3. **Aspect Ratio**: 16:9 works best for hero sections
4. **Fallback**: Consider adding a background image fallback
5. **Accessibility**: Add descriptive alt text or ARIA labels
6. **Testing**: Test on multiple devices and browsers

## 🎯 Complete Code

See `src/pages/home/sections/Hero.jsx` for the complete implementation.

