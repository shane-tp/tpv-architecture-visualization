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
    <aside className="w-72 shrink-0 flex flex-col z-20 transition-theme bg-[var(--bg-elevated)] backdrop-blur-xl border-r border-[var(--surface-glass-border)] shadow-[0_0_40px_rgba(0,240,255,0.05)] dark:shadow-[0_0_40px_rgba(0,240,255,0.08)]">
      {/* Header */}
      <div className="p-5 border-b border-[var(--border-subtle)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-600 rounded-xl shadow-lg shadow-cyan-500/20">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-cyan-500 dark:from-cyan-400 dark:to-cyan-300 tracking-tight">
                TPV Explorer
              </h1>
              <p className="text-[11px] font-display mt-0.5 uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                Architecture Map
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 space-y-1 flex-1 overflow-y-auto">
        <div
          className="text-[10px] font-bold font-display uppercase tracking-[0.15em] px-3 py-2 mt-1"
          style={{ color: 'var(--text-muted)' }}
        >
          Main Views
        </div>

        <NavButton
          active={activeTab === 'canvas'}
          onClick={() => { setActiveTab('canvas'); setFocusGroup(null) }}
          icon={<LayoutTemplate size={18} />}
          label="Interactive Canvas"
        />
        <NavButton
          active={activeTab === 'debt'}
          onClick={() => setActiveTab('debt')}
          icon={<ShieldAlert size={18} />}
          label="Tech Debt Map"
        />

        {activeTab === 'canvas' && (
          <div className="mt-6">
            <div
              className="text-[10px] font-bold font-display uppercase tracking-[0.15em] px-3 py-2"
              style={{ color: 'var(--text-muted)' }}
            >
              Focus Mode
            </div>
            <div className="space-y-0.5">
              {archGroups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => setFocusGroup(focusGroup === group.id ? null : group.id)}
                  className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-medium font-display transition-all ${
                    focusGroup === group.id
                      ? 'text-[var(--neon-cyan)] bg-cyan-500/10 dark:bg-cyan-400/10'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-card-hover)]'
                  }`}
                >
                  <span className="tracking-tight">{group.label.split('(')[0]?.trim()}</span>
                  {focusGroup === group.id && (
                    <div className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 shadow-lg shadow-cyan-500/60" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Operator badge footer */}
      <div className="p-5 transition-theme border-t border-[var(--border-subtle)]" style={{ backgroundColor: 'var(--bg-app)' }}>
        <div className="flex items-center gap-3 p-3 rounded-xl glass">
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 dark:bg-cyan-400/20 flex items-center justify-center border border-cyan-500/30 dark:border-cyan-400/30">
            <span className="text-xs font-bold font-display text-cyan-600 dark:text-cyan-400">EM</span>
          </div>
          <div>
            <p className="text-xs font-bold font-display" style={{ color: 'var(--text-primary)' }}>SYS_OP_01</p>
            <p className="text-[10px] font-display uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Authorized</p>
          </div>
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
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium font-display tracking-tight transition-all ${
        active
          ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 dark:bg-cyan-400/10 border-r-2 border-cyan-500 dark:border-cyan-400'
          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-r-2 border-transparent hover:bg-[var(--surface-card-hover)]'
      }`}
    >
      {icon} {label}
    </button>
  )
}
