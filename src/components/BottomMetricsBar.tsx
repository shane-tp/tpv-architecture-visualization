import { Users, Gauge, Radio } from 'lucide-react'

export function BottomMetricsBar() {
  return (
    <footer
      className="fixed bottom-0 right-0 left-72 h-11 flex justify-around items-center px-8 z-50 backdrop-blur-2xl"
      style={{
        background: 'rgba(12, 14, 18, 0.7)',
        borderTop: '1px solid rgba(0, 238, 252, 0.08)',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.4)',
      }}
    >
      <MetricItem icon={<Users size={14} />} label="Max Players: 12.4k" active />
      <Divider />
      <MetricItem icon={<Gauge size={14} />} label="Tick Rate: 60Hz" />
      <Divider />
      <MetricItem icon={<Radio size={14} />} label="API Status: Stable" />
    </footer>
  )
}

function MetricItem({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 font-display text-[10px] uppercase tracking-[0.15em] transition-colors cursor-default ${
        active
          ? 'text-[var(--neon-cyan)] drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]'
          : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
      }`}
    >
      {icon}
      <span className="font-semibold">{label}</span>
    </div>
  )
}

function Divider() {
  return <div className="h-4 w-px" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }} />
}
