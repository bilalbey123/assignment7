# Assignment 7 — Everyday Goods

A multi-page React shop built with Vite, React Router, Context + `useReducer`, and Zustand. The app reads products from DummyJSON; no backend or real payment flow is included.

## Run locally

```bash
npm install
npm run dev
```

Demo login: `220408027@st.biruni.edu.tr` / `demo123456`.

## File organization

- `src/api/`: fetch wrappers for products and the simulated login.
- `src/hooks/`: abortable `useFetch` and persistent `useLocalStorage` hooks.
- `src/context/`: authentication reducer and provider.
- `src/store/`: Zustand cart store and its localStorage subscription.
- `src/components/`: shared layout, navigation, product card, and route guard.
- `src/pages/`: home, catalogue, product detail, cart, login, and 404 views.
- `src/App.jsx`, `src/main.jsx`: nested route table and app entry point.
- `src/styles.css`: responsive layout, light/dark variables, and component styling.

## State reasoning

1. **State choices.** The signed-in user lives in `AuthContext` and is updated by a reducer because authentication status is a small, low-frequency value needed by distant routes. Cart items live in the Zustand store because many components read and update them frequently; filter values live in URL query parameters so links preserve the view; product data is fetched into each page's `useFetch` state; theme lives in localStorage through `useLocalStorage` so it survives reloads.
2. **Context versus store.** Context suits the user because it changes rarely and only a few components need it. Putting the cart in Context would make frequent cart updates flow through the provider and could re-render consumers that do not need the changed part; Zustand selectors let components subscribe to a narrow value or one action. A tiny user value in Zustand would work, but would add a separate store where the built-in Context reducer already fits.
3. **Custom hooks.** `useFetch` shares the loading/error/data reducer pattern, AbortController setup, and cleanup between the catalogue and detail pages. It deliberately does not share fetched results: each component instance runs its own request and owns its own hook state.
4. **Route parameters.** `useParams()` returns `id` as a string. The API accepts the string and URL-encodes it; when making the next-product link, the code converts it to a number before adding one.
5. **Protected routes.** `ProtectedRoute` only checks client-side React state, which a visitor can alter or bypass in browser tools. Real protection needs a server to authenticate credentials, issue and validate a secure session or token, and authorize cart data on every protected request.
6. **Deep links.** A plain static server may return 404 for a reload at `/products/3` because it looks for a physical file at that path. The Vite development server falls back to `index.html` for client routes, after which BrowserRouter reads the URL and renders the product route. A deployed site needs the same SPA fallback configured on its host.

## Self-study notes

- `useSearchParams` accepts an updater. The catalogue copies the current `URLSearchParams`, changes only `q` or `category`, and returns the copy so the other filter stays in the URL.
- The cart parses localStorage inside a guarded initializer and validates that it is an array of plausible items; missing, malformed, or inaccessible data becomes an empty cart. A store subscription writes only when the `items` reference changes, outside React components.
- Theme styling uses a class on the shared wrapper and CSS custom properties for page, surface, text, muted text, borders, and soft backgrounds. This keeps the same components readable in both modes.

## Challenges and notes

The key architectural challenge is keeping each kind of state in the right place while retaining shareable URLs and avoiding duplicated derived state. Product API errors and request cancellation are handled explicitly. The demo authentication is only a simulated client-side flow, and the catalogue depends on the public DummyJSON service being reachable.

## Git workflow

This repository currently has 16 meaningful commits, each recorded on 10 November 2026 while the project was assembled. The commits are real snapshots of the separate implementation areas, but they were created in one work session and do not claim progress over multiple days. To publish, connect this local repository to your GitHub repository and push the `main` branch. Do not commit `node_modules` or `dist`.
