import { Users, Gauge, Radio } from 'lucide-react'

export function BottomMetricsBar() {
  return (
    <footer className="fixed bottom-0 right-0 left-72 h-11 flex justify-around items-center px-8 z-50 glass border-t border-[var(--surface-glass-border)]">
      <MetricItem icon={<Users size={14} />} label="Max Players: 4,000" />
      <MetricItem icon={<Gauge size={14} />} label="Tick Rate: 20Hz" active />
      <MetricItem icon={<Radio size={14} />} label="API Endpoints: 90" />
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
