# TopNav Component - Features Documentation

## ✨ New Features

### 1. 🎨 Lucide React Icons
All icons have been replaced with Lucide React icons for better consistency and customization.

**Icons Used:**
- `ArrowUpRight` - Contact Us button
- `Menu` - Mobile menu open
- `X` - Mobile menu close
- `Sun` - Light mode indicator
- `Moon` - Dark mode indicator
- `Zap` - Electrical services
- `Droplets` - Plumbing services
- `Home` - Home maintenance

### 2. 🌈 Gradient Utilities

Three gradient utilities have been added to `src/index.css`:

```css
.gradient-top-bottom {
  background: linear-gradient(to bottom, var(--primary-100), var(--primary-20));
}

.gradient-left-right {
  background: linear-gradient(to right, var(--primary-100), var(--primary-20));
}

.gradient-contact-btn {
  background: linear-gradient(to bottom, var(--primary-100), var(--primary-80));
}
```

**Usage Examples:**
```jsx
{/* Top to bottom gradient */}
<div className="gradient-top-bottom">Content</div>

{/* Left to right gradient */}
<div className="gradient-left-right">Content</div>

{/* Inline gradient */}
<button style={{ background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-80))' }}>
  Button
</button>
```

### 3. 💬 Contact Us Button

The Contact Us button now matches the design from the image exactly:

**Features:**
- Rounded pill shape
- Gradient background (top to bottom, primary 100% to 80%)
- White circular icon container on the right
- Arrow icon from Lucide React
- Smooth hover animations:
  - Scale up effect
  - Shadow elevation
  - Icon rotation on hover

**Code:**
```jsx
<button
  className="relative overflow-hidden rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-0 pr-4 pl-6 py-2.5 group"
  style={{
    background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-80))',
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

### 4. 🌓 Dark Mode Toggle

A beautiful animated toggle for switching between light and dark modes.

**Features:**
- Smooth icon transitions with rotation and scale effects
- Persists theme preference in localStorage
- Sun icon for light mode
- Moon icon for dark mode
- Hover scale effect
- Primary color background on hover

**Animation Details:**
- Icon rotation: 90 degrees
- Scale transition: 0 to 100%
- Opacity fade: 0 to 100%
- Duration: 300ms
- Smooth cubic-bezier easing

**Code:**
```jsx
<button
  onClick={toggleDarkMode}
  className="p-2.5 rounded-full transition-all duration-300 hover:scale-110"
  style={{
    backgroundColor: 'var(--primary-10)',
    color: 'var(--primary)',
  }}
>
  <div className="relative w-5 h-5">
    <Sun
      className={`absolute inset-0 transition-all duration-300 ${
        darkMode ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
      }`}
      size={20}
    />
    <Moon
      className={`absolute inset-0 transition-all duration-300 ${
        darkMode ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
      }`}
      size={20}
    />
  </div>
</button>
```

### 5. 📱 Smooth Mobile Menu

The mobile menu now features smooth animations and transitions.

**Features:**
- Smooth slide-down animation
- Animated menu/close icon transition
- Staggered navigation link animations
- Auto-close on link selection
- Backdrop blur effect on navbar
- Responsive contact button in mobile menu

**Animation Details:**
- Menu height transition: 0 to auto (max-h-96)
- Opacity transition: 0 to 100%
- Duration: 500ms ease-in-out
- Staggered delay: 50ms per item
- Icon rotation and scale effects

**Mobile Menu Code:**
```jsx
<div
  className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
    mobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
  }`}
>
  <div className="py-4 space-y-3">
    {navLinks.map((link, index) => (
      <button
        key={link.name}
        onClick={() => {
          setActiveLink(link.name)
          setMobileMenuOpen(false)
        }}
        className="block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200"
        style={{
          backgroundColor: activeLink === link.name ? 'var(--primary-10)' : 'transparent',
          color: activeLink === link.name ? 'var(--primary)' : 'var(--text-primary)',
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
          transitionDelay: `${index * 50}ms`,
        }}
      >
        {link.name}
      </button>
    ))}
  </div>
</div>
```

## 🎯 Additional Enhancements

### Sticky Navigation
The navbar now sticks to the top of the page with a backdrop blur effect:
```jsx
<nav className="w-full bg-background border-b sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
```

### Service Cards Hover Effects
Service cards now have smooth hover animations:
- Scale up to 105%
- Shadow elevation
- Icon scale animation
- Smooth transitions (300ms duration)

### Gradient Examples
The Home page now includes two example sections demonstrating the gradient utilities:
- Top to Bottom Gradient section
- Left to Right Gradient section

## 📦 Dependencies

- **lucide-react**: For all icons
- **React Hooks**: useState, useEffect for state management
- **localStorage**: For persisting dark mode preference

## 🎨 Color Variables Used

All components use CSS variables for consistent theming:
- `--primary-100` - Full primary color
- `--primary-80` - 80% opacity primary
- `--primary-20` - 20% opacity primary
- `--primary-10` - 10% opacity primary
- `--text-primary` - Primary text color
- `--text-secondary` - Secondary text color
- `--background` - Background color
- `--border` - Border color

## 🚀 Performance Optimizations

1. **Efficient Animations**: Using CSS transforms for better performance
2. **LocalStorage**: Reduces flash on page load by persisting theme
3. **Conditional Classes**: Optimized class switching for animations
4. **Backdrop Blur**: Uses CSS backdrop-filter for modern blur effects

## 📱 Responsive Breakpoints

- **Desktop**: md breakpoint and above (768px+)
- **Mobile**: Below md breakpoint
- All interactive elements are optimized for both touch and mouse input

## 🎨 Customization

To customize the gradients, modify the values in `src/index.css`:

```css
.gradient-top-bottom {
  background: linear-gradient(to bottom, var(--primary-100), var(--primary-20));
  /* Change direction: to bottom, to top, to right, to left */
  /* Change colors: var(--primary-XX) */
}
```

To customize animations, adjust the Tailwind classes:
- `duration-300` - Animation duration
- `ease-in-out` - Animation easing
- `hover:scale-105` - Hover scale effect
- `transition-all` - Transition all properties

