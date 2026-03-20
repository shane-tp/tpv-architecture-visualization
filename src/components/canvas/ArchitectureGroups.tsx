import { useRef, useCallback } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { archGroups, archNodes } from '../../data/architecture'
import { getGroupBgClass, getGroupTextClass } from '../../lib/architecture/colors'
import { groupPositionsAtom, nodePositionsAtom, draggingGroupAtom } from '../../atoms/nodePositions'
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

const DRAG_THRESHOLD = 4

const childNodesByGroup: Record<string, string[]> = {}
for (const n of archNodes) {
  if (!childNodesByGroup[n.group]) childNodesByGroup[n.group] = []
  childNodesByGroup[n.group].push(n.id)
}

export function ArchitectureGroups({ focusGroup }: ArchitectureGroupsProps) {
  const groupPositions = useAtomValue(groupPositionsAtom)
  const setGroupPositions = useSetAtom(groupPositionsAtom)
  const setNodePositions = useSetAtom(nodePositionsAtom)
  const setDraggingGroup = useSetAtom(draggingGroupAtom)
  const transform = useAtomValue(canvasTransformAtom)

  const dragStateRef = useRef<{
    groupId: string
    startMouseX: number
    startMouseY: number
    didDrag: boolean
  } | null>(null)

  const handleGroupMouseDown = useCallback((groupId: string, e: React.MouseEvent) => {
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

      if (!state.didDrag && Math.sqrt(rawDx * rawDx + rawDy * rawDy) < DRAG_THRESHOLD) return

      state.didDrag = true
      setDraggingGroup(state.groupId)

      const dx = rawDx / transform.scale
      const dy = rawDy / transform.scale
      const deltaDx = dx - lastDx
      const deltaDy = dy - lastDy
      lastDx = dx
      lastDy = dy

      setGroupPositions((prev) => ({
        ...prev,
        [state.groupId]: {
          x: prev[state.groupId].x + deltaDx,
          y: prev[state.groupId].y + deltaDy,
        },
      }))

      const children = childNodesByGroup[state.groupId] ?? []
      if (children.length > 0) {
        setNodePositions((prev) => {
          const next = { ...prev }
          for (const id of children) {
            const p = next[id]
            if (p) next[id] = { x: p.x + deltaDx, y: p.y + deltaDy }
          }
          return next
        })
      }
    }

    const handleMouseUp = () => {
      dragStateRef.current = null
      setDraggingGroup(null)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [transform.scale, setGroupPositions, setNodePositions, setDraggingGroup])

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
            className={`absolute rounded-2xl z-0 transition-opacity duration-300 cursor-grab active:cursor-grabbing ${bgClass}`}
            style={{
              left: pos.x,
              top: pos.y,
              width: group.w,
              height: group.h,
              opacity: isFaded ? 0.05 : 1,
              boxShadow: ghostBorderByColor[group.color],
            }}
            onMouseDown={(e) => handleGroupMouseDown(group.id, e)}
          >
            <div
              className={`absolute -top-5 left-6 px-4 py-1.5 rounded-full text-sm font-bold tracking-[0.2em] font-mono ${textClass}`}
              style={{
                backgroundColor: 'var(--group-label-bg)',
                boxShadow: ghostBorderByColor[group.color],
                fontSize: '14px',
                letterSpacing: '0.2em',
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
