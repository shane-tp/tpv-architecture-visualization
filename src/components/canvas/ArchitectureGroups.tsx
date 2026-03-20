import { archGroups } from '../../data/architecture'
import { getGroupBgClass, getGroupTextClass } from '../../lib/architecture/colors'
import type { AccentColor } from '../../types/architecture'

interface ArchitectureGroupsProps {
  focusGroup: string | null
}

const ghostBorderByColor: Record<AccentColor, string> = {
  cyan:    'inset 0 0 0 1px rgba(0, 238, 252, 0.1)',
  blue:    'inset 0 0 0 1px rgba(59, 130, 246, 0.1)',
  emerald: 'inset 0 0 0 1px rgba(142, 255, 113, 0.1)',
  purple:  'inset 0 0 0 1px rgba(255, 81, 250, 0.08)',
  rose:    'inset 0 0 0 1px rgba(255, 81, 250, 0.08)',
  orange:  'inset 0 0 0 1px rgba(249, 115, 22, 0.08)',
  indigo:  'inset 0 0 0 1px rgba(139, 92, 246, 0.08)',
  amber:   'inset 0 0 0 1px rgba(245, 158, 11, 0.08)',
}

export function ArchitectureGroups({ focusGroup }: ArchitectureGroupsProps) {
  return (
    <>
      {archGroups.map((group) => {
        const isFaded = focusGroup !== null && focusGroup !== group.id
        const bgClass = getGroupBgClass(group.color)
        const textClass = getGroupTextClass(group.color)

        return (
          <div
            key={group.id}
            className={`absolute rounded-2xl pointer-events-none z-0 transition-opacity duration-300 ${bgClass}`}
            style={{
              left: group.x,
              top: group.y,
              width: group.w,
              height: group.h,
              opacity: isFaded ? 0.05 : 1,
              boxShadow: ghostBorderByColor[group.color],
            }}
          >
            <div
              className={`absolute -top-4 left-6 px-3 py-1 rounded-full text-xs font-bold tracking-widest font-mono ${textClass}`}
              style={{
                backgroundColor: 'var(--group-label-bg)',
                boxShadow: ghostBorderByColor[group.color],
              }}
            >
              {group.label}
            </div>
          </div>
        )
      })}
    </>
  )
}
