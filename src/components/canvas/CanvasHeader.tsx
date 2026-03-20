import { useAtomValue } from 'jotai'
import { activeTabAtom } from '../../atoms/navigation'

export function CanvasHeader() {
  const isCanvas = useAtomValue(activeTabAtom) === 'canvas'

  return (
    <header className="relative z-20 px-10 pt-7 pb-4">
      <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-display mb-2">
        <span style={{ color: 'var(--text-muted)' }}>TPV Explorer</span>
        <span style={{ color: 'var(--neon-cyan)', opacity: 0.4 }}>/</span>
        <span style={{ color: 'var(--text-muted)' }}>Workspace</span>
        <span style={{ color: 'var(--neon-cyan)', opacity: 0.4 }}>/</span>
        <span style={{ color: 'var(--neon-cyan)' }}>
          {isCanvas ? 'Visualization' : 'Heatmap'}
        </span>
      </nav>
      <h2
        className="text-4xl font-bold font-display tracking-tighter"
        style={{ color: 'var(--text-primary)' }}
      >
        {isCanvas ? 'Architecture Overview' : 'Tech Debt Heatmap'}
      </h2>
    </header>
  )
}
