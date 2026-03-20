import { atom } from 'jotai'
import { archNodes, archGroups } from '../data/architecture'

export interface NodePosition {
  x: number
  y: number
}

function buildDefaultNodePositions(): Record<string, NodePosition> {
  const pos: Record<string, NodePosition> = {}
  for (const n of archNodes) {
    pos[n.id] = { x: n.x, y: n.y }
  }
  return pos
}

function buildDefaultGroupPositions(): Record<string, NodePosition> {
  const pos: Record<string, NodePosition> = {}
  for (const g of archGroups) {
    pos[g.id] = { x: g.x, y: g.y }
  }
  return pos
}

export const nodePositionsAtom = atom<Record<string, NodePosition>>(
  buildDefaultNodePositions()
)

export const groupPositionsAtom = atom<Record<string, NodePosition>>(
  buildDefaultGroupPositions()
)

export const draggingNodeAtom = atom<string | null>(null)
export const draggingGroupAtom = atom<string | null>(null)

export const resetNodePositionsAtom = atom(null, (_get, set) => {
  set(nodePositionsAtom, buildDefaultNodePositions())
  set(groupPositionsAtom, buildDefaultGroupPositions())
})
