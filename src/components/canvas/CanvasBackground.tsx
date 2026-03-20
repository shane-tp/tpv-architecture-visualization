interface CanvasBackgroundProps {
  transform: { x: number; y: number; scale: number }
}

const HEX_GRID_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.32v13.36l11 6.35 11-6.35V17.32L14 10.97 3 17.32z' fill='%23ffffff' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")`

export function CanvasBackground({ transform }: CanvasBackgroundProps) {
  return (
    <>
      {/* Large ambient neon glow blobs */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            top: '-10%',
            right: '-10%',
            width: '60%',
            height: '60%',
            background: 'rgba(0, 238, 252, 0.04)',
            filter: 'blur(120px)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: '-10%',
            left: '20%',
            width: '40%',
            height: '40%',
            background: 'rgba(255, 81, 250, 0.03)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      {/* Hex grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{ backgroundImage: HEX_GRID_SVG }}
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
