import type { LucideIcon } from 'lucide-react'

export type AccentColor = 'cyan' | 'blue' | 'emerald' | 'purple' | 'rose' | 'orange' | 'indigo' | 'amber'
export type Theme = 'light' | 'dark'
export type TabId = 'canvas' | 'debt'

export interface ArchGroup {
  id: string
  label: string
  x: number
  y: number
  w: number
  h: number
  color: AccentColor
}

export interface ArchNode {
  id: string
  group: string
  label: string
  desc: string
  x: number
  y: number
  w: number
  h: number
  icon: LucideIcon
  color: AccentColor
}

export interface ArchEdge {
  id: string
  from: string
  to: string
  color?: string
  label?: string
  dashed?: boolean
  animate?: boolean
  strokeW?: string
  textCol?: string
}

export interface DebtItem {
  title: string
  level: 'P0' | 'P1' | 'P2'
  desc: string
  riskScore?: number
  impact?: string
  effort?: string
  stability?: string
  details?: Record<string, string | number>
}

export interface Anchors {
  startX: number
  startY: number
  endX: number
  endY: number
}
