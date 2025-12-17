import { ExperienceCard } from './ExperienceCard'
import { useTimelineAnimations } from '../hooks/useTimelineAnimations'
import { experiences } from '../data/experiences'

export const Timeline: React.FC = () => {
  const { lineRef, timelineRef, addToDotRef, addToContentRef } = useTimelineAnimations()

  return (
    <section id="about" className="min-h-screen bg-transparent transition-colors flex flex-col items-center relative overflow-hidden py-20">
      {/* Header */}
      <div className="w-screen md:w-3/4 text-center px-12 relative z-10 mb-20">
        <h2 className="font-serif text-text-primary text-4xl font-bold mb-4">
          Frontend Developer with 3 years of experience building scalable web applications using React.js, TypeScript, and modular component architecture.
        </h2>
        <p className="text-text-secondary text-md">
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
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={index}
              experience={experience}
              index={index}
              addToDotRef={addToDotRef}
              addToContentRef={addToContentRef}
            />
          ))}
        </div>
      </div>
    </section>
  )
}