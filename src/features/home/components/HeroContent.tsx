import { useEffect } from 'react'
import { useHeroAnimations } from '../hooks/useHeroAnimations'

export const HeroContent: React.FC = () => {
  const { animateFullHeroSequence } = useHeroAnimations()

  useEffect(() => {
    // Trigger hero animations on mount
    const timer = setTimeout(() => {
      animateFullHeroSequence()
    }, 100) // Small delay to ensure DOM is ready

    return () => clearTimeout(timer)
  }, [animateFullHeroSequence])

  return (
    <div className="text-center flex-1 hero-content">
      <span className='flex flex-row items-center justify-center mb-3'>
        <h2 className="font-sans text-text-primary text-4xl font-bold mr-2">Hi!</h2>
        <p className="font-serif text-text-secondary text-lg md:text-lg">
          I´m Jose Centeno.
        </p>
      </span>
      <p className="font-serif text-text-secondary text-xl md:text-4xl mb-3">
        Front-End Developer
      </p>
      <p className="font-serif text-text-secondary text-xl md:text-4xl">
        Full-Stack Developer
      </p>
    </div>
  )
}