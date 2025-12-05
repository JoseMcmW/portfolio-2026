import { useState } from 'react'
import { Home, About } from '@/views'
import { Footer } from '@/components/Footer'
import SplashScreen from '@/components/ui/SplashScreen'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} duration={5000} />}
      <Home />
      <About />
      <Footer />
    </>
  )
}

export default App
