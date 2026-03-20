export function CanvasIntelligencePanel() {
  return (
    <div className="absolute right-8 top-32 w-72 flex flex-col gap-5 z-30 pointer-events-auto">
      {/* Metrics Panel */}
      <div
        className="backdrop-blur-2xl rounded-xl p-7"
        style={{
          background: 'var(--surface-glass)',
          borderLeft: '2px solid rgba(0, 238, 252, 0.25)',
        }}
      >
        <h5
          className="text-[10px] uppercase tracking-widest font-display font-bold mb-6"
          style={{ color: 'var(--neon-cyan)' }}
        >
          Canvas Intelligence
        </h5>

        <div className="space-y-7">
          <MetricRow
            label="System Latency"
            value="24"
            unit="ms"
            delta="2% from baseline"
            deltaColor="var(--neon-lime)"
            deltaPrefix="▲ "
          />
          <MetricRow
            label="Uptime Cluster"
            value="99.998"
            unit="%"
            sub="Last reset: 14d 2h"
          />
          <MetricRow
            label="Debt Detected"
            value="14.2k"
            valueColor="var(--neon-magenta)"
            sub="Impact: High Severity"
            warningIcon
          />
        </div>
      </div>

      {/* Neural Optimization Card */}
      <div
        className="rounded-xl p-6 relative overflow-hidden group"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 238, 252, 0.12) 0%, rgba(255, 81, 250, 0.06) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <div className="relative z-10">
          <h4
            className="font-display font-bold text-xs uppercase tracking-tight"
            style={{ color: 'var(--neon-cyan)' }}
          >
            Neural Optimization
          </h4>
          <p className="text-[10px] mt-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            System architecture analyzed by TP-Neural Engine. Auto-scaling recommended for Region: US-EAST-1.
          </p>
        </div>
        <div
          className="absolute -right-6 -bottom-6 text-[100px] leading-none opacity-[0.06] group-hover:scale-110 transition-transform duration-700 select-none"
          style={{ color: 'var(--neon-cyan)' }}
        >
          ⚡
        </div>
      </div>
    </div>
  )
}

function MetricRow({
  label,
  value,
  unit,
  valueColor,
  delta,
  deltaColor,
  deltaPrefix,
  sub,
  warningIcon,
}: {
  label: string
  value: string
  unit?: string
  valueColor?: string
  delta?: string
  deltaColor?: string
  deltaPrefix?: string
  sub?: string
  warningIcon?: boolean
}) {
  return (
    <div className="group cursor-default">
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </p>
        {warningIcon && (
          <span className="text-xs" style={{ color: 'var(--neon-magenta)' }}>▲</span>
        )}
      </div>
      <p
        className="text-3xl font-display font-bold transition-colors"
        style={{ color: valueColor ?? 'var(--text-primary)' }}
      >
        {value}
        {unit && <span className="text-lg ml-0.5">{unit}</span>}
      </p>
      {delta && (
        <p className="text-[10px] mt-1" style={{ color: deltaColor ?? 'var(--text-muted)' }}>
          {deltaPrefix}{delta}
        </p>
      )}
      {sub && (
        <p className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>
          {sub}
        </p>
      )}
    </div>
  )
}
