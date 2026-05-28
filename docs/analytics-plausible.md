# Plausible analytics setup

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

## YouTube comment links

Use short redirects (UTM is appended automatically):

| Short URL | Lands on |
|-----------|----------|
| `https://buildaring.online/yt` | `/codes` + YouTube UTM |
| `https://buildaring.online/yt/codes` | same |
| `https://buildaring.online/yt/calculator` | `/calculator` + YouTube UTM |

Example comment (English):

```text
Active codes + profit calculator: https://buildaring.online/yt
```
