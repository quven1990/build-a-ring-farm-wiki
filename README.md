# build-a-ring-farm-wiki

Production site: [https://buildaring.online](https://buildaring.online)

Unofficial fan wiki for **Build A Ring Farm** on Roblox — seeds, mutations, weather events, rings, redeem codes, profit calculator, and progression guides.

## Stack

- Next.js 16
- React 19
- Tailwind CSS 4

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
pnpm build
pnpm start
```

## Environment

```bash
cp .env.example .env.local
# Production: https://buildaring.online (also set in Cloudflare Workers env if needed)
NEXT_PUBLIC_SITE_URL=https://buildaring.online
```

## Deploy to Cloudflare Workers

This project uses [OpenNext for Cloudflare](https://opennext.js.org/cloudflare/get-started).

In the Cloudflare dashboard (**Workers & Pages → your worker → Settings → Builds**), set:

| Setting | Value |
|--------|--------|
| **Build command** | `pnpm run build` (optional; deploy also builds) |
| **Deploy command** | `pnpm run deploy` |

Do **not** use `npx wrangler deploy` alone. Wrangler delegates to `opennextjs-cloudflare deploy`, which expects `.open-next` from an OpenNext build in the **same** step. Using `pnpm run deploy` runs OpenNext build, then `wrangler deploy` with `OPEN_NEXT_DEPLOY=true`.
