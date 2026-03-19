# TPV Explorer

Interactive architecture visualization for the TPV platform. Pannable, zoomable canvas showing game state machine flow, client/server topology, networking, external services, and integrations. Includes a tech debt heatmap view.

## Stack

- React 19 + Vite 8
- Tailwind CSS 3
- Lucide React (icons)
- GitHub Pages (auto-deploys on push to `main`)

## Getting Started

```bash
pnpm install
pnpm dev
```

## Deployment

Pushing to `main` triggers a GitHub Actions workflow that builds and deploys to GitHub Pages automatically.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm preview` | Preview production build locally |
| `pnpm lint` | Run ESLint |
