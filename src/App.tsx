import { useState } from 'react'
import { Home, About } from '@/views'
import { Footer } from '@/components/Footer'
import { SplashScreen } from '@/components/ui'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  return (
    <div className="relative min-h-screen bg-bg-primary">
      {/* SplashScreen */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} duration={3000} />}

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
