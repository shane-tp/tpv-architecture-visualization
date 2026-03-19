import { archNodes } from '../../data/architecture'
import { getNodeAccentClasses, getIndicatorColor, getIconTintClass } from '../../lib/architecture/colors'

interface ArchitectureNodesProps {
  focusGroup: string | null
}

export function ArchitectureNodes({ focusGroup }: ArchitectureNodesProps) {
  return (
    <>
      {archNodes.map((node) => {
        const isFaded = focusGroup !== null && focusGroup !== node.group
        const Icon = node.icon
        const accentClasses = getNodeAccentClasses(node.color)
        const indicatorClass = getIndicatorColor(node.color)
        const iconClass = getIconTintClass(node.color)

        return (
          <div
            key={node.id}
            className={`absolute z-10 flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-200 hover:-translate-y-px ${accentClasses}`}
            style={{
              left: node.x,
              top: node.y,
              width: node.w,
              height: node.h,
              backgroundColor: 'var(--surface-card)',
              boxShadow: isFaded ? 'none' : 'var(--node-shadow), var(--node-inset)',
              opacity: isFaded ? 0.06 : 1,
              filter: isFaded ? 'grayscale(100%)' : 'none',
            }}
          >
            {/* Left accent rail */}
            <div
              className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full ${indicatorClass}`}
            />

            {/* Icon chip */}
            <div className={`p-2 rounded-lg shrink-0 ${iconClass}`}>
              <Icon size={18} />
            </div>

            {/* Labels */}
            <div className="flex flex-col justify-center min-w-0 flex-1">
              <div
                className="text-[13px] font-semibold leading-tight truncate"
                style={{ color: 'var(--text-primary)' }}
              >
                {node.label}
              </div>
              <div
                className="text-[11px] font-mono leading-snug truncate mt-0.5"
                style={{ color: 'var(--text-muted)' }}
              >
                {node.desc}
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
