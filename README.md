# Nexora — Project management SaaS (React)

A front-end build of the NEXORA dashboard from the Figma file
`PROJECT-MANAGEMENT-SaaS-DASHBOARD`. Everything runs on demo data in `src/data/demo.js`; there is no API.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Stack

React 19 + Vite, React Router, Recharts (productivity chart). Icons are the 73-glyph set exported from the Figma "DS / Icons" frame (`src/icons/svg`), rendered by `src/components/Icon.jsx`; task status glyphs come from the Figma "Status icon" component. Styling is plain CSS on
design tokens copied from the Figma variables (`src/styles/tokens.css`), with light and dark modes.

## Screens

| Route | Screen |
| --- | --- |
| `/` | Overview dashboard: KPIs, productivity chart, my tasks, project progress, activity |
| `/projects` | Project cards / list, tabs, filter, sort |
| `/projects/:id` | Project overview; `/board` (drag-and-drop kanban), `/tasks` |
| `/tasks` | Grouped task table, status menu, task drawer with subtasks and comments |
| `/calendar`, `/timeline` | Month calendar with agenda, Gantt timeline |
| `/members`, `/workload` | Member table with role menu, workload bars and heatmap |
| `/inbox` | Notifications list with thread detail and reply |
| `/settings` | Theme (light/dark/system), accent colour, density, behaviour toggles, notifications |

Shortcuts: `⌘K` / `Ctrl+K` command palette, `C` quick create, `[` toggle sidebar.
Teams is a simple card grid; Goals, Reports and Time Tracking are placeholders (no Figma screens for them).
