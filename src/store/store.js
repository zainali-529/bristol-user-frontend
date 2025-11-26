import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import heroReducer from './slices/heroSlice';
import themeReducer from './slices/themeSlice';

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

// Create persisted reducers
const persistedHeroReducer = persistReducer(heroPersistConfig, heroReducer);
const persistedThemeReducer = persistReducer(themePersistConfig, themeReducer);

export const store = configureStore({
  reducer: {
    hero: persistedHeroReducer,
    theme: persistedThemeReducer,
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
        ],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);
