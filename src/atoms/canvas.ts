import { atom } from 'jotai'

export interface Transform {
  x: number
  y: number
  scale: number
}

export const INITIAL_TRANSFORM: Transform = { x: 12, y: 6, scale: 0.34 }

export const canvasTransformAtom = atom<Transform>(INITIAL_TRANSFORM)
export const isDraggingAtom = atom(false)
