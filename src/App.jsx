import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import ParticleBackground from './components/ParticleBackground'

function App() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Generate random particles for refraction effect
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 150 + 50,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Liquid gradient background */}
      <div className="liquid-background" />
      
      {/* Glass overlay */}
      <div className="glass-overlay" />
      
      {/* Refraction blobs */}
      <ParticleBackground particles={particles} />
      
      {/* Main content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
        <LoginForm />
      </div>
    </div>
  )
}

export default App
