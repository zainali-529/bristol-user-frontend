import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '@/services/api';

// Default fallback content
const defaultServices = [];

// Helper function to compare two arrays deeply
const isServicesEqual = (services1, services2) => {
  return JSON.stringify(services1) === JSON.stringify(services2);
};

// Async thunk to fetch services list
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (params = {}, { getState, rejectWithValue }) => {
    try {
      const response = await apiService.getServices(params);
      
      let newServices = [];
      if (response.data.success && response.data.data && response.data.data.length > 0) {
        newServices = response.data.data;
      } else {
        newServices = defaultServices;
      }

      // Check if services have changed from cached version
      const currentState = getState();
      const cachedServices = currentState.services.services;
      const hasChanged = !isServicesEqual(newServices, cachedServices);

      return {
        services: newServices,
        hasChanged,
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error('Error fetching services:', error);
      // Return cached services on error instead of rejecting
      const currentState = getState();
      return {
        services: currentState.services.services || defaultServices,
        hasChanged: false,
        timestamp: currentState.services.lastFetched || Date.now(),
        error: error.message,
      };
    }
  }
);

// Async thunk to fetch single service by slug
export const fetchServiceBySlug = createAsyncThunk(
  'services/fetchServiceBySlug',
  async (slug, { getState, rejectWithValue }) => {
    try {
      const response = await apiService.getServiceBySlug(slug);
      
      if (response.data.success && response.data.data) {
        return {
          service: response.data.data,
          slug,
        };
      } else {
        return rejectWithValue('Service not found');
      }
    } catch (error) {
      console.error('Error fetching service:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch service');
    }
  }
);

// Initial state
const initialState = {
  services: defaultServices,
  selectedService: null,
  loading: false,
  loadingService: false,
  error: null,
  lastFetched: null,
  needsRefresh: false,
};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    // Action to manually refresh services
    refreshServices: (state) => {
      state.needsRefresh = true;
    },
    // Clear selected service
    clearSelectedService: (state) => {
      state.selectedService = null;
    },
    // Action to clear services cache (resets to default)
    clearServicesCache: (state) => {
      state.services = defaultServices;
      state.selectedService = null;
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
      // Fetch services list
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        const { services, hasChanged, timestamp, error } = action.payload;
        
        state.loading = false;
        state.error = error || null;
        
        // Only update if services have changed
        if (hasChanged) {
          state.services = services;
          state.lastFetched = timestamp;
          console.log('✅ Services updated (changed from cached version)');
        } else {
          // Services haven't changed, just update timestamp
          state.lastFetched = timestamp;
          console.log('✅ Services unchanged, using cached version');
        }
        
        state.needsRefresh = false;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch services';
        state.needsRefresh = false;
      })
      // Fetch service by slug
      .addCase(fetchServiceBySlug.pending, (state) => {
        state.loadingService = true;
        state.error = null;
      })
      .addCase(fetchServiceBySlug.fulfilled, (state, action) => {
        state.loadingService = false;
        state.selectedService = action.payload.service;
        state.error = null;
      })
      .addCase(fetchServiceBySlug.rejected, (state, action) => {
        state.loadingService = false;
        state.error = action.payload || 'Failed to fetch service';
        state.selectedService = null;
      });
  },
});

// Export actions
export const { refreshServices, clearSelectedService, clearServicesCache, resetNeedsRefresh } = servicesSlice.actions;

// Selectors
export const selectServices = (state) => state.services.services;
export const selectSelectedService = (state) => state.services.selectedService;
export const selectServicesLoading = (state) => state.services.loading;
export const selectServiceLoading = (state) => state.services.loadingService;
export const selectServicesError = (state) => state.services.error;
export const selectServicesLastFetched = (state) => state.services.lastFetched;
export const selectServicesNeedsRefresh = (state) => state.services.needsRefresh;
// Check if we need to fetch (no data exists or needsRefresh is true)
export const selectShouldFetchServices = (state) => {
  const { services, lastFetched, needsRefresh } = state.services;
  // Fetch if manually requested or if we don't have valid cached data
  return needsRefresh || !lastFetched || !services || services.length === 0;
};

export default servicesSlice.reducer;

