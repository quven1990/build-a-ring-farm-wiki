# Plausible analytics setup

Register these **custom event** goals in [Plausible](https://plausible.shipsolo.io/buildaring.online) → **Site settings → Goals**:

| Goal name | Fired when |
|-----------|------------|
| `Code Copy` | User copies a redeem code (`source`: `hero` / `home-preview` / `codes`) |
| `Calculator Run` | Profit calculator inputs change (debounced) |
| `Play on Roblox` | User clicks Play (`location`: `hero` / `header` / `header-compact` / `mobile-menu`) |
| `Page Share` | Share button used |
| `Cookie Banner View` / `Cookie Consent Accept` / `Cookie Consent Reject` | Cookie banner |

## Weekly report (Plausible + GA4 + GSC)

```bash
pnpm analytics        # writes memory/analytics/weekly-YYYY-MM-DD.md
pnpm analytics:json   # raw JSON to stdout
```

Requires `.env.local` keys — see `.env.example`.

## Custom event goal: Code Copy

The site fires `Code Copy` when a user copies a redeem code (`lib/plausible-events.ts`).

1. Open [Plausible](https://plausible.shipsolo.io/buildaring.online) (log in if required).
2. **Site settings** → **Goals** → **Add goal** → **Custom event**.
3. Event name: `Code Copy` (must match exactly).
4. After real traffic, confirm under **Goal conversions** on the dashboard.

## Lock the public dashboard

The Shipsolo-hosted dashboard may be visible without login. To restrict access:

1. Plausible → **Site settings** → **Visibility** (or **General**).
2. Disable **Shared link** / public stats, or set a **password** for shared access.
3. Invite only your own account for day-to-day use.

## Outreach short links (Plausible UTM)

Use short redirects — UTM params are appended automatically. In Plausible, filter by **Source** (`youtube`, `reddit`, `discord`, `forum`) or **Campaign**.

| Short URL | Lands on | Use when |
|-----------|----------|----------|
| `https://buildaring.online/yt` | `/codes` | YouTube comments |
| `https://buildaring.online/yt/calculator` | `/calculator` | YouTube (layout/profit videos) |
| `https://buildaring.online/reddit` | `/codes` | Reddit posts & comments |
| `https://buildaring.online/reddit/calculator` | `/calculator` | Reddit (money guide threads) |
| `https://buildaring.online/discord` | `/codes` | Discord `#codes` / announcements |
| `https://buildaring.online/discord/calculator` | `/calculator` | Discord tips channels |
| `https://buildaring.online/forum` | `/codes` | Sportskeeda, Destructoid, etc. |
| `https://buildaring.online/forum/calculator` | `/calculator` | Forum strategy / ring threads |

Example comment (English):

```text
Active codes + profit calculator: https://buildaring.online/yt
```

Example Reddit reply:

```text
Weekly-synced codes with copy buttons: https://buildaring.online/reddit
```
