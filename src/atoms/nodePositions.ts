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

const childNodesByGroup: Record<string, string[]> = {}
for (const n of archNodes) {
  if (!childNodesByGroup[n.group]) childNodesByGroup[n.group] = []
  childNodesByGroup[n.group].push(n.id)
}

export const nodePositionsAtom = atom<Record<string, NodePosition>>(
  buildDefaultNodePositions()
)

export const groupPositionsAtom = atom<Record<string, NodePosition>>(
  buildDefaultGroupPositions()
)

export const draggingNodeAtom = atom<string | null>(null)
export const draggingGroupAtom = atom<string | null>(null)

export const moveGroupAtom = atom(
  null,
  (_get, set, payload: { groupId: string; dx: number; dy: number }) => {
    const { groupId, dx, dy } = payload
    set(groupPositionsAtom, (prev) => ({
      ...prev,
      [groupId]: { x: prev[groupId].x + dx, y: prev[groupId].y + dy },
    }))
    const children = childNodesByGroup[groupId] ?? []
    if (children.length > 0) {
      set(nodePositionsAtom, (prev) => {
        const next = { ...prev }
        for (const id of children) {
          const p = next[id]
          if (p) next[id] = { x: p.x + dx, y: p.y + dy }
        }
        return next
      })
    }
  }
)

export const resetNodePositionsAtom = atom(null, (_get, set) => {
  set(nodePositionsAtom, buildDefaultNodePositions())
  set(groupPositionsAtom, buildDefaultGroupPositions())
})
