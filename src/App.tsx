import { useState } from 'react'
import { Home, About } from '@/views'
import { Footer } from '@/components/Footer'
import { SplashScreen, LaserFlowBackground } from '@/components/ui'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  return (
    <div className="relative min-h-screen bg-bg-primary">
      {/* SplashScreen */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} duration={3000} />}
      
      {/* Laser Flow Background - Solo aparece en dark mode */}
      {!showSplash && (
        <LaserFlowBackground
          color="#F4320C"
          initialFlowDuration={2500}
          delay={300}
          splashEnabled={true}
        />
      )}
      
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
