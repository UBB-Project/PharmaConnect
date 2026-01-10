 # Developer Setup
 
 ## Prerequisites
 - Node.js (latest LTS) + npm
 - Java 21 (JDK) + Maven wrapper (`mvnw`)
 - Docker + Docker Compose (for PostgreSQL)
 - Python 3.11+ (for scraper, optional)
 
 ## Repository layout
 - `backend/` — Spring Boot API
 - `frontend/` — React/Vite UI
 - `scraper/` — Python scrapers producing `pharmacy_data.json`
 - `docker-compose.yml` — local PostgreSQL
 - `docs/` — documentation set
 
 ## Environment
 - Database: `pharmaconnect` on port `5432`, user `user`, password `password` (from `docker-compose.yml`).
 - Backend default port: `8080`.
 - Frontend dev server: `5173`.
 
 ## Run database
 ```bash
 docker compose up -d
 ```
 Verifies a PostgreSQL instance with persistent volume `mydbdata`.
 
 ## Run backend
 ```bash
 cd backend
 ./mvnw spring-boot:run
 ```
 Notes:
 - Flyway runs automatically and seeds data.
 - OpenAPI UI at `/swagger-ui.html` once running.
 - Update `application.properties` to match DB creds/host if needed.
 
 ## Run frontend
 ```bash
 cd frontend
 npm install
 npm run dev
 ```
 Access at `http://localhost:5173`. Ensure backend is reachable at `http://localhost:8080`.
 
 ## Linting & build
 - Frontend: `npm run lint`, `npm run build`.
 - Backend: `./mvnw test` (tests are minimal) and `./mvnw clean package` for artifacts.
 
 ## Scraper (optional data feed)
 ```bash
 cd scraper
 pip install -r requirements.txt  # if present; otherwise install deps from imports
 python main.py
 ```
 Output: `pharmacy_data.json` containing scraped products from Dr-Max, Tei, Ducfarm for target items in `providers/product_config.py`.
 
 ## Environment variables
 - Add API keys/secrets for chatbot provider in backend `application.properties` or environment when implemented.
 - Configure CORS origins in `CorsConfig` for deployed hosts.
 
 ## Useful tips
 - If port conflicts occur, change frontend dev server port or CORS origins accordingly.
 - For database resets, `docker compose down -v` will remove the volume; Flyway will recreate schema on next start.
 - Consider using Postman/Insomnia to exercise `/api/items`, `/api/cart`, `/api/orders`, `/api/pharmacies`, `/api/chat`.
 
