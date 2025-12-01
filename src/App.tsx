import { useTheme } from "./hooks/useTheme"

function App() {
  const { toggleTheme } = useTheme();
  return (
    <div className="min-h-screen bg-bg-primary transition-colors">
      
      {/* El texto cambiará de color automáticamente según la variable */}
      <h1 className="text-text-primary text-2xl font-bold">
        Bienvenido
      </h1>

      <button 
        onClick={toggleTheme}
        className="mt-4 px-4 py-2 bg-accent text-white rounded"
      >
        Cambiar Tema
      </button>
    </div>
  )
}

export default App
