// Dynamic Lucide icon mapping
// This utility allows dynamic rendering of Lucide icons by name

import * as LucideIcons from 'lucide-react';

/**
 * Get a Lucide icon component by name
 * @param {string} iconName - The name of the icon (e.g., 'Clock', 'ShieldCheck', 'DollarSign')
 * @returns {React.Component|null} - The icon component or null if not found
 */
export const getLucideIcon = (iconName) => {
  if (!iconName || typeof iconName !== 'string') {
    return null;
  }

  // Clean the icon name (remove spaces, ensure proper casing)
  const cleanName = iconName.trim().replace(/\s+/g, '');
  
  // Try to find the icon in LucideIcons
  // Lucide icons are PascalCase, so we ensure the name matches
  const IconComponent = LucideIcons[cleanName] || 
                       LucideIcons[cleanName.charAt(0).toUpperCase() + cleanName.slice(1)] ||
                       null;

  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found in Lucide icons. Using default Clock icon.`);
    // Return a default icon if not found
    return LucideIcons.Clock || null;
  }

  return IconComponent;
};

export default getLucideIcon;

