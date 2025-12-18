import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { gsapConfig } from '@/shared/utils/config'

export const useHeroAnimations = () => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    // Create main timeline for hero animations
    timelineRef.current = gsap.timeline({ paused: true })

    return () => {
      // Cleanup timeline on unmount
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [])

  const animateHeroEntry = () => {
    if (!timelineRef.current) return

    const { duration, ease, stagger, delay } = gsapConfig.hero

    // Reset timeline
    timelineRef.current.clear()

    // Animate hero content elements
    timelineRef.current
      .fromTo('.hero-content',
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration,
          ease,
          delay
        }
      )
      .fromTo('.hero-content h2, .hero-content p',
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: duration * 0.8,
          ease,
          stagger
        },
        `-=${duration * 0.5}`
      )

    // Play the timeline
    timelineRef.current.play()
  }

  const animateSocialLinks = () => {
    if (!timelineRef.current) return

    const { duration, ease, stagger } = gsapConfig.hero

    // Animate social links with stagger
    gsap.fromTo('.social-links a, .social-links > div',
      {
        opacity: 0,
        x: -30,
        scale: 0.8
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: duration * 0.8,
        ease,
        stagger,
        delay: gsapConfig.hero.delay + 0.3
      }
    )

    // Animate the vertical lines
    gsap.fromTo('.social-links .w-0\\.5',
      {
        scaleY: 0,
        transformOrigin: 'center'
      },
      {
        scaleY: 1,
        duration: duration,
        ease,
        delay: gsapConfig.hero.delay + 0.1
      }
    )

    // Animate the points
    gsap.fromTo('.social-links .w-1',
      {
        opacity: 0,
        scale: 0
      },
      {
        opacity: 1,
        scale: 1,
        duration: duration * 0.6,
        ease,
        stagger: 0.2,
        delay: gsapConfig.hero.delay + 0.5
      }
    )
  }

  const animateLogoEntry = () => {
    const { duration, ease, delay } = gsapConfig.hero

    gsap.fromTo('.hero-logo',
      {
        opacity: 0,
        scale: 0.8,
        rotation: -10
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration,
        ease,
        delay
      }
    )
  }

  const animateThemeToggle = () => {
    const { duration, ease } = gsapConfig.themeToggle

    gsap.fromTo('.theme-toggle',
      {
        opacity: 0,
        scale: 0.8,
        rotation: 180
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration,
        ease,
        delay: gsapConfig.hero.delay + 0.2
      }
    )
  }

  const animateFullHeroSequence = () => {
    // Animate all hero elements in sequence
    animateLogoEntry()
    animateThemeToggle()
    animateHeroEntry()
    animateSocialLinks()
  }

  return {
    animateHeroEntry,
    animateSocialLinks,
    animateLogoEntry,
    animateThemeToggle,
    animateFullHeroSequence
  }
}