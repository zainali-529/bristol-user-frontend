import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import heroReducer from './slices/heroSlice';
import themeReducer from './slices/themeSlice';
import whyTrustUsReducer from './slices/whyTrustUsSlice';
import servicesReducer from './slices/servicesSlice';
import suppliersReducer from './slices/suppliersSlice';
import industriesReducer from './slices/industriesSlice';
import testimonialsReducer from './slices/testimonialsSlice';
import teamMembersReducer from './slices/teamMembersSlice';
import howWeWorkReducer from './slices/howWeWorkSlice';
import faqsReducer from './slices/faqsSlice';
import newsReducer from './slices/newsSlice';

// Redux Persist configuration for hero slice
const heroPersistConfig = {
  key: 'hero',
  storage,
  // Only persist these fields
  whitelist: ['heroContent', 'lastFetched'],
};

// Redux Persist configuration for theme slice
const themePersistConfig = {
  key: 'theme',
  storage,
  // Only persist these fields
  whitelist: ['theme', 'lastFetched'],
};

// Redux Persist configuration for whyTrustUs slice
const whyTrustUsPersistConfig = {
  key: 'whyTrustUs',
  storage,
  // Only persist these fields
  whitelist: ['cards', 'lastFetched'],
};

// Redux Persist configuration for services slice
const servicesPersistConfig = {
  key: 'services',
  storage,
  // Only persist these fields
  whitelist: ['services', 'lastFetched'],
};

// Redux Persist configuration for suppliers slice
const suppliersPersistConfig = {
  key: 'suppliers',
  storage,
  // Only persist these fields
  whitelist: ['suppliers', 'lastFetched'],
};

// Redux Persist configuration for industries slice
const industriesPersistConfig = {
  key: 'industries',
  storage,
  // Only persist these fields
  whitelist: ['industries', 'lastFetched'],
};

// Redux Persist configuration for howWeWork slice
const howWeWorkPersistConfig = {
  key: 'howWeWork',
  storage,
  // Only persist these fields
  whitelist: ['steps', 'lastFetched'],
};

// Redux Persist configuration for testimonials slice
const testimonialsPersistConfig = {
  key: 'testimonials',
  storage,
  whitelist: ['testimonials', 'lastFetched'],
};

// Redux Persist configuration for team members slice
const teamMembersPersistConfig = {
  key: 'teamMembers',
  storage,
  whitelist: ['teamMembers', 'lastFetched'],
};

// Redux Persist configuration for faqs slice
const faqsPersistConfig = {
  key: 'faqs',
  storage,
  whitelist: ['faqs', 'categories', 'lastFetched'],
};

// Redux Persist configuration for news slice
const newsPersistConfig = {
  key: 'news',
  storage,
  whitelist: ['news', 'lastFetched', 'categories', 'tags'],
};

// Create persisted reducers
const persistedHeroReducer = persistReducer(heroPersistConfig, heroReducer);
const persistedThemeReducer = persistReducer(themePersistConfig, themeReducer);
const persistedWhyTrustUsReducer = persistReducer(whyTrustUsPersistConfig, whyTrustUsReducer);
const persistedServicesReducer = persistReducer(servicesPersistConfig, servicesReducer);
const persistedSuppliersReducer = persistReducer(suppliersPersistConfig, suppliersReducer);
const persistedIndustriesReducer = persistReducer(industriesPersistConfig, industriesReducer);
const persistedHowWeWorkReducer = persistReducer(howWeWorkPersistConfig, howWeWorkReducer);
const persistedTestimonialsReducer = persistReducer(testimonialsPersistConfig, testimonialsReducer);
const persistedTeamMembersReducer = persistReducer(teamMembersPersistConfig, teamMembersReducer);
const persistedFaqsReducer = persistReducer(faqsPersistConfig, faqsReducer);
const persistedNewsReducer = persistReducer(newsPersistConfig, newsReducer);

export const store = configureStore({
  reducer: {
    hero: persistedHeroReducer,
    theme: persistedThemeReducer,
    whyTrustUs: persistedWhyTrustUsReducer,
    services: persistedServicesReducer,
    suppliers: persistedSuppliersReducer,
    industries: persistedIndustriesReducer,
    howWeWork: persistedHowWeWorkReducer,
    testimonials: persistedTestimonialsReducer,
    teamMembers: persistedTeamMembersReducer,
    faqs: persistedFaqsReducer,
    news: persistedNewsReducer,
    // Add other reducers here as needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for redux-persist
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER',
          'hero/fetchHeroContent/pending',
          'hero/fetchHeroContent/fulfilled',
          'hero/fetchHeroContent/rejected',
          'theme/fetchTheme/pending',
          'theme/fetchTheme/fulfilled',
          'theme/fetchTheme/rejected',
          'whyTrustUs/fetchTrustCards/pending',
          'whyTrustUs/fetchTrustCards/fulfilled',
          'whyTrustUs/fetchTrustCards/rejected',
          'services/fetchServices/pending',
          'services/fetchServices/fulfilled',
          'services/fetchServices/rejected',
          'suppliers/fetchSuppliers/pending',
          'suppliers/fetchSuppliers/fulfilled',
          'suppliers/fetchSuppliers/rejected',
          'industries/fetchIndustries/pending',
          'industries/fetchIndustries/fulfilled',
          'industries/fetchIndustries/rejected',
          'howWeWork/fetchHowWeWorkSteps/pending',
          'howWeWork/fetchHowWeWorkSteps/fulfilled',
          'howWeWork/fetchHowWeWorkSteps/rejected',
          'testimonials/fetchTestimonials/pending',
          'testimonials/fetchTestimonials/fulfilled',
          'testimonials/fetchTestimonials/rejected',
          'teamMembers/fetchTeamMembers/pending',
          'teamMembers/fetchTeamMembers/fulfilled',
          'teamMembers/fetchTeamMembers/rejected',
          'faqs/fetchFaqs/pending',
          'faqs/fetchFaqs/fulfilled',
          'faqs/fetchFaqs/rejected',
          'faqs/fetchFaqCategories/pending',
          'faqs/fetchFaqCategories/fulfilled',
          'faqs/fetchFaqCategories/rejected',
          'news/fetchNews/pending',
          'news/fetchNews/fulfilled',
          'news/fetchNews/rejected',
          'news/fetchNewsBySlug/pending',
          'news/fetchNewsBySlug/fulfilled',
          'news/fetchNewsBySlug/rejected',
          'news/fetchNewsCategories/fulfilled',
          'news/fetchNewsTags/fulfilled',
        ],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);
