# Web

## Requirements

- Node v18 or higher
- Make sure node-gyp is installed globally `npm install -g node-gyp` (this is needed to build better-sqlite3 from source)

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                    | Action                                           |
| :------------------------- | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run dev`             | Starts local dev server at `localhost:3000`      |
| `pnpm run build`           | Build your production site to `./dist/`          |
| `pnpm run preview`         | Preview your build locally, before deploying     |
| `pnpm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm run astro -- --help` | Get help using the Astro CLI                     |

## DB

1. Update `db/schema.ts`
2. Run `pnpm run generate`
3. Run migrations
   - Locally: `wrangler d1 execute stormgateworld-web-production --local --file db/migrations/0000_uneven_naoko.sql`
   - Production: `wrangler d1 execute stormgateworld-web-production --file db/migrations/0000_uneven_naoko.sql`

## Pruduction Debugging

```
wrangler d1 execute stormgateworld-web-production --command 'select * from mailing_list_users' --preview
wrangler pages deployment tail --project-name web --environment preview
```
