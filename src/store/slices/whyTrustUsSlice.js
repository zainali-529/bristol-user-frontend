import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '@/services/api';

// Default fallback content
const defaultCards = [
  {
    icon: 'Clock',
    title: '24/7 Rapid Response',
    description: "We're on call day and night to tackle gas or electricity faults and minimise downtime.",
    order: 1,
  },
  {
    icon: 'DollarSign',
    title: 'Transparent, Competitive Rates',
    description: "We're on call day and night to tackle gas or electricity faults and minimise downtime.",
    order: 2,
  },
  {
    icon: 'ShieldCheck',
    title: 'Safety and Compliance First',
    description: "We're on call day and night to tackle gas or electricity faults and minimise downtime.",
    order: 3,
  },
];

// Helper function to compare two arrays deeply
const isCardsEqual = (cards1, cards2) => {
  return JSON.stringify(cards1) === JSON.stringify(cards2);
};

// Async thunk to fetch trust cards
export const fetchTrustCards = createAsyncThunk(
  'whyTrustUs/fetchTrustCards',
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await apiService.getTrustCards();
      
      let newCards = [];
      if (response.data.success && response.data.data && response.data.data.length > 0) {
        newCards = response.data.data;
      } else {
        // Return default cards if no active cards
        newCards = defaultCards;
      }

      // Check if cards have changed from cached version
      const currentState = getState();
      const cachedCards = currentState.whyTrustUs.cards;
      const hasChanged = !isCardsEqual(newCards, cachedCards);

      return {
        cards: newCards,
        hasChanged,
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error('Error fetching trust cards:', error);
      // Return cached cards on error instead of rejecting
      const currentState = getState();
      return {
        cards: currentState.whyTrustUs.cards || defaultCards,
        hasChanged: false,
        timestamp: currentState.whyTrustUs.lastFetched || Date.now(),
        error: error.message,
      };
    }
  }
);

// Initial state
const initialState = {
  cards: defaultCards,
  loading: false,
  error: null,
  lastFetched: null,
  needsRefresh: false,
};

const whyTrustUsSlice = createSlice({
  name: 'whyTrustUs',
  initialState,
  reducers: {
    // Action to manually refresh trust cards
    refreshTrustCards: (state) => {
      state.needsRefresh = true;
    },
    // Action to clear trust cards cache (resets to default)
    clearTrustCardsCache: (state) => {
      state.cards = defaultCards;
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
      .addCase(fetchTrustCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled state
      .addCase(fetchTrustCards.fulfilled, (state, action) => {
        const { cards, hasChanged, timestamp, error } = action.payload;
        
        state.loading = false;
        state.error = error || null;
        
        // Only update if cards have changed
        if (hasChanged) {
          state.cards = cards;
          state.lastFetched = timestamp;
          console.log('✅ Trust cards updated (changed from cached version)');
        } else {
          // Cards haven't changed, just update timestamp
          state.lastFetched = timestamp;
          console.log('✅ Trust cards unchanged, using cached version');
        }
        
        state.needsRefresh = false;
      })
      // Rejected state (shouldn't happen as we handle errors in fulfilled)
      .addCase(fetchTrustCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch trust cards';
        // Keep existing cards on error
        state.needsRefresh = false;
      });
  },
});

// Export actions
export const { refreshTrustCards, clearTrustCardsCache, resetNeedsRefresh } = whyTrustUsSlice.actions;

// Selectors
export const selectTrustCards = (state) => state.whyTrustUs.cards;
export const selectTrustCardsLoading = (state) => state.whyTrustUs.loading;
export const selectTrustCardsError = (state) => state.whyTrustUs.error;
export const selectTrustCardsLastFetched = (state) => state.whyTrustUs.lastFetched;
export const selectTrustCardsNeedsRefresh = (state) => state.whyTrustUs.needsRefresh;
// Check if we need to fetch (no data exists or needsRefresh is true)
export const selectShouldFetchTrustCards = (state) => {
  const { cards, lastFetched, needsRefresh } = state.whyTrustUs;
  // Fetch if manually requested or if we don't have valid cached data
  return needsRefresh || !lastFetched || !cards || cards.length === 0;
};

export default whyTrustUsSlice.reducer;

