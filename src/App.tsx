import { useEffect } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { ThemeSync } from './components/theme/ThemeSync'
import { Sidebar } from './components/sidebar/Sidebar'
import { CanvasHeader } from './components/canvas/CanvasHeader'
import { ArchitectureCanvas } from './components/canvas/ArchitectureCanvas'
import { NodeDetailPanel } from './components/canvas/NodeDetailPanel'
import { TechDebtPanel } from './components/debt/TechDebtPanel'
import { selectedNodeAtom } from './atoms/selection'
import { activeTabAtom } from './atoms/navigation'

export default function App() {
  const activeTab = useAtomValue(activeTabAtom)
  const clearSelection = useSetAtom(selectedNodeAtom)

  useEffect(() => {
    if (activeTab !== 'canvas') clearSelection(null)
  }, [activeTab, clearSelection])

  return (
    <>
      <ThemeSync />
      <div className="flex h-screen overflow-hidden font-sans transition-theme" style={{ backgroundColor: 'var(--bg-app)', color: 'var(--text-primary)' }}>
        <Sidebar />
        <main className="flex-1 relative overflow-hidden flex flex-col">
          <CanvasHeader />
          <div className="flex-1 relative overflow-hidden">
            {activeTab === 'canvas' ? (
              <>
                <ArchitectureCanvas />
                <NodeDetailPanel />
              </>
            ) : (
              <TechDebtPanel />
            )}
          </div>
        </main>
      </div>
    </>
  )
}
