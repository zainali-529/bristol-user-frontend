import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '@/services/api';

const defaultTestimonials = [];

const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export const fetchTestimonials = createAsyncThunk(
  'testimonials/fetchTestimonials',
  async (params = {}, { getState }) => {
    try {
      const response = await apiService.getTestimonials(params);
      let newTestimonials = [];
      if (response.data?.success && Array.isArray(response.data?.data)) {
        newTestimonials = response.data.data;
      } else if (Array.isArray(response.data)) {
        newTestimonials = response.data;
      } else {
        newTestimonials = defaultTestimonials;
      }

      const cached = getState().testimonials?.testimonials || defaultTestimonials;
      const hasChanged = !isEqual(newTestimonials, cached);

      return {
        testimonials: newTestimonials,
        hasChanged,
        timestamp: Date.now(),
      };
    } catch (error) {
      const state = getState();
      return {
        testimonials: state.testimonials?.testimonials || defaultTestimonials,
        hasChanged: false,
        timestamp: state.testimonials?.lastFetched || Date.now(),
        error: error.message,
      };
    }
  }
);

const initialState = {
  testimonials: defaultTestimonials,
  loading: false,
  error: null,
  lastFetched: null,
  needsRefresh: false,
};

const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {
    refreshTestimonials: (state) => {
      state.needsRefresh = true;
    },
    clearTestimonialsCache: (state) => {
      state.testimonials = defaultTestimonials;
      state.lastFetched = null;
      state.needsRefresh = false;
      state.error = null;
    },
    resetNeedsRefresh: (state) => {
      state.needsRefresh = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        const { testimonials, hasChanged, timestamp, error } = action.payload;
        state.loading = false;
        state.error = error || null;
        if (hasChanged) {
          state.testimonials = testimonials;
          state.lastFetched = timestamp;
        } else {
          state.lastFetched = timestamp;
        }
        state.needsRefresh = false;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch testimonials';
        state.needsRefresh = false;
      });
  },
});

export const { refreshTestimonials, clearTestimonialsCache, resetNeedsRefresh } = testimonialsSlice.actions;

export const selectTestimonials = (state) => state.testimonials.testimonials;
export const selectTestimonialsLoading = (state) => state.testimonials.loading;
export const selectTestimonialsError = (state) => state.testimonials.error;
export const selectTestimonialsLastFetched = (state) => state.testimonials.lastFetched;
export const selectTestimonialsNeedsRefresh = (state) => state.testimonials.needsRefresh;
export const selectShouldFetchTestimonials = (state) => {
  const { testimonials, lastFetched, needsRefresh } = state.testimonials;
  return needsRefresh || !lastFetched || !testimonials || testimonials.length === 0;
};

export default testimonialsSlice.reducer;

