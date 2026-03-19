# TPV Explorer

Interactive architecture visualization for the TPV platform. Pannable, zoomable canvas showing game state machine flow, client/server topology, networking, external services, and integrations. Includes a tech debt heatmap view.

## Stack

- React 19 + Vite 8
- Tailwind CSS 3
- Lucide React (icons)
- GitHub Pages via `gh-pages`

## Getting Started

```bash
pnpm install
pnpm dev
```

## Deploy to GitHub Pages

```bash
pnpm deploy
```

This runs `vite build` then publishes `dist/` to the `gh-pages` branch.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm preview` | Preview production build locally |
| `pnpm deploy` | Build and deploy to GitHub Pages |
| `pnpm lint` | Run ESLint |
