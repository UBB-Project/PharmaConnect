 # Frontend (React + Vite)
 
 Location: `frontend/`
 Stack: React 19, Vite, React Router v6, PrimeReact/PrimeFlex/PrimeIcons, Leaflet (map), react-slick (carousel), axios, react-i18next.
 
 ## App structure
 - Entry: `src/main.jsx` mounts `<App />`.
 - Routing: `src/App.jsx` defines routes for home (`/`), login, chatbot, items list, item detail (`/items/:id`), map (`/map`), cart (`/cart`), and 404.
 - Layout: `components/Header`, `components/Footer`, main content wrapper with routes inside.
 - Theming: PrimeReact Lara teal themes (`public/themes`), `ThemeSwitcher` component toggles.
 - Styling: global styles in `src/index.css` and `src/App.css`; component-scoped CSS files per folder.
 
 ## Key UI modules
 - **Home**: hero copy, mini map widget (`MiniMapWidget`), chatbot CTA, items list CTA, carousel (`SimpleSlider`).
 - **Items**: `components/ItemsList` for catalog grid, `ProductCard` for item cards, navigation to detail page.
- **Item detail**: `pages/ItemPage` with description, availability, reserve button, confirmation dialog (`ReservationConfirmationDialog`), `ReserveButton`.
    - **Logic**: 
        - `useEffect` (load): Fetches product data from `/api/items/{id}/{lang}`, manages loading/error states, and updates stock.
        - `inc/dec`: Modifies selected quantity (minimum 1).
        - `addToCart`: Sends POST to `/api/cart/{userId}` and redirects to cart.
        - `handleNotifySubscribe`: Subscribes user to stock alerts via `/api/stock-alerts/subscribe` after email validation.
    - **ReserveButton Logic**: 
        - `reserve`: Sends POST to `/api/orders` to create a reservation, updates button state, and opens confirmation dialog.
    - **UI Components**:
        - `TabView / TabPanel`: Organizes info (Description, Specs, Info, Prospect).
        - `Tag (RX / OTC)`: Indicates prescription requirement.
        - `Dialog`: Modal for reservation confirmation.
        - `Button / InputText`: Controls for quantity, reservation, and notifications.
- **Cart**: `pages/CartPage` and `CartPreview` for cart management; integrates with `/api/cart` endpoints.
 - **Map**: `pages/MapPage` plus `components/Map/PharmacyMap` and `MiniMapWidget` using Leaflet to show pharmacy markers from `/api/map/pharmacies`.
 - **Chatbot**: `components/ChatBot` routes to `/api/chat`.
 - **Bulk order**: `components/BulkOrderButton` uploads a CSV/XLS to `/api/items/bulk-order` and renders stock check results.
 - **Auth shell**: `pages/LoginPage` (UI-only placeholder; backend auth not enabled).
 - **NotFound**: fallback page for unknown routes.
 
 ## Internationalization
 - `src/i18n.js` configures `react-i18next` with namespaces (`common`, `header`, `footer`, `login`, `home`, `item`), HTTP backend loading `/locales/{{lng}}.json`, and language detector (localStorage/navigator).
 - Locales stored in `public/locales/en.json` and `public/locales/ro.json`.
 
 ## Data fetching & API usage
 - Uses `axios` for REST calls (see components/pages for specific requests).
 - Base API expected at `http://localhost:8080/api`; CORS configured on backend.
 - Map uses Leaflet tile server (OSM) via `react-leaflet`.
 
 ## UI libraries
 - **PrimeReact** components and utilities; `primeflex` grid/util classes; `primeicons` for icons.
 - **react-slick** + `slick-carousel` styles for carousel.
 - **Leaflet/react-leaflet** for interactive maps.
 
 ## Build & scripts
 - `npm run dev` — Vite dev server (default port 5173).
 - `npm run build` — production build.
 - `npm run preview` — preview built assets.
 - `npm run lint` — ESLint (config in `eslint.config.js`).
 
 ## Future improvements
 - Centralize API client with base URL and error handling.
 - Add global state (e.g., React Query/Zustand) for cart/items caching.
 - Add form validation for login/reservations and better empty states.
 - Add loading/error UI for map, chatbot, and bulk order flows.
 
