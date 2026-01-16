 # REST API
 
 Base URL (dev): `http://localhost:8080/api`
 
 ## Items (`/items`)
 - `POST /items` — create item from `ItemRequestDto`; returns UUID.
 - `GET /items` — list/search/filter/sort items using query params: `search`, `category`, `brand`, `prescription`, `sort`; returns array of `ItemRequestDto`.
 - `GET /items/{id}/{language}` — fetch item by UUID and language (`en`, `ro`, etc.); returns `ItemRequestDto` or `ItemTranslationRequestDto`.
 - `GET /items/{language}` — fetch all items in a given language; returns list of DTOs.
 - `POST /items/bulk-order` — multipart file upload; processes bulk order CSV/XLS and returns `StockCheckResponseDto` (stock availability & totals).
 
 ## Cart (`/cart`)
 - `GET /cart/{userId}` — get cart items for user UUID; returns `CartResponseDTO[]`.
 - `POST /cart/{userId}` — add item to cart with body `CartRequestDTO { id, quantity }`; returns `CartResponseDTO`.
 - `PUT /cart/{userId}` — update quantity; body `CartRequestDTO`; returns `CartResponseDTO`.
 - `DELETE /cart/{userId}/{itemId}` — remove item from cart.
 
 ## Orders (`/orders`)
 - `POST /orders` — place order from `OrderDTO { userId, itemId, quantity, type/status }`; returns created `OrderEntity`.
 - `GET /orders/{id}` — fetch order by UUID; returns `OrderEntity`.
 - `GET /orders/qr/{id}` — returns QR PNG bytes for order id (200 OK with `Content-Type: image/png`).
 
 ## Pharmacies (`/pharmacies`)
 - `GET /pharmacies` — list all pharmacies (`PharmacyResponseDto[]`).
 - `POST /pharmacies` — create pharmacy from `PharmacyRequestDto`; returns `PharmacyResponseDto`.
 - `GET /pharmacies/name/{name}` — search pharmacies by name.
 - `GET /pharmacies/{id}` — get pharmacy by UUID.
 - `PUT /pharmacies/{id}` — update pharmacy by UUID with `PharmacyRequestDto`.
 - `DELETE /pharmacies/{id}` — delete pharmacy.
 
 ## Locations (`/locations`)
 - `POST /locations` — create location with `LocationDTO { address, pharmacyId, openHours, latitude, longitude }`; returns `LocationDTO`.
 - `DELETE /locations/{id}` — delete location UUID.
 
 ## Map (`/map`)
 - `GET /map/pharmacies` — returns `MapLocationDTO[]` containing pharmacy id, name, address, and coordinates for map display.
 
 ## Users (`/users`)
 - `POST /users` — create user with `UserRequestDto { firstName, secondName, lastName }`; returns user UUID.
 
## Chatbot (`/chat`)
- `POST /chat` — body `PromptRequest { prompt: string }`; returns chatbot response string.

## Image OCR (`/image`)
- `POST /api/image/ocr` — multipart file upload; returns JSON `{ "text": "extracted text" }` using OpenAI GPT-4 Vision.

## Stock Alerts (`/stock-alerts`)
- `POST /api/stock-alerts/subscribe` — body `{ "email": string, "itemId": uuid }`; registers user interest in an item.

## Common behaviors
 - **CORS**: allowed origins `http://localhost:5173`/`5174`.
 - **Auth**: none enabled; all `/api/**` are permitted (dev).
 - **Validation**: DTOs with `@Valid` where present; errors currently surfaced as generic exceptions.
 - **Error handling**: runtime exceptions propagate default Spring error JSON; consider adding global `@ControllerAdvice`.
 - **Docs**: Swagger UI available via springdoc (check `/swagger-ui.html` when running).
 
