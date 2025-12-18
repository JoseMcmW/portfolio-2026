import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const xTo = gsap.quickTo(cursor, 'x', {
      duration: 0.6,
      ease: 'power2.out' // Efecto elástico para el rebote
    })

    const yTo = gsap.quickTo(cursor, 'y', {
      duration: 0.6,
      ease: 'power2.out' // Efecto elástico para el rebote
    })

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.style.cursor = 'auto'
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999]"
      style={{
        width: '40px',
        height: '40px',
        left: '0px',
        top: '0px',
      }}
    >
      <div
        className="w-full h-full rounded-full border-2"
        style={{
          borderColor: 'var(--text-primary)',
          filter: 'drop-shadow(0 0 8px var(--shadow-color)) drop-shadow(0 0 15px var(--shadow-color))',
        }}
      />
    </div>
  )
}

export default CustomCursor