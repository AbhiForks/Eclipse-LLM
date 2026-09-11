# Eclipse LLM

A multi-model AI chat app with a built-in tech news feed and research library. React + Vite + Tailwind, deployed as a static site on Vercel.

## Features

- **Chat** — streaming-feel Gemini responses (`gemini-2.0-flash`) with offline mock fallback, conversation history with search, rename, and delete
- **Discover** — live Hacker News reader (no API key needed) plus NewsAPI category feeds with infinite scroll
- **AI Compass** — daily AI digest: top story, story grid, and outbound source links
- **Library** — two tabs: your saved chats, and a live arXiv paper browser (category chips, search, Abstract/PDF links)
- **Auth** — Clerk with automatic demo-mode fallback, so it runs with zero keys
- **Design** — AMOLED-native black theme, Inter + Space Grotesk, Lucide icons, responsive from phones to desktops

## Quick start

```bash
git clone https://github.com/AbhiForks/Eclipse-LLM.git
cd Eclipse-LLM
npm install
cp .env.example .env   # optional — app runs in demo mode without keys
npm run dev            # http://127.0.0.1:5173
```

## Environment

| Variable | Required | Purpose |
|---|---|---|
| `VITE_DEMO_MODE=true` | No (default fallback) | Skip Clerk, run fully local |
| `VITE_CLERK_PUBLISHABLE_KEY` | For real auth | Clerk sign-in/up |
| `VITE_GEMINI_API_KEY` | For live chat | Gemini responses (else mock) |
| `VITE_NEWSAPI_KEY` | For live headlines | NewsAPI feeds (else backup + HN) |

Placeholder values (`your_…`, `xxx`) are detected and ignored — no 401 spam in the console.

## Scripts

```bash
npm run dev        # Vite dev server (v8)
npm run build      # tsc + production build → dist/
npm run preview    # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run test:run   # vitest (4 tests, all passing)
```

## Stack

Vite 8 · React 18 · TypeScript 5 · Tailwind 3 · React Router 7 · Clerk 5 · Vitest 5 · Framer Motion 11 · shadcn/ui (15 components actually used) · Lucide icons

`npm audit`: **0 vulnerabilities.** Deps are pruned to what's imported — no chart/carousel/form baggage.

## Structure

```
src/
├── components/      # EclipseLogo, AppShell, Navbar, Footer, AuthLayout, Chat*
│   └── discover/    # HackerNewsReader, NewsGrid, NewsCategories, FeaturedNews, SourceArt
├── pages/           # Home, Index (chat), Discover, AICompass, Library, Login, Loading, NotFound
├── context/         # ChatContext (+ tests)
├── hooks/           # useNewsData (NewsAPI + Hacker News API), useArxiv, use-toast, use-mobile
└── lib/             # utils (cn)
```

## Security notes

- No secrets in the repo — `.env` is gitignored and has never been committed; only placeholder `.env.example` is tracked.
- `VITE_*` keys ship in the client bundle by design; treat them as throwaway browser keys. Anything truly secret belongs behind a backend proxy (there isn't one yet — see roadmap).
- External sites (Hacker News, arXiv, publishers) are rendered as native in-app readers with outbound links, because all of them send `X-Frame-Options`/`frame-ancestors` headers that block iframing.

## Roadmap

- [ ] Backend proxy for Gemini/NewsAPI/arXiv (hide keys, add caching + rate limits)
- [ ] Persist conversations server-side (currently in-memory)
- [ ] More models via OpenRouter (GPT, Claude, Llama)

## License

MIT — see [LICENSE](LICENSE).
