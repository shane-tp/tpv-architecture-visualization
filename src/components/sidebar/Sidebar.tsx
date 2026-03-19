import { LayoutTemplate, ShieldAlert, Layers } from 'lucide-react'
import { archGroups } from '../../data/architecture'
import { ThemeToggle } from '../theme/ThemeToggle'
import type { TabId } from '../../types/architecture'

interface SidebarProps {
  activeTab: TabId
  setActiveTab: (tab: TabId) => void
  focusGroup: string | null
  setFocusGroup: (group: string | null) => void
}

export function Sidebar({ activeTab, setActiveTab, focusGroup, setFocusGroup }: SidebarProps) {
  return (
    <aside
      className="w-72 shrink-0 flex flex-col z-20 shadow-2xl transition-theme"
      style={{
        backgroundColor: 'var(--bg-elevated)',
        borderRight: '1px solid var(--border-subtle)',
      }}
    >
      {/* Header */}
      <div className="p-5" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/20">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400">
                TPV Explorer
              </h1>
              <p className="text-[11px] font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>
                V1.0 &middot; Mar 2026
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 space-y-1 flex-1 overflow-y-auto">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.08em] px-3 py-2 mt-1"
          style={{ color: 'var(--text-muted)' }}
        >
          Main Views
        </div>

        <NavButton
          active={activeTab === 'canvas'}
          onClick={() => { setActiveTab('canvas'); setFocusGroup(null) }}
          icon={<LayoutTemplate size={18} />}
          label="Interactive Canvas"
          activeColor="indigo"
        />
        <NavButton
          active={activeTab === 'debt'}
          onClick={() => setActiveTab('debt')}
          icon={<ShieldAlert size={18} />}
          label="Tech Debt Map"
          activeColor="red"
        />

        {activeTab === 'canvas' && (
          <div className="mt-6">
            <div
              className="text-[10px] font-bold uppercase tracking-[0.08em] px-3 py-2"
              style={{ color: 'var(--text-muted)' }}
            >
              Focus Mode
            </div>
            <div className="space-y-0.5">
              {archGroups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => setFocusGroup(focusGroup === group.id ? null : group.id)}
                  className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    focusGroup === group.id
                      ? 'text-[var(--text-primary)] shadow-sm'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                  style={
                    focusGroup === group.id
                      ? { backgroundColor: 'var(--surface-card)' }
                      : undefined
                  }
                >
                  <span>{group.label.split('(')[0]?.trim()}</span>
                  {focusGroup === group.id && (
                    <div className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 shadow-lg shadow-indigo-500/60" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Stats footer */}
      <div
        className="p-5 transition-theme"
        style={{
          borderTop: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-app)',
        }}
      >
        <div className="text-[11px] font-mono space-y-2.5" style={{ color: 'var(--text-secondary)' }}>
          <Stat label="Max Players" value="4000" />
          <Stat label="Tick Rate" value="20 Hz" accent="emerald" />
          <Stat label="API Endpoints" value="90" accent="rose" />
        </div>
      </div>
    </aside>
  )
}

function NavButton({
  active,
  onClick,
  icon,
  label,
  activeColor,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
  activeColor: 'indigo' | 'red'
}) {
  const activeStyles =
    activeColor === 'indigo'
      ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20'
      : 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all border ${
        active
          ? activeStyles
          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-transparent hover:bg-[var(--surface-card-hover)]'
      }`}
    >
      {icon} {label}
    </button>
  )
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: 'emerald' | 'rose'
}) {
  const valueClass = accent === 'emerald'
    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
    : accent === 'rose'
      ? 'text-rose-600 dark:text-rose-400 bg-rose-500/10'
      : 'text-[var(--text-primary)] bg-[var(--surface-card)]'

  return (
    <div className="flex justify-between items-center">
      <span>{label}</span>
      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${valueClass}`}>
        {value}
      </span>
    </div>
  )
}
