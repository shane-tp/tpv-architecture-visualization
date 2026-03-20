import {
  Activity, User, Code, Flag, Layout, Globe, Bluetooth, Monitor,
  Settings, Bot, FileJson, Wifi, Server, Zap, File, Cloud,
  Database, Calendar, BarChart, MessageCircle, Smartphone, Radio,
} from 'lucide-react'
import type { ArchGroup, ArchNode, ArchEdge } from '../types/architecture'

export const NODE_W = 270
export const NODE_H = 135
export const CANVAS_W = 2500
export const CANVAS_H = 3100

const FSM_W = 230
const FSM_H = 110
const MID_W = 250
const MID_H = 115
const HERO_W = 330
const HERO_H = 160
const BIG_W = 360
const BIG_H = 170

export const archGroups: ArchGroup[] = [
  { id: 'fsm',          label: 'GAME STATE MACHINE',      x: 40,   y: 40,   w: 2260, h: 1070, color: 'cyan' },
  { id: 'client',       label: 'CLIENT APPLICATION',      x: 40,   y: 1200, w: 980,  h: 520,  color: 'blue' },
  { id: 'systems',      label: 'GAME SYSTEMS',            x: 1120, y: 1200, w: 1120, h: 520,  color: 'purple' },
  { id: 'net',          label: 'NETWORKING',               x: 40,   y: 1800, w: 500,  h: 260,  color: 'emerald' },
  { id: 'server',       label: 'SERVER (Headless Unity)',  x: 600,  y: 1800, w: 860,  h: 560,  color: 'orange' },
  { id: 'fit',          label: 'FILE EXPORT',              x: 1520, y: 1800, w: 460,  h: 270,  color: 'indigo' },
  { id: 'tphub',        label: 'TP HUB MOBILE',            x: 2040, y: 1800, w: 420,  h: 260,  color: 'amber' },
  { id: 'services',     label: 'EXTERNAL SERVICES',        x: 40,   y: 2450, w: 980,  h: 520,  color: 'rose' },
  { id: 'integrations', label: 'INTEGRATIONS',             x: 1120, y: 2450, w: 1120, h: 520,  color: 'amber' },
]

export const archNodes: ArchNode[] = [
  // ── FSM: Branching flowchart ──

  // Tier 1 — Boot strip (wider 340px spacing)
  { id: 'init',      group: 'fsm', label: 'Initializing',    desc: 'App.Awake() wires 65+ managers',     x: 80,   y: 100,  w: FSM_W, h: FSM_H, icon: Activity,  color: 'cyan', status: 'STABLE' },
  { id: 'loadAcc',   group: 'fsm', label: 'Load Accounts',   desc: 'Loads local profile from device',    x: 420,  y: 100,  w: FSM_W, h: FSM_H, icon: User,      color: 'cyan', status: 'ACTIVE' },
  { id: 'verCheck',  group: 'fsm', label: 'Version Check',   desc: 'Compares build version to API',      x: 760,  y: 100,  w: FSM_W, h: FSM_H, icon: Code,      color: 'cyan', status: 'STABLE' },
  { id: 'inAcc',     group: 'fsm', label: 'In Accounts',     desc: 'Login / create account UI',          x: 1100, y: 100,  w: FSM_W, h: FSM_H, icon: User,      color: 'cyan', status: 'ACTIVE' },

  // Tier 2 — Branch: first-time vs returning (150px gap below tier 1)
  { id: 'onboard',   group: 'fsm', label: 'Onboarding',      desc: 'EULA → Avatar → Profile wizard',     x: 760,  y: 360,  w: FSM_W, h: FSM_H, icon: Flag,      color: 'cyan', status: 'STABLE' },
  { id: 'loadHub',   group: 'fsm', label: 'Load Hub',        desc: 'Addressables: Hub scene async',      x: 1100, y: 360,  w: FSM_W, h: FSM_H, icon: Layout,    color: 'cyan', status: 'ACTIVE' },

  // Tier 3 — Main L→R flow (120px gap below tier 2)
  { id: 'hub',       group: 'fsm', label: 'In Hub',          desc: 'Main menu — events, routes, workouts',  x: 640,  y: 600,  w: BIG_W, h: BIG_H, icon: Globe,     color: 'cyan', status: 'PEAK' },
  { id: 'pair',      group: 'fsm', label: 'Select Pairing',  desc: 'ANT+/BLE device discovery',          x: 1140, y: 630,  w: MID_W, h: MID_H, icon: Bluetooth, color: 'cyan', status: 'STABLE' },
  { id: 'worldLoad', group: 'fsm', label: 'World Load',      desc: 'Addressables: world, avatars, routes', x: 1500, y: 630, w: MID_W, h: MID_H, icon: Globe,   color: 'cyan', status: 'ACTIVE' },
  { id: 'world',     group: 'fsm', label: 'In World',        desc: 'Riding — physics, social, bots',     x: 1860, y: 600,  w: BIG_W, h: BIG_H, icon: Monitor,   color: 'cyan', status: 'PEAK' },

  // Tier 4 — End states (110px gap below tier 3)
  { id: 'logout',    group: 'fsm', label: 'Logout',          desc: 'Clear session, disconnect',          x: 120,  y: 870,  w: FSM_W, h: FSM_H, icon: User,      color: 'cyan', status: 'STABLE' },
  { id: 'quit',      group: 'fsm', label: 'Quit',            desc: 'Exit application',                   x: 440,  y: 870,  w: FSM_W, h: FSM_H, icon: Settings,  color: 'cyan' },
  { id: 'ride',      group: 'fsm', label: 'End Ride',        desc: 'FIT upload, results review',         x: 960,  y: 860,  w: NODE_W, h: NODE_H, icon: Activity, color: 'cyan', status: 'ACTIVE' },
  { id: 'pen',       group: 'fsm', label: 'Join Pen',        desc: 'Pre-race wait, entrant list',        x: 1560, y: 870,  w: MID_W, h: MID_H, icon: Flag,      color: 'cyan', status: 'STABLE' },

  // ── Client Application ──
  { id: 'stateMgr',  group: 'client',  label: 'StateManager',      desc: '14-State Enum FSM',                x: 140,  y: 1320, w: HERO_W, h: HERO_H, icon: Activity, color: 'blue', status: 'ACTIVE', metric: { label: 'STATES', value: 14 } },
  { id: 'app',       group: 'client',  label: 'App.cs',            desc: 'God Object — 1200+ LOC, 65 Mgrs',  x: 560,  y: 1310, w: BIG_W,  h: BIG_H,  icon: Code,    color: 'blue', status: 'DEBT_LCL' },
  { id: 'gui',       group: 'client',  label: 'UI Layer',          desc: '100+ MenuTypes, uGUI + TMPro',     x: 140,  y: 1530, w: NODE_W, h: NODE_H, icon: Layout,   color: 'blue', status: 'STABLE' },
  { id: 'netServ',   group: 'client',  label: 'NetServManager',    desc: 'TCP:7779, mDNS companion link',    x: 480,  y: 1540, w: MID_W,  h: MID_H,  icon: Radio,   color: 'blue', status: 'ACTIVE' },

  // ── Game Systems ──
  { id: 'parts',     group: 'systems', label: 'Modular Avatar',    desc: 'Body, Kit, Bike frames',           x: 1220, y: 1320, w: NODE_W, h: NODE_H, icon: User,     color: 'purple', status: 'STABLE' },
  { id: 'bots',      group: 'systems', label: 'Bot AI',            desc: 'Client ambient + Server pace',     x: 1580, y: 1330, w: NODE_W, h: NODE_H, icon: Bot,      color: 'purple', status: 'ACTIVE' },
  { id: 'pairing',   group: 'systems', label: 'Hardware Pairing',  desc: 'ANT+, BLE, FTMS',                  x: 1220, y: 1510, w: HERO_W, h: HERO_H, icon: Bluetooth, color: 'purple', status: 'LEGACY' },
  { id: 'zwo',       group: 'systems', label: 'Workout Engine',    desc: 'ZWO/MRC/JSON, ERG Mode',           x: 1640, y: 1520, w: HERO_W, h: HERO_H, icon: FileJson, color: 'purple', status: 'STABLE' },

  // ── Networking (left) ──
  { id: 'tcp',       group: 'net',     label: 'Riptide Network',   desc: 'TCP+UDP Dual Transport, 20Hz',     x: 110,  y: 1860, w: BIG_W,  h: BIG_H,  icon: Wifi,    color: 'emerald', status: 'ACTIVE', metric: { label: 'TICK', value: 20, unit: 'Hz' } },

  // ── Server (center) ──
  { id: 'headless',  group: 'server',  label: 'Headless Unity',    desc: 'Game Server Instance',             x: 700,  y: 1920, w: BIG_W,  h: BIG_H,  icon: Server,  color: 'orange', status: 'ACTIVE' },
  { id: 'physics',   group: 'server',  label: 'PhysicsManager',    desc: 'CdA, Draft (55% max), Server-Auth', x: 1100, y: 1930, w: HERO_W, h: HERO_H, icon: Zap,     color: 'orange', status: 'STABLE' },
  { id: 'races',     group: 'server',  label: 'EventManager',      desc: '10+ Race Types, Rankings',         x: 700,  y: 2150, w: HERO_W, h: HERO_H, icon: Flag,    color: 'orange', status: 'PEAK' },
  { id: 'pacebots',  group: 'server',  label: 'PaceBots',          desc: 'Server-side AI, per-event',        x: 1080, y: 2160, w: NODE_W, h: NODE_H, icon: Bot,     color: 'orange', status: 'STABLE' },

  // ── File Export (right) ──
  { id: 'fitservice', group: 'fit',    label: 'FITFileService',    desc: 'Dynastream SDK, Dev Fields',       x: 1590, y: 1870, w: HERO_W, h: HERO_H, icon: File,    color: 'indigo', status: 'ACTIVE' },

  // ── TP Hub Mobile (far right, same row) ──
  { id: 'tpHub',     group: 'tphub',   label: 'TP Hub Mobile',     desc: 'React Native — mDNS, TCP:7779',   x: 2110, y: 1870, w: NODE_W, h: NODE_H, icon: Smartphone, color: 'amber', status: 'ACTIVE' },

  // ── External Services ──
  { id: 'api',       group: 'services',     label: 'PHP API',      desc: '~90 endpoints, IIS/Azure',         x: 140,  y: 2570, w: HERO_W, h: HERO_H, icon: Globe,   color: 'rose', status: 'LEGACY' },
  { id: 'cdn',       group: 'services',     label: 'Azure CDN',    desc: 'Kits, i18n, Routes',               x: 580,  y: 2580, w: NODE_W, h: NODE_H, icon: Cloud,   color: 'rose', status: 'STABLE' },
  { id: 'sql',       group: 'services',     label: 'SQL Server',   desc: 'T-SQL / dbo schema',               x: 140,  y: 2770, w: HERO_W, h: HERO_H, icon: Database, color: 'rose', status: 'ACTIVE' },
  { id: 'snowflake', group: 'services',     label: 'Snowflake DB', desc: 'Performance / Usage Metrics',      x: 580,  y: 2780, w: NODE_W, h: NODE_H, icon: Database, color: 'rose', status: 'ACTIVE' },

  // ── Integrations ──
  { id: 'tp',        group: 'integrations', label: 'TrainingPeaks',  desc: 'Workout Sync, TP API',           x: 1220, y: 2570, w: NODE_W, h: NODE_H, icon: Calendar,       color: 'amber', status: 'STABLE' },
  { id: 'strava',    group: 'integrations', label: 'Strava',         desc: 'OAuth / Activity Upload',        x: 1580, y: 2580, w: NODE_W, h: NODE_H, icon: Activity,       color: 'amber', status: 'ACTIVE' },
  { id: 'intervals', group: 'integrations', label: 'Intervals.icu',  desc: 'Workout Sync',                   x: 1220, y: 2760, w: NODE_W, h: NODE_H, icon: BarChart,       color: 'amber', status: 'STABLE' },
  { id: 'discord',   group: 'integrations', label: 'Discord',        desc: 'Rich Presence SDK',              x: 1580, y: 2770, w: NODE_W, h: NODE_H, icon: MessageCircle,  color: 'amber', status: 'ACTIVE' },
]

export const archEdges: ArchEdge[] = [
  // ═══════════════════════════════════════════════
  // FSM: Branching flowchart
  // ═══════════════════════════════════════════════

  // Boot strip (L→R)
  { id: 'e1', from: 'init',    to: 'loadAcc',  color: '#00F0FF' },
  { id: 'e2', from: 'loadAcc', to: 'verCheck', color: '#00F0FF' },
  { id: 'e3', from: 'verCheck', to: 'inAcc',   color: '#00F0FF' },

  // Branch from Accounts
  { id: 'e_first',      from: 'inAcc',   to: 'onboard', label: 'First Time', color: '#00F0FF' },
  { id: 'e_return',     from: 'inAcc',   to: 'loadHub', label: 'Returning',  color: '#00F0FF' },
  { id: 'e_board_done', from: 'onboard', to: 'loadHub', label: 'Complete',   color: '#00F0FF' },
  { id: 'e_board_back', from: 'onboard', to: 'inAcc',   label: 'EULA Declined', dashed: true, color: '#ff51fa' },

  // Hub entry
  { id: 'e_lh_hub', from: 'loadHub', to: 'hub', color: '#00F0FF' },

  // Core ride path (hot path — animated green)
  { id: 'e_hub_pair', from: 'hub',       to: 'pair',      label: 'Start Ride', animate: true, color: '#8eff71', strokeW: '2.5' },
  { id: 'e_pair_wl',  from: 'pair',      to: 'worldLoad', label: 'Paired',     animate: true, color: '#8eff71', strokeW: '2.5' },
  { id: 'e_wl_world', from: 'worldLoad', to: 'world',                          animate: true, color: '#8eff71', strokeW: '2.5' },

  // Alternatives from hub / pair
  { id: 'e_pair_cancel',  from: 'pair', to: 'hub',       label: 'Cancel',   dashed: true, color: '#ff51fa' },
  { id: 'e_hub_spectate', from: 'hub',  to: 'worldLoad', label: 'Spectate', dashed: true, color: '#ff51fa' },

  // World exits
  { id: 'e_world_ride', from: 'world', to: 'ride', label: 'End Ride',    color: '#00F0FF' },
  { id: 'e_world_pen',  from: 'world', to: 'pen',  label: 'Join Event',  dashed: true, color: '#00F0FF' },
  { id: 'e_pen_ride',   from: 'pen',   to: 'ride',                       color: '#00F0FF' },

  // Ride returns
  { id: 'e_ride_hub',    from: 'ride', to: 'loadHub',   label: 'Return to Hub',  dashed: true, color: '#ff51fa' },
  { id: 'e_ride_rejoin', from: 'ride', to: 'worldLoad', label: 'Rejoin Event',   dashed: true, color: '#ff51fa' },

  // Hub exits
  { id: 'e_hub_logout', from: 'hub',    to: 'logout', dashed: true, color: '#ff51fa' },
  { id: 'e_hub_quit',   from: 'hub',    to: 'quit',   dashed: true, color: '#ff51fa' },
  { id: 'e_logout_acc', from: 'logout', to: 'inAcc',  label: 'Back to Login', dashed: true, color: '#ff51fa' },

  // ═══════════════════════════════════════════════
  // FSM → Client
  // ═══════════════════════════════════════════════
  { id: 'e_fsm_link', from: 'stateMgr', to: 'init', label: 'CONTROLS GAME LOOP', animate: true, color: '#8eff71', strokeW: '2.5', textCol: '#8eff71' },

  // ═══════════════════════════════════════════════
  // Client internals
  // ═══════════════════════════════════════════════
  { id: 'e15', from: 'app',      to: 'stateMgr', label: '65+ Mgrs via App.*',       color: '#00F0FF' },
  { id: 'e16', from: 'stateMgr', to: 'gui',      label: 'SetGameState → ShowMenu',  dashed: true, color: '#00F0FF' },
  { id: 'e_app_netserv', from: 'app', to: 'netServ', label: 'App.netServManager', dashed: true, color: '#00F0FF' },

  // ═══════════════════════════════════════════════
  // Networking flow
  // ═══════════════════════════════════════════════
  { id: 'e17', from: 'app', to: 'tcp',      label: '20Hz Tick',        animate: true, color: '#8eff71', strokeW: '2.5' },
  { id: 'e18', from: 'app', to: 'api',      label: 'Server Discovery', dashed: true,  color: '#ff51fa' },
  { id: 'e19', from: 'tcp', to: 'headless', label: 'Riptide DTOs',     animate: true, color: '#8eff71', strokeW: '2.5' },

  // ═══════════════════════════════════════════════
  // Server internal
  // ═══════════════════════════════════════════════
  { id: 'e20', from: 'headless', to: 'physics',    color: '#00F0FF' },
  { id: 'e21', from: 'headless', to: 'races',      color: '#00F0FF' },
  { id: 'e22', from: 'headless', to: 'pacebots',   color: '#00F0FF' },
  { id: 'e23', from: 'physics',  to: 'fitservice', label: 'FIT + Dev Fields', animate: true, color: '#8eff71', strokeW: '2.5' },
  { id: 'e24', from: 'races',    to: 'sql',        label: 'Write results',    dashed: true,  color: '#ff51fa' },
  { id: 'e_phys_race', from: 'physics',  to: 'races',    label: 'Positions → Race Logic', color: '#00F0FF' },
  { id: 'e_pace_phys', from: 'pacebots', to: 'physics',  label: 'Simulated Input',        color: '#00F0FF' },
  { id: 'e_race_net',  from: 'races',    to: 'headless', label: 'RANK_CHANGE msgs',       dashed: true, color: '#00F0FF' },

  // ═══════════════════════════════════════════════
  // Services
  // ═══════════════════════════════════════════════
  { id: 'e25',   from: 'api', to: 'sql', label: 'Queries', color: '#ff51fa' },
  { id: 'e_cdn', from: 'api', to: 'cdn', label: 'Assets',  color: '#ff51fa' },

  // Snowflake
  { id: 'e_snow1', from: 'headless',   to: 'snowflake', label: 'Metrics Upload', dashed: true, color: '#00F0FF' },
  { id: 'e_snow2', from: 'fitservice', to: 'snowflake', label: 'Usage Data',     dashed: true, color: '#00F0FF' },

  // ═══════════════════════════════════════════════
  // FSM → System activation
  // ═══════════════════════════════════════════════
  { id: 'e_hub_gui',      from: 'hub',       to: 'gui',        label: 'Event/Route Select',     dashed: true, color: '#00F0FF' },
  { id: 'e_hub_avatar',   from: 'hub',       to: 'parts',      label: 'Avatar Config',          dashed: true, color: '#00F0FF' },
  { id: 'e_pair_hw',      from: 'pair',      to: 'pairing',    label: 'Activate ANT+/BLE',      dashed: true, color: '#00F0FF' },
  { id: 'e_wload_parts',  from: 'worldLoad', to: 'parts',      label: 'Load Addressables',      dashed: true, color: '#00F0FF' },
  { id: 'e_world_bots',   from: 'world',     to: 'bots',       label: 'Spawn Ambient Bots',     dashed: true, color: '#00F0FF' },
  { id: 'e_wload_tcp',    from: 'worldLoad', to: 'tcp',        label: 'NetworkManager.Connect', dashed: true, color: '#00F0FF' },
  { id: 'e_world_zwo',    from: 'world',     to: 'zwo',        label: 'Workout Active',         dashed: true, color: '#00F0FF' },
  { id: 'e_ride_fit',     from: 'ride',      to: 'fitservice', label: 'FIT Upload',             dashed: true, color: '#ff51fa' },

  // ═══════════════════════════════════════════════
  // Core ride loop
  // ═══════════════════════════════════════════════
  { id: 'e_hw_app',     from: 'pairing', to: 'app',     label: 'Power/Cadence/HR', animate: true, color: '#8eff71', strokeW: '2.5' },
  { id: 'e_erg',        from: 'zwo',     to: 'pairing', label: 'ERG Target Watts', dashed: true,  color: '#ff51fa' },
  { id: 'e_app_avatar', from: 'app',     to: 'parts',   label: 'Avatar Updates',   dashed: true,  color: '#00F0FF' },

  // ═══════════════════════════════════════════════
  // TP Hub Mobile → NetServManager
  // ═══════════════════════════════════════════════
  { id: 'e_hub_netserv', from: 'tpHub', to: 'netServ', label: 'TCP:7779 / mDNS', animate: true, color: '#8eff71', strokeW: '2.5' },

  // ═══════════════════════════════════════════════
  // Integrations
  // ═══════════════════════════════════════════════
  { id: 'e26', from: 'zwo', to: 'tp',        label: 'Sync workouts',  dashed: true, color: '#00F0FF' },
  { id: 'e27', from: 'zwo', to: 'intervals', label: 'Sync workouts',  dashed: true, color: '#00F0FF' },
  { id: 'e28', from: 'gui', to: 'discord',   label: 'Rich Presence',  dashed: true, color: '#00F0FF' },
  { id: 'e29', from: 'app', to: 'strava',    label: 'OAuth/Upload',   dashed: true, color: '#00F0FF' },
]
