import { useThemeStore } from '@/store/themeStore'
import { ThemeToggle } from '@/components/ui'
import { LaserFlow } from '@/components/ui'

export const Home = () => {
  const theme = useThemeStore((state) => state.theme)
  const logoColor = theme === 'dark' ? '#F4320B' : '#221F20'
  return (
    <>
      {/* Home Section - Full screen */}
      <section className="min-h-screen bg-bg-primary transition-colors flex items-center justify-center relative">
        <span className="text-text-primary text-2xl font-bold fixed top-10 left-12 z-20">
          <svg width="70" height="70" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 15 L34 15 L34 68 Q34 82 50 82 Q66 82 66 68 L66 45 Q66 32 53 32 L53 44 Q54 44 54 45 L54 68 Q54 70 50 70 Q46 70 46 68 L46 15 L22 15 Z" fill={logoColor}/>
            <circle cx="60" cy="20" r="6" fill={logoColor}/>
          </svg>
        </span>
        <div className="fixed top-10 right-12 z-20">
          <ThemeToggle
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
            animationTime={600}
            timeVariance={300}
          />
        </div>
        <div className="text-center px-12">
          <h2 className="text-text-primary text-4xl font-bold mb-4">Welcome to the Upside Down</h2>
          <p className="text-text-primary/70 text-lg">
            This is the home section. Scroll down to see more.
          </p>
        </div>
      </section>
      <LaserFlow/>
    </>
  )
}