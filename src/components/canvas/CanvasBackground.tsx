interface CanvasBackgroundProps {
  transform: { x: number; y: number; scale: number }
}

export function CanvasBackground({ transform }: CanvasBackgroundProps) {
  return (
    <>
      {/* Radial ambient gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(1200px circle at 15% 5%, rgba(59, 130, 246, 0.04) 0%, transparent 55%)',
            'radial-gradient(900px circle at 85% 90%, rgba(168, 85, 247, 0.03) 0%, transparent 50%)',
          ].join(', '),
        }}
      />
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, var(--canvas-grid-color) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          backgroundPosition: `${transform.x % 24}px ${transform.y % 24}px`,
        }}
      />
    </>
  )
}
