import { useAtom } from 'jotai'
import { LayoutTemplate, ShieldAlert, Layers, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { archGroups } from '../../data/architecture'
import { ThemeToggle } from '../theme/ThemeToggle'
import { activeTabAtom, focusGroupAtom, sidebarCollapsedAtom } from '../../atoms/navigation'

export function Sidebar() {
  const [activeTab, setActiveTab] = useAtom(activeTabAtom)
  const [focusGroup, setFocusGroup] = useAtom(focusGroupAtom)
  const [collapsed, setCollapsed] = useAtom(sidebarCollapsedAtom)

  return (
    <aside
      className={`${collapsed ? 'w-14' : 'w-72'} shrink-0 flex flex-col z-20 transition-all duration-300 backdrop-blur-xl`}
      style={{
        backgroundColor: 'var(--bg-elevated)',
        boxShadow: '20px 0 50px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 240, 255, 0.06)',
      }}
    >
      {/* Header */}
      <div className={`${collapsed ? 'p-2 pb-2' : 'p-6 pb-5'}`}>
        <div className="flex items-center justify-between">
          <div className={`flex items-center ${collapsed ? 'justify-center w-full' : 'gap-3'}`}>
            <div className="p-2.5 bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-600 rounded-xl shadow-lg shadow-cyan-500/20 shrink-0">
              <Layers className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-lg font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-cyan-500 dark:from-cyan-400 dark:to-cyan-300 tracking-tight drop-shadow-[0_0_8px_rgba(0,240,255,0.3)]">
                  TPV Explorer
                </h1>
                <p className="text-[10px] font-display mt-0.5 uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                  Architecture Explorer
                </p>
              </div>
            )}
          </div>
          {!collapsed && <ThemeToggle />}
        </div>
      </div>

      {/* Navigation */}
      <div className={`${collapsed ? 'px-1.5' : 'px-4'} space-y-1 flex-1 overflow-y-auto mt-4`}>
        <NavButton
          active={activeTab === 'canvas'}
          onClick={() => { setActiveTab('canvas'); setFocusGroup(null) }}
          icon={<LayoutTemplate size={18} />}
          label="Interactive Canvas"
          collapsed={collapsed}
        />
        <NavButton
          active={activeTab === 'debt'}
          onClick={() => setActiveTab('debt')}
          icon={<ShieldAlert size={18} />}
          label="Tech Debt Map"
          collapsed={collapsed}
        />

        {activeTab === 'canvas' && !collapsed && (
          <>
            <div className="mt-8">
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

            <div className="mt-8 px-4">
              <div
                className="text-[10px] font-bold font-display uppercase tracking-[0.15em] mb-3"
                style={{ color: 'var(--text-muted)' }}
              >
                Legend
              </div>
              <div className="space-y-2">
                <LegendLine color="#00F0FF" label="Data Flow" />
                <LegendLine color="#8eff71" label="Hot Path" />
                <LegendLine color="#ff51fa" label="External / API" />
                <LegendLine color="var(--text-muted)" label="Async" dashed />
              </div>
              <div className="h-px mt-3 mb-3" style={{ background: 'var(--border-subtle)' }} />
              <div className="space-y-2">
                <LegendDot color="var(--neon-cyan)" label="Stable" />
                <LegendDot color="var(--neon-lime)" label="Active / Peak" />
                <LegendDot color="var(--neon-magenta)" label="Legacy" />
                <LegendDot color="var(--neon-error)" label="Tech Debt" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Collapse toggle */}
      <div className={`${collapsed ? 'p-1.5' : 'p-4'} mt-auto`}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-2.5 rounded-xl text-sm font-medium font-display transition-all text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-card-hover)]"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>
    </aside>
  )
}

function NavButton({
  active,
  onClick,
  icon,
  label,
  collapsed,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
  collapsed: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} w-full ${collapsed ? 'px-0 py-3' : 'px-4 py-3'} rounded-xl text-sm font-medium font-display tracking-tight transition-all ${
        active
          ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 dark:bg-cyan-400/10 border-r-2 border-cyan-500 dark:border-cyan-400'
          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-r-2 border-transparent hover:bg-[var(--surface-card-hover)]'
      }`}
      title={collapsed ? label : undefined}
    >
      {icon} {!collapsed && label}
    </button>
  )
}

function LegendLine({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="20" height="6" className="shrink-0">
        <line x1="0" y1="3" x2="20" y2="3" stroke={color} strokeWidth="2" strokeDasharray={dashed ? '4,3' : 'none'} strokeLinecap="round" />
      </svg>
      <span className="text-[11px] font-display" style={{ color: 'var(--text-secondary)' }}>{label}</span>
    </div>
  )
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }} />
      <span className="text-[11px] font-display" style={{ color: 'var(--text-secondary)' }}>{label}</span>
    </div>
  )
}
