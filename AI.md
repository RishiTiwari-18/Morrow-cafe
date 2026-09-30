# AI Engineering Guide — Morrow Café

This document helps AI assistants work efficiently with the Morrow Café codebase.

## Architecture Principles

1. **Separation of Concerns**
   - `routes/` only define routing + param mappings → call controllers
   - `controllers/` hold business logic, validation, DB ops
   - `models/` are pure Mongoose schemas
   - `utils/` are shared helpers (no route logic)

2. **Consistent Response Envelope**
   - Always use `ApiResponse` for success, `ApiError` + `asyncHandler` for errors
   - Never send raw `res.json()` — route through the classes

3. **Error Handling**
   - Throw `ApiError(statusCode, message, errors?)` inside controller logic
   - `asyncHandler` catches Promise rejections and forwards to global error MW
   - Global error handler in `app.js` formats everything consistently

4. **Validation Layers**
   - Client-side: React Hook Form rules (see `VoucherBanner.jsx`)
   - Server-side: explicit controller checks + Mongoose schema validation
   - Both validate the same invariants (name ≥ 2 chars, phone 7–15 digits)

## File Map

| File | Purpose |
|------|---------|
| `backend/server.js` | Entry: connects DB, auto-seeds empty menu, starts Express |
| `backend/src/app.js` | Express setup: CORS, body parsers, route mounts, error/404 MW |
| `backend/src/db/index.js` | Mongoose connect with explicit timeouts |
| `backend/src/routes/*.route.js` | Router.method() → controller bindings |
| `backend/src/controllers/menu.controller.js` | Menu CRUD + seed; query filters: activeOnly, featured, category |
| `backend/src/controllers/voucher.controller.js` | Voucher claim (dedup by phone, 14-day expiry, MORROW-XXXX code |
| `backend/src/models/menuItem.model.js` | Schema: name/price/priceValue/typeLabel/description/tags[1+]/category/active/featured |
| `backend/src/models/voucherClaim.model.js` | Schema: name/phone/claimCode/discountAmount/redeemed/expiresAt |
| `backend/src/utils/ApiError.js` | Extends Error, adds statusCode/success/errors |
| `backend/src/utils/ApiResponse.js` | Envelope: statusCode/data/message/success (auto <400) |
| `backend/src/utils/asyncHandler.js` | Wraps async route handlers to catch throws |
| `frontend/src/App.jsx` | Composes all page sections |
| `frontend/src/api.js` | Fetch wrapper + typed API functions (healthCheck, claimVoucher, getMenu, etc.) |
| `frontend/src/components/VoucherBanner.jsx` | Voucher claim form (react-hook-form) + revealed state |
| `frontend/src/components/MenuSection.jsx` | Fetches menu, auto-seeds if empty, falls back to FALLBACK_ITEMS |
| `frontend/vercel.json` | SPA rewrites so deep links don't 404 on Vercel |

## Common Workflows

### Add a new API endpoint

1. Add controller function in `controllers/<domain>.controller.js` — use `asyncHandler`, throw `ApiError`, return `ApiResponse`
2. Export from controller file
3. Import + mount in `routes/<domain>.route.js`
4. If new domain: import router in `app.js` and `app.use('/api/<domain>', domainRouter)`
5. Add endpoint docs to the root `/` route JSON in `app.js`
6. Add corresponding function in `frontend/src/api.js`

### Add a menu item (via code)

Add to `DEFAULT_SEED` in **both**:
- `backend/server.js` (auto-seed on empty DB)
- `backend/src/controllers/menu.controller.js` (manual `/seed` endpoint)
- `frontend/src/components/MenuSection.jsx` (`FALLBACK_ITEMS` for offline mode)

### Modify voucher logic

Key knobs at top of `voucher.controller.js`:
```js
const DAYS_VALID = 14
const DISCOUNT_AMOUNT = 150
```
Claim code pattern: `MORROW-${4-hex}` in `generateClaimCode()`

### Change CORS origins

Set `CORS_ORIGIN` env var — accepts `*` or a specific URL. The ternary in `app.js#L16` converts `*` → `true` (Express5 cors config).

## Gotchas

- **`ApiResponse` imports mongoose**: A class-level import side-effect. Don't panic — harmless but unusual. Removing it requires auditing all files that may rely on the transitive import.
- **`package.json` main**: backend's `main: app.js` but entry is `server.js`. Use `npm start/dev` which both correctly point to `app.js`. If deploying, ensure start script runs `node server.js` — check the actual script block.
- **Menu fallback**: Frontend silently falls back to hardcoded items when API is unreachable. Debug by checking the "Note:" banner below the menu grid.
- **Voucher dedup**: Phone + `redeemed:false` + `expiresAt > now`. If a user claims, redeems, then comes back — they can claim a new one. This is intentional (repeat customers can re-claim after redemption / expiry).
- **ES Modules everywhere**. `__dirname is not available; use import.meta if needed.
- **Express 5** — no more manual try/catch in async routes needed (still using own asyncHandler anyway for consistency).
- **Tailwind 4** — zero-config plugin via `@tailwindcss/vite`. Theme tokens live in `index.css` (`@theme` block); do NOT create a `tailwind.config.js`.

## Running checks

```bash
# Backend
cd backend && npm run dev    # nodemon

# Frontend
cd frontend && npm run dev   # vite HMR
cd frontend && npm run build # production build
cd frontend && npm run lint  # oxlint (fast, no config)
```

## Environment Variables Reference

### Backend
| Key | Default | Purpose |
|-----|---------|---------|
| `PORT` | 3000 | HTTP port |
| `NODE_ENV` | development | Node env flag |
| `MONGODB_URI` | mongodb://127.0.0.1:27017 | MongoDB connection (with or without DB suffix) |
| `DB_NAME` | morrow-cafe | DB name override (appended if URI has no DB) |
| `FRONTEND_URL` | — | Informational; not enforced |
| `CORS_ORIGIN` | * | Allowed origin or `*` for any |

### Frontend
| Key | Default | Purpose |
|-----|---------|---------|
| `VITE_API_BASE_URL` | http://localhost:3000/api | Backend API prefix |
