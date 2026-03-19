import { useState } from 'react'
import { ThemeSync } from './components/theme/ThemeSync'
import { Sidebar } from './components/sidebar/Sidebar'
import { ArchitectureCanvas } from './components/canvas/ArchitectureCanvas'
import { TechDebtPanel } from './components/debt/TechDebtPanel'
import type { TabId } from './types/architecture'

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('canvas')
  const [focusGroup, setFocusGroup] = useState<string | null>(null)

  return (
    <>
      <ThemeSync />
      <div className="flex h-screen overflow-hidden font-sans transition-theme" style={{ backgroundColor: 'var(--bg-app)', color: 'var(--text-primary)' }}>
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          focusGroup={focusGroup}
          setFocusGroup={setFocusGroup}
        />
        <main className="flex-1 relative overflow-hidden">
          {activeTab === 'canvas' ? (
            <ArchitectureCanvas focusGroup={focusGroup} />
          ) : (
            <TechDebtPanel />
          )}
        </main>
      </div>
    </>
  )
}
