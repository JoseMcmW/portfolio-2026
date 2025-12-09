import { useState } from 'react'
import { Home, About } from '@/views'
import { Footer } from '@/components/Footer'
import { SplashScreen, NavigationMenu, CustomCursor } from '@/components/ui'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  const handleNavigation = (section: string) => {
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="relative min-h-screen bg-bg-primary">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* SplashScreen */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} duration={3000} />}

      {/* Navigation Menu */}
      {!showSplash && <NavigationMenu onNavigate={handleNavigation} />}

      {/* Contenido principal */}
      <main className="relative z-10">
        <Home />
        <About />
        <Footer />
      </main>
    </div>
  )
}

export default App
