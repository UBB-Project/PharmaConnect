import json
import os
from dataclasses import asdict
from providers.product_config import TARGET_PRODUCTS
from providers.dr_max import DrMaxScraper
from providers.tei import TeiScraper
from providers.ducfarm import DucfarmScraper

def main():
    scrapers = {
        "Dr-Max": DrMaxScraper(),
        "Tei": TeiScraper(),
        "Ducfarm": DucfarmScraper()
    }

    final_results = []

    print("🚀 Starting Scraping Process...")

    # 2. Iterate Config
    for product in TARGET_PRODUCTS:
        p_id = product['id']
        p_name = product['display_name']
        
        print(f"\nProcessing Product: {p_name}")

        for provider_name, url in product['urls'].items():
            if not url:
                continue

            scraper = scrapers.get(provider_name)
            if scraper:
                print(f"     Scraping {provider_name}...")
                
                # EXECUTE SCRAPE
                product_data = scraper.scrape(p_id, url)
                
                # Convert Dataclass to Dictionary
                final_results.append(asdict(product_data))
            else:
                print(f"     No scraper found for {provider_name}")

    output_filename = "pharmacy_data.json"
    with open(output_filename, "w", encoding="utf-8") as f:
        json.dump(final_results, f, indent=4, ensure_ascii=False)

    print(f"\nDone! Data saved to '{output_filename}'")

if __name__ == "__main__":
    main()
