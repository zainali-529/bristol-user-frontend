import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchIndustries,
  selectIndustries,
  selectIndustriesLoading,
  selectIndustriesError,
  selectIndustriesLastFetched,
  resetNeedsRefresh,
} from '@/store/slices/industriesSlice';

/**
 * Custom hook to fetch and manage industries using Redux Persist
 *
 * Cache Strategy:
 * - Data is persisted to localStorage via redux-persist (survives page reloads)
 * - Uses cached data immediately for instant rendering
 * - Always checks API on mount to detect content changes
 * - Updates only if API response differs from cached content
 * - No time-based expiry - cache persists until content actually changes
 *
 * @param {Object} params - Optional params for filtering
 * @returns {Object} { industries, loading, error }
 */
export const useIndustriesRedux = (params = {}) => {
  const dispatch = useAppDispatch();
  const hasCheckedRef = useRef(false);
  
  // Select data from Redux store
  const industries = useAppSelector(selectIndustries);
  const loading = useAppSelector(selectIndustriesLoading);
  const error = useAppSelector(selectIndustriesError);
  const lastFetched = useAppSelector(selectIndustriesLastFetched);

  useEffect(() => {
    if (hasCheckedRef.current) return;
    hasCheckedRef.current = true;

    if (lastFetched) {
      // We have cached data - use it immediately, check API in background
      console.log('✅ Using cached industries, checking for updates...');
    } else {
      // No cache - fetch normally
      console.log('🔄 Fetching industries from API (no cache)...');
    }
    
    // Always fetch to check for updates (updates only if content changed)
    dispatch(fetchIndustries(params)).then(() => {
      dispatch(resetNeedsRefresh());
    }).catch(() => {
      // Silent fail - continue using cached data if API fails
    });
  }, []);

  return {
    industries,
    // Only show loading if we don't have cached content
    loading: !lastFetched ? loading : false,
    error,
  };
};

export default useIndustriesRedux;

