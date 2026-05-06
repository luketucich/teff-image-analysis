# Teff Histology Image Comparison Tool

A static web tool for comparing H&E-stained mouse liver and kidney sections from the UNCG study:

> **Effects of teff (*Eragrostis tef*) supplementation on liver and kidney histomorphology in C57BL/6 mice fed low- and high-fat diets**
> Bertha Jernigan, Cardenas Vasquez, Stone, Omar, Darfour-Oduro, Allred · mentors: Fordahl, Osena, Jia
> University of North Carolina at Greensboro · Department of Biology

## What it does

The study is a 2 × 3 × 2 factorial (tissue × treatment × diet) → 12 representative photomicrographs (H&E, 20×, 100 µm scale bar). Comparing them across 12 conditions in a poster or PowerPoint is awkward. This tool gives the lab a fast way to:

- Pick any image with three dropdowns (tissue → diet → treatment)
- View **Single**, **Side-by-Side**, **Quad** (2×2 grid), or **Crossfade** (drag-to-reveal)
- One-click presets for the headline comparisons (e.g. *HF Control vs HF Brown Teff*)
- Click any image to zoom to full 1920×1200
- Download either the web PNG or the original TIF (~7 MB) for ImageJ analysis

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (no `tailwind.config.js` needed; theme lives in `src/index.css`)
- No backend — pure static site, deployed to GitHub Pages

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173/teff-image-analysis/
npm run build    # outputs to dist/
npm run preview  # preview the production build
```

## Deploy

Push to `main`. The workflow at `.github/workflows/deploy.yml` builds and publishes via GitHub Pages.

**One-time setup:** in the repo settings → Pages → Source: **GitHub Actions**.

If the repo is renamed, update `base` in [vite.config.ts](vite.config.ts) (or set `VITE_BASE` in the build environment).

## Adding more images

Edit [src/data/manifest.ts](src/data/manifest.ts). The manifest is the single source of truth — everything else (dropdowns, presets, downloads) derives from it. Drop the new files into `public/images/png/` and `public/images/tif/` using kebab-case names, then add a manifest entry.

## Layout notes

- `public/images/png/` — 12 web-display PNGs (~50 MB total)
- `public/images/tif/` — 12 originals for download (~84 MB total)
- Total deployed site: ~134 MB, well under the GitHub Pages 1 GB cap.
