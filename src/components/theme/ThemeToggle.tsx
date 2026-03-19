import { useAtom } from 'jotai'
import { Sun, Moon } from 'lucide-react'
import { themeAtom } from '../../atoms/theme'

export function ThemeToggle() {
  const [theme, setTheme] = useAtom(themeAtom)

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg transition-all
        text-[var(--text-muted)] hover:text-[var(--text-primary)]
        hover:bg-[var(--surface-card)] active:scale-95"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
