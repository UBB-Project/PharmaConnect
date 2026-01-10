 # Scraper
 
 Location: `scraper/`
 Purpose: harvest product data from multiple Romanian pharmacy websites into a normalized JSON for later import into the app/database.
 
 ## Components
 - `main.py`: orchestrates scraping for configured products and providers, aggregates results, writes `pharmacy_data.json`.
 - `providers/base.py`: base class with `ProductData` dataclass (normalized fields) and HTTP parsing helpers (curl_cffi + Lexbor).
 - `providers/product_config.py`: list of target products (id/display name) and per-provider URLs.
 - `providers/dr_max.py`, `providers/tei.py`, `providers/ducfarm.py`: provider-specific scrapers implementing `scrape(product_id, url)`.
 
 ## How it works
 1) `main.py` builds a mapping of provider name → scraper instance.
 2) Iterates `TARGET_PRODUCTS`; for each provider URL it calls `scraper.scrape(...)`.
 3) Each scraper fetches HTML (impersonated Chrome 124), parses with Lexbor, and fills `ProductData` (name, description, category, price, brand, image_url, prescription flag, side effects, expiration/manufacturing dates).
 4) Results are converted to dictionaries and appended to `final_results`.
 5) Output is saved to `pharmacy_data.json` (UTF-8, pretty-printed).
 
 ## Running
 ```bash
 cd scraper
 pip install curl-cffi selectolax  # plus any other deps used
 python main.py
 ```
 Output: `pharmacy_data.json` in the scraper directory.
 
 ## Data contract
 - `ProductData` matches backend item fields (optional for missing data).
 - Intended for manual import into the database (no automatic ingestion wired to backend yet).
 
 ## Extending
 - Add URLs/products in `providers/product_config.py`.
 - Implement new provider classes inheriting `BaseScraper`; override `scrape`.
 - Add error handling/retries or proxy support if sites throttle requests.
 
 ## Caveats
 - Be mindful of robots.txt/ToS; scraping is for educational use.
 - Upstream HTML changes can break selectors; keep scrapers updated.
 
