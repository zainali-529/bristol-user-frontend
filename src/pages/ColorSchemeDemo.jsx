import { useState } from 'react'

function ColorSchemeDemo() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-foreground p-8">
        {/* Header with Dark Mode Toggle */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Bristol Utilities Color Scheme
            </h1>
            <button
              onClick={toggleDarkMode}
              className="px-6 py-3 rounded-lg font-semibold transition-all"
              style={{ 
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)'
              }}
            >
              Toggle {darkMode ? 'Light' : 'Dark'} Mode
            </button>
          </div>

          {/* Primary Color Variations */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Primary Color Variations
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ColorCard 
                label="Primary 100%" 
                bgColor="var(--primary-100)" 
                textColor="#ffffff"
              />
              <ColorCard 
                label="Primary 80%" 
                bgColor="var(--primary-80)" 
                textColor="#ffffff"
              />
              <ColorCard 
                label="Primary 60%" 
                bgColor="var(--primary-60)" 
                textColor="#ffffff"
              />
              <ColorCard 
                label="Primary 40%" 
                bgColor="var(--primary-40)" 
                textColor="var(--text-primary)"
              />
              <ColorCard 
                label="Primary 30%" 
                bgColor="var(--primary-30)" 
                textColor="var(--text-primary)"
              />
              <ColorCard 
                label="Primary 20%" 
                bgColor="var(--primary-20)" 
                textColor="var(--text-primary)"
              />
              <ColorCard 
                label="Primary 10%" 
                bgColor="var(--primary-10)" 
                textColor="var(--text-primary)"
              />
              <ColorCard 
                label="Primary 5%" 
                bgColor="var(--primary-5)" 
                textColor="var(--text-primary)"
              />
            </div>
          </section>

          {/* Text Colors */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Text Colors
            </h2>
            <div className="space-y-4">
              <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--card)' }}>
                <p className="text-2xl mb-2" style={{ color: 'var(--text-primary)' }}>
                  Primary Text - This is the main text color used throughout the application
                </p>
                <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                  Secondary Text - This is used for less important information and descriptions
                </p>
              </div>
            </div>
          </section>

          {/* Card Examples */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Card Components
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div 
                className="p-6 rounded-lg shadow-lg border"
                style={{ 
                  backgroundColor: 'var(--card)',
                  borderColor: 'var(--border)'
                }}
              >
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                  Standard Card
                </h3>
                <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                  This is a standard card with default background and border colors.
                </p>
                <button 
                  className="px-4 py-2 rounded-md font-medium"
                  style={{ 
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-foreground)'
                  }}
                >
                  Action Button
                </button>
              </div>

              <div 
                className="p-6 rounded-lg shadow-lg"
                style={{ 
                  backgroundColor: 'var(--primary-5)',
                }}
              >
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                  Subtle Card
                </h3>
                <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                  This card uses a subtle primary color background (5% opacity).
                </p>
                <button 
                  className="px-4 py-2 rounded-md font-medium"
                  style={{ 
                    backgroundColor: 'var(--primary-20)',
                    color: 'var(--text-primary)'
                  }}
                >
                  Secondary Action
                </button>
              </div>

              <div 
                className="p-6 rounded-lg shadow-lg"
                style={{ 
                  backgroundColor: 'var(--primary)',
                }}
              >
                <h3 className="text-xl font-bold mb-3 text-white">
                  Featured Card
                </h3>
                <p className="mb-4 text-white opacity-90">
                  This is a featured card with full primary color background.
                </p>
                <button 
                  className="px-4 py-2 rounded-md font-medium"
                  style={{ 
                    backgroundColor: 'white',
                    color: 'var(--primary)'
                  }}
                >
                  Featured Action
                </button>
              </div>
            </div>
          </section>

          {/* Interactive Elements */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Interactive Elements
            </h2>
            <div 
              className="p-8 rounded-lg"
              style={{ backgroundColor: 'var(--card)' }}
            >
              <div className="space-y-6">
                {/* Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button 
                    className="px-6 py-3 rounded-lg font-semibold"
                    style={{ 
                      backgroundColor: 'var(--primary)',
                      color: 'var(--primary-foreground)'
                    }}
                  >
                    Primary Button
                  </button>
                  <button 
                    className="px-6 py-3 rounded-lg font-semibold"
                    style={{ 
                      backgroundColor: 'var(--primary-20)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    Secondary Button
                  </button>
                  <button 
                    className="px-6 py-3 rounded-lg font-semibold border-2"
                    style={{ 
                      borderColor: 'var(--primary)',
                      color: 'var(--primary)',
                      backgroundColor: 'transparent'
                    }}
                  >
                    Outline Button
                  </button>
                </div>

                {/* Input Field */}
                <div className="max-w-md">
                  <label className="block mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>
                    Sample Input Field
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter something..."
                    className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
                    style={{ 
                      borderColor: 'var(--border)',
                      backgroundColor: 'var(--background)',
                      color: 'var(--text-primary)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>

                {/* Alert/Notice Box */}
                <div 
                  className="p-4 rounded-lg border-l-4"
                  style={{ 
                    backgroundColor: 'var(--primary-10)',
                    borderLeftColor: 'var(--primary)'
                  }}
                >
                  <h4 className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                    Information Notice
                  </h4>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    This is an informational message using subtle primary color background.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Color Reference */}
          <section>
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Color Reference
            </h2>
            <div 
              className="p-6 rounded-lg"
              style={{ backgroundColor: 'var(--card)' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>
                    Light Mode
                  </h3>
                  <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <li>Background: <code className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--primary-10)' }}>#ffffff</code></li>
                    <li>Primary: <code className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--primary-10)' }}>#AE613A</code></li>
                    <li>Text Primary: <code className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--primary-10)' }}>#333333</code></li>
                    <li>Text Secondary: <code className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--primary-10)' }}>#7C7C7C</code></li>
                    <li>Card: <code className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--primary-10)' }}>#ffffff</code></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>
                    Dark Mode
                  </h3>
                  <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <li>Background: <code className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--primary-10)' }}>#121212</code></li>
                    <li>Primary: <code className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--primary-10)' }}>#AE613A</code></li>
                    <li>Text Primary: <code className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--primary-10)' }}>#F5EDEB</code></li>
                    <li>Text Secondary: <code className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--primary-10)' }}>#BBAAA4</code></li>
                    <li>Card: <code className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--primary-10)' }}>#1E1B1A</code></li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

// Helper Component for Color Cards
function ColorCard({ label, bgColor, textColor }) {
  return (
    <div 
      className="p-6 rounded-lg text-center shadow-md"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <p className="font-bold text-lg">{label}</p>
      <p className="text-sm mt-2 opacity-90">{bgColor}</p>
    </div>
  )
}

export default ColorSchemeDemo

