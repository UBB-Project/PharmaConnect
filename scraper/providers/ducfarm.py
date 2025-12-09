from .base import BaseScraper, ProductData
from selectolax.lexbor import LexborHTMLParser
import re

class DucfarmScraper(BaseScraper):
    def scrape(self, product_id: str, url: str) -> ProductData:
        # 1. Initialize Object
        data = ProductData(
            provider_name="Ducfarm",
            product_id=product_id,
            url=url
        )

        # 2. Fetch Content
        parser = self._get_parser(url)
        if not parser:
            return data

        # --- Extraction Logic ---

        # 1. Name
        # Using specific selector for Ducfarm h1
        title_node = parser.css_first('h1')
        if title_node:
            data.name = title_node.text(strip=True)

        # 2. Description (First paragraph only, as per your code)
        desc_container = parser.css_first('#description')
        if desc_container:
            # Taking just the first paragraph as requested ([:1])
            paragraphs = desc_container.css('p')[:1]
            data.description = "\n\n".join([node.text(strip=True) for node in paragraphs])

        # 3. Category & Brand (Using your loop logic)
        attr_container = parser.css_first('.product-attributes')
        if attr_container:
            for row in attr_container.css('.product-attributes__item'):
                label_node = row.css_first('.product-attributes__label')
                value_node = row.css_first('.product-attributes__value')

                if label_node and value_node:
                    label_text = label_node.text(strip=True).lower()
                    
                    link_node = value_node.css_first('a')
                    final_value = link_node.text(strip=True) if link_node else value_node.text(strip=True)
                    
                    if "categorii" in label_text:
                        data.category = final_value
                    elif "brand" in label_text:
                        data.brand = final_value

        # 4. Price
        price_container = parser.css_first('.product-summary__info--price-gross')
        if price_container:
            raw_text = price_container.text(strip=True)
            # Remove currency text
            clean_text = raw_text.upper().replace('RON', '').replace('LEI', '')
            clean_text = clean_text.replace(',', '.').strip()
            
            try:
                # Use regex for safety (finds "32.00" inside the string)
                match = re.search(r"[\d\.]+", clean_text)
                if match:
                    data.price = float(match.group())
            except ValueError:
                data.price = None

        # 5. Image URL
        # You were grabbing the 'href' from the wrapper <a>, which is the link to the full image
        image_node = parser.css_first('.product-summary__main-image-wrapper')
        if image_node:
            data.image_url = image_node.attributes.get('href')

        # 6. Prescription Logic (OTC Check)
        otc_node = parser.css_first('.product-summary__badge')
        if otc_node:
            # Use .get() to avoid crashing if 'title' attribute is missing
            otc_title = otc_node.attributes.get('title')
            if otc_title and "OTC" in otc_title:
                data.prescription_required = False
            else:
                data.prescription_required = True
        else:
            # Default assumption if badge is missing
            data.prescription_required = None 

        # 7. Hardcoded Nulls for missing fields
        data.side_effects = None
        data.expiration_date = None
        data.manufacturing_date = None

        return data
