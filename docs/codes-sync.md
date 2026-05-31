# Community codes sync

Codes on `/codes` are **not** play-tested daily. A script aggregates public lists and updates the site automatically.

## How it works

1. `scripts/sync-codes.mjs` fetches URLs in `scripts/codes-sync-sources.mjs`
2. Parses code + reward pairs from each page’s HTML
3. Keeps codes seen on **2+ sources** as `community` (shown as **Community sync**)
4. Single-source entries stay `needs-testing` (**Single source**)
5. **Never** assigns `verified` (in-game tested)
6. Writes `lib/codes-data.ts` and `lib/codes-sync-state.json`

## Schedule

- **GitHub Actions:** `.github/workflows/weekly-codes-sync.yml` — every Monday 09:00 UTC
- **Manual:** `pnpm sync:codes`

Deploy runs automatically when the workflow pushes to `main`.

## Reward conflicts

Edit `scripts/codes-sync-overrides.json` to pin wording when sources disagree, e.g. `100KVISITS` (time skip vs cash).

## Adding a source

Add an entry to `CODE_SYNC_SOURCES` in `scripts/codes-sync-sources.mjs`. If the site uses a new HTML shape, extend `scripts/lib/codes-parse.mjs`.

## Trust model

We show **source count** and **last sync time** on the codes page. That is honest maintenance — not fake “verified daily” copy.
