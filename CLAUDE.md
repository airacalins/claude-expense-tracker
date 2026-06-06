# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install      # install dependencies (required before first run)
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build
npm run lint     # run ESLint
npm run preview  # preview production build locally
```

There are no tests in this project.

## Architecture

This is a React 19 + Vite single-page app. All application logic lives in a single component: `src/App.jsx`.

**State** — `App` holds all state: a `transactions` array (seeded with hardcoded data) and form/filter fields. There is no external state library, routing, or backend — data is ephemeral (lost on page refresh).

**Known bugs in the starter** — `amount` is stored as a string in both the seed data and `handleSubmit`, so `reduce` accumulates strings instead of numbers, producing wrong totals. Transaction id 4 ("Freelance Work") is marked `type: "expense"` but `category: "salary"`, which is inconsistent with real data.

**Missing features** — there is no delete or edit capability for existing transactions.

**Styling** — global styles in `src/index.css`; component-scoped overrides in `src/App.css`. CSS class names like `.income-amount` and `.expense-amount` are reused both for summary cards and table cells.
