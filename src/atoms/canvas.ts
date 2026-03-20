import { atom } from 'jotai'

export interface Transform {
  x: number
  y: number
  scale: number
}

export const INITIAL_TRANSFORM: Transform = { x: 15, y: 8, scale: 0.36 }

export const canvasTransformAtom = atom<Transform>(INITIAL_TRANSFORM)
export const isDraggingAtom = atom(false)
