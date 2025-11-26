import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, X, Moon, Sun } from 'lucide-react'
import Logo from './Logo'

function TopNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const location = useLocation()

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Get a Quote', path: '/quote' },
    { name: 'News', path: '/news' },
  ]

  // Check for saved theme preference or default to light mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const isDark = savedTheme === 'dark'
    setDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }
 
  return (
    <nav className="w-full bg-background sticky top-0 z-50 backdrop-blur-sm bg-opacity-95" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-base font-medium transition-colors duration-200 relative py-2 hover:opacity-80"
                style={{
                  color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-primary)',
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side - Dark Mode Toggle & Contact Button */}
          <div className="hidden md:flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-full transition-all duration-300 hover:scale-110"
              style={{
                backgroundColor: 'var(--primary-10)',
                color: 'var(--primary)',
              }}
              aria-label="Toggle dark mode"
            >
              <div className="relative w-5 h-5">
                <Sun
                  className={`absolute inset-0 transition-all duration-300 ${
                    darkMode ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
                  }`}
                  size={20}
                />
                <Moon
                  className={`absolute inset-0 transition-all duration-300 ${
                    darkMode ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
                  }`}
                  size={20}
                />
              </div>
            </button>

            {/* Contact Us Button - Styled like image */}
            <button
              className="relative overflow-hidden rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-0 pr-2 pl-6 py-2 group"
              style={{
                background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))',
                color: 'white',
              }}
            >
              <span className="relative z-10">Contact Us</span>
              <div
                className="ml-3 w-10 h-10 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:rotate-45"
                style={{ color: 'var(--primary)' }}
              >
                <ArrowUpRight size={20} strokeWidth={2.5} />
              </div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: 'var(--primary-10)',
                color: 'var(--primary)',
              }}
              aria-label="Toggle dark mode"
            >
              <div className="relative w-5 h-5">
                <Sun
                  className={`absolute inset-0 transition-all duration-300 ${
                    darkMode ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
                  }`}
                  size={20}
                />
                <Moon
                  className={`absolute inset-0 transition-all duration-300 ${
                    darkMode ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
                  }`}
                  size={20}
                />
              </div>
            </button>

            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md transition-colors duration-200"
              style={{ color: 'var(--text-primary)' }}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute inset-0 transition-all duration-300 ${
                    mobileMenuOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
                  }`}
                  size={24}
                />
                <X
                  className={`absolute inset-0 transition-all duration-300 ${
                    mobileMenuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
                  }`}
                  size={24}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            mobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-3">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200"
                style={{
                  backgroundColor: location.pathname === link.path ? 'var(--primary-10)' : 'transparent',
                  color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-primary)',
                  transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Contact Button */}
            <button
              className="w-full mt-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 py-3"
              style={{
                background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-80))',
                color: 'white',
              }}
            >
              <span>Contact Us</span>
              <div
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center"
                style={{ color: 'var(--primary)' }}
              >
                <ArrowUpRight size={18} strokeWidth={2.5} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default TopNav

