import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchServices,
  selectServices,
  selectServicesLoading,
  selectServicesError,
  selectServicesLastFetched,
  resetNeedsRefresh,
} from '@/store/slices/servicesSlice';

/**
 * Custom hook to fetch and manage services using Redux Persist
 * 
 * Cache Strategy:
 * - Data is persisted to localStorage via redux-persist (survives page reloads)
 * - Uses cached data immediately for instant rendering
 * - Always checks API on mount to detect content changes
 * - Updates only if API response differs from cached content
 * - No time-based expiry - cache persists until content actually changes
 * 
 * @param {Object} params - Optional params like { featured: true }
 * @returns {Object} { services, loading, error }
 */
export const useServicesRedux = (params = {}) => {
  const dispatch = useAppDispatch();
  const hasCheckedRef = useRef(false);
  
  // Select data from Redux store
  const services = useAppSelector(selectServices);
  const loading = useAppSelector(selectServicesLoading);
  const error = useAppSelector(selectServicesError);
  const lastFetched = useAppSelector(selectServicesLastFetched);

  useEffect(() => {
    // Only check once per component mount
    if (hasCheckedRef.current) return;
    hasCheckedRef.current = true;

    // Always check API on mount to see if content changed
    // Use cached data immediately, update silently if different
    if (lastFetched) {
      // We have cached data - use it immediately, check API in background
      console.log('✅ Using cached services, checking for updates...');
    } else {
      // No cache - fetch normally
      console.log('🔄 Fetching services from API (no cache)...');
    }
    
    // Always fetch to check for updates (updates only if content changed)
    dispatch(fetchServices(params)).then(() => {
      dispatch(resetNeedsRefresh());
    }).catch(() => {
      // Silent fail - continue using cached data if API fails
    });
  }, []); // Only run once on mount

  return {
    services,
    // Only show loading if we don't have cached content
    loading: !lastFetched ? loading : false,
    error,
  };
};

export default useServicesRedux;

