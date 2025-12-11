import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchTestimonials,
  selectTestimonials,
  selectTestimonialsLoading,
  selectTestimonialsError,
  selectTestimonialsLastFetched,
  resetNeedsRefresh,
} from '@/store/slices/testimonialsSlice';

export const useTestimonialsRedux = (params = {}) => {
  const dispatch = useAppDispatch();
  const hasCheckedRef = useRef(false);
  const testimonials = useAppSelector(selectTestimonials);
  const loading = useAppSelector(selectTestimonialsLoading);
  const error = useAppSelector(selectTestimonialsError);
  const lastFetched = useAppSelector(selectTestimonialsLastFetched);

  useEffect(() => {
    if (hasCheckedRef.current) return;
    hasCheckedRef.current = true;

    if (lastFetched) {
      console.log('✅ Using cached testimonials, checking for updates...');
    } else {
      console.log('🔄 Fetching testimonials from API (no cache)...');
    }

    dispatch(fetchTestimonials(params)).then(() => {
      dispatch(resetNeedsRefresh());
    }).catch(() => {});
  }, []);

  return {
    testimonials,
    loading: !lastFetched ? loading : false,
    error,
  };
};

export default useTestimonialsRedux;

