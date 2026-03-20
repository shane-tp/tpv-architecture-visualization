import { ZoomIn, ZoomOut, Maximize } from 'lucide-react'

interface ZoomToolbarProps {
  onZoomIn: () => void
  onZoomOut: () => void
  onReset: () => void
}

export function ZoomToolbar({ onZoomIn, onZoomOut, onReset }: ZoomToolbarProps) {
  const btnClass =
    'p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--neon-cyan)] hover:bg-cyan-500/10 dark:hover:bg-cyan-400/10 transition-colors'

  return (
    <div
      className="absolute top-6 right-6 z-50 flex gap-1 p-1.5 rounded-xl glass shadow-2xl"
    >
      <button onClick={onZoomOut} className={btnClass} aria-label="Zoom out"><ZoomOut size={20} /></button>
      <button onClick={onReset} className={btnClass} aria-label="Reset zoom"><Maximize size={20} /></button>
      <button onClick={onZoomIn} className={btnClass} aria-label="Zoom in"><ZoomIn size={20} /></button>
    </div>
  )
}
