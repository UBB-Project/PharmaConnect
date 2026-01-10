 # Data Model & Migrations
 
 Database: PostgreSQL (dev via `docker-compose.yml`).
 Migration tool: Flyway (`backend/src/main/resources/db/migration`).
 
 ## Core tables (created by Flyway)
 - `users` — `id (uuid PK)`, `first_name`, `second_name`, `last_name` (`V1__create_users_table.sql`).
 - `items` — `id (uuid PK)`, `name`, `description`, `category`, `price`, `brand`, `image_url`, `manufacturing_date`, `expiration_date`, `prescription_required`, `side_effects`, later `sold_count`, `stock_quantity` (`V2__create_items_table.sql`, `V10__alter_items_table.sql`).
 - `items_translation` — `id_translation (uuid PK)`, `id (FK items)`, `description`, `category`, `side_effects`, `language` (`V11__create_itemEntityTranslation_table.sql`).
 - `pharmacies` — `id (uuid PK)`, `name` unique (`V5__create_pharmacies.sql`).
 - `locations` — `id (uuid PK)`, `address`, `pharmacy_id (FK pharmacies)`, `open_hours`, `latitude`, `longitude` (`V8__create_locations_table.sql`).
 - `orders` — `id (uuid PK)`, `type`, `placed_at`, `quantity`, `item_id (FK items)`, `user_id (FK users)` (`V7__Create_Orders.sql`).
 
 ## Seed data migrations
 - Users, items, pharmacies, locations, translations, enums/status/type are pre-seeded via `V3__mockdata_users.sql`, `V4__mockdata_items.sql`, `V6__mockdata_pharmacies.sql`, `V9__mockdata_locations.sql`, `V12__mockdata_itemEntityTranslation.sql`, `V13__Status_Type_Order.sql`, `V14__TestUser.sql`.
 
 ## Relationships
 - `orders` reference `users` and `items`.
 - `locations` reference `pharmacies` (cascade delete on pharmacy removal).
 - `items_translation` reference `items` (per-language fields).
 
 ## Indexing and constraints
 - Primary keys are UUID (generated via `uuid-ossp` or `gen_random_uuid()` depending on migration).
 - Foreign keys enforce referential integrity between orders/items/users and locations/pharmacies.
 - Unique pharmacy name to avoid duplicates.
 
 ## Data flow
 - Flyway runs automatically on backend startup, ensuring schema and seed data are applied.
 - Scraper output (`scraper/pharmacy_data.json`) can be imported manually to extend items dataset (not automated in backend).
 - Bulk-order upload endpoint validates stock quantities using current item stock levels.
 
 ## Environment alignment
 - `docker-compose.yml` sets `POSTGRES_DB=pharmaconnect`, `POSTGRES_USER=user`, `POSTGRES_PASSWORD=password`, port `5432`.
 - Ensure `application.properties` uses matching JDBC URL/credentials when running backend.
 
 ## Future improvements
 - Add explicit indexes on frequently queried columns (e.g., `items.category`, `items.brand`).
 - Add translations for item name/description per locale in seed data.
 - Add audit timestamps (created_at/updated_at) and soft-delete flags if needed.
 - Add stock movement history for bulk orders/reservations.
 
