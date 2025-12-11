import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiService from '@/services/api'

const defaultFaqs = []
const defaultCategories = ['All']

const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b)

export const fetchFaqs = createAsyncThunk(
  'faqs/fetchFaqs',
  async (params = {}, { getState }) => {
    try {
      const response = await apiService.getFAQs(params)
      let newFaqs = []
      if (response.data?.success && Array.isArray(response.data?.data)) {
        newFaqs = response.data.data
      } else if (Array.isArray(response.data)) {
        newFaqs = response.data
      } else {
        newFaqs = defaultFaqs
      }

      const cached = getState().faqs?.faqs || defaultFaqs
      const hasChanged = !isEqual(newFaqs, cached)

      return {
        faqs: newFaqs,
        hasChanged,
        timestamp: Date.now(),
      }
    } catch (error) {
      const state = getState()
      return {
        faqs: state.faqs?.faqs || defaultFaqs,
        hasChanged: false,
        timestamp: state.faqs?.lastFetched || Date.now(),
        error: error.message,
      }
    }
  }
)

export const fetchFaqCategories = createAsyncThunk(
  'faqs/fetchFaqCategories',
  async (_, { getState }) => {
    try {
      const response = await apiService.getFAQCategories()
      let cats = []
      if (response.data?.success && Array.isArray(response.data?.data)) {
        cats = response.data.data
      } else if (Array.isArray(response.data)) {
        cats = response.data
      } else {
        cats = []
      }
      const withAll = cats.includes('All') ? cats : ['All', ...cats]
      return { categories: withAll }
    } catch (error) {
      const state = getState()
      return {
        categories: state.faqs?.categories || defaultCategories,
        error: error.message,
      }
    }
  }
)

const initialState = {
  faqs: defaultFaqs,
  categories: defaultCategories,
  loading: false,
  error: null,
  lastFetched: null,
  needsRefresh: false,
}

const faqsSlice = createSlice({
  name: 'faqs',
  initialState,
  reducers: {
    refreshFaqs: (state) => {
      state.needsRefresh = true
    },
    clearFaqsCache: (state) => {
      state.faqs = defaultFaqs
      state.categories = defaultCategories
      state.lastFetched = null
      state.needsRefresh = false
      state.error = null
    },
    resetNeedsRefresh: (state) => {
      state.needsRefresh = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaqs.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchFaqs.fulfilled, (state, action) => {
        const { faqs, hasChanged, timestamp, error } = action.payload
        state.loading = false
        state.error = error || null
        if (hasChanged) {
          state.faqs = faqs
          state.lastFetched = timestamp
        } else {
          state.lastFetched = timestamp
        }
        state.needsRefresh = false
      })
      .addCase(fetchFaqs.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch FAQs'
        state.needsRefresh = false
      })
      .addCase(fetchFaqCategories.fulfilled, (state, action) => {
        const { categories, error } = action.payload
        state.categories = Array.isArray(categories) && categories.length > 0 ? categories : state.categories
        state.error = error || state.error
      })
  },
})

export const { refreshFaqs, clearFaqsCache, resetNeedsRefresh } = faqsSlice.actions

export const selectFaqs = (state) => state.faqs.faqs
export const selectFaqCategories = (state) => state.faqs.categories
export const selectFaqsLoading = (state) => state.faqs.loading
export const selectFaqsError = (state) => state.faqs.error
export const selectFaqsLastFetched = (state) => state.faqs.lastFetched
export const selectFaqsNeedsRefresh = (state) => state.faqs.needsRefresh
export const selectShouldFetchFaqs = (state) => {
  const { faqs, lastFetched, needsRefresh } = state.faqs
  return needsRefresh || !lastFetched || !faqs || faqs.length === 0
}

export default faqsSlice.reducer

