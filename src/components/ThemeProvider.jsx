import { useEffect } from 'react'
import { useThemeRedux } from '@/hooks/useThemeRedux'

/**
 * Theme Provider Component
 * Fetches theme from API using Redux and applies it to the application
 * Should be placed at the root of your app
 */
function ThemeProvider({ children }) {
  const { loading, error } = useThemeRedux()

  useEffect(() => {
    if (error) {
      console.warn('Theme loading error, using default theme:', error)
    }
  }, [error])

  // Theme is applied automatically by the hook via CSS variables
  // No need to block rendering while loading
  return <>{children}</>
}

export default ThemeProvider
