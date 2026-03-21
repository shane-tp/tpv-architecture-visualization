import { atom } from 'jotai'

export interface Transform {
  x: number
  y: number
  scale: number
}

export const INITIAL_TRANSFORM: Transform = { x: 40, y: 20, scale: 0.48 }

export const canvasTransformAtom = atom<Transform>(INITIAL_TRANSFORM)
export const isDraggingAtom = atom(false)
