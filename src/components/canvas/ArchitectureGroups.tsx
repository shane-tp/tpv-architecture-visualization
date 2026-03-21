import { useRef, useCallback } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { GripVertical } from 'lucide-react'
import { archGroups } from '../../data/architecture'
import { getGroupBgClass, getGroupTextClass } from '../../lib/architecture/colors'
import { groupPositionsAtom, draggingGroupAtom, moveGroupAtom } from '../../atoms/nodePositions'
import { canvasTransformAtom } from '../../atoms/canvas'
import type { AccentColor } from '../../types/architecture'

interface ArchitectureGroupsProps {
  focusGroup: string | null
}

const ghostBorderByColor: Record<AccentColor, string> = {
  cyan:    'inset 0 0 0 1px rgba(0, 238, 252, 0.18), 0 0 30px rgba(0, 238, 252, 0.04)',
  blue:    'inset 0 0 0 1px rgba(59, 130, 246, 0.18), 0 0 30px rgba(59, 130, 246, 0.04)',
  emerald: 'inset 0 0 0 1px rgba(142, 255, 113, 0.18), 0 0 30px rgba(142, 255, 113, 0.04)',
  purple:  'inset 0 0 0 1px rgba(255, 81, 250, 0.15), 0 0 30px rgba(255, 81, 250, 0.03)',
  rose:    'inset 0 0 0 1px rgba(255, 81, 250, 0.15), 0 0 30px rgba(255, 81, 250, 0.03)',
  orange:  'inset 0 0 0 1px rgba(249, 115, 22, 0.15), 0 0 30px rgba(249, 115, 22, 0.03)',
  indigo:  'inset 0 0 0 1px rgba(139, 92, 246, 0.15), 0 0 30px rgba(139, 92, 246, 0.03)',
  amber:   'inset 0 0 0 1px rgba(245, 158, 11, 0.15), 0 0 30px rgba(245, 158, 11, 0.03)',
}

const LABEL_DRAG_THRESHOLD = 4

export function ArchitectureGroups({ focusGroup }: ArchitectureGroupsProps) {
  const groupPositions = useAtomValue(groupPositionsAtom)
  const setDraggingGroup = useSetAtom(draggingGroupAtom)
  const moveGroup = useSetAtom(moveGroupAtom)
  const transform = useAtomValue(canvasTransformAtom)

  const dragStateRef = useRef<{
    groupId: string
    startMouseX: number
    startMouseY: number
    didDrag: boolean
  } | null>(null)

  const startGroupDrag = useCallback((groupId: string, e: React.MouseEvent, threshold: number) => {
    e.stopPropagation()
    e.preventDefault()

    dragStateRef.current = {
      groupId,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      didDrag: false,
    }

    let lastDx = 0, lastDy = 0

    const handleMouseMove = (me: MouseEvent) => {
      const state = dragStateRef.current
      if (!state) return

      const rawDx = me.clientX - state.startMouseX
      const rawDy = me.clientY - state.startMouseY

      if (!state.didDrag && Math.sqrt(rawDx * rawDx + rawDy * rawDy) < threshold) return

      state.didDrag = true
      setDraggingGroup(state.groupId)

      const dx = rawDx / transform.scale
      const dy = rawDy / transform.scale
      const deltaDx = dx - lastDx
      const deltaDy = dy - lastDy
      lastDx = dx
      lastDy = dy

      moveGroup({ groupId: state.groupId, dx: deltaDx, dy: deltaDy })
    }

    const handleMouseUp = () => {
      dragStateRef.current = null
      setDraggingGroup(null)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [transform.scale, moveGroup, setDraggingGroup])

  return (
    <>
      {archGroups.map((group) => {
        const pos = groupPositions[group.id] ?? { x: group.x, y: group.y }
        const isFaded = focusGroup !== null && focusGroup !== group.id
        const bgClass = getGroupBgClass(group.color)
        const textClass = getGroupTextClass(group.color)

        return (
          <div
            key={group.id}
            className={`absolute rounded-2xl ${bgClass}`}
            style={{
              left: pos.x,
              top: pos.y,
              width: group.w,
              height: group.h,
              opacity: isFaded ? 0.05 : 1,
              boxShadow: ghostBorderByColor[group.color],
              transition: 'opacity 0.3s ease',
              pointerEvents: 'none',
            }}
          >
            <div
              className={`absolute -top-5 left-6 z-[15] px-5 py-2 rounded-full font-bold tracking-[0.18em] font-mono pointer-events-auto cursor-grab active:cursor-grabbing select-none flex items-center gap-2 transition-opacity hover:opacity-100 ${textClass}`}
              style={{
                backgroundColor: 'var(--group-label-bg)',
                boxShadow: ghostBorderByColor[group.color],
                fontSize: '15px',
                letterSpacing: '0.18em',
                opacity: 0.85,
              }}
              title="Drag to move group"
              onMouseDown={(e) => {
                e.stopPropagation()
                startGroupDrag(group.id, e, LABEL_DRAG_THRESHOLD)
              }}
            >
              <GripVertical size={16} className="opacity-60" />
              {group.label}
            </div>
          </div>
        )
      })}
    </>
  )
}
