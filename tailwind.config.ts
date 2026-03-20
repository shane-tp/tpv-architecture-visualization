import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Manrope"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"Space Grotesk"', 'ui-monospace', 'monospace'],
      },
      colors: {
        neon: {
          cyan: '#8ff5ff',
          magenta: '#ff51fa',
          lime: '#8eff71',
          error: '#ff716c',
        },
        obsidian: {
          void: '#0c0e12',
          low: '#111417',
          base: '#171a1e',
          mid: '#1c2025',
          high: '#22262b',
          bright: '#282c32',
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 238, 252, 0.3)',
        'glow-magenta': '0 0 20px rgba(255, 81, 250, 0.3)',
        'glow-lime': '0 0 20px rgba(142, 255, 113, 0.3)',
        'glow-error': '0 0 20px rgba(255, 113, 108, 0.3)',
        'glow-cyan-lg': '0 0 40px rgba(0, 238, 252, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
