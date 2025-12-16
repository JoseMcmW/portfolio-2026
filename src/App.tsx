import { useState, useEffect } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Home, About, Contact, Projects, Footer } from '@/views'
import { SplashScreen, CustomCursor } from '@/components/ui'

gsap.registerPlugin(ScrollTrigger)

function ScrollSync() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    const update = (time: number) => {
      lenis.raf(time * 1000) // GSAP time en seconds
      ScrollTrigger.update()
    }

    gsap.ticker.add(update)
    return () => {
      gsap.ticker.remove(update)
    }
  }, [lenis])

  return null
}

function App() {
  const [showSplash, setShowSplash] = useState(true)

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  return (
    <ReactLenis
      root
      options={{ duration: 1.2, smoothWheel: true, syncTouch: true }}
    >
      <ScrollSync />
      <div className="min-h-screen bg-bg-primary p-1 md:p-3">
        {/* Custom Cursor */}
        <CustomCursor />

        {/* SplashScreen */}
        {showSplash && <SplashScreen onComplete={handleSplashComplete} duration={3000} />}

        {/* Contenido principal */}
        <Home />
        {/* <About /> */}
        <Projects />
        <Contact />
        <Footer />
      </div>
    </ReactLenis>
  )
}

export default App
