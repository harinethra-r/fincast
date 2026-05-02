# Fincast

A beginner-friendly portfolio “weather report” that combines **stocks + ETFs + mutual funds** into one calm dashboard, then turns market uncertainty into **simple what‑if scenarios** and **clear rebalancing moves** (with costs/tax notes in plain English).

## What this is
Fincast is a prototype that helps non‑experts answer:
- “How healthy is my portfolio right now?”
- “What happens if the market drops 20% / inflation stays high / I need cash next year?”
- “What should I actually do, step by step?”

It uses a weather metaphor to keep everything jargon‑free:
- **Storm risk** = how bumpy your ride may feel  
- **Shelter** = bonds/cash cushion  
- **Overheating** = a slice that’s gotten too big

## Key features (challenge requirements)
### Unified & intuitive dashboard
- One view that aggregates **individual stocks + mutual funds + ETFs**
- Portfolio **health score**, **storm risk meter**, and **color-coded allocation**
- Tap-friendly visuals instead of intimidating tables

### Scenario-driven rebalancing engine
- Pick a scenario (e.g. **market −20%**, **inflation high**, **withdraw 20% next year**)
- Get a **plain-English rebalancing plan** with concrete next steps
- Link to a “trade list” view so actions are easy to execute

### Radical transparency
- “How we decided” logic written in simple steps
- **Costs** (commission/spread) explained clearly
- **Tax note** (taxable vs retirement accounts) explained clearly
- Each plan ties back to **goals** (home, education, retirement)

### Guided goal-setting
- Quick onboarding quiz with no finance-exam vocabulary
- Pick goals (safety net, home, education, retirement)
- App uses goals + risk comfort to frame recommendations

## Pages
- **Today’s Forecast**: portfolio at-a-glance dashboard
- **Your Sky**: unified holdings cards (stocks/funds/ETFs together)
- **Storm Risk**: risk & turbulence view
- **What If…**: scenario stress tests → rebalancing plan
- **Storm Warnings**: trade list + costs/taxes/why
- **Your Horizon**: goal timeline
- **Weather Profile**: onboarding (risk comfort + goals)
- **Ask Fincast AI**: chat-style guidance (prototype/local fallbacks supported)

## Tech stack
- React + TypeScript + Vite
- Tailwind CSS
- React Router
- Chart.js

## Live demo
After GitHub Pages is enabled (below), the app will be available at:

- [(http://localhost:5175/)](https://fincast01.netlify.app/)

## Getting started
### Prereqs
- Node.js (18+ recommended)

### Install & run
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
npm run preview
```

## Deploy (GitHub Pages)
This repo includes a GitHub Actions workflow that deploys `main` to GitHub Pages.

To enable it:
1. GitHub repo → **Settings** → **Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions**
3. Push to `main` (or manually run the workflow in the **Actions** tab)
