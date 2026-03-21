import { atom } from 'jotai'

export interface Transform {
  x: number
  y: number
  scale: number
}

export const INITIAL_TRANSFORM: Transform = { x: 20, y: 10, scale: 0.7 }

export const canvasTransformAtom = atom<Transform>(INITIAL_TRANSFORM)
export const isDraggingAtom = atom(false)
