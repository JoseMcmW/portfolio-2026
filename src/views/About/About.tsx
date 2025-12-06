import { RevealBackground } from '@/components/ui'

export const About = () => {
  return (
    <section className="min-h-screen bg-transparent transition-colors flex items-center justify-center relative overflow-hidden">
      {/* Reveal Background Effect */}
      <RevealBackground />

      <div className="text-center px-12 relative z-10">
        <h2 className="text-text-primary text-4xl font-bold mb-4">About</h2>
        <p className="text-text-primary/70 text-lg">
          This section occupies 100% of the screen height.
        </p>
      </div>
    </section>
  )
}
