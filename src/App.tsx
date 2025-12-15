import { useState, useEffect } from 'react'
import { Home, About, Contact, Projects, Footer } from '@/views'
import { SplashScreen, NavigationMenu, CustomCursor } from '@/components/ui'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  // Scroll suave y personalizado con la rueda del mouse
  useEffect(() => {
    let scrollTarget = window.scrollY
    let currentScroll = window.scrollY
    let rafId: number | null = null

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const scrollMultiplier = 2 // Velocidad del scroll
      scrollTarget += e.deltaY * scrollMultiplier
      scrollTarget = Math.max(0, Math.min(scrollTarget, document.documentElement.scrollHeight - window.innerHeight))

      if (rafId === null) {
        animate()
      }
    }

    const animate = () => {
      const diff = scrollTarget - currentScroll
      const delta = diff * 0.12 // Factor de suavidad (0.05 = muy suave, 0.2 = más rápido)

      if (Math.abs(delta) > 0.5) {
        currentScroll += delta
        window.scrollTo(0, currentScroll)
        rafId = requestAnimationFrame(animate)
      } else {
        currentScroll = scrollTarget
        window.scrollTo(0, currentScroll)
        rafId = null
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  const handleNavigation = (section: string) => {
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary md:p-3">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* SplashScreen */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} duration={3000} />}

      {/* Navigation Menu */}
      {!showSplash && <NavigationMenu onNavigate={handleNavigation} />}

      {/* Contenido principal */}
        <Home />
        {/* <About /> */}
        {/* <Projects /> */}
        <Contact />
        <Footer />
    </div>
  )
}

export default App
