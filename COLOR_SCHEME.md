# Bristol Utilities Color Scheme

## Overview
This document outlines the color scheme for the Bristol Utilities application, including both light and dark modes.

## Primary Color
**#AE613A** - A warm, earthy brown that represents the Bristol Utilities brand.

---

## Light Mode

### Background & Text
- **Background**: `#ffffff` (White)
- **Text Primary**: `#333333` (Dark Gray)
- **Text Secondary**: `#7C7C7C` (Medium Gray)
- **Cards**: `#ffffff` (White)

### Primary Color Variations
All variations use the primary color `#AE613A` with different opacity levels:

| Opacity | CSS Variable | Usage |
|---------|--------------|-------|
| 100% | `--primary-100` | Buttons, active states, emphasis |
| 80% | `--primary-80` | Hover states, medium emphasis |
| 60% | `--primary-60` | Disabled states, medium backgrounds |
| 40% | `--primary-40` | Light backgrounds, subtle emphasis |
| 30% | `--primary-30` | Borders, dividers |
| 20% | `--primary-20` | Light borders, subtle backgrounds |
| 10% | `--primary-10` | Very light backgrounds, hover effects |
| 5% | `--primary-5` | Minimal emphasis, large area backgrounds |

---

## Dark Mode

### Background & Text
- **Background**: `#121212` (Almost Black)
- **Text Primary**: `#F5EDEB` (Off White)
- **Text Secondary**: `#BBAAA4` (Warm Gray)
- **Cards**: `#1E1B1A` (Dark Brown-Gray)

### Primary Color Variations
Same as light mode - `#AE613A` with varying opacity levels.

---

## Usage Examples

### Using CSS Variables
```css
/* Background colors */
background-color: var(--primary-100);
background-color: var(--primary-20);

/* Text colors */
color: var(--text-primary);
color: var(--text-secondary);

/* Card styling */
background-color: var(--card);
color: var(--card-foreground);
border-color: var(--border);
```

### Using Tailwind Utilities
```jsx
{/* Background colors */}
<div className="bg-primary-100">Full primary background</div>
<div className="bg-primary-20">Light primary background</div>

{/* Text colors */}
<p className="text-primary">Primary text</p>
<p className="text-secondary">Secondary text</p>

{/* Border colors */}
<div className="border border-primary-20">Light border</div>
<div className="border-2 border-primary-100">Strong border</div>

{/* Cards */}
<div className="bg-card text-card-foreground">Card content</div>
```

### Using Inline Styles
```jsx
<div style={{ backgroundColor: 'var(--primary-100)', color: 'white' }}>
  Inline styled element
</div>
```

---

## Dark Mode Toggle

To toggle dark mode, add or remove the `dark` class from the root element:

```javascript
// Enable dark mode
document.documentElement.classList.add('dark');

// Disable dark mode
document.documentElement.classList.remove('dark');

// Toggle dark mode
document.documentElement.classList.toggle('dark');
```

---

## Design Guidelines

### Buttons
- **Primary Action**: Use `--primary-100` background with white text
- **Secondary Action**: Use `--primary-20` background with `--text-primary` text
- **Outline**: Use transparent background with `--primary-100` border and text

### Cards & Containers
- **Standard Card**: Use `--card` background
- **Subtle Emphasis**: Use `--primary-5` or `--primary-10` background
- **Strong Emphasis**: Use `--primary-100` background with white text

### Text Hierarchy
- **Headings & Important Text**: Use `--text-primary`
- **Body Text & Descriptions**: Use `--text-secondary`
- **On Primary Color**: Use white or `--primary-foreground`

### Borders & Dividers
- **Subtle**: Use `--primary-10` or `--primary-20`
- **Medium**: Use `--primary-30`
- **Strong**: Use `--primary-100`

### Interactive States
- **Hover**: Reduce opacity by 10-20% or use next lighter shade
- **Active/Focus**: Use `--primary-100` with `--ring` for focus rings
- **Disabled**: Use `--primary-40` or `--primary-60` with reduced opacity

---

## Accessibility Notes

1. **Contrast Ratios**: Ensure sufficient contrast between text and background colors
2. **Focus Indicators**: Always provide visible focus states using `--ring`
3. **Color Alone**: Don't rely solely on color to convey information
4. **Dark Mode**: Test readability in both light and dark modes

---

## File Structure

- `src/index.css` - Contains all color variable definitions
- `src/App.jsx` - Live examples and demo of the color scheme
- `COLOR_SCHEME.md` - This documentation file

