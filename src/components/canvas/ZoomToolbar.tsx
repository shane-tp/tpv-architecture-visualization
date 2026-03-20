import { ZoomIn, ZoomOut, Maximize, RotateCcw } from 'lucide-react'

interface ZoomToolbarProps {
  onZoomIn: () => void
  onZoomOut: () => void
  onReset: () => void
  onResetLayout?: () => void
}

const btnBase = "w-10 h-10 flex items-center justify-center backdrop-blur transition-colors"
const btnStyle = {
  background: 'var(--surface-glass)',
  border: '1px solid rgba(70, 72, 76, 0.15)',
  color: 'var(--text-muted)',
}

function handleEnter(e: React.MouseEvent<HTMLButtonElement>) {
  e.currentTarget.style.background = 'rgba(0, 238, 252, 0.1)'
  e.currentTarget.style.color = 'var(--neon-cyan)'
}
function handleLeave(e: React.MouseEvent<HTMLButtonElement>) {
  e.currentTarget.style.background = 'var(--surface-glass)'
  e.currentTarget.style.color = 'var(--text-muted)'
}

export function ZoomToolbar({ onZoomIn, onZoomOut, onReset, onResetLayout }: ZoomToolbarProps) {
  return (
    <div className="absolute bottom-20 right-6 z-50 flex flex-col gap-1">
      <button
        onClick={onZoomIn}
        className={`${btnBase} rounded-t-lg`}
        style={btnStyle}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        aria-label="Zoom in"
      >
        <ZoomIn size={18} />
      </button>
      <button
        onClick={onZoomOut}
        className={btnBase}
        style={{ ...btnStyle, borderTop: 'none' }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        aria-label="Zoom out"
      >
        <ZoomOut size={18} />
      </button>
      <button
        onClick={onReset}
        className={btnBase}
        style={{ ...btnStyle, borderTop: 'none' }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        aria-label="Reset zoom"
      >
        <Maximize size={18} />
      </button>
      {onResetLayout && (
        <button
          onClick={onResetLayout}
          className={`${btnBase} rounded-b-lg`}
          style={{ ...btnStyle, borderTop: 'none' }}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          aria-label="Reset node layout"
          title="Reset node positions"
        >
          <RotateCcw size={18} />
        </button>
      )}
    </div>
  )
}
