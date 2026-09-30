# Morrow Café

## What I Built

A full-stack specialty café landing page with two core features:

1. **Dynamic Menu** — CMS-backed menu items (MongoDB) rendered client-side with offline fallback data so the page still works if the backend is unavailable.
2. **Welcome Voucher System** — Customers enter name + phone to claim a ₹150 first-visit discount. Backend generates unique `MORROW-XXXX` codes, prevents duplicate active claims per phone number, and sets a 14-day expiry.

Plus standard landing sections: hero, philosophy, visit/location, footer, and a mobile bottom nav.

## Stack & Why

| Layer | Choice | Why |
|-------|--------|-----|
| Frontend | **React 19 + Vite 8** | Fastest SPA dev experience; HMR is instant; ESM-native avoids build complexity. |
| Styling | **Tailwind CSS 4** | Zero-config (Vite plugin only); design tokens via `@theme` in CSS — no tailwind.config.js bloat; small production bundle. |
| Forms | **React Hook Form** | Uncontrolled inputs by default → fewer re-renders; built-in validation matches backend rules. |
| Backend | **Node + Express 5 (ESM)** | Fastest path from idea to REST API; ESM aligns with Vite/frontend so there's no module-format mental switch. |
| Database | **MongoDB + Mongoose 9** | Flexible schema for menu items (café menus change often); schema validation in Mongoose catches bad data at the model layer. |
| Utils | **ApiError / ApiResponse / asyncHandler** | Tiny 3-file utility layer that normalizes every response and error. No raw `res.json` scattered, no try/catch in every route. |

## Run Locally

```bash
# 1. Install
cd backend  && npm install
cd ../frontend && npm install

# 2. Ensure MongoDB is running locally (or set MONGODB_URI to Atlas)

# 3. Start backend (http://localhost:3000)
cd backend && npm run dev

# 4. Start frontend (http://localhost:5173)
cd ../frontend && npm run dev
```

Env files (already present in repo):
- `backend/.env` → `PORT=3000`, `MONGODB_URI=mongodb://127.0.0.1:27017/morrow-cafe`, `CORS_ORIGIN=*`
- `frontend/.env` → `VITE_API_BASE_URL=http://localhost:3000/api`

Menu auto-seeds with 4 featured items on first backend start if the collection is empty.

## Key Technical Decisions

1. **Fallback data in the client** — Menu render doesn't hard-fail if the API is unreachable. [MenuSection.jsx](file:///c:/Users/rishi/OneDrive/Desktop/assignment/frontend/src/components/MenuSection.jsx#L44-L67) tries API → then `/seed` → then hardcoded `FALLBACK_ITEMS`. UX-first: café visitors see a menu regardless.
2. **Dedup voucher by phone (active only)** — [voucher.controller.js](file:///c:/Users/rishi/OneDrive/Desktop/assignment/backend/src/controllers/voucher.controller.js#L41-L66) checks for unredeemed + non-expired vouchers on the same phone. If found, returns the existing one instead of creating spam. After redemption or expiry, the same phone can claim again (intentional: reward repeat customers).
3. **Response envelope everywhere** — Every endpoint returns `{ statusCode, success, message, data }` via `ApiResponse` class. The frontend client in [api.js](file:///c:/Users/rishi/OneDrive/Desktop/assignment/frontend/src/api.js#L4-L37) reads this consistently.
4. **SPA rewrite config for Vercel** — [frontend/vercel.json](file:///c:/Users/rishi/OneDrive/Desktop/assignment/frontend/vercel.json) rewrites non-asset requests to `index.html`. Without this, any page refresh on Vercel returns 404.
5. **ES Modules across the whole project** — Both frontend and backend use `import/export`. No dual-module mental overhead or CJS↔ESM interop bugs.

## Performance Observations

- **Build output**: 89.59 kB gzipped JS + 6.73 kB gzipped CSS. Small enough that FCP should be ~1s on 4G. All static.
- **Zero runtime dependencies for styling**: Tailwind JIT means no CSS-in-JS runtime cost.
- **Only one API call on page load** (menu fetch) — no cascading waterfalls.
- **React Hook Form's uncontrolled-input mode**: the voucher form doesn't re-render on every keystroke, which matters on low-end mobile.
- **No client-side routing**: it's a single-page landing, not a multi-page app — avoids router bundle and 404 complexity beyond the Vercel rewrite.
- **Potential concern**: Menu images are not yet present (see "cut for time"). Adding product imagery without lazy-loading + `srcset` would regress LCP.

## What I Cut for Time

1. **Product images on menu cards** — Placeholder-only for now. Real photography with lazy-loading + AVIF/WebP formats is the main missing polish.
2. **Admin panel / CMS UI** — Menu CRUD endpoints exist but there's no admin dashboard to use them; currently you'd use curl/Postman or direct DB edits.
3. **Voucher redemption UI** — Backend has `redeemed` and `redeemedAt` fields but no UI flow for a cashier to mark a voucher as used at the counter.
4. **Server-side phone format normalization** — Frontend validates and backend regex-checks, but we don't actively normalize `+91 98XXX` to E.164 before storage (would matter for SMS later).
5. **Rate limiting on `/voucher/claim`** — No brute-force or abuse protection; acceptable for MVP, not for production.
6. **Tests** — Zero unit/e2e tests currently.

## What I Would Improve in Production

1. **Auth + Admin Dashboard**: Protected route (JWT or session) for managing menu items, marking vouchers redeemed, and viewing voucher analytics (redemption rate, time-to-redeem, per-category attach rate).
2. **SMS delivery**: Integrate Twilio/Fast2SMS to actually *send* the voucher code via SMS to the phone number. Right now it only shows on the web page — users have to copy it themselves.
3. **Rate limiting + Abuse protection**: Express rate-limit on `/voucher/claim` (per-IP and per-phone). Honeypot field on the form to block bots.
4. **Phone E.164 normalization + lookup**: `libphonenumber-js` to canonicalize numbers before DB write; optionally a lookup service to verify the number is real.
5. **Image pipeline**: Menu item images uploaded to S3/R2, served through an image CDN (Cloudinary/imgix) with auto-format + `srcset`. Add lazy loading and LQIP placeholders.
6. **Observability**: Winston/Pino structured logging, request IDs, Sentry error capture, and basic metrics (claims-per-day, redemption rate, menu API p50/p95 latency).
7. **Caching**: `GET /api/menu` → Redis cache with 10-minute TTL. Invalidated on create/update/delete menu item. Small JSON response → large win.
8. **A/B testing**: Voucher amount (₹100 vs ₹150 vs 20%), voucher position (above-fold vs below-menu), and copy variants — measure actual redemption, not just clicks.
9. **SEO / Open Graph**: Explicit `<title>`, meta description, OG tags, and Structured Data (Schema.org `CafeOrCoffeeShop` + `Menu` JSON-LD) for search + social.
10. **Legal**: Privacy policy link (we are collecting phone numbers), T&C link, cookie consent banner if ever deploying to EU users.

## Product Thinking Answers

### 1. How would you measure whether the voucher system is successful?

**Primary metric: Redemption rate** (vouchers redeemed / vouchers claimed) — this is the real proof the system drives foot traffic. Target ≥ 25% in the first 60 days.

**Supporting metrics**:
- **Claim rate** — % of landing-page visitors who complete the claim form. Benchmark against typical lead-gen forms (2–5%). If below 2%, test: remove a field, make the CTA more prominent, increase discount from ₹150 to ₹200 for a week, or test "free croissant with any drink" vs flat discount.
- **Time to redeem** — median days from claim → redemption. If it spikes over 7 days, the voucher is easy to forget: add SMS reminder at T+3 days or T+1 day before expiry.
- **Attached spend per redemption** — average receipt total when a voucher is used. A voucher that brings people in who only buy exactly ₹150 and walk out is a loss; we want this to be ≥ ₹350 (2.3× the voucher value).
- **% of redeemed customers who return** (30/60 days) — tells us if the voucher acquired loyal customers or deal-seekers.
- **Incrementality test**: Run a geo holdout for 4 weeks (e.g., don't show the voucher banner to 20% of traffic) and compare actual foot traffic / revenue between the two groups to prove the voucher didn't just discount existing customers who were already coming.

### 2. How would you increase voucher redemption rate from the current baseline?

**Top 5 levers, ordered by ROI**:

1. **Send the voucher via SMS + calendar reminder** — Right now the code is only shown on-screen; 70% of people will close the tab and forget it. Use Twilio/Fast2SMS to text `MORROW-150: Hi {name}, your ₹150 voucher is waiting — expires {date}. {map link}` 10 seconds after claim. Attach a Google Calendar `.ics` reminder for T+3 days.
2. **3-day + 1-day expiry reminders (SMS/WhatsApp)** — "Rishabh, your ₹150 Morrow Café voucher expires in 24 hours — don't lose it!" Redemption spikes in the 48 hours before expiry; this is the single biggest lift lever per $ spent.
3. **Reduce friction to find the café** — In the SMS and on the voucher-reveal screen, add a 1-tap Google Maps directions button with the exact pin, plus hours ("Open today 8am – 9pm"). If someone has to search for you, you lose them.
4. **Personalize the incentive with a small "added gift"** — Instead of flat ₹150, say "₹150 OFF + free single-origin chocolate on your first visit" (marginal cost ₹20, perceived value way higher). Or make it a surprise: "We kept your favorite cardamom flat white ready for you."
5. **Deadline pressure + scarcity cue** — Change the banner copy from "₹150 OFF" to "Only 37 welcome vouchers left this week — claim yours before Saturday" (countdown timer). Test urgency variants; typically 10–15% lift on claim rate which flows through to redemption.

**Bonus long-term lever**: On redemption at the counter, the barista asks "Want us to text you when your cardamom cruffin comes out of the oven tomorrow?" — now you have a repeat-marketing opt-in, not just a one-time discount customer.

## Approximate Time Spent

~6–7 hours total:
- 1 hr: Planning + project scaffolding (backend + frontend init)
- 2.5 hrs: Backend (DB models, routes, controllers, voucher logic, seed, utils)
- 2 hrs: Frontend components (hero, menu, voucher banner with form, philosophy, visit, footer, bottom nav; API client)
- 30 min: Styling pass + responsive tweaks
- 30 min: Documentation (this README, AI.md, vercel.json)
