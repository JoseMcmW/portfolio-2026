import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Experience {
  title: string
  company: string
  location: string
  period: string
  achievements: string[]
}

const experiences: Experience[] = [
  {
    title: 'Frontend Developer',
    company: 'Exploration & Discovery Technologies',
    location: 'Remote',
    period: 'March 2024 – November 2025',
    achievements: [
      'Scalable apps with Vite + React (modular architecture, +40% maintainability).',
      'Global state optimized with Context API + Zustand (–90% API calls).',
      'Technical rebranding: updates, migrations, and modern React Hooks.',
      '100% bug and support ticket resolution in Jira.',
      'REST endpoints with improved validation via Formik/Yup.',
      'Agile collaboration in Scrum: dailies, planning, retros, and code reviews.'
    ]
  },
  {
    title: 'Frontend Developer',
    company: 'Start-7',
    location: 'Remote',
    period: 'September 2023 – March 2024',
    achievements: [
      'Web apps with React and scalable modular components.',
      'State management with Redux Toolkit and Context API.',
      'Dynamic forms with Formik/Yup and REST API integration.',
      'WebSockets (chat), FullCalendar, and Formik/Yup dynamic forms.',
      'REST APIs + JWT with global state via Redux/Context.',
      'Performance boosts with lazy loading and memoization.',
      'React Router with protected routes, nested layouts, and params handling.',
    ]
  }
]

export const About = () => {
  const lineRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement[]>([])
  const contentRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (lineRef.current && timelineRef.current) {
      // Primero: Animar la línea que se va coloreando de arriba hacia abajo - progresivamente
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            end: 'bottom bottom', // Se va pintando hasta el final de todo el timeline
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
                start: 'top 70%',
                end: 'top 50%',
                scrub: 1,
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

  return (
    <section id="about" className="min-h-screen bg-transparent transition-colors flex flex-col items-center relative overflow-hidden py-20">
      {/* Header */}
      <div className="w-3/4 text-center px-12 relative z-10 mb-20">
        <h2 className="font-serif text-text-primary text-4xl font-bold mb-4">
          Frontend Developer with 3 years of experience building scalable web applications using React.js, TypeScript, and modular component architecture.
        </h2>
        <p className="text-text-secondary text-lg">
          Self-motivated, results-driven, and committed to clean code and best practices.
        </p>
      </div>

      {/* Timeline */}
      <div ref={timelineRef} className="w-full max-w-6xl px-12 relative">
        {/* Línea vertical gris de fondo */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-text-primary/20 -translate-x-1/2" />

        {/* Línea vertical que se va coloreando con glow */}
        <div
          ref={lineRef}
          className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 origin-top"
          style={{
            transformOrigin: 'top',
            backgroundColor: 'var(--text-primary)',
            opacity: 0.7,
            boxShadow: '0 0 10px var(--text-primary), 0 0 20px var(--text-primary), 0 0 30px var(--text-primary)'
          }}
        />

        {/* Timeline Items */}
        <div className="space-y-[400px] pt-[250px] pb-[200px]">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
            >
              {/* Dot en la línea - negro (aparece cuando la línea lo alcanza) */}
              <div
                ref={addToDotRef}
                className="absolute left-1/2 top-9 w-3 h-3 bg-text-primary rounded-full -translate-x-1/2 z-10 ring-4 ring-bg-primary"
              />

              {/* Contenido (aparece gradualmente después del dot) */}
              <div
                ref={addToContentRef}
                className={`w-5/12 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-16 text-left'}`}
              >
                <h3 className="font-sans text-text-primary text-4xl font-bold mb-1">
                  {exp.title}
                </h3>
                <p className="font-sans text-text-primary text-base font-semibold mb-2" style={{ opacity: 0.7 }}>
                  {`${exp.company} (${exp.location})`}
                </p>
                <p className="font-sans text-text-secondary text-base mb-6">
                  {exp.period}
                </p>
                <ul className={`space-y-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="font-serif text-text-secondary text-base leading-relaxed text-xs">
                      • {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
