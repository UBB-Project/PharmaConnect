from .base import BaseScraper, ProductData
from urllib.parse import urljoin
import re

class DrMaxScraper(BaseScraper):
    def scrape(self, product_id: str, url: str) -> ProductData:
        # 1. Initialize Object with Defaults
        data = ProductData(
            provider_name="Dr-Max",
            product_id=product_id,
            url=url
        )

        # 2. Fetch Content
        parser = self._get_parser(url)
        if not parser:
            return data  # Return empty object on connection failure

        # 3. Extract Data safely
        
        # Name
        node = parser.css_first('h1')
        if node:
            data.name = node.text(strip=True)

        # Description (First 2 paragraphs)
        desc_container = parser.css_first('.desc-rich')
        if desc_container:
            paragraphs = desc_container.css('p')[:2]
            data.description = "\n\n".join([p.text(strip=True) for p in paragraphs])

        # Category
        node = parser.css_first('.pr-detail__cat-label')
        if node:
            data.category = node.text(strip=True)

        # Brand
        node = parser.css_first('.pr-detail__origin-type a')
        if node:
            data.brand = node.text(strip=True)

        # Price
        node = parser.css_first('.price-text span')
        if node:
            raw_price = node.text(strip=True)
            # Clean "25,50 Lei" -> 25.50
            clean = raw_price.lower().replace('lei', '').replace(',', '.').strip()
            try:
                data.price = float(clean)
            except ValueError:
                data.price = None

        # Image URL
        node = parser.css_first('figure[data-test-id="product-detail-gallery-image"] img')
        if node:
            raw_src = node.attributes.get('src')
            if raw_src:
                data.image_url = urljoin(url, raw_src)

        # Prescription Logic (Specific to your requirement)
        if data.category:
            if "fara reteta" in data.category.lower():
                data.prescription_required = False
            else:
                data.prescription_required = True
        else:
            data.prescription_required = None # Unknown

        # Hardcoded/Missing fields
        data.side_effects = None
        data.expiration_date = None
        data.manufacturing_date = None

        return data
