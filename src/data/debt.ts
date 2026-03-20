import type { DebtItem } from '../types/architecture'

export const debtData: DebtItem[] = [
  {
    title: 'Zero Test Coverage',
    level: 'P0',
    desc: 'No unit/integration tests anywhere. test-framework 1.6.0 unused.',
    riskScore: 96,
    impact: 'Severe',
    effort: 'High',
    stability: 'Unstable',
  },
  {
    title: 'God-object App.cs',
    level: 'P0',
    desc: 'Service locator anti-pattern at massive scale. 66 static managers, 1,273 lines. Prevents isolated testing.',
    riskScore: 94,
    impact: 'Severe',
    effort: 'High',
    stability: 'Unstable',
    details: {
      linesOfCode: 1273,
      coupledModules: 66,
    },
  },
  {
    title: 'TPV-262 Warmup Bug',
    level: 'P1',
    desc: 'Ramp segments flattened to midpoint. Root cause: condition reorder in WorkoutParserJSONTP.cs from March 2025.',
    riskScore: 78,
    impact: 'High',
    effort: 'Medium',
    stability: 'Degraded',
  },
  {
    title: 'PHP API Deploy',
    level: 'P1',
    desc: '~104 endpoints deployed via FTP/robocopy. Zero tests. High production risk on every deploy.',
    riskScore: 72,
    impact: 'High',
    effort: 'Medium',
    stability: 'Unstable',
    details: {
      endpointFiles: '~104',
      deployMethod: 'FTP / robocopy',
      authMethod: 'JWT (HS512)',
    },
  },
  {
    title: 'Common/ Code Drift',
    level: 'P1',
    desc: 'Code manually copied across 3 Unity projects. Sync mechanism unverified — symlinks or copies.',
    riskScore: 65,
    impact: 'Medium',
    effort: 'Medium',
    stability: 'Degraded',
  },
  {
    title: 'Legacy Networking',
    level: 'P2',
    desc: 'Dead RiptideNetworking/ code sits alongside active Networking/ folder.',
    riskScore: 35,
    impact: 'Low',
    effort: 'Low',
    stability: 'Stable',
  },
]

export interface SystemHealthNode {
  id: string
  label: string
  files: number
  loc: number
  refs: number | null
  status: 'critical' | 'high' | 'moderate' | 'optimal'
}

export const systemNodes: SystemHealthNode[] = [
  { id: 'app',     label: 'APP.CS',    files: 2,   loc: 1781,  refs: 272,  status: 'critical' },
  { id: 'sql',     label: 'SQL_DB',    files: 209, loc: 13317, refs: 79,   status: 'high' },
  { id: 'api',     label: 'PHP_API',   files: 115, loc: 10485, refs: null,  status: 'high' },
  { id: 'bots',    label: 'BOT_AI',    files: 10,  loc: 3501,  refs: 36,   status: 'moderate' },
  { id: 'events',  label: 'EVENTS',    files: 77,  loc: 16606, refs: 34,   status: 'moderate' },
  { id: 'avatar',  label: 'AVATAR',    files: 56,  loc: 2917,  refs: 34,   status: 'moderate' },
  { id: 'ui',      label: 'UI_LAYER',  files: 291, loc: 40632, refs: 20,   status: 'moderate' },
  { id: 'audio',   label: 'AUDIO',     files: 2,   loc: 410,   refs: 18,   status: 'moderate' },
  { id: 'workout', label: 'WORKOUT',   files: 33,  loc: 7018,  refs: 13,   status: 'optimal' },
  { id: 'net',     label: 'NET_MGR',   files: 81,  loc: 24540, refs: 6,    status: 'optimal' },
  { id: 'pairing', label: 'PAIRING',   files: 60,  loc: 14928, refs: 4,    status: 'optimal' },
  { id: 'physics', label: 'PHYSICS',   files: 2,   loc: 2124,  refs: 4,    status: 'optimal' },
]
