import { AlertTriangle } from 'lucide-react'
import { debtData, systemNodes } from '../../data/debt'

export function TechDebtPanel() {
  const primaryDebt = debtData.find((d) => d.title === 'God-object App.cs')
  const secondaryDebt = debtData.find((d) => d.title === 'PHP API Deploy')
  const remainingDebt = debtData.filter((d) => d !== primaryDebt && d !== secondaryDebt)

  return (
    <div className="h-full overflow-y-auto pb-24 transition-theme" style={{ backgroundColor: 'var(--bg-app)' }}>
      <div className="max-w-6xl mx-auto p-8 space-y-8">
        {/* Header with aggregated risk score */}
        <header className="mb-10">
          <h2 className="text-5xl font-extrabold font-display tracking-tighter" style={{ color: 'var(--text-primary)' }}>
            Tech Debt Heatmap
          </h2>
          <p className="text-base mt-2 max-w-xl" style={{ color: 'var(--text-secondary)' }}>
            Architectural risk analysis sourced from the TPVirtual codebase.
          </p>
        </header>

        {/* Bento grid: primary + secondary debt */}
        <div className="grid grid-cols-12 gap-6">
          {/* Primary: God-object App.cs */}
          {primaryDebt && (
            <section className="col-span-12 lg:col-span-7">
              <div className="glass p-8 rounded-xl relative overflow-hidden group hover:bg-[var(--surface-card-hover)] transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16" style={{ background: 'rgba(255, 113, 108, 0.08)', filter: 'blur(40px)' }} />
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="inline-block px-3 py-1 text-[10px] font-display font-bold uppercase tracking-widest rounded-sm mb-4" style={{ backgroundColor: 'rgba(159, 5, 25, 0.8)', color: '#ffa8a3' }}>
                      CRITICAL_VULNERABILITY
                    </span>
                    <h3 className="text-3xl font-display font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                      {primaryDebt.title}
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-display font-bold" style={{ color: 'var(--neon-error)' }}>{primaryDebt.riskScore}</p>
                    <p className="text-[10px] uppercase font-display" style={{ color: 'var(--text-muted)' }}>Risk Score Index</p>
                  </div>
                </div>
                {/* Severity gauges */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <GaugeCard label="Business Impact" value={primaryDebt.impact ?? 'Unknown'} color="cyan" percent={90} />
                  <GaugeCard label="Refactor Effort" value={primaryDebt.effort ?? 'Unknown'} color="magenta" percent={85} />
                  <GaugeCard label="Stability" value={primaryDebt.stability ?? 'Unknown'} color="error" percent={15} />
                </div>
                {primaryDebt.details && (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <MetricChip label="Lines of Code" value={primaryDebt.details.linesOfCode?.toLocaleString() ?? '—'} />
                    <MetricChip label="Coupled Modules" value={String(primaryDebt.details.coupledModules ?? '—')} accent="error" />
                  </div>
                )}
                <div
                  className="flex items-center gap-3 p-3 rounded"
                  style={{ backgroundColor: 'rgba(255, 113, 108, 0.05)', boxShadow: 'inset 0 0 0 1px rgba(255, 113, 108, 0.1)' }}
                >
                  <AlertTriangle size={16} style={{ color: 'var(--neon-error)' }} />
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    66 static managers create a singleton bottleneck. <span className="font-bold" style={{ color: 'var(--neon-error)' }}>272 files</span> reference App.cs directly, preventing isolated testing.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Secondary: Legacy API */}
          {secondaryDebt && (
            <section className="col-span-12 lg:col-span-5">
              <div className="glass p-8 rounded-xl flex flex-col h-full hover:bg-[var(--surface-card-hover)] transition-all duration-300">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="inline-block px-3 py-1 text-[10px] font-display font-bold uppercase tracking-widest rounded-sm mb-4" style={{ backgroundColor: 'rgba(249, 115, 22, 0.6)', color: '#fff5f9' }}>
                      HIGH_RISK_DEPLOY
                    </span>
                    <h3 className="text-3xl font-display font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                      {secondaryDebt.title}
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-display font-bold" style={{ color: 'var(--neon-magenta)' }}>{secondaryDebt.riskScore}</p>
                    <p className="text-[10px] uppercase font-display" style={{ color: 'var(--text-muted)' }}>Risk Score Index</p>
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  {secondaryDebt.details && Object.entries(secondaryDebt.details).map(([key, val]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center py-2"
                      style={{ boxShadow: '0 1px 0 0 var(--border-subtle)' }}
                    >
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{formatLabel(key)}</span>
                      <span className="text-sm font-display font-semibold" style={{ color: 'var(--text-primary)' }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Remaining debt items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {remainingDebt.map((item, idx) => {
            const isP0 = item.level === 'P0'
            const isP1 = item.level === 'P1'
            const badgeBg = isP0 ? 'rgba(159, 5, 25, 0.7)' : isP1 ? 'rgba(169, 0, 169, 0.5)' : 'rgba(234, 179, 8, 0.3)'
            const badgeText = isP0 ? '#ffa8a3' : isP1 ? '#ffa6f3' : '#fdd835'
            const impactColor = isP0 ? 'var(--neon-error)' : isP1 ? 'var(--neon-magenta)' : 'var(--neon-lime)'

            return (
              <div key={idx} className="glass p-5 rounded-xl hover:bg-[var(--surface-card-hover)] transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    {item.level === 'P0' ? 'Critical' : item.level === 'P1' ? 'High' : 'Moderate'}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-display font-bold" style={{ backgroundColor: badgeBg, color: badgeText }}>
                    {item.level}
                  </span>
                </div>
                <h4 className="text-sm font-display font-bold mb-2 tracking-tight" style={{ color: 'var(--text-primary)' }}>{item.title}</h4>
                <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                {item.impact && (
                  <p className="text-[10px] font-display uppercase tracking-wider" style={{ color: impactColor }}>
                    Impact: {item.impact}
                  </p>
                )}
              </div>
            )
          })}
        </div>

        {/* Global dependency heatmap grid */}
        <section
          className="p-8 rounded-xl"
          style={{
            backgroundColor: 'var(--bg-elevated)',
            boxShadow: 'inset 0 0 0 1px rgba(70, 72, 76, 0.12)',
          }}
        >
          <div className="flex justify-between items-center mb-10">
            <h4 className="font-display text-xl font-bold uppercase tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Global Dependency Heatmap
            </h4>
            <div className="flex gap-4 items-center">
              <Legend color="var(--neon-error)" label="Critical" />
              <Legend color="var(--neon-magenta)" label="High Risk" />
              <Legend color="var(--neon-lime)" label="Optimal" />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {systemNodes.map((node) => {
              const colors = statusColors[node.status]
              return (
                <div
                  key={node.id}
                  className="rounded-lg p-4 cursor-pointer transition-all hover:scale-[1.02]"
                  style={{
                    backgroundColor: colors.bg,
                    boxShadow: `inset 0 0 0 1px ${colors.border}, ${colors.glow}`,
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-[10px] font-display font-bold" style={{ color: colors.text }}>{node.label}</p>
                    <span className="text-[9px] font-display px-1.5 py-0.5 rounded" style={{ backgroundColor: colors.border, color: colors.text }}>
                      {node.status === 'critical' ? 'CRITICAL' : node.status === 'high' ? 'HIGH' : node.status === 'moderate' ? 'MED' : 'LOW'}
                    </span>
                  </div>
                  <p className="text-2xl font-display font-bold leading-none" style={{ color: 'var(--text-primary)' }}>
                    {node.refs !== null ? node.refs : '—'}
                  </p>
                  <p className="text-[10px] font-display mt-1" style={{ color: 'var(--text-muted)' }}>
                    {node.refs !== null ? 'external refs' : 'cross-stack'}
                  </p>
                  <div className="flex gap-3 mt-3 pt-2" style={{ boxShadow: '0 -1px 0 0 var(--border-subtle)' }}>
                    <div>
                      <p className="text-[9px] font-display uppercase" style={{ color: 'var(--text-muted)' }}>Files</p>
                      <p className="text-xs font-display font-bold" style={{ color: 'var(--text-secondary)' }}>{node.files}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-display uppercase" style={{ color: 'var(--text-muted)' }}>LOC</p>
                      <p className="text-xs font-display font-bold" style={{ color: 'var(--text-secondary)' }}>{node.loc.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>

    </div>
  )
}

const statusColors: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  critical: { bg: 'rgba(255, 113, 108, 0.12)', border: 'rgba(255, 113, 108, 0.25)', text: 'var(--neon-error)', glow: '0 0 15px rgba(255, 113, 108, 0.1)' },
  high: { bg: 'rgba(255, 81, 250, 0.08)', border: 'rgba(255, 81, 250, 0.18)', text: 'var(--neon-magenta)', glow: '0 0 15px rgba(255, 81, 250, 0.08)' },
  moderate: { bg: 'rgba(234, 179, 8, 0.06)', border: 'rgba(234, 179, 8, 0.12)', text: 'rgb(234, 179, 8)', glow: 'none' },
  optimal: { bg: 'rgba(142, 255, 113, 0.06)', border: 'rgba(142, 255, 113, 0.12)', text: 'var(--neon-lime)', glow: 'none' },
}

function GaugeCard({ label, value, color, percent }: { label: string; value: string; color: string; percent: number }) {
  const barColor = color === 'cyan' ? 'var(--neon-cyan)' : color === 'magenta' ? 'var(--neon-magenta)' : 'var(--neon-error)'
  return (
    <div
      className="p-4 rounded-lg"
      style={{ backgroundColor: 'var(--bg-elevated)' }}
    >
      <p className="text-[10px] uppercase font-display tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>{label}</p>
      <p className="text-xl font-display font-bold" style={{ color: barColor }}>{value}</p>
      <div className="h-1 w-full rounded-full overflow-hidden mt-2" style={{ backgroundColor: 'var(--border-subtle)' }}>
        <div className="h-full rounded-full" style={{ width: `${percent}%`, backgroundColor: barColor, boxShadow: `0 0 8px ${barColor}` }} />
      </div>
    </div>
  )
}

function MetricChip({ label, value, accent }: { label: string; value: string; accent?: string }) {
  const valColor = accent === 'error' ? 'var(--neon-error)' : 'var(--text-primary)'
  return (
    <div className="text-center">
      <p className="text-[10px] uppercase font-display tracking-wider" style={{ color: 'var(--text-muted)' }}>{label}</p>
      <p className="text-xl font-display font-bold mt-1" style={{ color: valColor }}>{value}</p>
    </div>
  )
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-[10px] font-display uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{label}</span>
    </div>
  )
}

function formatLabel(key: string): string {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())
}
