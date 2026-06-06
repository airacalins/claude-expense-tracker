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

This is a React 19 + Vite single-page app. All components are arrow functions.

**Component tree:**
- `App` — holds the `transactions` array (seeded with hardcoded data) and a single `handleAdd` handler. No other state lives here.
  - `Summary` (`src/Summary.jsx`) — derives and displays total income, expenses, and balance from `transactions`.
  - `TransactionForm` (`src/TransactionForm.jsx`) — owns its own form state; calls `onAdd(transaction)` on submit.
  - `TransactionList` (`src/TransactionList.jsx`) — owns its own filter state (`filterType`, `filterCategory`); renders the filtered table.

**State ownership** — `transactions` is the only shared state and lives in `App`. Form and filter state is local to each child component. There is no external state library, routing, or backend — data is ephemeral (lost on page refresh).

**Known issue** — Transaction id 4 ("Freelance Work") is marked `type: "expense"` but `category: "salary"`, which is inconsistent.

**Missing features** — there is no delete or edit capability for existing transactions.

**Styling** — global styles in `src/index.css`; component-scoped overrides in `src/App.css`. CSS class names like `.income-amount` and `.expense-amount` are reused both for summary cards and table cells.
