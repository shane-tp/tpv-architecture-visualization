import { useAtomValue } from 'jotai'
import { archEdges, archNodes, CANVAS_W, CANVAS_H } from '../../data/architecture'
import { getAnchors, buildPath } from '../../lib/architecture/geometry'
import { selectedNodeAtom } from '../../atoms/selection'

interface ArchitectureEdgesProps {
  focusGroup: string | null
}

export function ArchitectureEdges({ focusGroup }: ArchitectureEdgesProps) {
  const selectedNodeId = useAtomValue(selectedNodeAtom)

  const highlightedGroups = new Set<string>()
  if (selectedNodeId) {
    const selectedNode = archNodes.find((n) => n.id === selectedNodeId)
    if (selectedNode) highlightedGroups.add(selectedNode.group)
    for (const e of archEdges) {
      if (e.from === selectedNodeId || e.to === selectedNodeId) {
        const peer = archNodes.find((n) => n.id === (e.from === selectedNodeId ? e.to : e.from))
        if (peer) highlightedGroups.add(peer.group)
      }
    }
  }

  return (
    <svg
      className="absolute inset-0 overflow-visible pointer-events-none z-20"
      style={{ width: CANVAS_W, height: CANVAS_H }}
    >
      <defs>
        <filter id="glow-edge" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <marker
          id="arrow-cyan"
          viewBox="0 0 10 10"
          refX="10"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#00F0FF" />
        </marker>
        <marker
          id="arrow-lime"
          viewBox="0 0 10 10"
          refX="10"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#8eff71" />
        </marker>
        <marker
          id="arrow-magenta"
          viewBox="0 0 10 10"
          refX="10"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#ff51fa" />
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
        if (selectedNodeId && opacity > 0.05) {
          const isConnected = edge.from === selectedNodeId || edge.to === selectedNodeId
          const bothInHighlighted = highlightedGroups.has(from.group) && highlightedGroups.has(to.group)
          if (!isConnected && !bothInHighlighted) opacity = Math.min(opacity, 0.2)
        }

        const anchors = getAnchors(from, to)
        const pathData = buildPath(from, to, anchors)
        const strokeColor = edge.color ?? '#00F0FF'
        const strokeWidth = edge.strokeW ?? '1.5'
        const markerId = strokeColor === '#8eff71' ? 'arrow-lime'
          : strokeColor === '#ff51fa' ? 'arrow-magenta'
          : 'arrow-cyan'

        const labelX = (anchors.startX + anchors.endX) / 2
        const labelY = (anchors.startY + anchors.endY) / 2 - 10

        return (
          <g key={edge.id} style={{ opacity, transition: 'opacity 0.3s ease' }}>
            <path
              d={pathData}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeDasharray={edge.dashed ? '6,4' : 'none'}
              strokeLinecap="round"
              filter={opacity > 0.5 ? 'url(#glow-edge)' : undefined}
              opacity={0.7}
              markerEnd={`url(#${markerId})`}
            />
            {edge.animate && opacity > 0.5 && (
              <circle r="3" fill={strokeColor} opacity={0.9}>
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
              <>
                <rect
                  x={labelX - edge.label.length * 3.2 - 4}
                  y={labelY - 9}
                  width={edge.label.length * 6.4 + 8}
                  height={16}
                  rx={4}
                  fill="var(--canvas-bg)"
                  fillOpacity={0.85}
                />
                <text
                  x={labelX}
                  y={labelY + 2}
                  fill={edge.textCol ?? 'var(--edge-label-fill)'}
                  className="text-[11px] font-display font-semibold pointer-events-none"
                  textAnchor="middle"
                >
                  {edge.label}
                </text>
              </>
            )}
          </g>
        )
      })}
    </svg>
  )
}
