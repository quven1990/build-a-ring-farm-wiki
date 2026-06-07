# Build A Ring Farm Wiki

**Live site:** [https://buildaring.online](https://buildaring.online)

Source code for the unofficial fan wiki deployed at **buildaring.online** — not affiliated with Roblox Corporation or the game developer.

| Page | URL |
|------|-----|
| Wiki hub | [buildaring.online](https://buildaring.online) |
| Active codes | [buildaring.online/codes](https://buildaring.online/codes) |
| Updates | [buildaring.online/updates](https://buildaring.online/updates) |
| Calculator | [buildaring.online/calculator](https://buildaring.online/calculator) |

## GitHub repository setup (one-time)

So visitors and search engines see the production domain from the repo page:

1. Open **Settings** → General, or click the **⚙️ About** pencil on the repo home page.
2. **Description:** `Unofficial Build A Ring Farm wiki — codes, seeds, mutations, calculator`
3. **Website:** `https://buildaring.online` ← main external link on GitHub
4. **Topics (optional):** `roblox`, `wiki`, `nextjs`, `build-a-ring-farm`
5. Save.

`package.json` already declares `"homepage": "https://buildaring.online"` for npm/GitHub metadata. README links are `nofollow` on GitHub — the **Website** field is still the canonical place to point at your domain.

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

## YouTube promotion & analytics

- **Comment link (recommended):** `https://buildaring.online/yt` → codes page with `utm_source=youtube` for Plausible campaigns.
- **Calculator link:** `https://buildaring.online/yt/calculator`
- **Plausible goals & dashboard privacy:** see [docs/analytics-plausible.md](docs/analytics-plausible.md).

## Deploy to Cloudflare Workers

This project uses [@opennextjs/cloudflare](https://opennext.js.org/cloudflare/get-started). **You do not need Cloudflare Dashboard “Queued” builds** — deploy from your machine or GitHub Actions.

### Local deploy (recommended when Dashboard build is stuck)

```bash
pnpm install
pnpm run deploy
```

Prerequisites:

1. Log in once: `pnpm exec wrangler login` (or set `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`).
2. Optional: `NEXT_PUBLIC_SITE_URL=https://buildaring.online` in `.env.local` or shell.

What `pnpm run deploy` does:

1. `opennextjs-cloudflare build` — runs `next build`, writes `.open-next/`
2. `opennextjs-cloudflare deploy` — uploads assets + deploys Worker via wrangler

Do **not** run `npx wrangler deploy` alone without the OpenNext build output.

### GitHub Actions (bypass Dashboard builds)

Workflow: [`.github/workflows/deploy-cloudflare.yml`](.github/workflows/deploy-cloudflare.yml) — runs on push to `main`.

**If CI fails with `CLOUDFLARE_API_TOKEN environment variable`**, the workflow is fine — you need to add GitHub repository secrets (not Cloudflare env vars).

#### Step 1: Create API token

1. Open [Create API Token](https://dash.cloudflare.com/profile/api-tokens).
2. Use template **Edit Cloudflare Workers**, or custom token with:
   - **Account** → Workers Scripts: **Edit**
   - **Account** → Workers Observability: **Edit** (optional)
   - **Zone** → Workers Routes: **Edit** (zone: `buildaring.online`)
3. Copy the token (shown once).

#### Step 2: Add GitHub secret

Repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:

| Secret name | Value |
|-------------|--------|
| `CLOUDFLARE_API_TOKEN` | The **secret string** shown once after creating the token (not the permission summary text) |

`account_id` is already set in `wrangler.jsonc` — you do **not** need `CLOUDFLARE_ACCOUNT_ID` in GitHub unless you override it locally.

#### If deploy fails with `Authentication error [code: 10000]`

1. **Re-create** the API token (template **Edit Cloudflare Workers**).
2. Copy only the long token value from the success page — **not** the “API token summary” permissions list.
3. Update GitHub secret `CLOUDFLARE_API_TOKEN` (no spaces or line breaks at the end).
4. Re-run the workflow; the **Verify Cloudflare API token** step will fail early with a clearer message if the token is still wrong.

#### Step 3: Re-run deploy

**Actions** → **Deploy to Cloudflare Workers** → **Re-run all jobs**, or push an empty commit to `main`.

Then in Cloudflare: **Workers → build-a-ring-farm-wiki → Settings → Builds** — disconnect Git / disable automatic builds so only Actions (or local CLI) deploys.

### Dashboard build stuck on “Queued”

This app deploys as a **Worker** (OpenNext), not Cloudflare Pages. If builds never leave **Queued**, something else is enqueueing builds for the same GitHub repo.

**Common fix (same repo, multiple Cloudflare projects):**

1. Open [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages**.
2. List every project connected to `quven1990/build-a-ring-farm-wiki` (Worker **and** any old **Pages** projects).
3. For each **Pages** project you no longer use:
   - **Settings → Builds** → turn off **Preview deployments** (and production builds if you deploy via CLI/Actions only).
   - Or **Disconnect** the Git repository from that project.
4. For **Workers → build-a-ring-farm-wiki**:
   - If you use **GitHub Actions** or `pnpm run deploy`, disable **automatic builds** on the Worker too (Settings → Builds → disconnect Git), so pushes do not queue a second deploy.

**Recommended deploy path (no Dashboard queue):**

| Method | Command / trigger |
|--------|-------------------|
| Local | `pnpm run deploy` |
| CI | GitHub Actions workflow `Deploy to Cloudflare Workers` |

You do not need a successful Dashboard “Queued” build for the site to update if CLI or Actions deploy succeeds.

### wrangler.jsonc checklist

| Field | Value |
|-------|--------|
| `main` | `.open-next/worker.js` (generated by OpenNext build) |
| `assets.directory` | `.open-next/assets` |
| `assets.binding` | `ASSETS` |
| `services` | `WORKER_SELF_REFERENCE` → same worker name |
| `name` | `build-a-ring-farm-wiki` (must match service binding) |
