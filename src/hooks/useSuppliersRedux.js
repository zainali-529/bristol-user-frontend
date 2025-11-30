import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchSuppliers,
  selectSuppliers,
  selectSuppliersLoading,
  selectSuppliersError,
  selectSuppliersLastFetched,
  resetNeedsRefresh,
} from '@/store/slices/suppliersSlice';

/**
 * Custom hook to fetch and manage suppliers using Redux Persist
 * 
 * Cache Strategy:
 * - Data is persisted to localStorage via redux-persist (survives page reloads)
 * - Uses cached data immediately for instant rendering
 * - Always checks API on mount to detect content changes
 * - Updates only if API response differs from cached content
 * - No time-based expiry - cache persists until content actually changes
 * 
 * @param {Object} params - Optional params for filtering
 * @returns {Object} { suppliers, loading, error }
 */
export const useSuppliersRedux = (params = {}) => {
  const dispatch = useAppDispatch();
  const hasCheckedRef = useRef(false);
  
  // Select data from Redux store
  const suppliers = useAppSelector(selectSuppliers);
  const loading = useAppSelector(selectSuppliersLoading);
  const error = useAppSelector(selectSuppliersError);
  const lastFetched = useAppSelector(selectSuppliersLastFetched);

  useEffect(() => {
    // Only check once per component mount
    if (hasCheckedRef.current) return;
    hasCheckedRef.current = true;

    // Always check API on mount to see if content changed
    // Use cached data immediately, update silently if different
    if (lastFetched) {
      // We have cached data - use it immediately, check API in background
      console.log('✅ Using cached suppliers, checking for updates...');
    } else {
      // No cache - fetch normally
      console.log('🔄 Fetching suppliers from API (no cache)...');
    }
    
    // Always fetch to check for updates (updates only if content changed)
    dispatch(fetchSuppliers(params)).then(() => {
      dispatch(resetNeedsRefresh());
    }).catch(() => {
      // Silent fail - continue using cached data if API fails
    });
  }, []); // Only run once on mount

  return {
    suppliers,
    // Only show loading if we don't have cached content
    loading: !lastFetched ? loading : false,
    error,
  };
};

export default useSuppliersRedux;

