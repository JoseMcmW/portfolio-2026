import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Re-export centralized types for convenience
export type { GSAPConfig } from '../types/common'

/**
 * Generic hook for GSAP animations (infrastructure level)
 * Does not know about specific features or UI components
 *
 * @returns GSAP utility functions for creating animations
 */
export const useGSAP = () => {
  const contextRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    // Create a GSAP context for automatic cleanup
    contextRef.current = gsap.context(() => {})

    return () => {
      // Cleanup all animations in this context
      contextRef.current?.revert()
    }
  }, [])

  /**
   * Animate elements to specified properties
   */
  const to = (
    target: gsap.TweenTarget,
    vars: gsap.TweenVars
  ): gsap.core.Tween | null => {
    if (!contextRef.current) return null

    return contextRef.current.add(() => gsap.to(target, vars))
  }

  /**
   * Animate elements from specified properties
   */
  const from = (
    target: gsap.TweenTarget,
    vars: gsap.TweenVars
  ): gsap.core.Tween | null => {
    if (!contextRef.current) return null

    return contextRef.current.add(() => gsap.from(target, vars))
  }

  /**
   * Animate elements from-to specified properties
   */
  const fromTo = (
    target: gsap.TweenTarget,
    fromVars: gsap.TweenVars,
    toVars: gsap.TweenVars
  ): gsap.core.Tween | null => {
    if (!contextRef.current) return null

    return contextRef.current.add(() => gsap.fromTo(target, fromVars, toVars))
  }

  /**
   * Set properties immediately without animation
   */
  const set = (
    target: gsap.TweenTarget,
    vars: gsap.TweenVars
  ): gsap.core.Tween | null => {
    if (!contextRef.current) return null

    return contextRef.current.add(() => gsap.set(target, vars))
  }

  /**
   * Create a timeline for sequencing animations
   */
  const timeline = (vars?: gsap.TimelineVars): gsap.core.Timeline | null => {
    if (!contextRef.current) return null

    return contextRef.current.add(() => gsap.timeline(vars))
  }

  /**
   * Kill specific animations or all animations for a target
   */
  const kill = (target?: gsap.TweenTarget): void => {
    if (target) {
      gsap.killTweensOf(target)
    }
  }

  /**
   * Get the current GSAP context (for advanced use cases)
   */
  const getContext = (): gsap.Context | null => {
    return contextRef.current
  }

  return {
    to,
    from,
    fromTo,
    set,
    timeline,
    kill,
    getContext
  }
}
