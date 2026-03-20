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
    desc: 'Service locator anti-pattern at massive scale. 65+ static managers, 1200+ lines. Prevents isolated testing.',
    riskScore: 94,
    impact: 'Severe',
    effort: 'High',
    stability: 'Unstable',
    details: {
      linesOfCode: 14821,
      complexity: 242,
      coupledModules: 64,
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
    desc: '90 endpoints deployed via FTP/robocopy. Zero tests. High production risk on every deploy.',
    riskScore: 72,
    impact: 'High',
    effort: 'Medium',
    stability: 'Unstable',
    details: {
      authProtocol: 'v1.2 (Legacy)',
      throughput: '150 req/s',
      latencyOverhead: '+124ms',
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
  {
    title: '30+ Asset Store Packages',
    level: 'P2',
    desc: 'Checked directly into repo with no Git LFS. Makes clones slow, inflates size.',
    riskScore: 28,
    impact: 'Low',
    effort: 'Medium',
    stability: 'Stable',
  },
]

export interface SystemHealthNode {
  id: string
  label: string
  risk: number
  status: 'critical' | 'high' | 'moderate' | 'optimal'
}

export const systemNodes: SystemHealthNode[] = [
  { id: 'app', label: 'APP.CS', risk: 94, status: 'critical' },
  { id: 'net', label: 'NET_MGR', risk: 45, status: 'moderate' },
  { id: 'physics', label: 'PHYSICS', risk: 8, status: 'optimal' },
  { id: 'api', label: 'PHP_API', risk: 72, status: 'high' },
  { id: 'events', label: 'EVENTS', risk: 22, status: 'optimal' },
  { id: 'workout', label: 'WORKOUT', risk: 78, status: 'high' },
  { id: 'pairing', label: 'PAIRING', risk: 35, status: 'moderate' },
  { id: 'ui', label: 'UI_LAYER', risk: 55, status: 'moderate' },
  { id: 'bots', label: 'BOT_AI', risk: 12, status: 'optimal' },
  { id: 'audio', label: 'AUDIO', risk: 5, status: 'optimal' },
  { id: 'avatar', label: 'AVATAR', risk: 18, status: 'optimal' },
  { id: 'sql', label: 'SQL_DB', risk: 40, status: 'moderate' },
]

export const aggregatedRiskScore = 8.4
export const coverageGap = 31.4
