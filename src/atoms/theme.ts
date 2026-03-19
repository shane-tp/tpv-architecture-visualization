import { atomWithStorage } from 'jotai/utils'
import type { Theme } from '../types/architecture'

export const themeAtom = atomWithStorage<Theme>('tpv-theme', 'dark')
