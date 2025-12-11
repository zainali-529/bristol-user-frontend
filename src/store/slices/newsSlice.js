import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '@/services/api';

const defaultNews = [];

const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (params = {}, { getState }) => {
    try {
      const response = await apiService.getNews(params);
      let items = [];
      if (response.data?.success && Array.isArray(response.data?.data)) {
        items = response.data.data;
      } else {
        items = defaultNews;
      }

      const currentState = getState();
      const cached = currentState.news.news;
      const hasChanged = !isEqual(items, cached);

      return {
        news: items,
        total: response.data?.total ?? items.length,
        totalPages: response.data?.totalPages ?? 1,
        currentPage: response.data?.currentPage ?? 1,
        hasChanged,
        timestamp: Date.now(),
      };
    } catch (error) {
      const currentState = getState();
      return {
        news: currentState.news.news || defaultNews,
        total: currentState.news.total || 0,
        totalPages: currentState.news.totalPages || 1,
        currentPage: currentState.news.currentPage || 1,
        hasChanged: false,
        timestamp: currentState.news.lastFetched || Date.now(),
        error: error.message,
      };
    }
  }
);

export const fetchNewsBySlug = createAsyncThunk(
  'news/fetchNewsBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await apiService.getNewsBySlug(slug);
      if (response.data?.success && response.data?.data) {
        return {
          article: response.data.data,
          related: response.data.relatedNews || [],
          slug,
        };
      }
      return rejectWithValue('News article not found');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch news');
    }
  }
);

export const fetchNewsCategories = createAsyncThunk(
  'news/fetchNewsCategories',
  async () => {
    const response = await apiService.getNewsCategories();
    return response.data?.data || [];
  }
);

export const fetchNewsTags = createAsyncThunk(
  'news/fetchNewsTags',
  async (limit = 20) => {
    const response = await apiService.getNewsTags(limit);
    return response.data?.data || [];
  }
);

const initialState = {
  news: defaultNews,
  total: 0,
  totalPages: 1,
  currentPage: 1,
  selectedArticle: null,
  relatedNews: [],
  categories: [],
  tags: [],
  loading: false,
  loadingArticle: false,
  error: null,
  lastFetched: null,
  needsRefresh: false,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    refreshNews: (state) => { state.needsRefresh = true; },
    clearSelectedArticle: (state) => {
      state.selectedArticle = null;
      state.relatedNews = [];
    },
    clearNewsCache: (state) => {
      state.news = defaultNews;
      state.total = 0;
      state.totalPages = 1;
      state.currentPage = 1;
      state.lastFetched = null;
      state.needsRefresh = false;
      state.error = null;
    },
    resetNeedsRefresh: (state) => { state.needsRefresh = false; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        const { news, total, totalPages, currentPage, hasChanged, timestamp, error } = action.payload;
        state.loading = false;
        state.error = error || null;
        state.total = total;
        state.totalPages = totalPages;
        state.currentPage = currentPage;
        if (hasChanged) {
          state.news = news;
          state.lastFetched = timestamp;
        } else {
          state.lastFetched = timestamp;
        }
        state.needsRefresh = false;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch news';
        state.needsRefresh = false;
      })
      .addCase(fetchNewsBySlug.pending, (state) => {
        state.loadingArticle = true;
        state.error = null;
      })
      .addCase(fetchNewsBySlug.fulfilled, (state, action) => {
        state.loadingArticle = false;
        state.selectedArticle = action.payload.article;
        state.relatedNews = action.payload.related || [];
      })
      .addCase(fetchNewsBySlug.rejected, (state, action) => {
        state.loadingArticle = false;
        state.error = action.payload || 'Failed to fetch news';
        state.selectedArticle = null;
        state.relatedNews = [];
      })
      .addCase(fetchNewsCategories.fulfilled, (state, action) => {
        state.categories = action.payload || [];
      })
      .addCase(fetchNewsTags.fulfilled, (state, action) => {
        state.tags = action.payload || [];
      });
  },
});

export const { refreshNews, clearSelectedArticle, clearNewsCache, resetNeedsRefresh } = newsSlice.actions;

export const selectNews = (state) => state.news.news;
export const selectNewsLoading = (state) => state.news.loading;
export const selectNewsError = (state) => state.news.error;
export const selectNewsLastFetched = (state) => state.news.lastFetched;
export const selectNewsMeta = (state) => ({ total: state.news.total, totalPages: state.news.totalPages, currentPage: state.news.currentPage });
export const selectSelectedArticle = (state) => state.news.selectedArticle;
export const selectRelatedNews = (state) => state.news.relatedNews;
export const selectNewsCategories = (state) => state.news.categories;
export const selectNewsTags = (state) => state.news.tags;
export const selectShouldFetchNews = (state) => {
  const { news, lastFetched, needsRefresh } = state.news;
  return needsRefresh || !lastFetched || !news || news.length === 0;
};

export default newsSlice.reducer;

