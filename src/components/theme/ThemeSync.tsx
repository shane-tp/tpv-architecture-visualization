import { useAtomValue } from 'jotai'
import { useLayoutEffect } from 'react'
import { themeAtom } from '../../atoms/theme'

export function ThemeSync() {
  const theme = useAtomValue(themeAtom)

  useLayoutEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  return null
}
