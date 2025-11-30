import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchTrustCards,
  selectTrustCards,
  selectTrustCardsLoading,
  selectTrustCardsError,
  selectTrustCardsLastFetched,
  resetNeedsRefresh,
} from '@/store/slices/whyTrustUsSlice';

/**
 * Custom hook to fetch and manage trust cards using Redux Persist
 * 
 * Cache Strategy:
 * - Data is persisted to localStorage via redux-persist (survives page reloads)
 * - Uses cached data immediately for instant rendering
 * - Always checks API on mount to detect content changes
 * - Updates only if API response differs from cached content
 * - No time-based expiry - cache persists until content actually changes
 * 
 * @returns {Object} { cards, loading, error }
 */
export const useTrustCardsRedux = () => {
  const dispatch = useAppDispatch();
  const hasCheckedRef = useRef(false);
  
  // Select data from Redux store
  const cards = useAppSelector(selectTrustCards);
  const loading = useAppSelector(selectTrustCardsLoading);
  const error = useAppSelector(selectTrustCardsError);
  const lastFetched = useAppSelector(selectTrustCardsLastFetched);

  useEffect(() => {
    // Only check once per component mount
    if (hasCheckedRef.current) return;
    hasCheckedRef.current = true;

    // Always check API on mount to see if content changed
    // Use cached data immediately, update silently if different
    if (lastFetched) {
      // We have cached data - use it immediately, check API in background
      console.log('✅ Using cached trust cards, checking for updates...');
    } else {
      // No cache - fetch normally
      console.log('🔄 Fetching trust cards from API (no cache)...');
    }
    
    // Always fetch to check for updates (updates only if content changed)
    dispatch(fetchTrustCards()).then(() => {
      dispatch(resetNeedsRefresh());
    }).catch(() => {
      // Silent fail - continue using cached data if API fails
    });
  }, []); // Only run once on mount

  return {
    cards,
    // Only show loading if we don't have cached content
    loading: !lastFetched ? loading : false,
    error,
  };
};

export default useTrustCardsRedux;

