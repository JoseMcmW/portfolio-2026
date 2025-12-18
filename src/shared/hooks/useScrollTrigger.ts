import { useEffect, useRef, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

// Re-export centralized type for convenience
export type { ScrollTriggerConfig } from '../types/common'

/**
 * Extended ScrollTrigger configuration with callbacks
 */
export interface ExtendedScrollTriggerConfig {
  trigger?: string | Element
  start?: string | number
  end?: string | number
  scrub?: boolean | number
  pin?: boolean | string | Element
  markers?: boolean
  toggleActions?: string
  onEnter?: () => void
  onLeave?: () => void
  onEnterBack?: () => void
  onLeaveBack?: () => void
  onUpdate?: (self: ScrollTrigger) => void
}

/**
 * Generic hook for ScrollTrigger functionality (infrastructure level)
 * Does not know about specific features or UI components
 *
 * @param elementRef - Optional ref to the element to observe
 * @returns ScrollTrigger utility functions
 */
export const useScrollTrigger = (elementRef?: RefObject<HTMLElement>) => {
  const scrollTriggersRef = useRef<ScrollTrigger[]>([])

  useEffect(() => {
    return () => {
      // Cleanup all ScrollTriggers on unmount
      scrollTriggersRef.current.forEach(st => st.kill())
      scrollTriggersRef.current = []
    }
  }, [])

  /**
   * Create a ScrollTrigger instance
   */
  const create = (config: ExtendedScrollTriggerConfig): ScrollTrigger | null => {
    try {
      // Use elementRef as trigger if provided and no trigger specified
      const triggerElement = config.trigger || elementRef?.current

      if (!triggerElement) {
        console.warn('ScrollTrigger: No trigger element provided')
        return null
      }

      const scrollTrigger = ScrollTrigger.create({
        trigger: triggerElement,
        start: config.start || 'top bottom',
        end: config.end || 'bottom top',
        scrub: config.scrub,
        pin: config.pin,
        markers: config.markers,
        toggleActions: config.toggleActions,
        onEnter: config.onEnter,
        onLeave: config.onLeave,
        onEnterBack: config.onEnterBack,
        onLeaveBack: config.onLeaveBack,
        onUpdate: config.onUpdate
      })

      scrollTriggersRef.current.push(scrollTrigger)
      return scrollTrigger
    } catch (error) {
      console.error('Failed to create ScrollTrigger:', error)
      return null
    }
  }

  /**
   * Create a ScrollTrigger with animation
   */
  const createWithAnimation = (
    target: gsap.TweenTarget,
    animationVars: gsap.TweenVars,
    scrollConfig: Omit<ExtendedScrollTriggerConfig, 'onUpdate'>
  ): gsap.core.Tween | null => {
    try {
      const triggerElement = scrollConfig.trigger || elementRef?.current

      if (!triggerElement) {
        console.warn('ScrollTrigger: No trigger element provided')
        return null
      }

      const tween = gsap.to(target, {
        ...animationVars,
        scrollTrigger: {
          trigger: triggerElement,
          start: scrollConfig.start || 'top bottom',
          end: scrollConfig.end || 'bottom top',
          scrub: scrollConfig.scrub,
          pin: scrollConfig.pin,
          markers: scrollConfig.markers,
          toggleActions: scrollConfig.toggleActions,
          onEnter: scrollConfig.onEnter,
          onLeave: scrollConfig.onLeave,
          onEnterBack: scrollConfig.onEnterBack,
          onLeaveBack: scrollConfig.onLeaveBack
        }
      })

      // Store the ScrollTrigger for cleanup
      if (tween.scrollTrigger) {
        scrollTriggersRef.current.push(tween.scrollTrigger)
      }

      return tween
    } catch (error) {
      console.error('Failed to create ScrollTrigger with animation:', error)
      return null
    }
  }

  /**
   * Refresh all ScrollTriggers (useful after layout changes)
   */
  const refresh = (): void => {
    ScrollTrigger.refresh()
  }

  /**
   * Kill a specific ScrollTrigger
   */
  const kill = (scrollTrigger: ScrollTrigger): void => {
    scrollTrigger.kill()
    scrollTriggersRef.current = scrollTriggersRef.current.filter(st => st !== scrollTrigger)
  }

  /**
   * Kill all ScrollTriggers created by this hook
   */
  const killAll = (): void => {
    scrollTriggersRef.current.forEach(st => st.kill())
    scrollTriggersRef.current = []
  }

  /**
   * Get the scroll progress (0 to 1) for a specific ScrollTrigger
   */
  const getProgress = (scrollTrigger: ScrollTrigger): number => {
    return scrollTrigger.progress
  }

  /**
   * Get all active ScrollTriggers created by this hook
   */
  const getScrollTriggers = (): ScrollTrigger[] => {
    return scrollTriggersRef.current
  }

  return {
    create,
    createWithAnimation,
    refresh,
    kill,
    killAll,
    getProgress,
    getScrollTriggers
  }
}
