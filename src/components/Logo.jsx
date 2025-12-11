import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectTheme } from '@/store/slices/themeSlice';

/**
 * Logo Component
 * Displays logo from theme or falls back to default logo
 */
function Logo({ className = '', showLink = true, alt }) {
  const theme = useAppSelector(selectTheme);
  
  // Get logo URL from theme, fallback to default
  const logoUrl = theme?.branding?.logoUrl || '/logo/bu-logo.svg';
  const companyName = theme?.branding?.companyName || 'Bristol Utilities';
  const logoAlt = alt || companyName;
  
  useEffect(() => {
    if (logoUrl) {
      const img = new Image();
      img.src = logoUrl;
    }
  }, [logoUrl]);
  
  const logoElement = (
    <img 
      src={logoUrl} 
      alt={logoAlt} 
      className={`h-12 md:h-14 w-auto transition-opacity duration-200 hover:opacity-80 ${className}`}
      loading="eager"
      decoding="async"
      fetchpriority="high"
      onError={(e) => {
        // Fallback to default logo if theme logo fails to load
        if (e.target.src !== '/logo/bu-logo.svg') {
          e.target.src = '/logo/bu-logo.svg';
        }
      }}
    />
  );
  
  if (showLink) {
    return (
      <Link to="/" className="flex-shrink-0">
        {logoElement}
      </Link>
    );
  }
  
  return logoElement;
}

export default Logo;

