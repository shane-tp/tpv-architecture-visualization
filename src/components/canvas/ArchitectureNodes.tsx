import { useAtom } from 'jotai'
import { archNodes } from '../../data/architecture'
import { nodeDetails } from '../../data/nodeDetails'
import { selectedNodeAtom } from '../../atoms/selection'
import { getIndicatorColor, getIconTintClass } from '../../lib/architecture/colors'
import type { AccentColor, NodeStatus } from '../../types/architecture'

interface ArchitectureNodesProps {
  focusGroup: string | null
}

const glowByColor: Record<AccentColor, string> = {
  cyan:    '0 0 12px rgba(0, 238, 252, 0.25)',
  blue:    '0 0 12px rgba(59, 130, 246, 0.25)',
  emerald: '0 0 12px rgba(142, 255, 113, 0.25)',
  purple:  '0 0 12px rgba(255, 81, 250, 0.2)',
  rose:    '0 0 12px rgba(255, 81, 250, 0.2)',
  orange:  '0 0 12px rgba(249, 115, 22, 0.2)',
  indigo:  '0 0 12px rgba(139, 92, 246, 0.2)',
  amber:   '0 0 12px rgba(245, 158, 11, 0.2)',
}

const borderByColor: Record<AccentColor, string> = {
  cyan:    'rgba(0, 238, 252, 0.18)',
  blue:    'rgba(59, 130, 246, 0.18)',
  emerald: 'rgba(142, 255, 113, 0.18)',
  purple:  'rgba(255, 81, 250, 0.15)',
  rose:    'rgba(255, 81, 250, 0.15)',
  orange:  'rgba(249, 115, 22, 0.15)',
  indigo:  'rgba(139, 92, 246, 0.15)',
  amber:   'rgba(245, 158, 11, 0.15)',
}

const statusBadgeStyle: Record<NodeStatus, { bg: string; text: string }> = {
  STABLE:   { bg: 'rgba(0, 238, 252, 0.1)',  text: 'var(--neon-cyan)' },
  ACTIVE:   { bg: 'rgba(142, 255, 113, 0.1)', text: 'var(--neon-lime)' },
  LEGACY:   { bg: 'rgba(255, 81, 250, 0.1)',  text: 'var(--neon-magenta)' },
  PEAK:     { bg: 'rgba(142, 255, 113, 0.15)', text: 'var(--neon-lime)' },
  DEBT_LCL: { bg: 'rgba(255, 113, 108, 0.12)', text: 'var(--neon-error)' },
  LIVE:     { bg: 'rgba(0, 238, 252, 0.1)',  text: 'var(--neon-cyan)' },
}

const barColorByAccent: Record<AccentColor, string> = {
  cyan:    'var(--neon-cyan)',
  blue:    '#3b82f6',
  emerald: 'var(--neon-lime)',
  purple:  'var(--neon-magenta)',
  rose:    'var(--neon-magenta)',
  orange:  '#f97316',
  indigo:  '#8b5cf6',
  amber:   '#f59e0b',
}

const selectedRingByColor: Record<AccentColor, string> = {
  cyan:    '0 0 0 2px rgba(0, 238, 252, 0.6), 0 0 20px rgba(0, 238, 252, 0.3)',
  blue:    '0 0 0 2px rgba(59, 130, 246, 0.6), 0 0 20px rgba(59, 130, 246, 0.3)',
  emerald: '0 0 0 2px rgba(142, 255, 113, 0.6), 0 0 20px rgba(142, 255, 113, 0.3)',
  purple:  '0 0 0 2px rgba(255, 81, 250, 0.5), 0 0 20px rgba(255, 81, 250, 0.25)',
  rose:    '0 0 0 2px rgba(255, 81, 250, 0.5), 0 0 20px rgba(255, 81, 250, 0.25)',
  orange:  '0 0 0 2px rgba(249, 115, 22, 0.5), 0 0 20px rgba(249, 115, 22, 0.25)',
  indigo:  '0 0 0 2px rgba(139, 92, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.25)',
  amber:   '0 0 0 2px rgba(245, 158, 11, 0.5), 0 0 20px rgba(245, 158, 11, 0.25)',
}

export function ArchitectureNodes({ focusGroup }: ArchitectureNodesProps) {
  const [selectedNodeId, setSelectedNodeId] = useAtom(selectedNodeAtom)

  return (
    <>
      {archNodes.map((node) => {
        const isFaded = focusGroup !== null && focusGroup !== node.group
        const isSelected = selectedNodeId === node.id
        const hasDetail = node.id in nodeDetails
        const Icon = node.icon
        const indicatorClass = getIndicatorColor(node.color)
        const iconClass = getIconTintClass(node.color)
        const badge = node.status ? statusBadgeStyle[node.status] : null
        const barColor = barColorByAccent[node.color]
        const metricPercent = node.metric ? Math.min(node.metric.value, 100) : 0

        const defaultShadow = isSelected
          ? selectedRingByColor[node.color]
          : 'var(--node-shadow), var(--node-inset)'

        return (
          <div
            key={node.id}
            className={`absolute z-10 rounded-xl backdrop-blur-lg overflow-hidden transition-all duration-200 hover:-translate-y-0.5 ${hasDetail ? 'cursor-pointer' : 'cursor-default'}`}
            style={{
              left: node.x,
              top: node.y,
              width: node.w,
              height: node.h,
              background: 'var(--surface-glass)',
              border: `1px solid ${borderByColor[node.color]}`,
              boxShadow: isFaded ? 'none' : defaultShadow,
              opacity: isFaded ? 0.06 : 1,
              filter: isFaded ? 'grayscale(100%)' : 'none',
              zIndex: isSelected ? 30 : 10,
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => {
              if (isFaded || !hasDetail) return
              setSelectedNodeId(isSelected ? null : node.id)
            }}
            onMouseEnter={(e) => {
              if (!isFaded && !isSelected) e.currentTarget.style.boxShadow = glowByColor[node.color]
            }}
            onMouseLeave={(e) => {
              if (!isFaded) e.currentTarget.style.boxShadow = defaultShadow
            }}
          >
            {/* Left accent glow rail */}
            <div
              className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full ${indicatorClass}`}
              style={{ boxShadow: isFaded ? 'none' : '0 0 8px currentColor' }}
            />

            <div className={`${node.h < 100 ? 'p-3' : 'p-4'} flex flex-col h-full`}>
              {/* Top row: icon + status badge */}
              <div className={`flex justify-between items-start ${node.h < 100 ? 'mb-1' : 'mb-2'}`}>
                <div className={`${node.h < 100 ? 'p-1.5' : 'p-2'} rounded-lg shrink-0 ${iconClass}`}>
                  <Icon size={node.h < 100 ? 16 : 20} />
                </div>
                {badge && (
                  <span
                    className={`px-2 py-0.5 rounded ${node.h < 100 ? 'text-[9px]' : 'text-[11px]'} font-display font-bold tracking-wide`}
                    style={{ backgroundColor: badge.bg, color: badge.text }}
                  >
                    {node.status}
                  </span>
                )}
              </div>

              {/* Title + description */}
              <h4
                className={`${node.h < 100 ? 'text-sm' : 'text-base'} font-display font-bold tracking-tight leading-tight`}
                style={{ color: 'var(--text-primary)' }}
              >
                {node.label}
              </h4>
              <p
                className={`${node.h < 100 ? 'text-xs' : 'text-sm'} font-sans leading-snug mt-0.5 truncate`}
                style={{ color: 'var(--text-muted)' }}
              >
                {node.desc}
              </p>

              {/* Metric bar */}
              {node.metric && (
                <div className="mt-auto pt-2">
                  <div className="flex justify-between text-[11px] font-display mb-1">
                    <span style={{ color: 'var(--text-muted)' }}>{node.metric.label}</span>
                    <span style={{ color: barColor }}>
                      {node.metric.value}{node.metric.unit ?? ''}
                    </span>
                  </div>
                  <div className="w-full h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-subtle)' }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${metricPercent}%`,
                        backgroundColor: barColor,
                        boxShadow: `0 0 6px ${barColor}`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Tags */}
              {node.tags && node.tags.length > 0 && (
                <div className="flex gap-1.5 mt-auto pt-2">
                  {node.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] px-1.5 py-0.5 rounded font-display"
                      style={{ backgroundColor: 'var(--bg-elevated)', color: 'var(--text-muted)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </>
  )
}
