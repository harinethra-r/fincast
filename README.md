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

- (https://fincast01.netlify.app/)

## Getting started
### Prereqs
- Node.js (18+ recommended)

### Open this repo on another computer (code, not a login page)
This project is **plain source code**. Nothing in the repo should send you to Cursor’s website by itself.

If you **clone or download the ZIP** and the **Cursor app** shows a **sign-in** screen first, that is **Cursor’s first-time setup on that device** (not this repository). Do this:

1. **Clone** (recommended) or unzip the GitHub archive.
2. In Cursor: **File → Open Folder…** and choose the `fincast` folder (the one that contains `package.json`).
3. Complete **one** Cursor sign-in on that machine if the app requires it, then open the folder again if needed.

**Avoid relying on GitHub’s “Open in Cursor” browser button** if you only want local files—that flow starts in the browser and can feel like “login instead of code.” Use **git clone** + **Open Folder** instead.

**Prefer not to use a Cursor account for this project?** Install [Visual Studio Code](https://code.visualstudio.com/), then **File → Open Folder…** → select the same `fincast` folder and run `npm install` / `npm run dev` in the integrated terminal. You can also double-click **`fincast.code-workspace`** at the repo root if your OS opens it in VS Code.

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
