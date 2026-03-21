import { atom } from 'jotai'

export interface Transform {
  x: number
  y: number
  scale: number
}

export const INITIAL_TRANSFORM: Transform = { x: 10, y: 5, scale: 0.9 }

export const canvasTransformAtom = atom<Transform>(INITIAL_TRANSFORM)
export const isDraggingAtom = atom(false)
