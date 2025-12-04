import ThemeToggle from '@/components/common/ThemeToggle'

function Home() {
  return (
  <>
    <div className="min-h-screen bg-bg-primary transition-colors">
      <h1 className="text-text-primary text-2xl font-bold fixed top-10 left-12">
        JMCM
      </h1>
      <div className="fixed top-10 right-12">
        <ThemeToggle
          particleCount={15}
          particleDistances={[90, 10]}
          particleR={100}
          animationTime={600}
          timeVariance={300}
        />
      </div>
    </div>
  </>
  )
}

export default Home