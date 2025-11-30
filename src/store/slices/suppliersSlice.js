import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '@/services/api';

// Default fallback content
const defaultSuppliers = [];

// Helper function to compare two arrays deeply
const isSuppliersEqual = (suppliers1, suppliers2) => {
  return JSON.stringify(suppliers1) === JSON.stringify(suppliers2);
};

// Async thunk to fetch suppliers list
export const fetchSuppliers = createAsyncThunk(
  'suppliers/fetchSuppliers',
  async (params = {}, { getState, rejectWithValue }) => {
    try {
      const response = await apiService.getSuppliers(params);
      
      let newSuppliers = [];
      if (response.data.success && response.data.data && response.data.data.length > 0) {
        newSuppliers = response.data.data;
      } else {
        newSuppliers = defaultSuppliers;
      }

      // Check if suppliers have changed from cached version
      const currentState = getState();
      const cachedSuppliers = currentState.suppliers.suppliers;
      const hasChanged = !isSuppliersEqual(newSuppliers, cachedSuppliers);

      return {
        suppliers: newSuppliers,
        hasChanged,
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      // Return cached suppliers on error instead of rejecting
      const currentState = getState();
      return {
        suppliers: currentState.suppliers.suppliers || defaultSuppliers,
        hasChanged: false,
        timestamp: currentState.suppliers.lastFetched || Date.now(),
        error: error.message,
      };
    }
  }
);

// Initial state
const initialState = {
  suppliers: defaultSuppliers,
  loading: false,
  error: null,
  lastFetched: null,
  needsRefresh: false,
};

const suppliersSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {
    // Action to manually refresh suppliers
    refreshSuppliers: (state) => {
      state.needsRefresh = true;
    },
    // Action to clear suppliers cache (resets to default)
    clearSuppliersCache: (state) => {
      state.suppliers = defaultSuppliers;
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
      // Fetch suppliers list
      .addCase(fetchSuppliers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        const { suppliers, hasChanged, timestamp, error } = action.payload;
        
        state.loading = false;
        state.error = error || null;
        
        // Only update if suppliers have changed
        if (hasChanged) {
          state.suppliers = suppliers;
          state.lastFetched = timestamp;
          console.log('✅ Suppliers updated (changed from cached version)');
        } else {
          // Suppliers haven't changed, just update timestamp
          state.lastFetched = timestamp;
          console.log('✅ Suppliers unchanged, using cached version');
        }
        
        state.needsRefresh = false;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch suppliers';
        state.needsRefresh = false;
      });
  },
});

// Export actions
export const { refreshSuppliers, clearSuppliersCache, resetNeedsRefresh } = suppliersSlice.actions;

// Selectors
export const selectSuppliers = (state) => state.suppliers.suppliers;
export const selectSuppliersLoading = (state) => state.suppliers.loading;
export const selectSuppliersError = (state) => state.suppliers.error;
export const selectSuppliersLastFetched = (state) => state.suppliers.lastFetched;
export const selectSuppliersNeedsRefresh = (state) => state.suppliers.needsRefresh;
// Check if we need to fetch (no data exists or needsRefresh is true)
export const selectShouldFetchSuppliers = (state) => {
  const { suppliers, lastFetched, needsRefresh } = state.suppliers;
  // Fetch if manually requested or if we don't have valid cached data
  return needsRefresh || !lastFetched || !suppliers || suppliers.length === 0;
};

export default suppliersSlice.reducer;

