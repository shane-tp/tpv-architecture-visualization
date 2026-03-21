import { useEffect } from 'react'
import { useAtomValue, useSetAtom, useAtom } from 'jotai'
import { atom } from 'jotai'
import { Move, MousePointer2, X } from 'lucide-react'
import { ThemeSync } from './components/theme/ThemeSync'
import { Sidebar } from './components/sidebar/Sidebar'
import { CanvasHeader } from './components/canvas/CanvasHeader'
import { ArchitectureCanvas } from './components/canvas/ArchitectureCanvas'
import { NodeDetailPanel } from './components/canvas/NodeDetailPanel'
import { TechDebtPanel } from './components/debt/TechDebtPanel'
import { PasswordGate } from './components/auth/PasswordGate'
import { selectedNodeAtom } from './atoms/selection'
import { activeTabAtom } from './atoms/navigation'

const hintDismissedAtom = atom(false)

export default function App() {
  const activeTab = useAtomValue(activeTabAtom)
  const clearSelection = useSetAtom(selectedNodeAtom)
  const [hintDismissed, setHintDismissed] = useAtom(hintDismissedAtom)

  useEffect(() => {
    if (activeTab !== 'canvas') clearSelection(null)
  }, [activeTab, clearSelection])

  return (
    <>
      <ThemeSync />
      <PasswordGate>
        <div className="flex h-screen overflow-hidden font-sans transition-theme" style={{ backgroundColor: 'var(--bg-app)', color: 'var(--text-primary)' }}>
          <Sidebar />
          <main className="flex-1 relative overflow-hidden flex flex-col">
            <CanvasHeader />
            {activeTab === 'canvas' && !hintDismissed && (
              <InteractionHint onDismiss={() => setHintDismissed(true)} />
            )}
            <div className="flex-1 relative overflow-hidden">
              {activeTab === 'canvas' ? (
                <ArchitectureCanvas />
              ) : (
                <TechDebtPanel />
              )}
            </div>
            {activeTab === 'canvas' && <NodeDetailPanel />}
          </main>
        </div>
      </PasswordGate>
    </>
  )
}

function InteractionHint({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div
      className="relative z-10 mx-10 mb-1 flex items-center gap-6 rounded-lg px-4 py-2"
      style={{
        background: 'linear-gradient(90deg, rgba(0,238,252,0.06) 0%, rgba(0,238,252,0.02) 100%)',
        border: '1px solid rgba(0, 238, 252, 0.12)',
      }}
    >
      <div className="flex items-center gap-2">
        <Move size={13} style={{ color: 'var(--neon-cyan)', opacity: 0.7 }} />
        <span className="text-xs font-display" style={{ color: 'var(--text-secondary)' }}>
          <span className="font-semibold" style={{ color: 'var(--neon-cyan)' }}>Drag nodes</span> to rearrange
        </span>
      </div>
      <span className="text-[10px]" style={{ color: 'var(--border-subtle)' }}>|</span>
      <div className="flex items-center gap-2">
        <Move size={13} style={{ color: 'var(--neon-cyan)', opacity: 0.7 }} />
        <span className="text-xs font-display" style={{ color: 'var(--text-secondary)' }}>
          <span className="font-semibold" style={{ color: 'var(--neon-cyan)' }}>Drag group labels</span> to move sections
        </span>
      </div>
      <span className="text-[10px]" style={{ color: 'var(--border-subtle)' }}>|</span>
      <div className="flex items-center gap-2">
        <MousePointer2 size={13} style={{ color: 'var(--neon-cyan)', opacity: 0.7 }} />
        <span className="text-xs font-display" style={{ color: 'var(--text-secondary)' }}>
          <span className="font-semibold" style={{ color: 'var(--neon-cyan)' }}>Click nodes</span> for details
        </span>
      </div>
      <button
        onClick={onDismiss}
        className="ml-auto p-1 rounded hover:bg-[rgba(0,238,252,0.1)]"
        style={{ color: 'var(--text-muted)' }}
        aria-label="Dismiss hint"
      >
        <X size={14} />
      </button>
    </div>
  )
}
