# TapDo — Cross-Platform Todo App

<div align="center">
  <p><strong>A fast, offline-first task manager built with React, TypeScript, and Vite. Runs on the web (PWA), Android (via Capacitor), and desktop (via Electron).</strong></p>

  <p>
    <a href="https://tapiwamakandigona.github.io/todo-app/"><img src="https://img.shields.io/badge/Web_App-Live_Demo-0A66C2?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Demo" /></a>
    <a href="https://github.com/tapiwamakandigona/todo-app/releases"><img src="https://img.shields.io/badge/Android_APK-Download-3DDC84?style=for-the-badge&logo=android&logoColor=white" alt="APK" /></a>
    <img src="https://img.shields.io/github/languages/top/tapiwamakandigona/todo-app?style=for-the-badge&color=blue" alt="Top Language" />
  </p>
</div>

---

## Overview

TapDo is a single-page todo application with category organisation, priority levels, search, and sorting. All data is stored in `localStorage` — no backend, no account required. The same React codebase is deployed as:

- **Progressive Web App** — hosted on GitHub Pages with a service worker for offline use.
- **Android APK** — built in CI via Capacitor 5 and signed with `apksigner`.
- **Desktop** — packaged with Electron for Windows, macOS, and Linux.

## Features

| Feature | Details |
|---|---|
| **Task management** | Create, complete, and delete tasks |
| **Categories** | Personal, Work, Shopping, Health, Other |
| **Priorities** | Low / Medium / High with colour-coded indicators |
| **Search & sort** | Filter by status or category; sort by date, priority, or name |
| **Offline-first** | `localStorage` persistence — works without internet |
| **PWA** | Installable on supported browsers via `manifest.json` + service worker |
| **Cross-platform CI** | GitHub Actions deploys to Pages, builds signed APK, and packages desktop apps |

> **Note:** The codebase includes additional custom hooks (`useExportImport`, `useTheme`, `useSubtasks`, `useKeyboardShortcuts`, `useUndo`, `useTags`, `useBatchOperations`, `useDueDates`, `useRecurring`, `useNotifications`) that are not yet wired into the UI. They are ready for future integration.

## Tech Stack

- **UI:** React 18, TypeScript
- **Build:** Vite 5
- **Mobile:** Capacitor 5 (configured in CI)
- **Desktop:** Electron + electron-builder
- **CI/CD:** GitHub Actions
- **Hosting:** GitHub Pages (web), GitHub Releases (APK & desktop)

## Quick Start

```bash
git clone https://github.com/tapiwamakandigona/todo-app.git
cd todo-app
npm install
npm run dev
```

Open `http://localhost:5173/todo-app/` in your browser.

### Production Build

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build locally
```

### Build Android APK Locally

Requires Capacitor CLI, Android SDK, and JDK 17:

```bash
npm run build
npm install @capacitor/core@5 @capacitor/cli@5 @capacitor/android@5
npx cap add android
npx cap sync
cd android && ./gradlew assembleDebug
```

### Desktop (Electron)

```bash
npm run build
npm install --save-dev electron electron-builder
npx electron-builder --config electron-builder.json
```

## Project Structure

```
todo-app/
├── src/
│   ├── App.tsx                  # Main application component (all UI logic)
│   ├── main.tsx                 # React entry point
│   ├── index.css                # Global styles (indigo/violet design system)
│   ├── useBatchOperations.ts    # Batch select/update/delete (not yet wired)
│   ├── useDueDates.ts           # Due-date computation helpers (not yet wired)
│   ├── useExportImport.ts       # JSON & CSV export/import (not yet wired)
│   ├── useKeyboardShortcuts.ts  # Global keyboard shortcuts (not yet wired)
│   ├── useNotifications.ts      # Browser notification helpers (not yet wired)
│   ├── useRecurring.ts          # Recurring task creation (not yet wired)
│   ├── useSubtasks.ts           # Subtask management (not yet wired)
│   ├── useTags.ts               # Tag management (not yet wired)
│   ├── useTheme.ts              # Dark/light theme toggle (not yet wired)
│   └── useUndo.ts               # Undo/redo state history (not yet wired)
├── public/
│   ├── manifest.json            # PWA manifest
│   ├── sw.js                    # Service worker (cache-first)
│   ├── favicon.png
│   ├── icon-192.png
│   └── icon-512.png
├── assets/                      # App icon sources, splash screens
├── .github/                     # CI workflows, issue/PR templates, dependabot
├── electron-main.js             # Electron main process
├── electron-builder.json        # Electron packaging config
├── vite.config.ts               # Vite config (base: /todo-app/)
├── tsconfig.json                # TypeScript config (strict mode)
├── index.html                   # HTML shell
├── CHANGELOG.md
├── CONTRIBUTING.md
├── SECURITY.md
└── LICENSE                      # MIT
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE) © Tapiwa Makandigona
