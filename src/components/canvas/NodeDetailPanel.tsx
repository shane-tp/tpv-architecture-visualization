import { useEffect } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { X } from 'lucide-react'
import { selectedNodeAtom } from '../../atoms/selection'
import { archNodes, archEdges } from '../../data/architecture'
import { nodeDetails } from '../../data/nodeDetails'
import { getIconTintClass } from '../../lib/architecture/colors'
import type { AccentColor } from '../../types/architecture'

const accentVarByColor: Record<AccentColor, string> = {
  cyan:    'var(--neon-cyan)',
  blue:    '#3b82f6',
  emerald: 'var(--neon-lime)',
  purple:  'var(--neon-magenta)',
  rose:    'var(--neon-magenta)',
  orange:  '#f97316',
  indigo:  '#8b5cf6',
  amber:   '#f59e0b',
}

export function NodeDetailPanel() {
  const selectedId = useAtomValue(selectedNodeAtom)
  const setSelected = useSetAtom(selectedNodeAtom)

  const node = selectedId ? archNodes.find((n) => n.id === selectedId) : null
  const detail = selectedId ? nodeDetails[selectedId] : null
  const isOpen = node != null && detail != null

  const connectedEdges = selectedId
    ? archEdges.filter((e) => e.from === selectedId || e.to === selectedId)
    : []

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, setSelected])

  return (
    <div
      className="fixed top-0 right-0 bottom-0 z-[9999] transition-transform duration-300 ease-out pointer-events-none"
      style={{ width: 300, transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
    >
      {node && detail && (
        <div
          className="absolute top-2 right-2 bottom-2 left-0 rounded-xl backdrop-blur-xl overflow-hidden pointer-events-auto flex flex-col"
          style={{
            background: 'var(--surface-glass)',
            boxShadow: 'inset 0 0 0 1px rgba(70, 72, 76, 0.15), -8px 0 32px rgba(0, 0, 0, 0.4)',
          }}
        >
          {/* Header */}
          <div className="px-4 py-3 shrink-0" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`p-1.5 rounded-lg shrink-0 ${getIconTintClass(node.color)}`}>
                  <node.icon size={18} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-display font-bold tracking-tight leading-tight truncate" style={{ color: 'var(--text-primary)' }}>
                    {detail.title}
                  </h3>
                  {detail.file && (
                    <p className="text-[10px] font-mono mt-0.5 truncate" style={{ color: accentVarByColor[node.color] }}>
                      {detail.file}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-1 rounded-lg shrink-0 hover:bg-[var(--surface-card-hover)] transition-colors"
                style={{ color: 'var(--text-muted)' }}
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {/* Stats grid */}
            {detail.stats.length > 0 && (
              <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <div className="space-y-1.5">
                  {detail.stats.map((stat) => (
                    <div key={stat.label} className="flex justify-between items-baseline gap-2">
                      <span className="text-[10px] font-display uppercase tracking-wider shrink-0" style={{ color: 'var(--text-muted)' }}>
                        {stat.label}
                      </span>
                      <span className="text-xs font-display font-semibold text-right" style={{ color: 'var(--text-primary)' }}>
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Item lists */}
            {detail.items?.map((section) => (
              <div key={section.heading} className="px-4 py-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <p className="text-[9px] font-display font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
                  {section.heading}
                </p>
                <div className="space-y-1">
                  {section.entries.map((entry, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span
                        className="w-1 h-1 rounded-full mt-1.5 shrink-0"
                        style={{ backgroundColor: accentVarByColor[node.color], boxShadow: `0 0 4px ${accentVarByColor[node.color]}` }}
                      />
                      <span className="text-[12px] font-sans leading-snug" style={{ color: 'var(--text-secondary)' }}>
                        {entry}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Notes */}
            {detail.notes && (
              <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <p className="text-[9px] font-display font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>
                  Notes
                </p>
                <p className="text-[12px] font-sans leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {detail.notes}
                </p>
              </div>
            )}

            {/* Connected edges */}
            {connectedEdges.length > 0 && (
              <div className="px-4 py-3">
                <p className="text-[9px] font-display font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
                  Connections ({connectedEdges.length})
                </p>
                <div className="space-y-1">
                  {connectedEdges.map((edge) => {
                    const isOutgoing = edge.from === selectedId
                    const otherId = isOutgoing ? edge.to : edge.from
                    const otherNode = archNodes.find((n) => n.id === otherId)
                    if (!otherNode) return null
                    return (
                      <button
                        key={edge.id}
                        onClick={() => setSelected(otherId)}
                        className="flex items-center gap-1.5 w-full text-left px-2 py-1.5 rounded-lg hover:bg-[var(--surface-card-hover)] transition-colors"
                      >
                        <span className="text-[10px] font-mono shrink-0" style={{ color: 'var(--text-muted)' }}>
                          {isOutgoing ? '→' : '←'}
                        </span>
                        <span className="text-[12px] font-display font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                          {otherNode.label}
                        </span>
                        {edge.label && (
                          <span className="text-[10px] font-sans ml-auto shrink-0" style={{ color: 'var(--text-muted)' }}>
                            {edge.label}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
