import { ZoomIn, ZoomOut, Maximize } from 'lucide-react'

interface ZoomToolbarProps {
  onZoomIn: () => void
  onZoomOut: () => void
  onReset: () => void
}

export function ZoomToolbar({ onZoomIn, onZoomOut, onReset }: ZoomToolbarProps) {
  const btnClass =
    'p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-card-hover)] transition-colors'

  return (
    <div
      className="absolute top-6 right-6 z-50 flex gap-1 p-1.5 rounded-xl backdrop-blur-md shadow-2xl"
      style={{
        backgroundColor: 'var(--toolbar-bg)',
        borderWidth: 1,
        borderColor: 'var(--toolbar-border)',
      }}
    >
      <button onClick={onZoomOut} className={btnClass}><ZoomOut size={20} /></button>
      <button onClick={onReset} className={btnClass}><Maximize size={20} /></button>
      <button onClick={onZoomIn} className={btnClass}><ZoomIn size={20} /></button>
    </div>
  )
}
