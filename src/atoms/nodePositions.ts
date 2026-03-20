import { atom } from 'jotai'
import { archNodes } from '../data/architecture'

export interface NodePosition {
  x: number
  y: number
}

function buildDefaultPositions(): Record<string, NodePosition> {
  const pos: Record<string, NodePosition> = {}
  for (const n of archNodes) {
    pos[n.id] = { x: n.x, y: n.y }
  }
  return pos
}

export const nodePositionsAtom = atom<Record<string, NodePosition>>(
  buildDefaultPositions()
)

export const draggingNodeAtom = atom<string | null>(null)

export const resetNodePositionsAtom = atom(null, (_get, set) => {
  set(nodePositionsAtom, buildDefaultPositions())
})
