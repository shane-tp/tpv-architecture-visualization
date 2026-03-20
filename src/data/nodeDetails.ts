import type { NodeDetail } from '../types/architecture'

export const nodeDetails: Record<string, NodeDetail> = {
  stateMgr: {
    title: 'Game Flow FSM',
    file: 'Client/Assets/_TPV/Client/Scripts/StateManager.cs',
    stats: [
      { label: 'Pattern', value: 'Enum-based FSM' },
      { label: 'States', value: '14' },
      { label: 'Transition Driver', value: 'SetGameState() → ShowMenu()' },
      { label: 'Event Bus', value: 'None — direct method calls' },
    ],
    items: [
      {
        heading: 'State Chain (ordered)',
        entries: [
          'INITIALIZING',
          'LOAD_ACCOUNTS',
          'VERSION_CHECK',
          'PLAYER_IN_ACCOUNTS',
          'ONBOARDING',
          'LOAD_HUB',
          'PLAYER_IN_HUB',
          'SELECT_PAIRING',
          'WORLD_LOAD',
          'PLAYER_IN_WORLD',
          'JOIN_PEN',
          'END_RIDE',
          'LOGOUT',
          'QUIT',
        ],
      },
    ],
    notes: 'Each state transition triggers MenuManager.ShowMenu() with the corresponding MenuType. No pub-sub or event bus — all communication is via direct App.* manager calls.',
  },

  app: {
    title: 'Bootstrap & Service Locator',
    file: 'Client/Assets/_TPV/Client/Scripts/App.cs',
    stats: [
      { label: 'Lines of Code', value: '1,200+' },
      { label: 'Static Managers', value: '65+' },
      { label: 'Pattern', value: 'Service Locator (God Object)' },
      { label: 'Wiring', value: 'GetComponentInChildren<>() in Awake()' },
      { label: 'Update Loop', value: 'BatchedUpdate / BatchedFixedUpdate' },
    ],
    items: [
      {
        heading: 'Communication Patterns',
        entries: [
          'All access via App.managerName static properties',
          'No dependency injection',
          'No event bus / pub-sub',
          'Direct method calls between managers',
          'Network sync via Riptide [MessageHandler] attributes',
          'Addressables for async asset loading',
        ],
      },
    ],
    notes: 'App.Update() and App.FixedUpdate() call BatchedUpdate/BatchedFixedUpdate on each manager. The 65+ static references resolved in Awake() prevent any isolated testing.',
  },

  physics: {
    title: 'Server-Authoritative Cycling Physics',
    file: 'Server/Assets/_TPV/Server/Scripts/PhysicsManager.cs',
    stats: [
      { label: 'Authority', value: 'Server-authoritative' },
      { label: 'Client', value: 'Interpolation only' },
      { label: 'Max Draft', value: '55%' },
      { label: 'Supertuck', value: '-3% gradient @ 15 m/s' },
      { label: 'Timestep', value: 'Fixed (FixedUpdate)' },
    ],
    items: [
      {
        heading: 'Physics Model',
        entries: [
          'CdA (aerodynamic drag) modeling',
          'Drafting up to 55% reduction',
          'Cornering forces',
          'Gradient / slope effects',
          'Rolling resistance',
          'Supertuck at -3% grade and 15+ m/s',
        ],
      },
    ],
    notes: 'Server runs the authoritative simulation. Client-side does position interpolation, avatar animation, camera, and UI updates. PlayerPhysics.cs handles per-player calculations.',
  },

  tcp: {
    title: 'Riptide Transport & Sync',
    file: 'Common/Scripts/Networking/ (indieVelo.Networking)',
    stats: [
      { label: 'Framework', value: 'Custom Riptide fork' },
      { label: 'Transport', value: 'TCP + UDP dual' },
      { label: 'Tick Rate', value: '20 Hz' },
      { label: 'Failover', value: 'm_clientA (UDP) / m_clientB (TCP)' },
      { label: 'Routing', value: 'Enum IDs + [MessageHandler]' },
    ],
    items: [
      {
        heading: 'Client → Server (per tick)',
        entries: [
          'INPUT: power, cadence, heart rate',
          'Turn decisions, brake requests',
          'Rubberband, U-turn signals',
        ],
      },
      {
        heading: 'Server → Client (per tick)',
        entries: [
          'PLAYER_POSITIONS: road spline + lateral offset, power, cadence, HR, speed, effort, drag/slope, draft %, brake force',
          'EVENT_RESULTS_THIS_TICK: position, time, distance, delta, power, HR, points',
          'EVENT_GROUPS: peloton groupings',
          'EVENT_RANK_CHANGE: ranking updates',
        ],
      },
      {
        heading: 'Server → Client (event-driven)',
        entries: [
          'PLAYER_AVATAR_UPDATE',
          'CHAT_MESSAGE',
          'ACHIEVEMENT',
          'CHAPEAU',
          'EVENT_PEN_ABOUT_TO_CLOSE',
          'EVENT_PEN_CLOSED',
          'EVENT_ENTRANTS',
        ],
      },
    ],
    notes: 'UDP primary, TCP fallback if UDP degrades. Dual client instances share the same client ID for seamless failover. Heartbeat/timeout managed in Connection.cs. Legacy RiptideNetworking/ (RUDP only) still in tree.',
  },

  races: {
    title: 'Events, Pens & Results',
    file: 'Common/Scripts/ClientServerSync/EventConfig.cs',
    stats: [
      { label: 'Race Types', value: '10+' },
      { label: 'Key Files', value: 'EventConfig.cs, EventResult.cs' },
      { label: 'Results Payload', value: 'Position, time, distance, delta, power, HR, points' },
    ],
    items: [
      {
        heading: 'Race Types',
        entries: [
          'Scratch race',
          'Points race',
          'Time trial',
          'Elimination',
          'Team variants',
          'Series / organized events',
        ],
      },
      {
        heading: 'Pen Lifecycle Messages',
        entries: [
          'EVENT_PEN_ABOUT_TO_CLOSE',
          'EVENT_PEN_CLOSED',
          'EVENT_ENTRANTS',
          'EVENT_RANK_CHANGE',
        ],
      },
    ],
  },

  gui: {
    title: 'Menus & Presentation',
    file: 'Client/Scripts/MenuManager.cs',
    stats: [
      { label: 'Framework', value: 'uGUI Canvas + TextMeshPro' },
      { label: 'Menu Types', value: '100+' },
      { label: 'Base Class', value: 'MenuBase (OnButtonOK, OnButtonCancel, AutoOK)' },
      { label: 'Localization', value: 'I18n.X("key") + JSON translations' },
      { label: 'Charts', value: 'ChartAndGraph package' },
    ],
    items: [
      {
        heading: 'Menu Categories',
        entries: [
          'Login',
          'Onboarding',
          'Hub',
          'Event',
          'Profile',
          'Settings',
          'Team',
          'World',
        ],
      },
    ],
    notes: 'Navigation driven by StateManager.STATE → MenuManager.ShowMenu(). Not UI Toolkit. SoftMaskForUGUI used for UI masking.',
  },

  pairing: {
    title: 'Trainers & Sensors',
    file: 'Client/Scripts/Pairing/',
    stats: [
      { label: 'Protocols', value: 'ANT+, BLE, FTMS' },
      { label: 'ANT+ SDK', value: 'Dynastream' },
      { label: 'BLE SDK', value: 'BTFramework (legacy + srcNew)' },
    ],
    items: [
      {
        heading: 'Supported Device Types',
        entries: [
          'Smart trainers (controllable)',
          'Heart rate monitors',
          'Power meters',
          'Treadmills',
        ],
      },
      {
        heading: 'Platform-Specific Pairing',
        entries: [
          'Android: PairingLibBLEAND.cs',
          'iOS: PairingLibBLEBHI.cs',
          'Desktop: Dynastream ANT+ USB',
        ],
      },
    ],
    notes: 'Two BT framework versions in tree (BTFramework/src/ vs srcNew/). ERG mode: workout engine sends target watts, pairing layer sends resistance command to trainer via FTMS.',
  },

  zwo: {
    title: 'Workout Parsing & ERG Runtime',
    file: 'Client/Scripts/WorkoutParser*.cs',
    stats: [
      { label: 'Formats', value: 'ZWO, MRC, JSON' },
      { label: 'Runtime', value: 'Lerp-based interpolation' },
      { label: 'ERG Mode', value: 'Supported (target watts → trainer)' },
      { label: 'TP Sync', value: 'WorkoutLoaderTrainingPeaks.cs' },
    ],
    items: [
      {
        heading: 'Workout Sources',
        entries: [
          'TrainingPeaks API (JSON + ZWO)',
          'Intervals.icu',
          'Humango',
          'Athletica',
          'Local file import (MRC)',
        ],
      },
    ],
    notes: 'Known bug TPV-262: warmup/cooldown ramps flattened to midpoint values. Root cause: condition reorder in WorkoutParserJSONTP.cs from March 2025. Affects all JSON and <Step>-based ZWO workouts.',
  },

  headless: {
    title: 'Headless Game Server',
    file: 'Server/Assets/_TPV/Server/Scripts/App.cs',
    stats: [
      { label: 'Max Events', value: '250' },
      { label: 'Max Players', value: '4,000' },
      { label: 'Max Connections', value: '2,000' },
      { label: 'Default Port', value: '7777' },
      { label: 'Max Clients (config)', value: '50,000' },
    ],
    items: [
      {
        heading: 'Server Types',
        entries: [
          'ALL — handles everything',
          'FREE — free ride only',
          'EVENT — event/race servers',
          'WORLD — new type (active development)',
        ],
      },
      {
        heading: 'Config Shape (serverConfig.json)',
        entries: [
          'serverID, serverType, serverPort',
          'serverMaxClients, worldTypeKey',
          'numBots, paceBotIndicies',
        ],
      },
    ],
    notes: 'Headless Unity instance running physics, events, and networking. Server discovery via PHP API\'s servers.php endpoint. "WORLD" server type added Feb 2026 — refactoring ongoing.',
  },

  api: {
    title: 'PHP REST API',
    file: 'Config/ServerWeb/inetpub/apiroot/*.php',
    stats: [
      { label: 'Endpoints', value: '~90' },
      { label: 'Host', value: 'IIS on Azure VMs' },
      { label: 'Deploy', value: 'FTP / robocopy' },
      { label: 'Auth', value: 'JWT (HS512)' },
      { label: 'Tests', value: 'None (CI: composer install only)' },
    ],
    items: [
      {
        heading: 'Known Endpoints',
        entries: [
          'servers.php — server discovery',
          'events.php — event management',
          'signups.php — event registration',
          'schedulesummaries.php — schedule data',
          'features.php — feature flags',
        ],
      },
    ],
    notes: 'FTP deployment to Azure VMs via robocopy. Zero test suite. CI only runs composer install validation. High production risk on every deploy.',
  },

  onboard: {
    title: 'First-Time Onboarding',
    file: 'Client/Assets/_TPV/Client/Scripts/StateManager.cs (ONBOARDING)',
    stats: [
      { label: 'FSM State', value: 'ONBOARDING' },
      { label: 'Entry', value: 'First-time users only' },
      { label: 'Exit (OK)', value: 'LOAD_HUB' },
      { label: 'Exit (Decline)', value: 'PLAYER_IN_ACCOUNTS' },
    ],
    items: [
      {
        heading: 'Onboarding Flow',
        entries: [
          '1. EULA acceptance (MenuOnboardingEULA)',
          '2. Avatar creation (MenuOnboardingAvatar)',
          '3. Profile setup (MenuOnboardingProfile)',
          '4. → LOAD_HUB on completion',
        ],
      },
    ],
    notes: 'Declining the EULA returns the user to PLAYER_IN_ACCOUNTS. Returning users skip onboarding entirely — AccountManager routes directly to LOAD_HUB.',
  },

  loadHub: {
    title: 'Hub Scene Loading',
    file: 'Client/Assets/_TPV/Client/Scripts/StateManager.cs (LOAD_HUB)',
    stats: [
      { label: 'FSM State', value: 'LOAD_HUB' },
      { label: 'Loading', value: 'Addressables async' },
      { label: 'Scene', value: 'World 000 (Hub)' },
      { label: 'Exit', value: 'PLAYER_IN_HUB' },
    ],
    items: [
      {
        heading: 'Load Sequence',
        entries: [
          'DiscordManager.UpdateActivity (set account type)',
          'Optional premium upsell (MenuPremium)',
          'WorldManager.LoadWorldScenes(0) — Hub scene',
          'Camera set to HUB position',
          '→ PLAYER_IN_HUB when ready',
        ],
      },
    ],
    notes: 'Also triggered on ride return: END_RIDE → LOAD_HUB re-loads the hub scene, resets weather, stops audio, and refreshes server data.',
  },

  pair: {
    title: 'Device Pairing',
    file: 'Client/Assets/_TPV/Client/Scripts/StateManager.cs (SELECT_PAIRING)',
    stats: [
      { label: 'FSM State', value: 'SELECT_PAIRING' },
      { label: 'Menu', value: 'PairingNew' },
      { label: 'Skip Condition', value: 'gameSubState == WATCHING (spectate)' },
      { label: 'Exit (OK)', value: 'WORLD_LOAD' },
      { label: 'Exit (Cancel)', value: 'PLAYER_IN_HUB' },
    ],
    items: [
      {
        heading: 'Pairing Options',
        entries: [
          'Smart trainer (controllable, FTMS)',
          'Heart rate monitor (ANT+ / BLE)',
          'Power meter (ANT+ / BLE)',
          'Skip pairing (ride without devices)',
          'Spectate mode bypasses pairing entirely',
        ],
      },
    ],
    notes: 'Cancel returns to Hub. Spectators (gameSubState == WATCHING) skip this state entirely and go straight to WORLD_LOAD.',
  },

  worldLoad: {
    title: 'World Loading & Connection',
    file: 'Client/Assets/_TPV/Client/Scripts/StateManager.cs (WORLD_LOAD)',
    stats: [
      { label: 'FSM State', value: 'WORLD_LOAD' },
      { label: 'Key Systems', value: '8+ managers initialized' },
      { label: 'Network', value: 'ConnectAsync → ADD_TO_WORLD' },
      { label: 'Exit', value: 'PLAYER_IN_WORLD' },
    ],
    items: [
      {
        heading: 'WorldLoadStart Sequence',
        entries: [
          'Camera to SKY position',
          'WorldManager.LoadWorldScenes(worldID)',
          'InputManager.InitializeWorldState()',
          'PlayerManager.InitializeWorldState()',
          'WorkoutManager.InitializeWorldState()',
          'OcclusionManager.ResetVisibility()',
          'NetworkManager.Connect()',
          'ServerSessionManager.SessionStart()',
        ],
      },
      {
        heading: 'WorldLoadEnd Sequence',
        entries: [
          'Wait for ADD_TO_WORLD_RESPONSE',
          'Wait for player valid position',
          'OcclusionManager reset at player pos',
          'BotManager.InitializeWorldState()',
          '3-second skycam pan',
          'AudioManager.StartTyre()',
          '→ PLAYER_IN_WORLD',
        ],
      },
    ],
    notes: 'Also used for event rejoin: END_RIDE → WORLD_LOAD re-connects to the server for the next event pen. GetScheduleDetail is called for group workouts and custom routes.',
  },

  hub: {
    title: 'Hub — Main Decision Point',
    file: 'Client/Assets/_TPV/Client/Scripts/StateManager.cs (PLAYER_IN_HUB)',
    stats: [
      { label: 'FSM State', value: 'PLAYER_IN_HUB' },
      { label: 'Scene', value: 'Hub (World 000)' },
      { label: 'Routes Available', value: '~82' },
      { label: 'Menu Category', value: 'Hub menus via MenuManager' },
      { label: 'Exit States', value: 'SELECT_PAIRING → WORLD_LOAD | LOGOUT' },
    ],
    items: [
      {
        heading: 'Player Activities',
        entries: [
          'Browse & sign up for scheduled events (events.php + signups.php)',
          'Select from ~82 routes (world-000-Routes.json)',
          'Load structured workouts (ZWO/MRC/JSON from TP, Intervals, etc.)',
          'Configure avatar: body, frame, helmet, jersey, glasses, wheels',
          'Manage team kits & branding',
          'View leaderboards & achievements',
          'In-game chat',
        ],
      },
      {
        heading: 'Session Flow (from Hub)',
        entries: [
          '1. User selects event/ride/workout',
          '2. Transition → SELECT_PAIRING (ANT+/BLE discovery)',
          '3. Transition → WORLD_LOAD (Addressables async)',
          '4. TPVAPIManager.GetServers(scheduleKey, eventStartTime, protocolVersion)',
          '5. Client connects to first available server via ConnectAsync()',
          '6. ADD_TO_WORLD_REQUEST → ADD_TO_WORLD_RESPONSE',
        ],
      },
    ],
    notes: 'The Hub is the central menu of TrainingPeaks Virtual (Mac, Windows, iOS, Android, tvOS). All ride types — free ride, event, structured workout — originate here. After END_RIDE, the FSM returns to PLAYER_IN_HUB.',
  },

  world: {
    title: 'In World — Active Ride State',
    file: 'Client/Assets/_TPV/Client/Scripts/StateManager.cs (PLAYER_IN_WORLD)',
    stats: [
      { label: 'FSM State', value: 'PLAYER_IN_WORLD' },
      { label: 'Physics', value: 'Server-authoritative' },
      { label: 'Tick Rate', value: '20 Hz' },
      { label: 'Max Draft', value: '55% reduction' },
      { label: 'Supertuck', value: '-3% grade @ 15 m/s' },
      { label: 'Exit States', value: 'JOIN_PEN | END_RIDE' },
    ],
    items: [
      {
        heading: 'Active Systems',
        entries: [
          'Server physics: CdA, draft, gradient, rolling resistance, cornering',
          'Client interpolation: position, avatar animation, camera',
          'Networking: 20Hz INPUT → PLAYER_POSITIONS tick loop',
          'Ambient bots (client-side) + PaceBots (server-side)',
          'Occlusion culling (Client/Scripts/Occlusion/)',
          'FIT file recording via FITFileService (Riptide link)',
          'Workout ERG mode (if structured training active)',
        ],
      },
      {
        heading: 'Client → Server (per tick)',
        entries: [
          'INPUT: power, cadence, heart rate',
          'Turn decisions, brake requests',
          'Rubberband, U-turn signals',
        ],
      },
      {
        heading: 'Server → Client (per tick)',
        entries: [
          'PLAYER_POSITIONS: road spline + lateral offset, power, cadence, HR, speed, draft %',
          'EVENT_RESULTS_THIS_TICK: position, time, distance, delta, power, HR, points',
          'EVENT_GROUPS: peloton groupings',
          'EVENT_RANK_CHANGE: ranking updates',
        ],
      },
      {
        heading: 'Social & Events',
        entries: [
          'CHAT_MESSAGE: in-ride chat',
          'ACHIEVEMENT / CHAPEAU: social acknowledgments',
          'PLAYER_AVATAR_UPDATE: gear/kit changes',
          'Race logic: rankings, pen transitions, results',
        ],
      },
    ],
    notes: 'This is the core gameplay state. Server runs authoritative physics simulation while client handles rendering, interpolation, and UI. Exits to JOIN_PEN (for events) or END_RIDE (FIT upload + results review) before returning to Hub.',
  },

  ride: {
    title: 'End Ride — Upload & Review',
    file: 'Client/Assets/_TPV/Client/Scripts/StateManager.cs (END_RIDE)',
    stats: [
      { label: 'FSM State', value: 'END_RIDE' },
      { label: 'FIT Upload', value: 'Via FITFileService' },
      { label: 'Exit (normal)', value: 'LOAD_HUB → PLAYER_IN_HUB' },
      { label: 'Exit (rejoin)', value: 'WORLD_LOAD (next event)' },
    ],
    items: [
      {
        heading: 'End Ride Sequence',
        entries: [
          'Reset trainer resistance',
          'Show WorldRecords menu (if ride had distance/power)',
          'FIT file upload + FTP update',
          'AudioManager.StopTyre(), StopHelicopter()',
          'NetworkManager.Disconnect()',
          'Confetti stop, camera to SKY',
          'AchievementManager.CheckWelcomeRide() (first ride!)',
          'Deinit: Screenshot, Workout, Event, Player, Input managers',
        ],
      },
      {
        heading: 'After End Ride',
        entries: [
          'Normal: WeatherManager deactivate → Camera HUB → Load hub scene → LOAD_HUB',
          'Rejoin: Skip hub, go straight to WORLD_LOAD for next event pen',
          'ServerSessionManager.SessionEnd()',
          'AccountManager.RefreshServerData()',
        ],
      },
    ],
    notes: 'If the ride had no distance or power data, the WorldRecords menu is skipped and EndRideEnd is called immediately.',
  },

  pen: {
    title: 'Join Pen — Pre-Race Staging',
    file: 'Client/Assets/_TPV/Client/Scripts/StateManager.cs (JOIN_PEN)',
    stats: [
      { label: 'FSM State', value: 'JOIN_PEN' },
      { label: 'Duration', value: 'Immediate (same frame)' },
      { label: 'Exit', value: 'END_RIDE' },
    ],
    items: [
      {
        heading: 'Pen Lifecycle',
        entries: [
          'Player requests to join event pen from world',
          'Transition to JOIN_PEN is immediate → END_RIDE',
          'END_RIDE then routes to WORLD_LOAD (reload for event)',
          'Server sends EVENT_PEN_ABOUT_TO_CLOSE',
          'Server sends EVENT_PEN_CLOSED',
          'Server sends EVENT_ENTRANTS list',
        ],
      },
    ],
    notes: 'JOIN_PEN is a pass-through state — it immediately transitions to END_RIDE, which then triggers a WORLD_LOAD to reconnect for the event. The pen countdown and entrant list are server-managed.',
  },

  bots: {
    title: 'Bot AI System',
    file: 'Client/Scripts/BotManager.cs + Server/Scripts/BotManager.cs',
    stats: [
      { label: 'Client Bots', value: 'Ambient (visual only)' },
      { label: 'Server Bots', value: 'PaceBots (physics-simulated)' },
      { label: 'Bot Names', value: 'Regional sets (Scotland, IoM, UAE)' },
      { label: 'Init', value: 'BotManager.InitializeWorldState()' },
    ],
    items: [
      {
        heading: 'Client-Side Bots',
        entries: [
          'Ambient riders for visual world population',
          'No physics simulation — decorative only',
          'Spawned during WorldLoadEnd',
          'Managed by BotManager in App.Update()',
        ],
      },
      {
        heading: 'Server-Side PaceBots',
        entries: [
          'Full physics simulation (simulated power input)',
          'Configured per-event via paceBotIndicies in serverConfig.json',
          'Feed into PhysicsManager like real players',
          'Used for pacing in events and free rides',
        ],
      },
    ],
    notes: 'Bot name sets are regional (Scotland, Isle of Man, UAE), suggesting events tied to real-world locations. PaceBots are server-authoritative with simulated input.',
  },

  parts: {
    title: 'Modular Avatar System',
    file: 'Client/Assets/_TPV/Client/Addressables/Avatar*/',
    stats: [
      { label: 'Loading', value: 'Addressables async' },
      { label: 'Frame Brands', value: 'Trek, Giant, Wilier, Scott, Lauf, CADEX' },
      { label: 'Customization', value: 'Hub avatar config menu' },
    ],
    items: [
      {
        heading: 'Avatar Components',
        entries: [
          'Body (gender, skin tone)',
          'Frame (bike brand/model)',
          'Helmet',
          'Jersey / Kit (team branding)',
          'Glasses',
          'Hair',
          'Socks, Shoes',
          'Wheel sets',
        ],
      },
      {
        heading: 'Data Flow',
        entries: [
          'Hub: Player customizes via MenuOnboardingAvatar / HubProfile',
          'WorldLoad: Addressables load avatar parts for all players',
          'World: PLAYER_AVATAR_UPDATE messages sync gear changes',
          'App.cs → parts: Avatar Updates pushed each frame',
        ],
      },
    ],
    notes: 'Active team kit/branding pipeline — frequent SQL migrations for new jerseys. Licensing partnerships with major bike brands (Trek, Giant, etc.).',
  },

  tpHub: {
    title: 'TP Hub Mobile Companion',
    file: 'TP-Hub-Mobile/ (React Native / Expo)',
    stats: [
      { label: 'Stack', value: 'React Native, Expo, TypeScript' },
      { label: 'State', value: 'Jotai + React Query' },
      { label: 'Discovery', value: 'mDNS / Zeroconf (_tpvirtual._tcp)' },
      { label: 'Protocol', value: 'TCP on port 7779 (binary packets)' },
      { label: 'Auth', value: 'IndieVelo API (api.indievelo.com)' },
    ],
    items: [
      {
        heading: 'Features',
        entries: [
          'Remote control of TPVirtual client',
          'Live ride metrics (power, HR, cadence, speed)',
          'In-ride chat (send + receive)',
          'Event schedule browser (WebView → tpvirtualhub.com)',
          'Connection status & device info',
        ],
      },
      {
        heading: 'Packet Types (TCP:7779)',
        entries: [
          'HEARTBEAT — keep-alive',
          'AUTHENTICATION — IndieVelo token exchange',
          'CHAT — send / receive messages',
          'REMOTE_CONTROL — start/stop/pause actions',
          'STATE_DATA — current game state',
          'RIDE_DATA — live ride metrics',
          'ROUTE_DATA — active route info',
          'WORKOUT_DATA — workout progress',
        ],
      },
      {
        heading: 'Connection Flow',
        entries: [
          '1. mDNS discovery scans for _tpvirtual._tcp services',
          '2. TCP connect to discovered host on port 7779',
          '3. AUTHENTICATION packet with IndieVelo credentials',
          '4. Bi-directional packet exchange via NetServManager',
        ],
      },
    ],
    notes: 'Full React Native app in /TP-Hub-Mobile/. Uses react-native-tcp-socket for binary TCP, react-native-zeroconf for mDNS, and react-native-udp for broadcast. Authenticates independently via IndieVelo API.',
  },

  pacebots: {
    title: 'Server-Side PaceBots',
    file: 'Server/Assets/_TPV/Server/Scripts/BotManager.cs',
    stats: [
      { label: 'Authority', value: 'Server-authoritative' },
      { label: 'Config', value: 'paceBotIndicies in serverConfig.json' },
      { label: 'Physics', value: 'Full simulation (simulated power)' },
      { label: 'Assignment', value: 'Per-event via server config' },
    ],
    items: [
      {
        heading: 'Server Configuration',
        entries: [
          'numBots — total bot count for the server instance',
          'paceBotIndicies — array of bot slot indices assigned as pace bots',
          'serverConfig.json deployed per-server type (ALL, EVENT, FREE)',
          'Each PaceBot targets a specific watts/kg for pacing groups',
        ],
      },
      {
        heading: 'Physics Simulation',
        entries: [
          'PaceBots feed simulated power input into PhysicsManager',
          'Subject to same CdA, draft, gradient, rolling resistance as real players',
          'Server calculates positions identically to human riders',
          'Positions broadcast to all clients via PLAYER_POSITIONS message',
        ],
      },
      {
        heading: 'Differences from Client Bots',
        entries: [
          'Client bots: ambient visual riders, no physics, decorative only',
          'PaceBots: full server physics, appear as real riders to clients',
          'PaceBots have regional name sets (Scotland, Isle of Man, UAE)',
          'PaceBots participate in events and rankings',
        ],
      },
    ],
    notes: 'PaceBots are invisible from the client perspective — they look like real riders. Server assigns them via paceBotIndicies in the server config, and they run through the same PhysicsManager pipeline as human players.',
  },

  fitservice: {
    title: 'FIT File Recording',
    file: 'FITFileService/Assets/_TPV/FITFileService/Scripts/App.cs',
    stats: [
      { label: 'SDK', value: 'Dynastream FIT SDK' },
      { label: 'Dev Fields', value: 'Custom developer fields' },
      { label: 'Max Players', value: '2,000' },
      { label: 'Max Connections', value: '2,000' },
    ],
    items: [
      {
        heading: 'Architecture',
        entries: [
          'Separate headless Unity service',
          'Receives data via Riptide from game server',
          'Records FIT files with developer fields',
          'Shares Common/ code with Client and Server',
        ],
      },
    ],
  },
}
