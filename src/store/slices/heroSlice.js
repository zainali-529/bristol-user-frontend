import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axios';

// Default fallback content
const defaultContent = {
  badgeLabel: "Powering UK's Businesses",
  headline: 'We power your business with the best energy deals',
  subheadline: "Orca Business Solutions is a new name, but we're built on real experience.",
  primaryCta: { label: 'Explore Us', link: '/about' },
  secondaryCta: { label: 'Contact Us', link: '/contact' },
  background: {
    type: 'video',
    videoUrl: '/videos/hero-bg-video.mp4',
    imageUrl: '',
    overlay: false,
    overlayOpacity: 40
  },
  particles: {
    enabled: true,
    count: 80,
    color: '#ffffff',
    size: 3,
    speed: 2,
    lineColor: '#ffffff',
    lineOpacity: 0.4,
    interactivity: true
  }
};

// Helper function to compare two objects deeply
const isContentEqual = (content1, content2) => {
  return JSON.stringify(content1) === JSON.stringify(content2);
};

// Async thunk to fetch hero content
export const fetchHeroContent = createAsyncThunk(
  'hero/fetchHeroContent',
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/hero/active');
      
      let newContent;
      if (response.data.success && response.data.data) {
        newContent = response.data.data;
      } else {
        // Return default content if no active hero
        newContent = defaultContent;
      }

      // Check if content has changed from cached version
      const currentState = getState();
      const cachedContent = currentState.hero.heroContent;
      const hasChanged = !isContentEqual(newContent, cachedContent);

      return {
        content: newContent,
        hasChanged,
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error('Error fetching hero content:', error);
      // Return cached content on error instead of rejecting
      const currentState = getState();
      return {
        content: currentState.hero.heroContent || defaultContent,
        hasChanged: false,
        timestamp: currentState.hero.lastFetched || Date.now(),
        error: error.message,
      };
    }
  }
);

// Initial state
const initialState = {
  heroContent: defaultContent,
  loading: false,
  error: null,
  lastFetched: null, // Timestamp of last successful fetch (for reference only)
  needsRefresh: false, // Flag to indicate if we need to fetch
};

const heroSlice = createSlice({
  name: 'hero',
  initialState,
  reducers: {
    // Action to manually refresh hero content
    refreshHeroContent: (state) => {
      state.needsRefresh = true;
    },
    // Action to clear hero cache (resets to default)
    clearHeroCache: (state) => {
      state.heroContent = defaultContent;
      state.lastFetched = null;
      state.needsRefresh = false;
      state.error = null;
    },
    // Reset needsRefresh flag (used internally)
    resetNeedsRefresh: (state) => {
      state.needsRefresh = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending state
      .addCase(fetchHeroContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled state
      .addCase(fetchHeroContent.fulfilled, (state, action) => {
        const { content, hasChanged, timestamp, error } = action.payload;
        
        state.loading = false;
        state.error = error || null;
        
        // Only update if content has changed
        if (hasChanged) {
          state.heroContent = content;
          state.lastFetched = timestamp;
          console.log('✅ Hero content updated (changed from cached version)');
        } else {
          // Content hasn't changed, just update timestamp
          state.lastFetched = timestamp;
          console.log('✅ Hero content unchanged, using cached version');
        }
        
        state.needsRefresh = false;
      })
      // Rejected state (shouldn't happen as we handle errors in fulfilled)
      .addCase(fetchHeroContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch hero content';
        // Keep existing heroContent on error
        state.needsRefresh = false;
      });
  },
});

// Export actions
export const { refreshHeroContent, clearHeroCache, resetNeedsRefresh } = heroSlice.actions;

// Selectors
export const selectHeroContent = (state) => state.hero.heroContent;
export const selectHeroLoading = (state) => state.hero.loading;
export const selectHeroError = (state) => state.hero.error;
export const selectHeroLastFetched = (state) => state.hero.lastFetched;
export const selectHeroNeedsRefresh = (state) => state.hero.needsRefresh;
// Check if we need to fetch (no data exists or needsRefresh is true)
export const selectShouldFetchHero = (state) => {
  const { heroContent, lastFetched, needsRefresh } = state.hero;
  // Fetch if manually requested or if we don't have valid cached data
  return needsRefresh || !lastFetched || !heroContent || heroContent === defaultContent;
};

export default heroSlice.reducer;
