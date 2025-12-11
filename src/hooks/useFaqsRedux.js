import { useEffect, useRef, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  fetchFaqs,
  fetchFaqCategories,
  selectFaqs,
  selectFaqCategories,
  selectFaqsLoading,
  selectFaqsError,
  selectFaqsLastFetched,
  resetNeedsRefresh,
} from '@/store/slices/faqsSlice'

export const useFaqsRedux = (params = {}) => {
  const dispatch = useAppDispatch()
  const hasCheckedRef = useRef(false)
  const faqs = useAppSelector(selectFaqs)
  const categories = useAppSelector(selectFaqCategories)
  const loading = useAppSelector(selectFaqsLoading)
  const error = useAppSelector(selectFaqsError)
  const lastFetched = useAppSelector(selectFaqsLastFetched)

  useEffect(() => {
    if (hasCheckedRef.current) return
    hasCheckedRef.current = true

    dispatch(fetchFaqs(params))
      .then(() => {
        dispatch(fetchFaqCategories())
      })
      .then(() => {
        dispatch(resetNeedsRefresh())
      })
      .catch(() => {})
  }, [])

  const derivedCategories = useMemo(() => {
    const set = new Set(categories && categories.length ? categories : ['All'])
    if (!categories || categories.length === 0) {
      if (faqs && faqs.length) {
        faqs.forEach((f) => {
          if (f.category) set.add(f.category)
        })
      }
    }
    return Array.from(set)
  }, [categories, faqs])

  return {
    faqs,
    categories: derivedCategories,
    loading: !lastFetched ? loading : false,
    error,
  }
}

export default useFaqsRedux
