import { useState } from 'react'
import Home from "@/components/views/Home/Home"
import SplashScreen from '@/components/common/SplashScreen'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} duration={5000} />}
      <Home />
    </>
  )
}

export default App
