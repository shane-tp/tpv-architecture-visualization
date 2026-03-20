import { ZoomIn, ZoomOut, Maximize } from 'lucide-react'

interface ZoomToolbarProps {
  onZoomIn: () => void
  onZoomOut: () => void
  onReset: () => void
}

export function ZoomToolbar({ onZoomIn, onZoomOut, onReset }: ZoomToolbarProps) {
  return (
    <div className="absolute bottom-20 right-6 z-50 flex flex-col gap-1">
      <button
        onClick={onZoomIn}
        className="w-10 h-10 flex items-center justify-center rounded-t-lg backdrop-blur transition-colors"
        style={{
          background: 'var(--surface-glass)',
          border: '1px solid rgba(70, 72, 76, 0.15)',
          color: 'var(--text-muted)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(0, 238, 252, 0.1)'
          e.currentTarget.style.color = 'var(--neon-cyan)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--surface-glass)'
          e.currentTarget.style.color = 'var(--text-muted)'
        }}
        aria-label="Zoom in"
      >
        <ZoomIn size={18} />
      </button>
      <button
        onClick={onZoomOut}
        className="w-10 h-10 flex items-center justify-center backdrop-blur transition-colors"
        style={{
          background: 'var(--surface-glass)',
          border: '1px solid rgba(70, 72, 76, 0.15)',
          borderTop: 'none',
          color: 'var(--text-muted)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(0, 238, 252, 0.1)'
          e.currentTarget.style.color = 'var(--neon-cyan)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--surface-glass)'
          e.currentTarget.style.color = 'var(--text-muted)'
        }}
        aria-label="Zoom out"
      >
        <ZoomOut size={18} />
      </button>
      <button
        onClick={onReset}
        className="w-10 h-10 flex items-center justify-center rounded-b-lg backdrop-blur transition-colors"
        style={{
          background: 'var(--surface-glass)',
          border: '1px solid rgba(70, 72, 76, 0.15)',
          borderTop: 'none',
          color: 'var(--text-muted)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(0, 238, 252, 0.1)'
          e.currentTarget.style.color = 'var(--neon-cyan)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--surface-glass)'
          e.currentTarget.style.color = 'var(--text-muted)'
        }}
        aria-label="Reset zoom"
      >
        <Maximize size={18} />
      </button>
    </div>
  )
}
