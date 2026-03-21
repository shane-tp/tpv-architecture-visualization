import { useRef, useCallback } from 'react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { archNodes } from '../../data/architecture'
import { nodeDetails } from '../../data/nodeDetails'
import { selectedNodeAtom, hoveredNodeAtom } from '../../atoms/selection'
import { nodePositionsAtom, draggingNodeAtom } from '../../atoms/nodePositions'
import { canvasTransformAtom } from '../../atoms/canvas'
import { getIndicatorColor, getIconTintClass } from '../../lib/architecture/colors'
import type { AccentColor, NodeStatus } from '../../types/architecture'

interface ArchitectureNodesProps {
  focusGroup: string | null
}

const glowByColor: Record<AccentColor, string> = {
  cyan:    '0 0 16px rgba(0, 238, 252, 0.35)',
  blue:    '0 0 16px rgba(59, 130, 246, 0.35)',
  emerald: '0 0 16px rgba(142, 255, 113, 0.35)',
  purple:  '0 0 16px rgba(255, 81, 250, 0.3)',
  rose:    '0 0 16px rgba(255, 81, 250, 0.3)',
  orange:  '0 0 16px rgba(249, 115, 22, 0.3)',
  indigo:  '0 0 16px rgba(139, 92, 246, 0.3)',
  amber:   '0 0 16px rgba(245, 158, 11, 0.3)',
}

const borderByColor: Record<AccentColor, string> = {
  cyan:    'rgba(0, 238, 252, 0.28)',
  blue:    'rgba(59, 130, 246, 0.28)',
  emerald: 'rgba(142, 255, 113, 0.28)',
  purple:  'rgba(255, 81, 250, 0.24)',
  rose:    'rgba(255, 81, 250, 0.24)',
  orange:  'rgba(249, 115, 22, 0.24)',
  indigo:  'rgba(139, 92, 246, 0.24)',
  amber:   'rgba(245, 158, 11, 0.24)',
}

const statusBadgeStyle: Record<NodeStatus, { bg: string; text: string }> = {
  STABLE:   { bg: 'rgba(0, 238, 252, 0.15)',  text: 'var(--neon-cyan)' },
  ACTIVE:   { bg: 'rgba(142, 255, 113, 0.15)', text: 'var(--neon-lime)' },
  LEGACY:   { bg: 'rgba(255, 81, 250, 0.15)',  text: 'var(--neon-magenta)' },
  PEAK:     { bg: 'rgba(142, 255, 113, 0.2)',  text: 'var(--neon-lime)' },
  DEBT_LCL: { bg: 'rgba(255, 113, 108, 0.18)', text: 'var(--neon-error)' },
  LIVE:     { bg: 'rgba(0, 238, 252, 0.15)',  text: 'var(--neon-cyan)' },
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

const DRAG_THRESHOLD = 4

export function ArchitectureNodes({ focusGroup }: ArchitectureNodesProps) {
  const [selectedNodeId, setSelectedNodeId] = useAtom(selectedNodeAtom)
  const [hoveredId, setHoveredId] = useAtom(hoveredNodeAtom)
  const positions = useAtomValue(nodePositionsAtom)
  const setPositions = useSetAtom(nodePositionsAtom)
  const setDraggingNode = useSetAtom(draggingNodeAtom)
  const transform = useAtomValue(canvasTransformAtom)

  const dragStateRef = useRef<{
    nodeId: string
    startMouseX: number
    startMouseY: number
    startNodeX: number
    startNodeY: number
    didDrag: boolean
  } | null>(null)

  const handleNodeMouseDown = useCallback((nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    const pos = positions[nodeId]
    if (!pos) return

    dragStateRef.current = {
      nodeId,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      startNodeX: pos.x,
      startNodeY: pos.y,
      didDrag: false,
    }

    const handleMouseMove = (me: MouseEvent) => {
      const state = dragStateRef.current
      if (!state) return

      const dx = me.clientX - state.startMouseX
      const dy = me.clientY - state.startMouseY

      if (!state.didDrag && Math.sqrt(dx * dx + dy * dy) < DRAG_THRESHOLD) return

      state.didDrag = true
      setDraggingNode(state.nodeId)
      setPositions((prev) => ({
        ...prev,
        [state.nodeId]: {
          x: state.startNodeX + dx / transform.scale,
          y: state.startNodeY + dy / transform.scale,
        },
      }))
    }

    const handleMouseUp = () => {
      const state = dragStateRef.current
      dragStateRef.current = null
      setDraggingNode(null)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)

      if (state && !state.didDrag) {
        const hasDetail = state.nodeId in nodeDetails
        if (hasDetail) {
          setSelectedNodeId(selectedNodeId === state.nodeId ? null : state.nodeId)
        }
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [positions, transform.scale, setPositions, setDraggingNode, selectedNodeId, setSelectedNodeId])

  return (
    <>
      {archNodes.map((node) => {
        const pos = positions[node.id] ?? { x: node.x, y: node.y }
        const isFaded = focusGroup !== null && focusGroup !== node.group
        const isSelected = selectedNodeId === node.id
        const isHovered = hoveredId === node.id
        const hasDetail = node.id in nodeDetails
        const Icon = node.icon
        const indicatorClass = getIndicatorColor(node.color)
        const iconClass = getIconTintClass(node.color)
        const badge = node.status ? statusBadgeStyle[node.status] : null
        const barColor = barColorByAccent[node.color]
        const metricPercent = node.metric ? Math.min(node.metric.value, 100) : 0
        const compact = node.h <= 165

        const computedShadow = isFaded
          ? 'none'
          : isSelected
            ? selectedRingByColor[node.color]
            : isHovered
              ? glowByColor[node.color]
              : 'var(--node-shadow), var(--node-inset)'

        return (
          <div
            key={node.id}
            className={`absolute z-10 rounded-xl backdrop-blur-lg overflow-hidden transition-[box-shadow] duration-200 ${hasDetail ? 'cursor-pointer' : 'cursor-grab'}`}
            style={{
              left: pos.x,
              top: pos.y,
              width: node.w,
              height: node.h,
              background: 'var(--surface-glass)',
              border: `1px solid ${borderByColor[node.color]}`,
              boxShadow: computedShadow,
              opacity: isFaded ? 0.06 : 1,
              filter: isFaded ? 'grayscale(100%)' : 'none',
              zIndex: isSelected ? 30 : 10,
              transform: isHovered && !isFaded ? 'translateY(-1px)' : 'none',
            }}
            onMouseDown={(e) => handleNodeMouseDown(node.id, e)}
            onMouseEnter={() => { if (!isFaded) setHoveredId(node.id) }}
            onMouseLeave={() => { if (hoveredId === node.id) setHoveredId(null) }}
          >
            {/* Left accent glow rail */}
            <div
              className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full ${indicatorClass}`}
              style={{ boxShadow: isFaded ? 'none' : '0 0 10px currentColor', opacity: 0.6 }}
            />

            <div className={`${compact ? 'p-3' : 'p-5'} flex flex-col h-full`}>
              {/* Top row: icon + status badge */}
              <div className={`flex justify-between items-start ${compact ? 'mb-1' : 'mb-2'}`}>
                <div className={`${compact ? 'p-1.5' : 'p-2.5'} rounded-lg shrink-0 ${iconClass}`}>
                  <Icon size={compact ? 18 : 24} />
                </div>
                {badge && (
                  <span
                    className={`px-2 py-0.5 rounded ${compact ? 'text-[10px]' : 'text-xs'} font-display font-bold tracking-wide`}
                    style={{ backgroundColor: badge.bg, color: badge.text }}
                  >
                    {node.status}
                  </span>
                )}
              </div>

              {/* Title + description */}
              <h4
                className={`${compact ? 'text-lg' : 'text-xl'} font-display font-bold tracking-tight leading-tight`}
                style={{ color: 'var(--text-primary)' }}
              >
                {node.label}
              </h4>
              <p
                className={`${compact ? 'text-sm' : 'text-[15px]'} font-sans leading-snug mt-1 truncate`}
                style={{ color: 'var(--text-muted)' }}
              >
                {node.desc}
              </p>

              {/* Metric bar */}
              {node.metric && (
                <div className="mt-auto pt-2">
                  <div className="flex justify-between text-xs font-display mb-1">
                    <span style={{ color: 'var(--text-muted)' }}>{node.metric.label}</span>
                    <span style={{ color: barColor }}>
                      {node.metric.value}{node.metric.unit ?? ''}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-subtle)' }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${metricPercent}%`,
                        backgroundColor: barColor,
                        boxShadow: `0 0 8px ${barColor}`,
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
                      className="text-[10px] px-2 py-0.5 rounded font-display"
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
