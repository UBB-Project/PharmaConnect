 # Architecture
 
 PharmaConnect is a layered web application composed of:
 - React + Vite frontend (PrimeReact + Leaflet + i18next) served separately.
 - Spring Boot backend (REST APIs, JPA, Flyway, PostgreSQL, QR generation).
 - PostgreSQL database (managed locally via Docker Compose).
 - Python scraper that harvests product data from multiple pharmacy sites into a shared JSON.
 
 ## System context
 The frontend consumes backend REST APIs for items, cart, orders, pharmacies, locations, map data, and chatbot replies. The backend persists data in PostgreSQL and exposes a permissive CORS/security configuration for local development. The scraper can feed product data that is later loaded into the DB (manual import step).
 
 ```mermaid
 flowchart LR
   UserBrowser --> Frontend[React/Vite UI]
   Frontend -->|REST over HTTP| Backend[SpringBoot API]
   Backend -->|JPA| Postgres[(PostgreSQL DB)]
   Scraper[Python Scraper] -->|JSON output| Postgres
   Backend -->|OpenAPI UI| SwaggerUI
   Frontend -->|Map tiles| LeafletTiles[Leaflet/OSM]
 ```
 
 ## Layering (backend)
 - **Controller layer**: REST endpoints under `/api/*`, thin request/response mapping.
 - **Service layer**: business logic for items, cart, orders, pharmacies, map, chatbot.
 - **Repository layer**: Spring Data JPA repositories for CRUD and queries.
 - **DTO + Mapper**: DTOs decouple transport from entities; mapper classes handle conversion.
 - **Configuration**: security (CSRF disabled, all `/api/**` permitted), CORS for local origins, Flyway migrations.
 
 ## Major flows
 - **Catalog**: `ItemController` exposes item listing, search/filter/sort, multilingual fetch, and bulk-order upload. `ItemService` orchestrates repository and translation access.
 - **Cart**: `CartController` manages cart items per user; `CartService` updates quantities and removal.
 - **Orders**: `OrderController` places orders and exposes QR code generation for pickup/verification.
 - **Pharmacies & map**: `PharmacyController`, `LocationController`, and `MapController` expose pharmacy listings, location CRUD, and map-ready DTOs (lat/long).
 - **Chatbot**: `ChatBotController` forwards prompts to `ChatBotService` (LLM integration placeholder).
 
 ## Frontend composition
 - **Routing**: `src/App.jsx` defines routes for home, items, item detail, map, chatbot, cart, login, and 404.
 - **UI components**: modular folders for Header/Footer, carousel, map widgets (Leaflet), items list + product cards, popup, theme switcher, bulk order button.
 - **i18n**: `src/i18n.js` with `react-i18next`, HTTP backend for `/locales/{{lng}}.json`, language detector (navigator/localStorage).
 - **Styling**: PrimeReact themes (Lara teal), PrimeFlex, custom CSS modules.
 
 ## Data model highlights
 - Core entities: `users`, `items` (+ translations per language), `pharmacies`, `locations`, `orders`, cart items (via service composition), plus enums for order status/type and languages.
 - Migrations live in `backend/src/main/resources/db/migration`; Flyway runs at startup.
 
 ## Non-functional notes
 - **APIs open by default** (no authentication) for development; CSRF disabled.
 - **CORS** allows `http://localhost:5173/5174`.
 - **Build/runtime**: Java 21, Spring Boot 3.5, Vite dev server for frontend, Docker Compose for PostgreSQL.
 - **Observability**: default Spring logging; add structured logging/metrics for production.
 
