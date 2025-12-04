import { useTheme } from '@/hooks/useTheme'

function Home() {
  const { toggleTheme } = useTheme();
  return (
<>
  <div className="min-h-screen bg-bg-primary transition-colors">
    {/* El texto cambiará de color automáticamente según la variable */}
    <h1 className="text-text-primary text-2xl font-bold fixed top-4 left-4">
      JMCM
    </h1>
    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-accent text-white rounded fixed top-4 right-4"
    >
      Cambiar Tema
    </button>
  </div>
</>
  )
}

export default Home