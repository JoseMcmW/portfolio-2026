import { ThemeToggle, useTheme } from '@/features/theme'
import { LightPillar } from '@/shared/components/ui'
import { Logo, HeroContent, SocialLinks } from '@/features/home'

export const Home = () => {
  const { theme } = useTheme()

  return (
    <section id="home" className="flex flex-col min-h-screen bg-transparent transition-colors">
      {theme === 'dark' &&
        <div aria-hidden="true">
          <LightPillar
            topColor="#221F20"
            bottomColor="#B62A16"
            intensity={1.0}
            rotationSpeed={1}
            glowAmount={0.002}
            pillarWidth={3.0}
            pillarHeight={0.4}
            noiseIntensity={0.5}
            pillarRotation={60}
            interactive={false}
            mixBlendMode="screen"
          />
        </div>
      }
      {/* Logo and Theme Toggle */}
      <header className='flex justify-between'>
        <Logo className="hero-logo" />
        <ThemeToggle className="theme-toggle" />
      </header>
      <div className='flex-1 flex flex-row items-center'>
        <SocialLinks />
        <HeroContent />
      </div>
    </section>
  )
}
