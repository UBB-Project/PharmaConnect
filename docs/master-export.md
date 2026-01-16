 # PharmaConnect — Consolidated Documentation (Export Ready)
 
 Use this single file to copy/paste into PDF/Word. It condenses the content of the docs set; see individual files for details.
 
 ## 1) Overview
 PharmaConnect is a web platform that helps users discover pharmacy items, check availability, manage carts/orders, view nearby pharmacies on a map, and chat for assistance. It consists of a React/Vite frontend, a Spring Boot REST backend, a PostgreSQL database (Flyway-managed), and an optional Python scraper that harvests product data.
 
 ## 2) Architecture
 - Frontend: React 19 + Vite, PrimeReact/PrimeFlex, Leaflet for maps, react-i18next for translations.
 - Backend: Spring Boot 3.5 (Java 21), layered (Controller → Service → Repository), DTO/Mappers, springdoc OpenAPI, ZXing for QR codes.
 - Data: PostgreSQL 17 via Docker Compose; Flyway migrations create/seed schema.
 - Scraper: Python + curl_cffi + Lexbor; produces `pharmacy_data.json` for import.
 - Security/CORS: CSRF disabled; `/api/**` permitted; CORS allows localhost 5173/5174.
 
 ```mermaid
 flowchart LR
   User --> Frontend[React/Vite UI]
   Frontend -->|REST| Backend[SpringBoot API]
   Backend --> Postgres[(PostgreSQL DB)]
   Scraper --> Postgres
 ```
 
 ## 3) Backend highlights
 - Controllers: Items, Cart, Orders (with QR), Pharmacies, Locations, Map, Users, Chatbot.
 - Services: encapsulate business rules (search/filter, translations, cart ops, order creation/QR, map DTOs, chatbot forwarding).
 - DTO/Mappers: `ItemRequestDto`, `CartResponseDTO`, `OrderDTO`, `PharmacyResponseDto`, `MapLocationDTO`, etc.
 - Key dependencies: spring-boot-starter-web/data-jpa/validation/security, springdoc-openapi, Flyway, PostgreSQL driver, ZXing, Lombok, Apache Commons Text.
 - Patterns: layered architecture, Repository, DTO/Mapper, configuration-as-code for CORS/security.
 
 ## 4) API surface (dev base: `/api`)
- Items: create; list/search; get by id + language; get all by language; bulk-order upload → stock check.
- **Image OCR**: `POST /api/image/ocr` (multipart file) extracts text using GPT-4 Vision.
- **Stock Alerts**: `POST /api/stock-alerts/subscribe` registers user email for out-of-stock items.
- Cart: get/add/update/delete items per user.
 - Orders: create order; get order; get QR PNG.
 - Pharmacies: list/create/get by id or name/update/delete.
 - Locations: create/delete locations linked to pharmacies.
 - Map: get pharmacy map markers.
 - Users: create user.
 - Chatbot: send prompt, receive reply.
 
 ## 5) Data model
- Tables: users, items (+ sold_count, stock_quantity), items_translation (per language), pharmacies, locations, orders, **stock_alerts**.
- Relationships: orders ↔ users/items; locations ↔ pharmacies; translations ↔ items; alerts ↔ items.
 - Migrations: Flyway SQL files under `backend/src/main/resources/db/migration`; seeds for users/items/pharmacies/locations/translations/order enums.
 - Docker Compose: PostgreSQL 17 (`user/password/pharmaconnect`, port 5432).
 
 ## 6) Frontend overview
 - Routing: home, login (UI-only), chatbot, items list, item detail, map, cart, 404.
- Components: Header/Footer, carousel, map widgets (Leaflet), items list/product cards, popup, theme switcher, bulk order button, reservation dialog.
- **ItemPage & ReserveButton Detailed Logic**:
    - **Data Loading**: `useEffect` fetches from `/api/items/{id}/{lang}` with loading/error handling.
    - **Quantity Control**: `inc/dec` logic with minimum bound of 1.
    - **Cart Integration**: `addToCart` via POST to `/api/cart/{userId}` with redirect.
    - **Stock Alerts**: `handleNotifySubscribe` via `/api/stock-alerts/subscribe`.
    - **Reservation**: `ReserveButton` triggers POST to `/api/orders` and opens success `Dialog`.
- **Bulk Order & Fuzzy Matching**: `BulkOrderButton` sends `.txt` lists to `/api/items/bulk-order`, which uses **Levenshtein Fuzzy Matching** (dist ≤ 3) to identify items. Valid matches are then automatically added to the user's cart via sequential POST requests.
- **Modular ChatBot**: Modularized component with separate `CBPopup`.
- **UI elements**: Uses PrimeReact `TabView`, `Tag`, `Dialog`, `Button`, and `InputText`.
- i18n: `react-i18next` with HTTP backend loading `public/locales/{en,ro}.json`.
 - Styling: PrimeReact Lara teal themes + custom CSS.
 - API usage: axios calls to backend endpoints; Leaflet tiles for maps.
 
 ## 7) Scraper
 - `main.py` orchestrates provider scrapers (`dr_max`, `tei`, `ducfarm`) over target products from `product_config.py`.
 - Uses `BaseScraper` with `ProductData` dataclass; outputs `pharmacy_data.json`.
 - Run: `python main.py` (after installing `curl-cffi`, `selectolax`, etc.).
 
 ## 8) Developer setup
 - Prereqs: Node.js, Java 21 + Maven wrapper, Docker Compose, Python (for scraper).
 - DB: `docker compose up -d`.
 - Backend: `cd backend && ./mvnw spring-boot:run`.
 - Frontend: `cd frontend && npm install && npm run dev` (port 5173).
 - Lint/build: frontend `npm run lint|build`; backend `./mvnw test|clean package`.
 - Swagger UI: `/swagger-ui.html`.
 
 ## 9) Testing & ops
 - Automated tests minimal; rely on manual flows (items, cart, orders + QR, pharmacies/map, bulk order, chatbot).
 - Security hardening needed for production (authN/Z, CSRF, rate limits); update CORS for prod origins.
 - Observability: add structured logging/metrics; consider Spring Boot Actuator.
 - DB migrations: Flyway additive migrations; seed data present; backup/restore strategy recommended.
 
 ## 10) Future improvements
 - Add authentication/authorization and role-based access.
 - Pagination and caching for item/pharmacy endpoints.
 - Better error handling via `@ControllerAdvice` and consistent error DTOs.
 - Frontend API client abstraction + loading/error states.
 - Automated tests (unit + integration) and CI lint/build gates.
 
