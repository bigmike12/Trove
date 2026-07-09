# Trove — Investment Portfolio Dashboard

A portfolio dashboard built for the Trove Frontend Engineer Assessment: a
simulated login flow and a dashboard showing net worth, sector allocation,
account summaries, holdings and transactions.

---

## Getting started

### Installation

```bash
yarn
```

### Start the development server

```bash
yarn dev
```

---

## Available scripts

| Script                 | Purpose                               |
| ---------------------- | ------------------------------------- |
| `yarn dev`             | Start the Vite development server     |
| `yarn build`           | Type-check and build for production   |
| `yarn preview`         | Preview the production build locally  |
| `yarn lint`            | Run ESLint                            |
| `yarn format`          | Format the project with Prettier      |
| `yarn format:check`    | Check formatting without modifying    |
| `yarn typecheck`       | Run the TypeScript compiler           |
| `yarn test`            | Run the test suite with Vitest        |

---

## Tech stack

- React 19
- Vite
- TypeScript (Strict Mode)
- Tailwind CSS v4
- React Router
- TanStack Query
- React Hook Form
- Zod
- Recharts
- date-fns
- lucide-react

---

## Architecture

The project follows a feature-based structure to keep business logic, UI, and infrastructure concerns separated.

```text
src/
├── app/          # Application shell, providers and router
├── features/     # Feature modules (auth, dashboard, etc.)
├── layouts/      # Shared page layouts
├── services/     # API abstraction layer
├── shared/       # Reusable UI components
├── hooks/        # Shared React hooks
├── utils/        # Business logic and utility functions
├── constants/    # Application constants
└── types/        # Shared TypeScript types
```
---

Decisions based on my preference:

- **Service layer as the API boundary.** Components never touch the JSON.
  `portfolio.service.ts` returns promises through `fake-api.ts` (400–900 ms
  latency, `structuredClone` so callers can't mutate the "database"). Swapping
  to a real backend touches only `src/services`.
- **Server state vs UI state.** TanStack Query caches the portfolio;
  everything else (active tab, filters, search text, balance visibility, menu
  open) is plain `useState` — it's temporary view state, so Redux or global
  stores would be an overfill.
- **Domain math is pure** `toPosition`, `computeTotals`,
  `groupBySector`, filtering and sorting are plain functions in `utils/`. Components mostly
  just render.
- **Login flow never navigates imperatively.** `RequireAuth` remembers where
  you were headed; `GuestRoute` redirects whenever a session exists — so
  submitting the form just sets the session and the router follows. Deep link
  → login → back to the deep link works for free.
- **One derived-data pass.** `DashboardPage` memoizes positions → totals →
  sector groups once and hands plain props to presentational children. List
  items aren't `React.memo`-ed: ten cards re-render in microseconds, and memo
  would be speculative complexity.
- **Design tokens enforced by the build.** Tailwind's default palette is
  disabled (`--color-*: initial`), so only the Trove v3 tokens exist —
  off-palette colors won't compile into the CSS.

---

## Data quirks

The supplied dataset intentionally contains several edge cases. Rather than
handling them throughout the UI, all decisions are centralized in
`src/utils/portfolio.ts` (`toPosition`) so every component renders consistent
data.

### 1. NVDA has `currentPrice: 0`

This is treated as a **missing market price**, not a worthless holding.

Instead of valuing the holding at \$0 (which would incorrectly show a −100%
loss), the application:

- values the position at its cost basis
- displays a **Price unavailable** badge
- hides gain/loss since it cannot be calculated accurately
- excludes the position from overall portfolio gain calculations
- indicates that part of the portfolio is valued at cost

---

### 2. DIS has `shares: 0`

This represents a **closed position**.

Closed positions:

- remain visible for historical context
- appear greyed out with a **Closed** badge
- are excluded from:
  - portfolio value
  - sector allocation
  - gain calculations

---

### 3 & 4. Pending and Failed transactions

Transactions receive status-specific styling:

- ✅ Completed
- 🟡 Pending
- 🔴 Failed

Failed transactions are additionally muted and struck through because no money
actually moved.

---

### 5. Negative returns

Shared formatting helpers ensure all monetary changes are displayed consistently.

Examples:

```text
+$245.00 (+3.2%)
-$161.00 (-6.1%)
```

Positive values use the success palette, negative values use the loss palette,
while zero remains neutral.

---

### 6. Displaying the signed-in user

The sample dataset includes a hardcoded user name. Since the application
supports a simulated login, the dashboard displays the authenticated user's
name instead.

The name is derived from the email entered during login (for example,
`john.doe@example.com` → **John Doe**) and stored as part of the session. This
keeps the dashboard consistent with the active user instead of always showing
the static name from the mock dataset.

---

### Dataset inconsistency

The provided dataset contains a discrepancy:

- `summary.totalPortfolioValue` = **$48,250.75**
- value computed from holdings = **$23,234.25**

Since the assessment specifies that the dashboard should compute totals from
the holdings, the application derives portfolio value directly from the
holdings rather than displaying the inconsistent summary value.

---

## Future improvements

Some improvements that would be worthwhile with additional time include:

- Better unit test coverage for business logic and components
- Integration tests for authentication and routing
- Dark mode support
- Virtualized rendering for large holdings lists
- Skeleton loading states driven by Suspense
- Real API integration by replacing the mock service layer
- Internationalization and currency localization
