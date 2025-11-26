import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchTheme,
  selectTheme,
  selectThemeLoading,
  selectThemeError,
  selectThemeLastFetched,
  resetNeedsRefresh,
} from '@/store/slices/themeSlice';

/**
 * Apply CSS variables to document root
 */
const applyCSSVariables = (cssVariables) => {
  if (!cssVariables) return;
  
  const root = document.documentElement;
  Object.entries(cssVariables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
};

/**
 * Apply typography to document root
 */
const applyTypography = (typography) => {
  if (!typography) return;
  
  const root = document.documentElement;
  if (typography.fontFamily) {
    root.style.setProperty('font-family', typography.fontFamily);
  }
};

/**
 * Apply favicon to document head
 */
const applyFavicon = (faviconUrl) => {
  if (!faviconUrl) return;
  
  // Remove existing favicon
  const existingFavicon = document.querySelector("link[rel*='icon']");
  if (existingFavicon) {
    existingFavicon.remove();
  }
  
  // Add new favicon
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/x-icon';
  link.href = faviconUrl;
  document.head.appendChild(link);
};

/**
 * Custom hook to fetch and manage theme using Redux Persist
 * 
 * Cache Strategy:
 * - Data is persisted to localStorage via redux-persist (survives page reloads)
 * - Uses cached theme immediately for instant rendering
 * - Always checks API on mount to detect theme changes
 * - Updates only if API response differs from cached theme
 * - No time-based expiry - cache persists until theme actually changes
 * - Automatically applies CSS variables, typography, and favicon
 * 
 * @returns {Object} { theme, loading, error }
 */
export const useThemeRedux = () => {
  const dispatch = useAppDispatch();
  const hasCheckedRef = useRef(false);
  
  // Select data from Redux store
  const theme = useAppSelector(selectTheme);
  const loading = useAppSelector(selectThemeLoading);
  const error = useAppSelector(selectThemeError);
  const lastFetched = useAppSelector(selectThemeLastFetched);

  useEffect(() => {
    // Only check once per component mount
    if (hasCheckedRef.current) return;
    hasCheckedRef.current = true;

    // Always check API on mount to see if theme changed
    // Use cached theme immediately, update silently if different
    if (lastFetched && theme) {
      // We have cached theme - apply it immediately, check API in background
      console.log('✅ Using cached theme, checking for updates...');
      applyTheme(theme);
    } else {
      // No cache - fetch normally
      console.log('🔄 Fetching theme from API (no cache)...');
    }
    
    // Always fetch to check for updates (updates only if theme changed)
    // Theme will be applied automatically via the effect below when state updates
    dispatch(fetchTheme()).then(() => {
      dispatch(resetNeedsRefresh());
    }).catch(() => {
      // Silent fail - continue using cached theme if API fails
      console.warn('Theme fetch failed, using cached theme');
    });
  }, []); // Only run once on mount

  // Apply theme whenever it changes
  useEffect(() => {
    if (theme) {
      applyTheme(theme);
    }
  }, [theme]);

  const applyTheme = (themeData) => {
    if (!themeData) return;
    
    // Apply CSS variables
    if (themeData.cssVariables) {
      applyCSSVariables(themeData.cssVariables);
    }
    
    // Apply typography
    if (themeData.typography) {
      applyTypography(themeData.typography);
    }
    
    // Apply favicon
    if (themeData.branding?.faviconUrl) {
      applyFavicon(themeData.branding.faviconUrl);
    }
  };

  return {
    theme,
    // Only show loading if we don't have cached theme
    loading: !lastFetched ? loading : false,
    error,
  };
};

export default useThemeRedux;

