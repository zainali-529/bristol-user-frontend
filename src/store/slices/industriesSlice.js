import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '@/services/api';

// Default fallback content
const defaultIndustries = [];

// Helper function to compare two arrays deeply
const isIndustriesEqual = (industries1, industries2) => {
  return JSON.stringify(industries1) === JSON.stringify(industries2);
};

// Async thunk to fetch industries list
export const fetchIndustries = createAsyncThunk(
  'industries/fetchIndustries',
  async (params = {}, { getState }) => {
    try {
      const response = await apiService.getIndustries(params);

      let newIndustries = [];
      if (response.data?.success && Array.isArray(response.data?.data) && response.data.data.length > 0) {
        newIndustries = response.data.data;
      } else if (Array.isArray(response.data)) {
        // Some APIs return array directly
        newIndustries = response.data;
      } else {
        newIndustries = defaultIndustries;
      }

      // Check if industries have changed from cached version
      const currentState = getState();
      const cachedIndustries = currentState.industries?.industries || defaultIndustries;
      const hasChanged = !isIndustriesEqual(newIndustries, cachedIndustries);

      return {
        industries: newIndustries,
        hasChanged,
        timestamp: Date.now(),
      };
    } catch (error) {
      // Return cached industries on error instead of rejecting
      const currentState = getState();
      return {
        industries: currentState.industries?.industries || defaultIndustries,
        hasChanged: false,
        timestamp: currentState.industries?.lastFetched || Date.now(),
        error: error.message,
      };
    }
  }
);

// Initial state
const initialState = {
  industries: defaultIndustries,
  loading: false,
  error: null,
  lastFetched: null,
  needsRefresh: false,
};

const industriesSlice = createSlice({
  name: 'industries',
  initialState,
  reducers: {
    // Action to manually refresh industries
    refreshIndustries: (state) => {
      state.needsRefresh = true;
    },
    // Action to clear industries cache (resets to default)
    clearIndustriesCache: (state) => {
      state.industries = defaultIndustries;
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
      // Fetch industries list
      .addCase(fetchIndustries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIndustries.fulfilled, (state, action) => {
        const { industries, hasChanged, timestamp, error } = action.payload;

        state.loading = false;
        state.error = error || null;

        // Only update if industries have changed
        if (hasChanged) {
          state.industries = industries;
          state.lastFetched = timestamp;
        } else {
          // Industries haven't changed, just update timestamp
          state.lastFetched = timestamp;
        }

        state.needsRefresh = false;
      })
      .addCase(fetchIndustries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch industries';
        state.needsRefresh = false;
      });
  },
});

// Export actions
export const { refreshIndustries, clearIndustriesCache, resetNeedsRefresh } = industriesSlice.actions;

// Selectors
export const selectIndustries = (state) => state.industries.industries;
export const selectIndustriesLoading = (state) => state.industries.loading;
export const selectIndustriesError = (state) => state.industries.error;
export const selectIndustriesLastFetched = (state) => state.industries.lastFetched;
export const selectIndustriesNeedsRefresh = (state) => state.industries.needsRefresh;
// Check if we need to fetch (no data exists or needsRefresh is true)
export const selectShouldFetchIndustries = (state) => {
  const { industries, lastFetched, needsRefresh } = state.industries;
  return needsRefresh || !lastFetched || !industries || industries.length === 0;
};

export default industriesSlice.reducer;

