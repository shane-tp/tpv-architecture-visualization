import React, { useState, useRef } from 'react';
import { 
  Search, LayoutTemplate, Server, Activity, ShieldAlert, Database, 
  Globe, Layers, AlertTriangle, Code, Layout, Bluetooth, User, Bot, 
  FileJson, Wifi, Zap, Flag, File, Calendar, BarChart, MessageCircle,
  ZoomIn, ZoomOut, Maximize, Settings, Monitor, Cloud
} from 'lucide-react';

// --- VISUAL ARCHITECTURE DATA ---
// Scaled down by 10x to prevent browser GPU "splotching" on massive DOM elements.
const archGroups = [
  { id: "fsm", label: "GAME STATE MACHINE", x: 50, y: 50, w: 1200, h: 640, border: "border-cyan-500/40", bg: "bg-cyan-500/5", text: "text-cyan-400" },
  { id: "client", label: "CLIENT APPLICATION", x: 50, y: 790, w: 550, h: 320, border: "border-blue-500/40", bg: "bg-blue-500/5", text: "text-blue-400" },
  { id: "systems", label: "GAME SYSTEMS", x: 650, y: 790, w: 600, h: 320, border: "border-purple-500/40", bg: "bg-purple-500/5", text: "text-purple-400" },
  { id: "net", label: "NETWORKING", x: 450, y: 1190, w: 400, h: 180, border: "border-emerald-500/40", bg: "bg-emerald-500/5", text: "text-emerald-400" },
  { id: "server", label: "SERVER (Headless Unity)", x: 50, y: 1440, w: 850, h: 340, border: "border-orange-500/40", bg: "bg-orange-500/5", text: "text-orange-400" },
  { id: "fit", label: "FILE EXPORT", x: 950, y: 1440, w: 300, h: 180, border: "border-indigo-500/40", bg: "bg-indigo-500/5", text: "text-indigo-400" },
  { id: "services", label: "EXTERNAL SERVICES", x: 50, y: 1850, w: 550, h: 340, border: "border-rose-500/40", bg: "bg-rose-500/5", text: "text-rose-400" },
  { id: "integrations", label: "INTEGRATIONS", x: 650, y: 1850, w: 600, h: 340, border: "border-amber-500/40", bg: "bg-amber-500/5", text: "text-amber-400" },
];

const NODE_W = 200;
const NODE_H = 60;

const archNodes = [
  // FSM (Cyan)
  { id: "init", group: "fsm", label: "Initializing", desc: "Boot sequence", x: 100, y: 100, w: NODE_W, h: NODE_H, icon: Activity, color: "cyan" },
  { id: "loadAcc", group: "fsm", label: "Load Accounts", desc: "Local profile check", x: 100, y: 260, w: NODE_W, h: NODE_H, icon: User, color: "cyan" },
  { id: "verCheck", group: "fsm", label: "Version Check", desc: "Patch validation", x: 100, y: 420, w: NODE_W, h: NODE_H, icon: Code, color: "cyan" },
  { id: "inAcc", group: "fsm", label: "In Accounts", desc: "Login screen", x: 100, y: 580, w: NODE_W, h: NODE_H, icon: User, color: "cyan" },
  
  { id: "onboard", group: "fsm", label: "Onboarding", desc: "First-time setup", x: 400, y: 580, w: NODE_W, h: NODE_H, icon: Flag, color: "cyan" },
  { id: "loadHub", group: "fsm", label: "Load Hub", desc: "Async scene load", x: 400, y: 420, w: NODE_W, h: NODE_H, icon: Layout, color: "cyan" },
  { id: "hub", group: "fsm", label: "In Hub", desc: "Main menu state", x: 400, y: 260, w: NODE_W, h: NODE_H, icon: Globe, color: "cyan" },
  { id: "pair", group: "fsm", label: "Select Pairing", desc: "Hardware connect", x: 400, y: 100, w: NODE_W, h: NODE_H, icon: Bluetooth, color: "cyan" },
  
  { id: "worldLoad", group: "fsm", label: "World Load", desc: "Addressables sync", x: 700, y: 100, w: NODE_W, h: NODE_H, icon: Globe, color: "cyan" },
  { id: "world", group: "fsm", label: "In World", desc: "Active riding state", x: 700, y: 260, w: NODE_W, h: NODE_H, icon: Monitor, color: "cyan" },
  { id: "pen", group: "fsm", label: "Join Pen", desc: "Event wait area", x: 700, y: 420, w: NODE_W, h: NODE_H, icon: Flag, color: "cyan" },
  { id: "ride", group: "fsm", label: "End Ride", desc: "Upload & review", x: 700, y: 580, w: NODE_W, h: NODE_H, icon: Activity, color: "cyan" },
  
  { id: "logout", group: "fsm", label: "Logout", desc: "Clear session", x: 1000, y: 580, w: NODE_W, h: NODE_H, icon: User, color: "cyan" },
  { id: "quit", group: "fsm", label: "Quit", desc: "Exit app", x: 1000, y: 420, w: NODE_W, h: NODE_H, icon: Settings, color: "cyan" },

  // Client (Blue)
  { id: "stateMgr", group: "client", label: "StateManager", desc: "State Machine Engine", x: 100, y: 840, w: NODE_W, h: NODE_H, icon: Activity, color: "blue" },
  { id: "app", group: "client", label: "App.cs", desc: "God Object (65+ Mgrs)", x: 350, y: 920, w: NODE_W, h: NODE_H, icon: Code, color: "blue" },
  { id: "gui", group: "client", label: "UI Layer", desc: "MenuMgr + uGUI Canvas", x: 100, y: 1000, w: NODE_W, h: NODE_H, icon: Layout, color: "blue" },

  // Systems (Purple)
  { id: "parts", group: "systems", label: "Modular Avatar", desc: "Body, Kit, Bike", x: 700, y: 840, w: NODE_W, h: NODE_H, icon: User, color: "purple" },
  { id: "bots", group: "systems", label: "Bot AI", desc: "Client ambient bots", x: 1000, y: 840, w: NODE_W, h: NODE_H, icon: Bot, color: "purple" },
  { id: "pairing", group: "systems", label: "Hardware Pairing", desc: "ANT+ / BLE / FTMS", x: 700, y: 1000, w: NODE_W, h: NODE_H, icon: Bluetooth, color: "purple" },
  { id: "zwo", group: "systems", label: "Workout Engine", desc: "ZWO / JSON Parser", x: 1000, y: 1000, w: NODE_W, h: NODE_H, icon: FileJson, color: "purple" },

  // Networking (Emerald)
  { id: "tcp", group: "net", label: "Riptide Network", desc: "TCP + UDP Transport", x: 550, y: 1250, w: NODE_W, h: NODE_H, icon: Wifi, color: "emerald" },

  // Server (Orange)
  { id: "headless", group: "server", label: "Headless Unity", desc: "Game Server Instance", x: 100, y: 1510, w: NODE_W, h: NODE_H, icon: Server, color: "orange" },
  { id: "physics", group: "server", label: "PhysicsManager", desc: "CdA, Draft, Core Sim", x: 400, y: 1510, w: NODE_W, h: NODE_H, icon: Zap, color: "orange" },
  { id: "races", group: "server", label: "EventManager", desc: "Races / Ranks / Results", x: 700, y: 1510, w: NODE_W, h: NODE_H, icon: Flag, color: "orange" },
  { id: "pacebots", group: "server", label: "PaceBots", desc: "Server-side AI", x: 400, y: 1670, w: NODE_W, h: NODE_H, icon: Bot, color: "orange" },

  // FIT (Indigo)
  { id: "fitservice", group: "fit", label: "FITFileService", desc: "Ride Recording", x: 1000, y: 1510, w: NODE_W, h: NODE_H, icon: File, color: "indigo" },

  // Services (Rose)
  { id: "api", group: "services", label: "PHP API", desc: "90 Endpoints (IIS)", x: 100, y: 1920, w: NODE_W, h: NODE_H, icon: Globe, color: "rose" },
  { id: "cdn", group: "services", label: "Azure CDN", desc: "Kits, i18n, Routes", x: 350, y: 1920, w: NODE_W, h: NODE_H, icon: Cloud, color: "rose" },
  { id: "sql", group: "services", label: "SQL Server", desc: "T-SQL / dbo schema", x: 100, y: 2080, w: NODE_W, h: NODE_H, icon: Database, color: "rose" },

  // Integrations (Amber)
  { id: "tp", group: "integrations", label: "TrainingPeaks", desc: "Workout Sync", x: 700, y: 1920, w: NODE_W, h: NODE_H, icon: Calendar, color: "amber" },
  { id: "strava", group: "integrations", label: "Strava", desc: "OAuth / Activity Upload", x: 1000, y: 1920, w: NODE_W, h: NODE_H, icon: Activity, color: "amber" },
  { id: "intervals", group: "integrations", label: "Intervals.icu", desc: "Workout Sync", x: 700, y: 2080, w: NODE_W, h: NODE_H, icon: BarChart, color: "amber" },
  { id: "discord", group: "integrations", label: "Discord", desc: "Rich Presence SDK", x: 1000, y: 2080, w: NODE_W, h: NODE_H, icon: MessageCircle, color: "amber" },
];

const archEdges = [
  // FSM Snake Flow
  { id: "e1", from: "init", to: "loadAcc", color: "#06b6d4" },
  { id: "e2", from: "loadAcc", to: "verCheck", color: "#06b6d4" },
  { id: "e3", from: "verCheck", to: "inAcc", color: "#06b6d4" },
  { id: "e4", from: "inAcc", to: "onboard", color: "#06b6d4" }, 
  { id: "e5", from: "onboard", to: "loadHub", color: "#06b6d4" },
  { id: "e6", from: "loadHub", to: "hub", color: "#06b6d4" },
  { id: "e7", from: "hub", to: "pair", color: "#06b6d4" },
  { id: "e8", from: "pair", to: "worldLoad", color: "#06b6d4" }, 
  { id: "e9", from: "worldLoad", to: "world", color: "#06b6d4" }, 
  { id: "e10", from: "world", to: "pen", color: "#06b6d4" },
  { id: "e11", from: "pen", to: "ride", color: "#06b6d4" },
  { id: "e12", from: "ride", to: "hub", dashed: true, label: "Return", color: "#06b6d4" },
  { id: "e13", from: "ride", to: "logout", color: "#06b6d4" }, 
  { id: "e14", from: "logout", to: "quit", color: "#06b6d4" },

  // --- THE MISSING LINK: Connecting FSM to Client ---
  { id: "e_fsm_link", from: "stateMgr", to: "init", label: "CONTROLS GAME LOOP", animate: true, color: "#eab308", strokeW: "2", textCol: "#eab308" },

  // App & Logic
  { id: "e15", from: "app", to: "stateMgr", label: "Initializes", color: "#3b82f6" },
  { id: "e16", from: "stateMgr", to: "gui", label: "Triggers Menu", dashed: true, color: "#3b82f6" },
  
  // Networking Flow
  { id: "e17", from: "app", to: "tcp", label: "20Hz Tick", animate: true, color: "#10b981", strokeW: "2" },
  { id: "e18", from: "app", to: "api", label: "Discovery", color: "#f43f5e" },
  { id: "e19", from: "tcp", to: "headless", label: "DTOs", animate: true, color: "#10b981", strokeW: "2" },
  
  // Server Internal & Output
  { id: "e20", from: "headless", to: "physics", color: "#f97316" },
  { id: "e21", from: "headless", to: "races", color: "#f97316" },
  { id: "e22", from: "headless", to: "pacebots", color: "#f97316" },
  { id: "e23", from: "physics", to: "fitservice", label: "Ride recording", animate: true, color: "#8b5cf6", strokeW: "2" },
  { id: "e24", from: "races", to: "sql", label: "Write results", dashed: true, color: "#f43f5e" },
  
  // Services
  { id: "e25", from: "api", to: "sql", label: "Queries", color: "#f43f5e" },
  { id: "e_cdn", from: "api", to: "cdn", label: "Assets", color: "#f43f5e" },

  // Integrations
  { id: "e26", from: "zwo", to: "tp", label: "Sync workouts", dashed: true, color: "#f59e0b" },
  { id: "e27", from: "zwo", to: "intervals", label: "Sync workouts", dashed: true, color: "#f59e0b" },
  { id: "e28", from: "gui", to: "discord", label: "Rich Presence", dashed: true, color: "#3b82f6" },
  { id: "e29", from: "app", to: "strava", label: "OAuth/Upload", dashed: true, color: "#3b82f6" },
];

const debtData = [
  { title: "Zero Test Coverage", level: "P0", desc: "No unit/integration tests anywhere. test-framework 1.6.0 unused." },
  { title: "God-object App.cs", level: "P0", desc: "Service locator anti-pattern at massive scale. Prevents isolated testing." },
  { title: "TPV-262 Warmup Bug", level: "P1", desc: "Ramp segments flattened. Root cause: condition reorder in JSON parser." },
  { title: "PHP API Deploy", level: "P1", desc: "Deployed via FTP. Zero tests. High production risk on every deploy." },
  { title: "Common/ Code Drift", level: "P1", desc: "Code manually copied across 3 Unity projects. Sync mechanism unverified." },
  { title: "Legacy Networking", level: "P2", desc: "Dead RiptideNetworking/ code sits alongside active code." },
  { title: "30+ Asset Store Packages", level: "P2", desc: "Checked directly into repo. Makes clones slow, inflates size." }
];

const getColorClasses = (colorName) => {
  const map = {
    cyan: "hover:border-cyan-400 hover:shadow-cyan-500/40 border-cyan-500/20",
    blue: "hover:border-blue-400 hover:shadow-blue-500/40 border-blue-500/20",
    emerald: "hover:border-emerald-400 hover:shadow-emerald-500/40 border-emerald-500/20",
    purple: "hover:border-purple-400 hover:shadow-purple-500/40 border-purple-500/20",
    rose: "hover:border-rose-400 hover:shadow-rose-500/40 border-rose-500/20",
    orange: "hover:border-orange-400 hover:shadow-orange-500/40 border-orange-500/20",
    indigo: "hover:border-indigo-400 hover:shadow-indigo-500/40 border-indigo-500/20",
    amber: "hover:border-amber-400 hover:shadow-amber-500/40 border-amber-500/20",
  };
  return `bg-slate-900 border ${map[colorName] || map.blue}`;
};

const getIndicatorColor = (colorName) => {
  const map = {
    cyan: "bg-cyan-500", blue: "bg-blue-500", emerald: "bg-emerald-500",
    purple: "bg-purple-500", rose: "bg-rose-500", orange: "bg-orange-500",
    indigo: "bg-indigo-500", amber: "bg-amber-500"
  };
  return map[colorName] || "bg-blue-500";
};

const getAnchors = (from, to) => {
  const fx = from.x + from.w / 2;
  const fy = from.y + from.h / 2;
  const tx = to.x + to.w / 2;
  const ty = to.y + to.h / 2;

  const dx = tx - fx;
  const dy = ty - fy;

  let startX, startY, endX, endY;

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0) { startX = from.x + from.w; startY = fy; endX = to.x; endY = ty; } 
    else { startX = from.x; startY = fy; endX = to.x + to.w; endY = ty; }
  } else {
    if (dy > 0) { startX = fx; startY = from.y + from.h; endX = tx; endY = to.y; } 
    else { startX = fx; startY = from.y; endX = tx; endY = to.y + to.h; }
  }
  return { startX, startY, endX, endY };
};

export default function App() {
  const [activeTab, setActiveTab] = useState('canvas');
  const [focusGroup, setFocusGroup] = useState(null);
  
  const containerRef = useRef(null);
  const [transform, setTransform] = useState({ x: 50, y: 50, scale: 0.6 }); 
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleWheel = (e) => {
    e.preventDefault();
    const scaleAdjust = e.deltaY * -0.001;
    const newScale = Math.min(Math.max(0.1, transform.scale + scaleAdjust), 3);
    setTransform(prev => ({ ...prev, scale: newScale }));
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setTransform(prev => ({ ...prev, x: e.clientX - dragStart.x, y: e.clientY - dragStart.y }));
  };
  
  const handleMouseUp = () => setIsDragging(false);

  const zoomIn = () => setTransform(prev => ({ ...prev, scale: Math.min(prev.scale + 0.1, 3) }));
  const zoomOut = () => setTransform(prev => ({ ...prev, scale: Math.max(prev.scale - 0.1, 0.1) }));
  const resetZoom = () => setTransform({ x: 50, y: 50, scale: 0.6 });

  const renderEdges = () => {
    return archEdges.map(edge => {
      const from = archNodes.find(n => n.id === edge.from);
      const to = archNodes.find(n => n.id === edge.to);
      if (!from || !to) return null;

      let opacity = 1;
      if (focusGroup) {
        if (from.group !== focusGroup && to.group !== focusGroup) opacity = 0.05;
      }

      const { startX, startY, endX, endY } = getAnchors(from, to);

      const offset = Math.max(Math.abs(startX - endX) / 1.5, Math.abs(startY - endY) / 1.5, 80);

      let cp1x = startX, cp1y = startY, cp2x = endX, cp2y = endY;

      if (startX === from.x || startX === from.x + from.w) { cp1x += (startX === from.x ? -offset : offset); } 
      else { cp1y += (startY === from.y ? -offset : offset); }

      if (endX === to.x || endX === to.x + to.w) { cp2x += (endX === to.x ? -offset : offset); } 
      else { cp2y += (endY === to.y ? -offset : offset); }

      const pathData = `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
      const strokeColor = edge.color || "#4B5563";
      const strokeWidth = edge.strokeW || "1.5";

      return (
        <g key={edge.id} style={{ opacity, transition: 'opacity 0.3s ease' }}>
          <path 
            d={pathData} 
            fill="none" 
            stroke={strokeColor} 
            strokeWidth={strokeWidth} 
            strokeDasharray={edge.dashed ? "4,4" : "none"}
            markerEnd="url(#arrow)"
          />
          {edge.animate && opacity > 0.5 && (
            <circle r="4" fill={strokeColor} className="drop-shadow-md">
              <animateMotion dur="4s" repeatCount="indefinite" path={pathData} />
            </circle>
          )}
          {edge.label && (
            <text 
              x={(startX + endX) / 2} 
              y={(startY + endY) / 2 - 8} 
              fill={edge.textCol || "#9CA3AF"} 
              className="text-[10px] font-mono font-bold pointer-events-none drop-shadow-md"
              textAnchor="middle"
            >
              {edge.label}
            </text>
          )}
        </g>
      );
    });
  };

  return (
    <div className="flex h-screen bg-slate-950 text-gray-200 font-sans overflow-hidden selection:bg-indigo-500/30">
      
      {/* SIDEBAR */}
      <aside className="w-72 shrink-0 bg-slate-900 border-r border-gray-800/50 flex flex-col z-20 shadow-2xl">
        <div className="p-5 border-b border-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/20">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">TPV Explorer</h1>
              <p className="text-xs text-gray-500 font-mono mt-0.5">V1.0 • Mar 2026</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-1 flex-1 overflow-y-auto">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest px-3 py-2 mt-2">Main Views</div>
          
          <button onClick={() => { setActiveTab('canvas'); setFocusGroup(null); }} 
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'canvas' ? 'bg-indigo-500/10 text-indigo-400 shadow-inner border border-indigo-500/20' : 'text-gray-400 hover:bg-slate-800/50 hover:text-gray-200 border border-transparent'}`}>
            <LayoutTemplate size={18} /> Interactive Canvas
          </button>
          
          <button onClick={() => setActiveTab('debt')} 
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'debt' ? 'bg-red-500/10 text-red-400 shadow-inner border border-red-500/20' : 'text-gray-400 hover:bg-slate-800/50 hover:text-gray-200 border border-transparent'}`}>
            <ShieldAlert size={18} /> Tech Debt Map
          </button>

          {activeTab === 'canvas' && (
            <div className="mt-8">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest px-3 py-2">Focus Mode</div>
              <div className="space-y-1">
                {archGroups.map(group => (
                  <button 
                    key={group.id}
                    onClick={() => setFocusGroup(focusGroup === group.id ? null : group.id)}
                    className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${focusGroup === group.id ? 'bg-slate-800 text-white shadow-md' : 'text-gray-400 hover:bg-slate-800/30'}`}
                  >
                    <span>{group.label.split('(')[0].trim()}</span>
                    {focusGroup === group.id && <div className="w-2 h-2 rounded-full bg-indigo-400 shadow-lg shadow-indigo-400/80"></div>}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-5 border-t border-gray-800/50 bg-slate-950">
          <div className="text-xs font-mono text-gray-400 space-y-3">
            <div className="flex justify-between items-center"><span>Max Players</span><span className="text-white bg-slate-800 px-2 py-0.5 rounded">4000</span></div>
            <div className="flex justify-between items-center"><span>Tick Rate</span><span className="text-emerald-400 bg-emerald-900/30 px-2 py-0.5 rounded">20 Hz</span></div>
            <div className="flex justify-between items-center"><span>API Endpoints</span><span className="text-rose-400 bg-rose-900/30 px-2 py-0.5 rounded">90</span></div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 relative overflow-hidden bg-black">
        
        {activeTab === 'canvas' ? (
          <div className="relative w-full h-full cursor-grab active:cursor-grabbing"
               ref={containerRef} onWheel={handleWheel} onMouseDown={handleMouseDown}
               onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
            
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px', 
                          backgroundPosition: `${transform.x}px ${transform.y}px`, transform: `scale(${transform.scale})`, transformOrigin: '0 0' }} />

            <div className="absolute top-6 right-6 z-50 flex gap-1 bg-slate-900/90 p-1.5 rounded-xl border border-gray-800/80 backdrop-blur-md shadow-2xl">
              <button onClick={zoomOut} className="p-2 hover:bg-slate-800 rounded-lg text-gray-400 hover:text-white transition-colors"><ZoomOut size={20} /></button>
              <button onClick={resetZoom} className="p-2 hover:bg-slate-800 rounded-lg text-gray-400 hover:text-white transition-colors"><Maximize size={20} /></button>
              <button onClick={zoomIn} className="p-2 hover:bg-slate-800 rounded-lg text-gray-400 hover:text-white transition-colors"><ZoomIn size={20} /></button>
            </div>

            <div style={{ transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`, transformOrigin: '0 0' }} 
                 className="absolute inset-0 transition-transform duration-75 ease-out will-change-transform">
              
              {/* Safe-scaled SVG Layer */}
              <svg className="absolute inset-0 overflow-visible pointer-events-none z-0" style={{ width: '1500px', height: '2500px' }}>
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#6B7280" />
                  </marker>
                </defs>
                {renderEdges()}
              </svg>

              {archGroups.map(group => {
                const isFaded = focusGroup && focusGroup !== group.id;
                return (
                  <div key={group.id} 
                       className={`absolute rounded-3xl border-2 border-dashed ${group.border} ${group.bg} pointer-events-none z-0 transition-opacity duration-300`}
                       style={{ left: group.x, top: group.y, width: group.w, height: group.h, opacity: isFaded ? 0.05 : 1 }}>
                    <div className={`absolute -top-4 left-6 bg-black px-3 py-1 rounded-lg text-xs font-bold tracking-widest ${group.text} font-mono shadow-md border border-gray-800`}>
                      {group.label}
                    </div>
                  </div>
                )
              })}

              {/* Safe-scaled Nodes */}
              {archNodes.map(node => {
                const isFaded = focusGroup && focusGroup !== node.group;
                const Icon = node.icon;
                const hoverClass = getColorClasses(node.color);
                const indicatorClass = getIndicatorColor(node.color);

                return (
                  <div key={node.id} 
                       className={`absolute shadow-xl flex flex-row items-center gap-3 px-4 py-3 z-10 transition-all duration-300 hover:-translate-y-1 ${hoverClass}`}
                       style={{ 
                         left: node.x, top: node.y, width: node.w, height: node.h, 
                         opacity: isFaded ? 0.05 : 1, filter: isFaded ? 'grayscale(100%)' : 'none',
                         borderRadius: '12px'
                       }}>
                    <div className={`w-1 absolute left-0 top-3 bottom-3 rounded-r-full opacity-80 ${indicatorClass}`}></div>
                    
                    <div className="p-2 bg-slate-950 rounded-lg shrink-0 shadow-inner border border-gray-800/80 ml-1">
                      <Icon size={20} className="text-gray-300" />
                    </div>
                    
                    <div className="flex flex-col justify-center h-full w-full pr-2">
                      <div className="text-sm font-bold text-gray-100 mb-0.5 leading-tight shrink-0">
                        {node.label}
                      </div>
                      <div className="text-[10px] font-medium text-gray-400 font-mono leading-snug break-words">
                        {node.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="h-full overflow-y-auto p-12 bg-slate-950">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="flex items-center gap-4 border-b border-gray-800 pb-6">
                <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-white">Tech Debt Heatmap</h2>
                  <p className="text-sm text-gray-400 mt-1">Identified risks and architectural bottlenecks</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {debtData.map((item, idx) => {
                  const isP0 = item.level === 'P0';
                  const isP1 = item.level === 'P1';
                  return (
                    <div key={idx} className={`p-6 rounded-2xl border ${
                      isP0 ? 'bg-red-950/30 border-red-900/50 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/10' : 
                      isP1 ? 'bg-orange-950/30 border-orange-900/50 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10' : 
                      'bg-yellow-950/30 border-yellow-900/50 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/10'
                    } transition-all duration-300`}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-100">{item.title}</h3>
                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold font-mono tracking-wider shadow-sm ${
                          isP0 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 
                          isP1 ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 
                          'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        }`}>{item.level}</span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
