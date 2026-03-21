import { atom } from 'jotai'
import type { TabId } from '../types/architecture'

export const activeTabAtom = atom<TabId>('canvas')
export const focusGroupAtom = atom<string | null>(null)
export const sidebarCollapsedAtom = atom(false)
