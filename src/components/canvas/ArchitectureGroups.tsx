import { archGroups } from '../../data/architecture'
import { getGroupBorderClass, getGroupBgClass, getGroupTextClass } from '../../lib/architecture/colors'

interface ArchitectureGroupsProps {
  focusGroup: string | null
}

export function ArchitectureGroups({ focusGroup }: ArchitectureGroupsProps) {
  return (
    <>
      {archGroups.map((group) => {
        const isFaded = focusGroup !== null && focusGroup !== group.id
        const borderClass = getGroupBorderClass(group.color)
        const bgClass = getGroupBgClass(group.color)
        const textClass = getGroupTextClass(group.color)

        return (
          <div
            key={group.id}
            className={`absolute rounded-2xl border pointer-events-none z-0 transition-opacity duration-300 ${borderClass} ${bgClass}`}
            style={{
              left: group.x,
              top: group.y,
              width: group.w,
              height: group.h,
              opacity: isFaded ? 0.05 : 1,
            }}
          >
            <div
              className={`absolute -top-3.5 left-5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest font-mono border ${borderClass} ${textClass}`}
              style={{ backgroundColor: 'var(--group-label-bg)' }}
            >
              {group.label}
            </div>
          </div>
        )
      })}
    </>
  )
}
