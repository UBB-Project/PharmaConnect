 # Backend (Spring Boot)
 
 Location: `backend/` — Spring Boot 3.5, Java 21, layered architecture.
 
 ## Core packages
 - `config`: `SecurityConfig` (permits all `/api/**`, disables CSRF, enables CORS) and `CorsConfig` (allows localhost 5173/5174, GET/POST/PUT/DELETE/OPTIONS).
 - `controller`: REST entrypoints for items, cart, orders, pharmacies, locations, map, users, chatbot.
 - `service`: business logic per domain (items, cart, map, orders, pharmacies, users, chatbot); `service.mapper` for DTO/entity conversion.
 - `dto`: request/response payloads (Item/Cart/Order/Pharmacy/User/Location, translations, chatbot prompt/response, map DTOs).
 - `model`: JPA entities and enums (ItemEntity + translations, UserEntity, PharmacyEntity, LocationEntity, OrderEntity, order status/type, Language).
 - `repository`: Spring Data JPA repositories for each entity.
 - `resources`: Flyway migrations, `application.properties`.
 
 ## Design patterns and conventions
 - **Layered architecture**: Controller → Service → Repository.
 - **DTO + Mapper**: keeps transport models separate from persistence; mappers (`CartMapper`, `ItemMapper`, `PharmacyMapper`, `UserMapper`) translate entities to DTOs.
 - **Repository pattern**: Spring Data JPA repositories abstract queries and persistence.
 - **Configuration as code**: `CorsFilter` bean and `SecurityFilterChain` bean keep infra concerns isolated.
 - **Validation**: `@Valid` on request DTOs where applicable (pharmacy, location).
 - **Enums**: `Language`, `OrderStatus`, `OrderType` centralize allowed values.
 - **File upload**: bulk order endpoint accepts `MultipartFile` and processes server-side.
 - **Error handling**: simple runtime exceptions; consider adding `@ControllerAdvice` for consistent error payloads.
 
 ## Key services and responsibilities
 - **ItemService**: CRUD/search/filter/sort items; handles translations (`ItemEntityTranslation`) by language; processes bulk-order uploads into stock checks (`StockCheckResponseDto`).
 - **CartService**: manages per-user cart entries (add/update/remove/list) using `UserService` lookups.
 - **OrderService**: creates orders from `OrderDTO`, retrieves orders, and generates QR codes (ZXing) for pickup/verification.
 - **MapService**: aggregates pharmacy locations into `MapLocationDTO` with coordinates.
 - **PharmacyService**: CRUD and search by name for pharmacies; links to locations.
 - **LocationService**: CRUD for locations bound to pharmacies.
 - **UserService**: simple user creation and lookup.
 - **ChatBotService**: wraps outbound call to LLM/chat provider via `PromptRequest`/`ChatGptResponse` (implementation stub to extend with actual API keys and error handling).
 
 ## Notable controllers (REST endpoints)
 - `ItemController` (`/api/items`): create item, list/search, fetch by id + language, fetch all by language, bulk-order file upload → stock check response.
 - `CartController` (`/api/cart/{userId}`): get cart, add item, update quantity, delete item.
 - `OrderController` (`/api/orders`): get order by id, place order, get QR PNG by order id.
 - `PharmacyController` (`/api/pharmacies`): list, create, get by name/id, update, delete.
 - `LocationController` (`/api/locations`): create location, delete location.
 - `MapController` (`/api/map/pharmacies`): returns map-ready pharmacy locations (lat/long, address).
 - `UserController` (`/users`): create user (returns user UUID).
 - `ChatBotController` (`/api/chat`): POST prompt and return chatbot reply string.
 
 ## Dependencies (pom.xml highlights)
 - Spring Boot starters: web, data-jpa, validation, security.
 - PostgreSQL driver, Flyway (`flyway-core`, `flyway-database-postgresql`), Docker Compose runtime integration.
 - Swagger/OpenAPI UI (`springdoc-openapi-starter-webmvc-ui`).
 - ZXing (`core`, `javase`) for QR generation.
 - Apache Commons Text for fuzzy matching (used in item logic).
 - Lombok (provided).
 - Testing: `spring-boot-starter-test`, `spring-security-test`.
 
 ## Configuration
 - `application.properties`: configure DB URL/credentials (align with `docker-compose.yml`), Flyway enabled by default.
 - Flyway migrations in `resources/db/migration` create tables and seed data (users, items, pharmacies, locations, orders, translations, enums).
 - Security: all `/api/**` permitted; no authentication in current build; CSRF disabled for local dev.
 - CORS: allowed origins `http://localhost:5173` and `5174`; adjust for deployment.
 
 ## Extensibility notes
 - Add global exception handling and error DTOs for consistent responses.
 - Introduce authentication/authorization (JWT/session) and tighten `SecurityConfig`.
 - Add pagination/sorting parameters to item lists and pharmacy lists.
 - Centralize file storage for bulk uploads if persisting uploads is required.
 - Add integration tests around cart/order flows and QR generation.
 
