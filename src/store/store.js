import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import heroReducer from './slices/heroSlice';
import themeReducer from './slices/themeSlice';
import whyTrustUsReducer from './slices/whyTrustUsSlice';
import servicesReducer from './slices/servicesSlice';
import suppliersReducer from './slices/suppliersSlice';
import howWeWorkReducer from './slices/howWeWorkSlice';

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

// Redux Persist configuration for howWeWork slice
const howWeWorkPersistConfig = {
  key: 'howWeWork',
  storage,
  // Only persist these fields
  whitelist: ['steps', 'lastFetched'],
};

// Create persisted reducers
const persistedHeroReducer = persistReducer(heroPersistConfig, heroReducer);
const persistedThemeReducer = persistReducer(themePersistConfig, themeReducer);
const persistedWhyTrustUsReducer = persistReducer(whyTrustUsPersistConfig, whyTrustUsReducer);
const persistedServicesReducer = persistReducer(servicesPersistConfig, servicesReducer);
const persistedSuppliersReducer = persistReducer(suppliersPersistConfig, suppliersReducer);
const persistedHowWeWorkReducer = persistReducer(howWeWorkPersistConfig, howWeWorkReducer);

export const store = configureStore({
  reducer: {
    hero: persistedHeroReducer,
    theme: persistedThemeReducer,
    whyTrustUs: persistedWhyTrustUsReducer,
    services: persistedServicesReducer,
    suppliers: persistedSuppliersReducer,
    howWeWork: persistedHowWeWorkReducer,
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
          'howWeWork/fetchHowWeWorkSteps/pending',
          'howWeWork/fetchHowWeWorkSteps/fulfilled',
          'howWeWork/fetchHowWeWorkSteps/rejected',
        ],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);
