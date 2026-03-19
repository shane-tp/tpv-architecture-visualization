import { AlertTriangle } from 'lucide-react'
import { debtData } from '../../data/debt'

export function TechDebtPanel() {
  return (
    <div className="h-full overflow-y-auto p-12 transition-theme" style={{ backgroundColor: 'var(--bg-app)' }}>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-4 pb-6" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
          <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Tech Debt Heatmap
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              Identified risks and architectural bottlenecks
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {debtData.map((item, idx) => {
            const isP0 = item.level === 'P0'
            const isP1 = item.level === 'P1'

            const severityClasses = isP0
              ? 'border-red-500/20 hover:border-red-500/40 hover:shadow-red-500/10'
              : isP1
                ? 'border-orange-500/20 hover:border-orange-500/40 hover:shadow-orange-500/10'
                : 'border-yellow-500/20 hover:border-yellow-500/40 hover:shadow-yellow-500/10'

            const tintBg = isP0
              ? 'bg-red-500/[0.04]'
              : isP1
                ? 'bg-orange-500/[0.04]'
                : 'bg-yellow-500/[0.04]'

            const badgeClasses = isP0
              ? 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/25'
              : isP1
                ? 'bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/25'
                : 'bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/25'

            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl border transition-all duration-200 hover:shadow-lg ${severityClasses} ${tintBg}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                    {item.title}
                  </h3>
                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold font-mono tracking-wider border ${badgeClasses}`}>
                    {item.level}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
