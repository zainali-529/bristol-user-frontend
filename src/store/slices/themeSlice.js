import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axios';

// Default theme fallback
const defaultTheme = {
  primaryColor: '#AE613A',
  colorVariations: {
    primary: '#AE613A',
    primary100: '#AE613A',
    primary80: 'rgba(174, 97, 58, 0.8)',
    primary60: 'rgba(174, 97, 58, 0.6)',
    primary40: 'rgba(174, 97, 58, 0.4)',
    primary30: 'rgba(174, 97, 58, 0.3)',
    primary20: 'rgba(174, 97, 58, 0.2)',
    primary10: 'rgba(174, 97, 58, 0.1)',
    primary5: 'rgba(174, 97, 58, 0.05)',
  },
  typography: {
    fontFamily: 'Poppins, system-ui, Avenir, Helvetica, Arial, sans-serif',
    fontSize: {
      base: '16px',
      small: '14px',
      large: '18px',
      xlarge: '24px',
    },
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
  branding: {
    logoUrl: null,
    faviconUrl: null,
    companyName: 'Bristol Utilities',
    tagline: null,
  },
  cssVariables: {
    '--primary': '#AE613A',
    '--primary-100': '#AE613A',
    '--primary-80': 'rgba(174, 97, 58, 0.8)',
    '--primary-60': 'rgba(174, 97, 58, 0.6)',
    '--primary-40': 'rgba(174, 97, 58, 0.4)',
    '--primary-30': 'rgba(174, 97, 58, 0.3)',
    '--primary-20': 'rgba(174, 97, 58, 0.2)',
    '--primary-10': 'rgba(174, 97, 58, 0.1)',
    '--primary-5': 'rgba(174, 97, 58, 0.05)',
    '--primary-foreground': '#ffffff',
    '--ring': '#AE613A',
    '--radius': '0.5rem',
    '--radius-sm': '0.25rem',
    '--radius-lg': '0.75rem',
    '--radius-xl': '1rem',
  },
};

// Helper function to compare two objects deeply
const isThemeEqual = (theme1, theme2) => {
  return JSON.stringify(theme1) === JSON.stringify(theme2);
};

// Helper to generate CSS variables from theme data
const generateCSSVariables = (themeData) => {
  const cssVars = { ...themeData.cssVariables || {} };
  
  // Add color variations
  if (themeData.colorVariations) {
    Object.entries(themeData.colorVariations).forEach(([key, value]) => {
      cssVars[`--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`] = value;
    });
  }
  
  // Add primary color
  if (themeData.primaryColor) {
    cssVars['--primary'] = themeData.primaryColor;
  }
  
  // Add border radius
  if (themeData.borderRadius) {
    Object.entries(themeData.borderRadius).forEach(([key, value]) => {
      cssVars[`--radius${key !== 'md' ? '-' + key : ''}`] = value;
    });
  }
  
  return cssVars;
};

// Async thunk to fetch theme
export const fetchTheme = createAsyncThunk(
  'theme/fetchTheme',
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/theme');
      
      if (response.data.success && response.data.data) {
        const themeData = response.data.data;
        
        // Generate CSS variables if not provided
        if (!themeData.cssVariables) {
          themeData.cssVariables = generateCSSVariables(themeData);
        }
        
        // Check if theme has changed from cached version
        const currentState = getState();
        const cachedTheme = currentState.theme.theme;
        const hasChanged = !isThemeEqual(themeData, cachedTheme);

        return {
          theme: themeData,
          hasChanged,
          timestamp: Date.now(),
        };
      } else {
        // Return default theme
        return {
          theme: defaultTheme,
          hasChanged: true,
          timestamp: Date.now(),
        };
      }
    } catch (error) {
      console.error('Error fetching theme:', error);
      // Return cached theme on error instead of rejecting
      const currentState = getState();
      return {
        theme: currentState.theme.theme || defaultTheme,
        hasChanged: false,
        timestamp: currentState.theme.lastFetched || Date.now(),
        error: error.message,
      };
    }
  }
);

// Initial state
const initialState = {
  theme: defaultTheme,
  loading: false,
  error: null,
  lastFetched: null,
  needsRefresh: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // Action to manually refresh theme
    refreshTheme: (state) => {
      state.needsRefresh = true;
    },
    // Reset needsRefresh flag
    resetNeedsRefresh: (state) => {
      state.needsRefresh = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending state
      .addCase(fetchTheme.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled state
      .addCase(fetchTheme.fulfilled, (state, action) => {
        const { theme, hasChanged, timestamp, error } = action.payload;
        
        state.loading = false;
        state.error = error || null;
        
        // Only update if theme has changed
        if (hasChanged) {
          state.theme = theme;
          state.lastFetched = timestamp;
          console.log('✅ Theme updated (changed from cached version)');
        } else {
          // Theme hasn't changed, just update timestamp
          state.lastFetched = timestamp;
          console.log('✅ Theme unchanged, using cached version');
        }
        
        state.needsRefresh = false;
      })
      // Rejected state
      .addCase(fetchTheme.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch theme';
        state.needsRefresh = false;
      });
  },
});

// Export actions
export const { refreshTheme, resetNeedsRefresh } = themeSlice.actions;

// Selectors
export const selectTheme = (state) => state.theme.theme;
export const selectThemeLoading = (state) => state.theme.loading;
export const selectThemeError = (state) => state.theme.error;
export const selectThemeLastFetched = (state) => state.theme.lastFetched;
export const selectThemeNeedsRefresh = (state) => state.theme.needsRefresh;
export const selectShouldFetchTheme = (state) => {
  const { theme, lastFetched, needsRefresh } = state.theme;
  return needsRefresh || !lastFetched;
};

export default themeSlice.reducer;

