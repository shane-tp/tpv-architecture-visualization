import {
  Activity, User, Code, Flag, Layout, Globe, Bluetooth, Monitor,
  Settings, Bot, FileJson, Wifi, Server, Zap, File, Cloud,
  Database, Calendar, BarChart, MessageCircle,
} from 'lucide-react'
import type { ArchGroup, ArchNode, ArchEdge } from '../types/architecture'

export const NODE_W = 220
export const NODE_H = 64
export const CANVAS_W = 1500
export const CANVAS_H = 2250

export const archGroups: ArchGroup[] = [
  { id: 'fsm',          label: 'GAME STATE MACHINE',      x: 60,  y: 40,   w: 1380, h: 640,  color: 'cyan' },
  { id: 'client',       label: 'CLIENT APPLICATION',      x: 60,  y: 740,  w: 640,  h: 340,  color: 'blue' },
  { id: 'systems',      label: 'GAME SYSTEMS',            x: 760, y: 740,  w: 680,  h: 340,  color: 'purple' },
  { id: 'net',          label: 'NETWORKING',               x: 380, y: 1140, w: 740,  h: 180,  color: 'emerald' },
  { id: 'server',       label: 'SERVER (Headless Unity)',  x: 60,  y: 1380, w: 740,  h: 370,  color: 'orange' },
  { id: 'fit',          label: 'FILE EXPORT',              x: 860, y: 1380, w: 580,  h: 200,  color: 'indigo' },
  { id: 'services',     label: 'EXTERNAL SERVICES',        x: 60,  y: 1810, w: 660,  h: 350,  color: 'rose' },
  { id: 'integrations', label: 'INTEGRATIONS',             x: 780, y: 1810, w: 660,  h: 350,  color: 'amber' },
]

export const archNodes: ArchNode[] = [
  // FSM — snake pattern widened across full canvas width
  { id: 'init',      group: 'fsm', label: 'Initializing',    desc: 'Boot sequence',       x: 120,  y: 100, w: NODE_W, h: NODE_H, icon: Activity,  color: 'cyan' },
  { id: 'loadAcc',   group: 'fsm', label: 'Load Accounts',   desc: 'Local profile check', x: 120,  y: 240, w: NODE_W, h: NODE_H, icon: User,      color: 'cyan' },
  { id: 'verCheck',  group: 'fsm', label: 'Version Check',   desc: 'Patch validation',    x: 120,  y: 380, w: NODE_W, h: NODE_H, icon: Code,      color: 'cyan' },
  { id: 'inAcc',     group: 'fsm', label: 'In Accounts',     desc: 'Login screen',        x: 120,  y: 520, w: NODE_W, h: NODE_H, icon: User,      color: 'cyan' },

  { id: 'onboard',   group: 'fsm', label: 'Onboarding',      desc: 'First-time setup',    x: 440,  y: 520, w: NODE_W, h: NODE_H, icon: Flag,      color: 'cyan' },
  { id: 'loadHub',   group: 'fsm', label: 'Load Hub',        desc: 'Async scene load',    x: 440,  y: 380, w: NODE_W, h: NODE_H, icon: Layout,    color: 'cyan' },
  { id: 'hub',       group: 'fsm', label: 'In Hub',          desc: 'Main menu state',     x: 440,  y: 240, w: NODE_W, h: NODE_H, icon: Globe,     color: 'cyan' },
  { id: 'pair',      group: 'fsm', label: 'Select Pairing',  desc: 'Hardware connect',    x: 440,  y: 100, w: NODE_W, h: NODE_H, icon: Bluetooth, color: 'cyan' },

  { id: 'worldLoad', group: 'fsm', label: 'World Load',      desc: 'Addressables sync',   x: 760,  y: 100, w: NODE_W, h: NODE_H, icon: Globe,     color: 'cyan' },
  { id: 'world',     group: 'fsm', label: 'In World',        desc: 'Active riding state', x: 760,  y: 240, w: NODE_W, h: NODE_H, icon: Monitor,   color: 'cyan' },
  { id: 'pen',       group: 'fsm', label: 'Join Pen',        desc: 'Event wait area',     x: 760,  y: 380, w: NODE_W, h: NODE_H, icon: Flag,      color: 'cyan' },
  { id: 'ride',      group: 'fsm', label: 'End Ride',        desc: 'Upload & review',     x: 760,  y: 520, w: NODE_W, h: NODE_H, icon: Activity,  color: 'cyan' },

  { id: 'logout',    group: 'fsm', label: 'Logout',          desc: 'Clear session',       x: 1080, y: 520, w: NODE_W, h: NODE_H, icon: User,      color: 'cyan' },
  { id: 'quit',      group: 'fsm', label: 'Quit',            desc: 'Exit app',            x: 1080, y: 380, w: NODE_W, h: NODE_H, icon: Settings,  color: 'cyan' },

  // Client — left column
  { id: 'stateMgr',  group: 'client',  label: 'StateManager',      desc: 'State Machine Engine',    x: 120, y: 810,  w: NODE_W, h: NODE_H, icon: Activity, color: 'blue' },
  { id: 'app',       group: 'client',  label: 'App.cs',            desc: 'God Object (65+ Mgrs)',   x: 380, y: 900,  w: NODE_W, h: NODE_H, icon: Code,     color: 'blue' },
  { id: 'gui',       group: 'client',  label: 'UI Layer',          desc: 'MenuMgr + uGUI Canvas',   x: 120, y: 990,  w: NODE_W, h: NODE_H, icon: Layout,   color: 'blue' },

  // Systems — right column
  { id: 'parts',     group: 'systems', label: 'Modular Avatar',    desc: 'Body, Kit, Bike',         x: 820,  y: 810,  w: NODE_W, h: NODE_H, icon: User,     color: 'purple' },
  { id: 'bots',      group: 'systems', label: 'Bot AI',            desc: 'Client ambient bots',     x: 1100, y: 810,  w: NODE_W, h: NODE_H, icon: Bot,      color: 'purple' },
  { id: 'pairing',   group: 'systems', label: 'Hardware Pairing',  desc: 'ANT+ / BLE / FTMS',       x: 820,  y: 990,  w: NODE_W, h: NODE_H, icon: Bluetooth, color: 'purple' },
  { id: 'zwo',       group: 'systems', label: 'Workout Engine',    desc: 'ZWO / JSON Parser',       x: 1100, y: 990,  w: NODE_W, h: NODE_H, icon: FileJson, color: 'purple' },

  // Networking — centered
  { id: 'tcp',       group: 'net',     label: 'Riptide Network',   desc: 'TCP + UDP Transport',     x: 640, y: 1200, w: NODE_W, h: NODE_H, icon: Wifi,     color: 'emerald' },

  // Server — left column
  { id: 'headless',  group: 'server',  label: 'Headless Unity',    desc: 'Game Server Instance',    x: 120, y: 1440, w: NODE_W, h: NODE_H, icon: Server,   color: 'orange' },
  { id: 'physics',   group: 'server',  label: 'PhysicsManager',    desc: 'CdA, Draft, Core Sim',    x: 400, y: 1440, w: NODE_W, h: NODE_H, icon: Zap,      color: 'orange' },
  { id: 'races',     group: 'server',  label: 'EventManager',      desc: 'Races / Ranks / Results', x: 120, y: 1600, w: NODE_W, h: NODE_H, icon: Flag,     color: 'orange' },
  { id: 'pacebots',  group: 'server',  label: 'PaceBots',          desc: 'Server-side AI',          x: 400, y: 1600, w: NODE_W, h: NODE_H, icon: Bot,      color: 'orange' },

  // File Export — right column
  { id: 'fitservice', group: 'fit',    label: 'FITFileService',    desc: 'Ride Recording',          x: 1020, y: 1440, w: NODE_W, h: NODE_H, icon: File,     color: 'indigo' },

  // External Services — left column
  { id: 'api',       group: 'services',     label: 'PHP API',      desc: '90 Endpoints (IIS)',      x: 120, y: 1880, w: NODE_W, h: NODE_H, icon: Globe,    color: 'rose' },
  { id: 'cdn',       group: 'services',     label: 'Azure CDN',    desc: 'Kits, i18n, Routes',      x: 400, y: 1880, w: NODE_W, h: NODE_H, icon: Cloud,    color: 'rose' },
  { id: 'sql',       group: 'services',     label: 'SQL Server',   desc: 'T-SQL / dbo schema',      x: 120, y: 2040, w: NODE_W, h: NODE_H, icon: Database,  color: 'rose' },

  // Integrations — right column
  { id: 'tp',        group: 'integrations', label: 'TrainingPeaks',  desc: 'Workout Sync',          x: 840,  y: 1880, w: NODE_W, h: NODE_H, icon: Calendar,       color: 'amber' },
  { id: 'strava',    group: 'integrations', label: 'Strava',         desc: 'OAuth / Activity Upload', x: 1120, y: 1880, w: NODE_W, h: NODE_H, icon: Activity,       color: 'amber' },
  { id: 'intervals', group: 'integrations', label: 'Intervals.icu',  desc: 'Workout Sync',          x: 840,  y: 2040, w: NODE_W, h: NODE_H, icon: BarChart,       color: 'amber' },
  { id: 'discord',   group: 'integrations', label: 'Discord',        desc: 'Rich Presence SDK',     x: 1120, y: 2040, w: NODE_W, h: NODE_H, icon: MessageCircle,  color: 'amber' },
]

export const archEdges: ArchEdge[] = [
  // FSM snake flow
  { id: 'e1',  from: 'init',     to: 'loadAcc',  color: '#06b6d4' },
  { id: 'e2',  from: 'loadAcc',  to: 'verCheck', color: '#06b6d4' },
  { id: 'e3',  from: 'verCheck', to: 'inAcc',    color: '#06b6d4' },
  { id: 'e4',  from: 'inAcc',    to: 'onboard',  color: '#06b6d4' },
  { id: 'e5',  from: 'onboard',  to: 'loadHub',  color: '#06b6d4' },
  { id: 'e6',  from: 'loadHub',  to: 'hub',      color: '#06b6d4' },
  { id: 'e7',  from: 'hub',      to: 'pair',     color: '#06b6d4' },
  { id: 'e8',  from: 'pair',     to: 'worldLoad', color: '#06b6d4' },
  { id: 'e9',  from: 'worldLoad', to: 'world',   color: '#06b6d4' },
  { id: 'e10', from: 'world',    to: 'pen',      color: '#06b6d4' },
  { id: 'e11', from: 'pen',      to: 'ride',     color: '#06b6d4' },
  { id: 'e12', from: 'ride',     to: 'hub',      dashed: true, label: 'Return', color: '#06b6d4' },
  { id: 'e13', from: 'ride',     to: 'logout',   color: '#06b6d4' },
  { id: 'e14', from: 'logout',   to: 'quit',     color: '#06b6d4' },

  // FSM <-> Client link
  { id: 'e_fsm_link', from: 'stateMgr', to: 'init', label: 'CONTROLS GAME LOOP', animate: true, color: '#eab308', strokeW: '2.5', textCol: '#eab308' },

  // App & Logic
  { id: 'e15', from: 'app',      to: 'stateMgr', label: 'Initializes',   color: '#3b82f6' },
  { id: 'e16', from: 'stateMgr', to: 'gui',      label: 'Triggers Menu', dashed: true, color: '#3b82f6' },

  // Networking flow
  { id: 'e17', from: 'app', to: 'tcp',      label: '20Hz Tick',  animate: true, color: '#10b981', strokeW: '2.5' },
  { id: 'e18', from: 'app', to: 'api',      label: 'Discovery',  color: '#f43f5e' },
  { id: 'e19', from: 'tcp', to: 'headless', label: 'DTOs',       animate: true, color: '#10b981', strokeW: '2.5' },

  // Server internal & output
  { id: 'e20', from: 'headless', to: 'physics',    color: '#f97316' },
  { id: 'e21', from: 'headless', to: 'races',      color: '#f97316' },
  { id: 'e22', from: 'headless', to: 'pacebots',   color: '#f97316' },
  { id: 'e23', from: 'physics',  to: 'fitservice', label: 'Ride recording', animate: true, color: '#8b5cf6', strokeW: '2.5' },
  { id: 'e24', from: 'races',    to: 'sql',        label: 'Write results',  dashed: true,  color: '#f43f5e' },

  // Services
  { id: 'e25',   from: 'api', to: 'sql', label: 'Queries', color: '#f43f5e' },
  { id: 'e_cdn', from: 'api', to: 'cdn', label: 'Assets',  color: '#f43f5e' },

  // Integrations
  { id: 'e26', from: 'zwo', to: 'tp',        label: 'Sync workouts',  dashed: true, color: '#f59e0b' },
  { id: 'e27', from: 'zwo', to: 'intervals', label: 'Sync workouts',  dashed: true, color: '#f59e0b' },
  { id: 'e28', from: 'gui', to: 'discord',   label: 'Rich Presence',  dashed: true, color: '#3b82f6' },
  { id: 'e29', from: 'app', to: 'strava',    label: 'OAuth/Upload',   dashed: true, color: '#3b82f6' },
]
