import type { Experience } from '../types'

interface ExperienceCardProps {
  experience: Experience
  index: number
  addToDotRef: (el: HTMLDivElement | null) => void
  addToContentRef: (el: HTMLDivElement | null) => void
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  index,
  addToDotRef,
  addToContentRef
}) => {
  const isEven = index % 2 === 0

  return (
    <div className={`relative flex ${isEven ? 'justify-start' : 'justify-end'}`}>
      {/* Dot en la línea - negro (aparece cuando la línea lo alcanza) */}
      <div
        ref={addToDotRef}
        className="absolute left-1/2 top-9 w-3 h-3 bg-text-primary rounded-full -translate-x-1/2 z-10 ring-4 ring-bg-primary"
      />

      {/* Contenido (aparece gradualmente después del dot) */}
      <div
        ref={addToContentRef}
        className={`w-6/12 ${isEven ? 'pr-16 text-right' : 'pl-16 text-left'}`}
      >
        <h3 className="font-sans text-text-primary text-4xl font-bold mb-1">
          {experience.title}
        </h3>
        <p className="font-sans text-text-primary text-base font-semibold mb-2" style={{ opacity: 0.7 }}>
          {`${experience.company} (${experience.location})`}
        </p>
        <p className="font-sans text-text-secondary text-base mb-6">
          {experience.period}
        </p>
        <ul className={`space-y-1 ${isEven ? 'text-right' : 'text-left'}`}>
          {experience.achievements.map((achievement, i) => (
            <li key={i} className="font-serif text-text-secondary leading-relaxed text-xs">
              • {achievement}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}