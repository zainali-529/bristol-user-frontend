# Bristol Utilities - Updated Project Structure

## 📁 Complete Folder Structure

```
src/
├── assets/                    # Static assets
│   ├── videos/
│   │   └── hero-bg-video.mp4 # Hero section background video
│   ├── images/               # Image assets
│   └── react.svg
│
├── components/               # Reusable UI components
│   ├── TopNav.jsx           # Main navigation with routing
│   ├── ui/                  # shadcn/ui components
│   └── index.js             # Component exports
│
├── pages/                    # Page components (organized by feature)
│   ├── home/                # Home page module
│   │   ├── sections/        # Home page sections
│   │   │   ├── Hero.jsx     # Hero section with video
│   │   │   └── index.js     # Section exports
│   │   ├── Home.jsx         # Home page main component
│   │   └── index.js         # Home module export
│   │
│   ├── services/            # Services page module
│   │   ├── Services.jsx
│   │   └── index.js
│   │
│   ├── about/               # About page module
│   │   ├── About.jsx
│   │   └── index.js
│   │
│   ├── quote/               # Quote page module
│   │   ├── Quote.jsx
│   │   └── index.js
│   │
│   ├── news/                # News page module
│   │   ├── News.jsx
│   │   └── index.js
│   │
│   ├── ColorSchemeDemo.jsx  # Color reference page
│   └── index.js             # All pages export
│
├── routes/                   # React Router configuration
│   └── index.jsx            # Router setup with all routes
│
├── hooks/                    # Custom React hooks
│   └── use-mobile.ts        # Mobile detection hook
│
├── lib/                      # Utility functions
│   └── utils.ts             # Helper utilities
│
├── App.jsx                   # Main App with RouterProvider
├── main.jsx                  # App entry point
├── index.css                 # Global styles, colors, Poppins font
└── colors-reference.js       # Color values for JavaScript
```

## 🎯 Key Updates

### 1. ✅ Organized Page Structure
Each page now has its own dedicated folder:
```
pages/
  ├── home/
  │   ├── sections/      ← Page sections
  │   ├── Home.jsx       ← Main page component
  │   └── index.js       ← Clean imports
```

**Benefits:**
- Easy to scale (add components, sections, hooks per page)
- Clear separation of concerns
- Better code organization

### 2. ✅ React Router DOM Setup
- Installed: `react-router-dom`
- Centralized routing in `src/routes/index.jsx`
- All navigation uses React Router `Link` components
- Active route highlighting in TopNav

**Routes Available:**
```javascript
/ → HomePage
/services → ServicesPage
/about → AboutPage
/quote → QuotePage
/news → NewsPage
/color-demo → ColorSchemeDemo
```

### 3. ✅ Poppins Font Family
- Imported from Google Fonts (all weights: 100-900)
- Applied globally to entire project
- Includes italic variants

**Usage:**
```css
font-family: 'Poppins', system-ui, sans-serif;
```

### 4. ✅ Global Cursor Fix
All interactive elements now show pointer cursor:
```css
button, a, [role="button"], [type="button"], select {
  cursor: pointer;
}
```

### 5. ✅ Hero Section
Located: `src/pages/home/sections/Hero.jsx`

**Features:**
- Background video (loops automatically)
- Dark overlay for text readability
- Large hero heading
- Description text
- Two styled buttons (Explore Us, Contact Us)
- Rounded corners with margin
- Decorative floating elements
- Fully responsive

## 📖 How to Use This Structure

### Adding a New Page

1. **Create page folder:**
```bash
src/pages/contact/
  ├── Contact.jsx
  └── index.js
```

2. **Create the page component:**
```jsx
// src/pages/contact/Contact.jsx
import TopNav from '../../components/TopNav'

function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="max-w-7xl mx-auto px-6 py-16">
        <h1>Contact Us</h1>
      </main>
    </div>
  )
}

export default ContactPage
```

3. **Export from index.js:**
```jsx
// src/pages/contact/index.js
export { default } from './Contact'
```

4. **Add to routes:**
```jsx
// src/routes/index.jsx
import ContactPage from '../pages/contact'

export const router = createBrowserRouter([
  // ... other routes
  {
    path: '/contact',
    element: <ContactPage />,
  },
])
```

5. **Update TopNav links (if needed):**
```jsx
// src/components/TopNav.jsx
const navLinks = [
  // ... existing links
  { name: 'Contact', path: '/contact' },
]
```

### Adding Sections to a Page

For complex pages with multiple sections:

1. **Create sections folder:**
```bash
src/pages/services/
  ├── sections/
  │   ├── ServicesHero.jsx
  │   ├── ServicesList.jsx
  │   ├── Pricing.jsx
  │   └── index.js
  ├── Services.jsx
  └── index.js
```

2. **Export sections:**
```jsx
// src/pages/services/sections/index.js
export { default as ServicesHero } from './ServicesHero'
export { default as ServicesList } from './ServicesList'
export { default as Pricing } from './Pricing'
```

3. **Use in page:**
```jsx
// src/pages/services/Services.jsx
import TopNav from '../../components/TopNav'
import { ServicesHero, ServicesList, Pricing } from './sections'

function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <ServicesHero />
      <ServicesList />
      <Pricing />
    </div>
  )
}

export default ServicesPage
```

### Adding Reusable Components

For components used across multiple pages:

```bash
src/components/
  ├── Footer.jsx
  ├── Button.jsx
  └── Card.jsx
```

Export from `src/components/index.js`:
```jsx
export { default as TopNav } from './TopNav'
export { default as Footer } from './Footer'
export { default as Button } from './Button'
export { default as Card } from './Card'
```

## 🎨 Styling Guidelines

### Using Color Scheme
```jsx
// CSS Variables
style={{ backgroundColor: 'var(--primary)', color: 'white' }}

// Tailwind Utilities
className="bg-primary-20 text-primary"

// Gradients
className="gradient-top-bottom"
style={{ background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))' }}
```

### Poppins Font Weights
```css
font-weight: 300; /* Light */
font-weight: 400; /* Regular */
font-weight: 500; /* Medium */
font-weight: 600; /* Semi-Bold */
font-weight: 700; /* Bold */
font-weight: 800; /* Extra-Bold */
font-weight: 900; /* Black */
```

### Button Styling (Consistent Style)
```jsx
<button
  className="relative overflow-hidden rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-0 pr-2 pl-6 py-2.5 group"
  style={{
    background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))',
    color: 'white',
  }}
>
  <span className="relative z-10">Button Text</span>
  <div
    className="ml-3 w-10 h-10 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:rotate-45"
    style={{ color: 'var(--primary)' }}
  >
    <ArrowUpRight size={20} strokeWidth={2.5} />
  </div>
</button>
```

## 🚦 Navigation

### Using React Router Links
```jsx
import { Link } from 'react-router-dom'

// Basic Link
<Link to="/services">Services</Link>

// With styling
<Link 
  to="/about" 
  className="text-primary hover:opacity-80"
>
  About Us
</Link>

// Programmatic navigation
import { useNavigate } from 'react-router-dom'

const navigate = useNavigate()
navigate('/contact')
```

### Active Route Detection
```jsx
import { useLocation } from 'react-router-dom'

const location = useLocation()
const isActive = location.pathname === '/services'
```

## 📦 Import Examples

```jsx
// Pages (from any file)
import HomePage from '../pages/home'
import ServicesPage from '../pages/services'

// Multiple pages at once
import { HomePage, ServicesPage, AboutPage } from '../pages'

// Components
import TopNav from '../components/TopNav'
import { TopNav, Footer } from '../components'

// Sections (within same page folder)
import { Hero } from './sections'

// Assets
import heroVideo from '../assets/videos/hero-bg-video.mp4'
import logo from '../assets/images/logo.png'

// Icons
import { ArrowUpRight, Menu, X, Sun, Moon } from 'lucide-react'

// Router
import { Link, useNavigate, useLocation } from 'react-router-dom'
```

## 🎬 Hero Section Features

The Hero section (`src/pages/home/sections/Hero.jsx`) includes:

1. **Video Background**
   - Auto-plays and loops
   - Muted for better UX
   - Responsive sizing
   - Proper video import for Vite

2. **Content Overlay**
   - Semi-transparent dark overlay
   - Large responsive heading
   - Description text
   - Two action buttons

3. **Styling**
   - Rounded corners (rounded-3xl)
   - Horizontal margins (px-4)
   - Top margin (mt-4)
   - Shadow effect
   - Responsive height: 600px (mobile) → 700px (desktop)

4. **Buttons**
   - **Explore Us**: White background, gradient icon circle, down arrow
   - **Contact Us**: Gradient background, white icon circle, up-right arrow
   - Hover effects: scale, shadow, icon rotation

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📝 File Naming Conventions

- **Components**: PascalCase (`TopNav.jsx`, `Hero.jsx`)
- **Pages**: PascalCase with "Page" suffix (`HomePage`, `ServicesPage`)
- **Utilities**: camelCase (`use-mobile.ts`, `colors-reference.js`)
- **Folders**: lowercase or camelCase (`sections`, `components`)
- **Index files**: Always `index.js` or `index.jsx`

## 🎯 Best Practices

1. **One feature, one folder** - Keep related files together
2. **Use barrel exports** - Create `index.js` files for clean imports
3. **Component composition** - Break complex pages into sections
4. **Consistent styling** - Use the defined color scheme and components
5. **Responsive design** - Always consider mobile-first approach
6. **Performance** - Optimize videos and images
7. **Accessibility** - Use semantic HTML and ARIA labels

## 🚀 Next Steps

To add more sections to the home page:

1. Create section files in `src/pages/home/sections/`
2. Export from `src/pages/home/sections/index.js`
3. Import and use in `src/pages/home/Home.jsx`

Example structure for a complete home page:
```jsx
// Home.jsx
import TopNav from '../../components/TopNav'
import { 
  Hero, 
  Services, 
  About, 
  Testimonials, 
  Contact 
} from './sections'

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <Hero />
      <Services />
      <About />
      <Testimonials />
      <Contact />
    </div>
  )
}
```

