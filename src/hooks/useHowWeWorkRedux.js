import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchHowWeWorkSteps,
  selectHowWeWorkSteps,
  selectHowWeWorkLoading,
  selectHowWeWorkError,
  selectHowWeWorkLastFetched,
  resetNeedsRefresh,
} from '@/store/slices/howWeWorkSlice';

/**
 * Custom hook to fetch and manage how we work steps using Redux Persist
 * 
 * Cache Strategy:
 * - Data is persisted to localStorage via redux-persist (survives page reloads)
 * - Uses cached data immediately for instant rendering
 * - Always checks API on mount to detect content changes
 * - Updates only if API response differs from cached content
 * - No time-based expiry - cache persists until content actually changes
 * 
 * @returns {Object} { steps, loading, error }
 */
export const useHowWeWorkRedux = () => {
  const dispatch = useAppDispatch();
  const hasCheckedRef = useRef(false);
  
  // Select data from Redux store
  const steps = useAppSelector(selectHowWeWorkSteps);
  const loading = useAppSelector(selectHowWeWorkLoading);
  const error = useAppSelector(selectHowWeWorkError);
  const lastFetched = useAppSelector(selectHowWeWorkLastFetched);

  useEffect(() => {
    // Only check once per component mount
    if (hasCheckedRef.current) return;
    hasCheckedRef.current = true;

    // Always check API on mount to see if content changed
    // Use cached data immediately, update silently if different
    if (lastFetched) {
      // We have cached data - use it immediately, check API in background
      console.log('✅ Using cached how we work steps, checking for updates...');
    } else {
      // No cache - fetch normally
      console.log('🔄 Fetching how we work steps from API (no cache)...');
    }
    
    // Always fetch to check for updates (updates only if content changed)
    dispatch(fetchHowWeWorkSteps()).then(() => {
      dispatch(resetNeedsRefresh());
    }).catch(() => {
      // Silent fail - continue using cached data if API fails
    });
  }, []); // Only run once on mount

  return {
    steps,
    // Only show loading if we don't have cached content
    loading: !lastFetched ? loading : false,
    error,
  };
};

export default useHowWeWorkRedux;

