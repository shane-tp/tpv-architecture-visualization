import type { AccentColor } from '../../types/architecture'

const nodeAccents: Record<AccentColor, string> = {
  cyan:    'border-cyan-500/20 hover:border-cyan-400/50 hover:shadow-cyan-500/15',
  blue:    'border-blue-500/20 hover:border-blue-400/50 hover:shadow-blue-500/15',
  emerald: 'border-emerald-500/20 hover:border-emerald-400/50 hover:shadow-emerald-500/15',
  purple:  'border-purple-500/20 hover:border-purple-400/50 hover:shadow-purple-500/15',
  rose:    'border-rose-500/20 hover:border-rose-400/50 hover:shadow-rose-500/15',
  orange:  'border-orange-500/20 hover:border-orange-400/50 hover:shadow-orange-500/15',
  indigo:  'border-indigo-500/20 hover:border-indigo-400/50 hover:shadow-indigo-500/15',
  amber:   'border-amber-500/20 hover:border-amber-400/50 hover:shadow-amber-500/15',
}

export function getNodeAccentClasses(color: AccentColor): string {
  return nodeAccents[color] ?? nodeAccents.blue
}

const indicatorColors: Record<AccentColor, string> = {
  cyan: 'bg-cyan-500',
  blue: 'bg-blue-500',
  emerald: 'bg-emerald-500',
  purple: 'bg-purple-500',
  rose: 'bg-rose-500',
  orange: 'bg-orange-500',
  indigo: 'bg-indigo-500',
  amber: 'bg-amber-500',
}

export function getIndicatorColor(color: AccentColor): string {
  return indicatorColors[color] ?? 'bg-blue-500'
}

const iconTints: Record<AccentColor, string> = {
  cyan:    'bg-cyan-500/10 text-cyan-500 dark:text-cyan-400',
  blue:    'bg-blue-500/10 text-blue-500 dark:text-blue-400',
  emerald: 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400',
  purple:  'bg-purple-500/10 text-purple-500 dark:text-purple-400',
  rose:    'bg-rose-500/10 text-rose-500 dark:text-rose-400',
  orange:  'bg-orange-500/10 text-orange-500 dark:text-orange-400',
  indigo:  'bg-indigo-500/10 text-indigo-500 dark:text-indigo-400',
  amber:   'bg-amber-500/10 text-amber-500 dark:text-amber-400',
}

export function getIconTintClass(color: AccentColor): string {
  return iconTints[color] ?? iconTints.blue
}

const groupBorders: Record<AccentColor, string> = {
  cyan:    'border-cyan-500/20',
  blue:    'border-blue-500/20',
  emerald: 'border-emerald-500/20',
  purple:  'border-purple-500/20',
  rose:    'border-rose-500/20',
  orange:  'border-orange-500/20',
  indigo:  'border-indigo-500/20',
  amber:   'border-amber-500/20',
}

export function getGroupBorderClass(color: AccentColor): string {
  return groupBorders[color] ?? groupBorders.blue
}

const groupBgs: Record<AccentColor, string> = {
  cyan:    'bg-cyan-500/[0.03] dark:bg-cyan-500/[0.05]',
  blue:    'bg-blue-500/[0.03] dark:bg-blue-500/[0.05]',
  emerald: 'bg-emerald-500/[0.03] dark:bg-emerald-500/[0.05]',
  purple:  'bg-purple-500/[0.03] dark:bg-purple-500/[0.05]',
  rose:    'bg-rose-500/[0.03] dark:bg-rose-500/[0.05]',
  orange:  'bg-orange-500/[0.03] dark:bg-orange-500/[0.05]',
  indigo:  'bg-indigo-500/[0.03] dark:bg-indigo-500/[0.05]',
  amber:   'bg-amber-500/[0.03] dark:bg-amber-500/[0.05]',
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
