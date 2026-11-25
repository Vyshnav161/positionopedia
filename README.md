# Positionopedia

A web app for browsing and filtering a library of intimate positions. It is intended for adults (18+) and shows a disclaimer that users must accept before entering.

**Live site:** https://vyrasloth161.github.io/positionopedia/

## Features

- **Library:** browse all positions as cards, with search and category filtering.
- **Generator:** filter by category, intensity, flexibility, intimacy level and more, then generate suggestions.
- **Position details:** description, step-by-step guide and anatomical insights for each position.
- **Disclaimer gate:** the user's acceptance is stored in `localStorage`.

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router, static export)
- React 18 and TypeScript
- Tailwind CSS with [Radix UI](https://www.radix-ui.com/) components
- Genkit with Google AI (set up in `src/ai`)
- GitHub Actions for deployment to GitHub Pages

## Getting started

Requires Node.js 20 or later.

```bash
git clone https://github.com/vyrasloth161/positionopedia.git
cd positionopedia
npm ci
npm run dev
```

The dev server runs at http://localhost:3000.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server on port 3000 |
| `npm run build` | Create a static export in `out/` |
| `npm run typecheck` | Run the TypeScript compiler without emitting files |
| `npm run lint` | Run Next.js linting |
| `npm run genkit:dev` | Start the Genkit developer UI |

### Environment variables

| Variable | Purpose |
| --- | --- |
| `GOOGLE_GENAI_API_KEY` | API key for Genkit's Google AI plugin. Only needed for the Genkit flows. |
| `NEXT_PUBLIC_BASE_PATH` | Sub-path the site is served from. Leave empty locally. Set to `/positionopedia` for GitHub Pages. |

## Project structure

```
src/
  app/          Routes: library, generator, positions/[id]
  components/   App components and UI primitives (components/ui)
  ai/           Genkit setup
  data/         Position data
  types/        Shared TypeScript types
docs/           Design blueprint
```

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`. It builds the static export with `NEXT_PUBLIC_BASE_PATH=/positionopedia` and publishes `out/` to GitHub Pages. You can also start it manually from the **Actions** tab. In **Settings → Pages**, set **Source** to **GitHub Actions**.

If you rename the repository, update `NEXT_PUBLIC_BASE_PATH` in the workflow to match.
