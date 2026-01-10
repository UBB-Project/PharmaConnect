 # Testing & Operations
 
 ## Testing status
 - Automated tests: minimal (only `PharmacyManagerApplicationTests` scaffold). No dedicated unit/integration coverage yet.
 - Linting: frontend ESLint via `npm run lint`; backend uses Maven defaults (no Checkstyle/SpotBugs configured).
 
 ## Recommended manual test flows
 - **Items catalog**: list/search/filter items, view item detail in different languages, verify images/descriptions.
 - **Cart**: add, update quantity, remove items for a user UUID; verify backend reflects changes.
 - **Orders**: place order, retrieve order by id, fetch QR PNG, and validate scan readability.
 - **Pharmacies/map**: list pharmacies, fetch map markers, validate coordinates render in Leaflet map.
 - **Locations CRUD**: create/delete location and confirm map output updates.
 - **Bulk order**: upload CSV/XLS via bulk-order button, verify stock check response shows available/insufficient items.
 - **Chatbot**: submit prompt and verify response flow (stub/LLM integration).
 
 ## Logging/observability
 - Spring Boot default logging to console; no centralized tracing/metrics yet.
 - Suggested additions: request logging filter, structured logging (JSON), and actuator metrics/health endpoints for production.
 
 ## Deployment/operations notes
 - Database: PostgreSQL 17 (see `docker-compose.yml`). Ensure production DB credentials and storage are secured.
 - Security: APIs are currently open (no auth) and CSRF disabled; must be tightened for production (JWT/session, roles, rate limiting).
 - CORS: update `CorsConfig` with production origins.
 - OpenAPI: springdoc UI available; expose behind auth in production.
 - Static assets: frontend built via `npm run build` and served by a static host or reverse proxy pointing to backend for `/api`.
 
 ## Migration/DB care
 - Flyway manages schema; new migrations should be additive and ordered (`VXX__description.sql`).
 - Seed data files exist; ensure production data is migrated with care to avoid overwriting.
 
 ## Backup & recovery (suggested)
 - Schedule regular Postgres backups (pg_dump) and store securely.
 - Test restore procedure before production cutover.
 
 ## Performance considerations
 - Add pagination for item listing and pharmacy search.
 - Index high-traffic columns (category, brand, name).
 - Consider caching for map/pharmacy lookups.
 
