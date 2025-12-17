import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useTimelineAnimations = () => {
  const lineRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement[]>([])
  const contentRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (lineRef.current && timelineRef.current) {
      // Animar la línea que se va coloreando de arriba hacia abajo - progresivamente
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 50%',
            end: 'bottom bottom',
            scrub: 1,
            markers: false
          }
        }
      )

      // Animar los puntos (dots) - aparecen cuando la línea los alcanza
      dotsRef.current.forEach((dot) => {
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: dot,
                start: 'top 80%',
                end: 'top 40%',
                scrub: 2,
                markers: false
              }
            }
          )
        }
      })

      // Animar el contenido (texto) - aparece gradualmente después del punto
      contentRefs.current.forEach((content) => {
        if (content) {
          gsap.fromTo(
            content,
            {
              opacity: 0,
              y: 150
            },
            {
              opacity: 1,
              y: 0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: content,
                start: 'top 90%',
                end: 'top 60%',
                scrub: 1,
                markers: false
              }
            }
          )
        }
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const addToDotRef = (el: HTMLDivElement | null) => {
    if (el && !dotsRef.current.includes(el)) {
      dotsRef.current.push(el)
    }
  }

  const addToContentRef = (el: HTMLDivElement | null) => {
    if (el && !contentRefs.current.includes(el)) {
      contentRefs.current.push(el)
    }
  }

  return {
    lineRef,
    timelineRef,
    addToDotRef,
    addToContentRef
  }
}