interface CanvasBackgroundProps {
  transform: { x: number; y: number; scale: number }
}

export function CanvasBackground({ transform }: CanvasBackgroundProps) {
  return (
    <>
      {/* Ambient neon gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(1200px circle at 15% 5%, rgba(0, 238, 252, 0.04) 0%, transparent 55%)',
            'radial-gradient(900px circle at 85% 90%, rgba(255, 81, 250, 0.03) 0%, transparent 50%)',
          ].join(', '),
        }}
      />
      {/* Dot grid with neon tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, var(--canvas-grid-color) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: `${transform.x % 40}px ${transform.y % 40}px`,
        }}
      />
    </>
  )
}
