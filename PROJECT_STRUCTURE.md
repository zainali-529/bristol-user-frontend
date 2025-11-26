# Bristol Utilities Frontend - Project Structure

## 📁 Folder Structure

```
src/
├── components/           # Reusable UI components
│   ├── TopNav.jsx       # Main navigation component
│   ├── ui/              # shadcn/ui components
│   └── index.js         # Component exports
│
├── pages/               # Page components
│   ├── Home.jsx         # Home page
│   ├── ColorSchemeDemo.jsx  # Color scheme reference
│   └── index.js         # Page exports
│
├── hooks/               # Custom React hooks
│   └── use-mobile.ts    # Mobile detection hook
│
├── lib/                 # Utility functions
│   └── utils.ts         # Helper utilities
│
├── assets/              # Static assets (images, icons)
│   └── react.svg
│
├── App.jsx              # Main App component
├── main.jsx             # App entry point
├── index.css            # Global styles & color scheme
└── colors-reference.js  # Color values for JavaScript
```

## 🎨 Color Scheme

The entire color scheme is defined in `src/index.css` and uses CSS variables for both light and dark modes.

### Using Colors in Components

**Method 1: CSS Variables (Recommended)**
```jsx
<div style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
  Content
</div>
```

**Method 2: Tailwind Utilities**
```jsx
<div className="bg-primary-20 text-primary">
  Content
</div>
```

**Method 3: JavaScript Import**
```jsx
import { colors } from './colors-reference';
const bgColor = colors.light.primary;
```

## 🧭 Navigation Component

### TopNav Component
Located at: `src/components/TopNav.jsx`

Features:
- Responsive design (mobile & desktop)
- Active link highlighting
- Primary color integration
- Contact Us button with icon
- Mobile menu button

Usage:
```jsx
import TopNav from '../components/TopNav'

function MyPage() {
  return (
    <>
      <TopNav />
      {/* Your content */}
    </>
  )
}
```

## 📄 Pages

### Home Page
- **Location**: `src/pages/Home.jsx`
- **Description**: Main landing page with TopNav
- **Features**: Hero section, services preview cards

### Color Scheme Demo
- **Location**: `src/pages/ColorSchemeDemo.jsx`
- **Description**: Interactive color scheme showcase
- **Access**: Change `App.jsx` to import `ColorSchemeDemo` instead of `Home`

## 🎯 Adding New Pages

1. Create a new file in `src/pages/`
```jsx
// src/pages/Services.jsx
import TopNav from '../components/TopNav'

function Services() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Your content */}
      </main>
    </div>
  )
}

export default Services
```

2. Export it from `src/pages/index.js`
```jsx
export { default as Services } from './Services'
```

3. Use it in your app
```jsx
import { Services } from './pages'
```

## 🧩 Adding New Components

1. Create a new file in `src/components/`
```jsx
// src/components/Footer.jsx
function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--card)' }}>
      {/* Footer content */}
    </footer>
  )
}

export default Footer
```

2. Export it from `src/components/index.js`
```jsx
export { default as Footer } from './Footer'
```

3. Use it in your pages
```jsx
import { TopNav, Footer } from '../components'
```

## 🎨 shadcn/ui Components

All shadcn/ui components are located in `src/components/ui/`

To use a shadcn component:
```jsx
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  )
}
```

## 🚀 Development

Start the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 📖 Key Files

- **`src/index.css`**: Global styles, color scheme, Tailwind utilities
- **`src/App.jsx`**: Main app entry component
- **`src/main.jsx`**: React app initialization
- **`vite.config.js`**: Vite configuration with path aliases
- **`tsconfig.json`**: TypeScript/JavaScript module resolution
- **`COLOR_SCHEME.md`**: Detailed color scheme documentation

## 🎨 Primary Color (#AE613A)

Available opacity variations:
- 100% - `var(--primary-100)`
- 80% - `var(--primary-80)`
- 60% - `var(--primary-60)`
- 40% - `var(--primary-40)`
- 30% - `var(--primary-30)`
- 20% - `var(--primary-20)`
- 10% - `var(--primary-10)`
- 5% - `var(--primary-5)`

## 💡 Best Practices

1. **Use CSS Variables**: Prefer CSS variables over hardcoded colors for theme consistency
2. **Component Organization**: Keep components small and focused
3. **Import Optimization**: Use barrel exports (index.js files) for cleaner imports
4. **Responsive Design**: Always consider mobile-first responsive design
5. **Color Consistency**: Use the defined color scheme throughout the application

