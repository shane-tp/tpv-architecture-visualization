import { archEdges, archNodes, CANVAS_W, CANVAS_H } from '../../data/architecture'
import { getAnchors } from '../../lib/architecture/geometry'

interface ArchitectureEdgesProps {
  focusGroup: string | null
}

export function ArchitectureEdges({ focusGroup }: ArchitectureEdgesProps) {
  return (
    <svg
      className="absolute inset-0 overflow-visible pointer-events-none z-0"
      style={{ width: CANVAS_W, height: CANVAS_H }}
    >
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="4"
          markerHeight="4"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--arrow-fill)" />
        </marker>
      </defs>

      {archEdges.map((edge) => {
        const from = archNodes.find((n) => n.id === edge.from)
        const to = archNodes.find((n) => n.id === edge.to)
        if (!from || !to) return null

        let opacity = 1
        if (focusGroup) {
          if (from.group !== focusGroup && to.group !== focusGroup) opacity = 0.05
        }

        const { startX, startY, endX, endY } = getAnchors(from, to)
        const offset = Math.max(
          Math.abs(startX - endX) / 1.5,
          Math.abs(startY - endY) / 1.5,
          80,
        )

        let cp1x = startX
        let cp1y = startY
        let cp2x = endX
        let cp2y = endY

        if (startX === from.x || startX === from.x + from.w) {
          cp1x += startX === from.x ? -offset : offset
        } else {
          cp1y += startY === from.y ? -offset : offset
        }

        if (endX === to.x || endX === to.x + to.w) {
          cp2x += endX === to.x ? -offset : offset
        } else {
          cp2y += endY === to.y ? -offset : offset
        }

        const pathData = `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`
        const strokeColor = edge.color ?? '#4B5563'
        const strokeWidth = edge.strokeW ?? '2'

        return (
          <g key={edge.id} style={{ opacity, transition: 'opacity 0.3s ease' }}>
            <path
              d={pathData}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeDasharray={edge.dashed ? '6,4' : 'none'}
              markerEnd="url(#arrow)"
              strokeLinecap="round"
            />
            {edge.animate && opacity > 0.5 && (
              <circle r="3.5" fill={strokeColor} opacity={0.9}>
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  path={pathData}
                  calcMode="spline"
                  keySplines="0.4 0 0.2 1"
                  keyTimes="0;1"
                />
              </circle>
            )}
            {edge.label && (
              <text
                x={(startX + endX) / 2}
                y={(startY + endY) / 2 - 8}
                fill={edge.textCol ?? 'var(--edge-label-fill)'}
                className="text-[10px] font-mono font-semibold pointer-events-none"
                textAnchor="middle"
              >
                {edge.label}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
