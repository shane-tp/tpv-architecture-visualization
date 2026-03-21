import { atom } from 'jotai'

export const selectedNodeAtom = atom<string | null>(null)
export const hoveredNodeAtom = atom<string | null>(null)
