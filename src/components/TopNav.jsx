import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, Moon, Sun } from 'lucide-react'
import Logo from './Logo'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from './ui/sheet'

function TopNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const location = useLocation()

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Energy Prices', path: '/energy-price-tracker' },
    { name: 'Postcode Finder', path: '/postcode-finder' },
    { name: 'Get a Quote', path: '/quote' },
    { name: 'News', path: '/news' },
    // { name: 'Contact', path: '/#contact' },
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

  return (
    <nav className="w-full bg-background sticky top-0 z-50 backdrop-blur-sm bg-opacity-95" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium transition-colors duration-200 relative py-2 hover:opacity-80"
                style={{
                  color: (link.path.includes('#')
                    ? (location.pathname === '/' && location.hash === link.path.substring(link.path.indexOf('#')))
                    : location.pathname === link.path)
                    ? 'var(--primary)'
                    : 'var(--text-primary)',
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side - Dark Mode Toggle & Contact Button */}
          <div className="hidden lg:flex items-center gap-4">
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
            <Link
              to="/contact"
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
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
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

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2 rounded-md transition-colors duration-200"
                  style={{ color: 'var(--text-primary)' }}
                  aria-label="Toggle menu"
                >
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-background">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <Logo />
                  </SheetTitle>
                  <SheetDescription className="sr-only">Mobile Navigation</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8 px-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium transition-colors hover:text-primary block py-2"
                      style={{
                        color: (link.path.includes('#')
                          ? (location.pathname === '/' && location.hash === link.path.substring(link.path.indexOf('#')))
                          : location.pathname === link.path)
                          ? 'var(--primary)'
                          : 'var(--text-primary)',
                      }}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="mt-4 relative overflow-hidden rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 px-6 py-3 group"
                    style={{
                      background: 'linear-gradient(to bottom, var(--primary-100), var(--primary-60))',
                      color: 'white',
                    }}
                  >
                    <span>Contact Us</span>
                    <ArrowUpRight size={20} strokeWidth={2.5} />
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default TopNav

