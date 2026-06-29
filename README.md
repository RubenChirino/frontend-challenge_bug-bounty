# Bug Bounty Challenge — Solution

## Run

```bash
pnpm install
pnpm start      # http://localhost:3000
pnpm test
```

> `NODE_OPTIONS=--openssl-legacy-provider` is baked into the `start`/`build` scripts because `react-scripts@4` (webpack 4) is incompatible with the OpenSSL 3 shipped in Node 17+.

## Bugs

| # | Bug | Cause | Fix |
|---|-----|-------|-----|
| 1 | Console warning: missing `key` prop | `<ListItem>` rendered inside `.map()` without a `key` | Stable `key={id}` derived from the data — [Home](src/pages/Home/index.tsx) |
| 2 | Word "known" not bold | The translation contains `<b>` markup but `t()` returns an escaped string | Render with `<Trans>` (`components={{ b: <strong /> }}`), without touching the i18n text — [Home](src/pages/Home/index.tsx) |
| 3a | User avatar missing | Typo `this.urser = result` → `user` stayed `null` | `this.user = result` — [store.ts](src/api/services/User/store.ts) |
| 3b | Second bug (revealed by 3a) | `AvatarMenu` is a function component wrapped in `<Grow>`, which needs a ref-able child | `React.forwardRef` forwarding the ref to the root `<div>` — [AvatarMenu](src/components/AvatarMenu/index.tsx) |
| 4 | Countdown glitches intermittently | `setInterval` never cleared in `useEffect` → timers stack on remount/HMR | Return `clearInterval` cleanup (+ `Math.max(…, 0)` to avoid negatives) — [AppHeader](src/components/AppHeader/index.tsx) |
