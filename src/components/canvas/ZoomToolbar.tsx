import { ZoomIn, ZoomOut, Maximize, RotateCcw, HelpCircle, X } from 'lucide-react'
import { useAtom } from 'jotai'
import { atom } from 'jotai'

const showHintsAtom = atom(false)

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

const hints = [
  { keys: 'Click + Drag', action: 'Pan the canvas' },
  { keys: 'Scroll', action: 'Zoom in / out' },
  { keys: 'Drag a node', action: 'Move individual nodes' },
  { keys: 'Drag a group label', action: 'Move group + children' },
  { keys: 'Long drag on group', action: 'Move group (20px threshold)' },
  { keys: 'Click a node', action: 'View details panel' },
]

export function ZoomToolbar({ onZoomIn, onZoomOut, onReset, onResetLayout }: ZoomToolbarProps) {
  const [showHints, setShowHints] = useAtom(showHintsAtom)

  return (
    <>
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
            className={btnBase}
            style={{ ...btnStyle, borderTop: 'none' }}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            aria-label="Reset node layout"
            title="Reset node positions"
          >
            <RotateCcw size={18} />
          </button>
        )}
        <button
          onClick={() => setShowHints(!showHints)}
          className={`${btnBase} rounded-b-lg`}
          style={{ ...btnStyle, borderTop: 'none' }}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          aria-label="Interaction help"
          title="Controls help"
        >
          <HelpCircle size={18} />
        </button>
      </div>

      {showHints && (
        <div
          className="absolute bottom-20 right-20 z-50 rounded-xl backdrop-blur-xl p-4 pointer-events-auto"
          style={{
            background: 'var(--surface-glass)',
            border: '1px solid rgba(70, 72, 76, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            width: 260,
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold font-display uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
              Controls
            </span>
            <button onClick={() => setShowHints(false)} className="p-0.5 rounded hover:bg-[var(--surface-card-hover)]" style={{ color: 'var(--text-muted)' }}>
              <X size={14} />
            </button>
          </div>
          <div className="space-y-2">
            {hints.map((h) => (
              <div key={h.keys} className="flex items-baseline justify-between gap-3">
                <span className="text-[11px] font-mono font-semibold shrink-0" style={{ color: 'var(--neon-cyan)' }}>{h.keys}</span>
                <span className="text-[11px] font-sans text-right" style={{ color: 'var(--text-secondary)' }}>{h.action}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
