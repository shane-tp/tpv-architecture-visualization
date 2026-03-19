import type { DebtItem } from '../types/architecture'

export const debtData: DebtItem[] = [
  { title: 'Zero Test Coverage', level: 'P0', desc: 'No unit/integration tests anywhere. test-framework 1.6.0 unused.' },
  { title: 'God-object App.cs', level: 'P0', desc: 'Service locator anti-pattern at massive scale. Prevents isolated testing.' },
  { title: 'TPV-262 Warmup Bug', level: 'P1', desc: 'Ramp segments flattened. Root cause: condition reorder in JSON parser.' },
  { title: 'PHP API Deploy', level: 'P1', desc: 'Deployed via FTP. Zero tests. High production risk on every deploy.' },
  { title: 'Common/ Code Drift', level: 'P1', desc: 'Code manually copied across 3 Unity projects. Sync mechanism unverified.' },
  { title: 'Legacy Networking', level: 'P2', desc: 'Dead RiptideNetworking/ code sits alongside active code.' },
  { title: '30+ Asset Store Packages', level: 'P2', desc: 'Checked directly into repo. Makes clones slow, inflates size.' },
]
