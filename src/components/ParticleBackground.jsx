export default function ParticleBackground({ particles }) {
  return (
    <div className="particles-container">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="refraction-blob"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            opacity: 0.05 + Math.random() * 0.1,
          }}
        />
      ))}
    </div>
  )
}
