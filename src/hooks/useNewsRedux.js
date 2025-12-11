import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchNews,
  fetchNewsCategories,
  fetchNewsTags,
  selectNews,
  selectNewsLoading,
  selectNewsError,
  selectNewsLastFetched,
  resetNeedsRefresh,
} from '@/store/slices/newsSlice';

export const useNewsRedux = (params = {}) => {
  const dispatch = useAppDispatch();
  const hasCheckedRef = useRef(false);

  const news = useAppSelector(selectNews);
  const loading = useAppSelector(selectNewsLoading);
  const error = useAppSelector(selectNewsError);
  const lastFetched = useAppSelector(selectNewsLastFetched);

  useEffect(() => {
    if (hasCheckedRef.current) return;
    hasCheckedRef.current = true;

    dispatch(fetchNews(params)).then(() => {
      dispatch(resetNeedsRefresh());
    }).catch(() => {});

    dispatch(fetchNewsCategories()).catch(() => {});
    dispatch(fetchNewsTags()).catch(() => {});
  }, []);

  return {
    news,
    loading: !lastFetched ? loading : false,
    error,
  };
};

export default useNewsRedux;

