import type { AccentColor } from '../../types/architecture'

const nodeAccents: Record<AccentColor, string> = {
  cyan:    'border-cyan-400/20 hover:border-cyan-400/50 hover:shadow-glow-cyan',
  blue:    'border-blue-400/20 hover:border-blue-400/50 hover:shadow-glow-cyan',
  emerald: 'border-emerald-400/20 hover:border-emerald-400/50 hover:shadow-glow-lime',
  purple:  'border-purple-400/20 hover:border-purple-400/50 hover:shadow-glow-magenta',
  rose:    'border-rose-400/20 hover:border-rose-400/50 hover:shadow-glow-magenta',
  orange:  'border-orange-400/20 hover:border-orange-400/50 hover:shadow-glow-cyan',
  indigo:  'border-indigo-400/20 hover:border-indigo-400/50 hover:shadow-glow-cyan',
  amber:   'border-amber-400/20 hover:border-amber-400/50 hover:shadow-glow-lime',
}

export function getNodeAccentClasses(color: AccentColor): string {
  return nodeAccents[color] ?? nodeAccents.blue
}

const indicatorColors: Record<AccentColor, string> = {
  cyan:    'bg-neon-cyan',
  blue:    'bg-blue-400',
  emerald: 'bg-neon-lime',
  purple:  'bg-neon-magenta',
  rose:    'bg-neon-magenta',
  orange:  'bg-orange-400',
  indigo:  'bg-indigo-400',
  amber:   'bg-amber-400',
}

export function getIndicatorColor(color: AccentColor): string {
  return indicatorColors[color] ?? 'bg-blue-400'
}

const iconTints: Record<AccentColor, string> = {
  cyan:    'bg-cyan-400/15 text-cyan-400',
  blue:    'bg-blue-400/15 text-blue-400',
  emerald: 'bg-emerald-400/15 text-emerald-400',
  purple:  'bg-purple-400/15 text-purple-400',
  rose:    'bg-rose-400/15 text-rose-400',
  orange:  'bg-orange-400/15 text-orange-400',
  indigo:  'bg-indigo-400/15 text-indigo-400',
  amber:   'bg-amber-400/15 text-amber-400',
}

export function getIconTintClass(color: AccentColor): string {
  return iconTints[color] ?? iconTints.blue
}

const groupBorders: Record<AccentColor, string> = {
  cyan:    'border-cyan-400/15',
  blue:    'border-blue-400/15',
  emerald: 'border-emerald-400/15',
  purple:  'border-purple-400/15',
  rose:    'border-rose-400/15',
  orange:  'border-orange-400/15',
  indigo:  'border-indigo-400/15',
  amber:   'border-amber-400/15',
}

export function getGroupBorderClass(color: AccentColor): string {
  return groupBorders[color] ?? groupBorders.blue
}

const groupBgs: Record<AccentColor, string> = {
  cyan:    'bg-cyan-500/[0.04] dark:bg-cyan-400/[0.07]',
  blue:    'bg-blue-500/[0.04] dark:bg-blue-400/[0.07]',
  emerald: 'bg-emerald-500/[0.04] dark:bg-emerald-400/[0.07]',
  purple:  'bg-purple-500/[0.04] dark:bg-purple-400/[0.07]',
  rose:    'bg-rose-500/[0.04] dark:bg-rose-400/[0.07]',
  orange:  'bg-orange-500/[0.04] dark:bg-orange-400/[0.07]',
  indigo:  'bg-indigo-500/[0.04] dark:bg-indigo-400/[0.07]',
  amber:   'bg-amber-500/[0.04] dark:bg-amber-400/[0.07]',
}

export function getGroupBgClass(color: AccentColor): string {
  return groupBgs[color] ?? groupBgs.blue
}

const groupTexts: Record<AccentColor, string> = {
  cyan:    'text-cyan-600 dark:text-cyan-400',
  blue:    'text-blue-600 dark:text-blue-400',
  emerald: 'text-emerald-600 dark:text-emerald-400',
  purple:  'text-purple-600 dark:text-purple-400',
  rose:    'text-rose-600 dark:text-rose-400',
  orange:  'text-orange-600 dark:text-orange-400',
  indigo:  'text-indigo-600 dark:text-indigo-400',
  amber:   'text-amber-600 dark:text-amber-400',
}

export function getGroupTextClass(color: AccentColor): string {
  return groupTexts[color] ?? groupTexts.blue
}
