from .base import BaseScraper, ProductData
from selectolax.lexbor import LexborHTMLParser
import re

class TeiScraper(BaseScraper):
    def scrape(self, product_id: str, url: str) -> ProductData:
        # 1. Initialize Object
        data = ProductData(
            provider_name="Tei",
            product_id=product_id,
            url=url
        )

        # 2. Fetch Content
        parser = self._get_parser(url)
        if not parser:
            return data

        # --- Extraction Logic ---

        # 1. Name
        title_node = parser.css_first('h1')
        if title_node:
            data.name = title_node.text(strip=True)

        # 2. Description (First 2 paragraphs)
        desc_container = parser.css_first('#description-tab-content')
        if desc_container:
            paragraphs = desc_container.css('p')[:2]
            data.description = "\n\n".join([p.text(strip=True) for p in paragraphs])

        # 3. Category & Brand (From Table)
        # We use a robust search loop instead of hardcoded indices (td[1], td[3])
        # because the row order can change between products.
        table = parser.css_first('table#specDataTable')
        if table:
            for row in table.css('tr'):
                cells = row.css('td')
                if len(cells) >= 2:
                    label = cells[0].text(strip=True).lower()
                    value = cells[1].text(strip=True)

                    if "categorie" in label:
                        data.category = value
                    elif "producator" in label or "brand" in label:
                        data.brand = value
        
        # 4. Price
        # Structure: <div class="l-3"><span>Lei</span> 25,50</div>
        price_node = parser.css_first('.l-3')
        if price_node:
            # We want to remove the 'span' (currency) to get just the number
            currency_span = price_node.css_first('span')
            if currency_span:
                currency_span.remove() # Temporarily remove from tree
            
            raw_price = price_node.text(strip=True)
            
            # Clean "25,50" -> 25.50
            clean_price = raw_price.replace(',', '.').strip()
            try:
                # Use regex to find the first valid number float
                match = re.search(r"[\d\.]+", clean_price)
                if match:
                    data.price = float(match.group())
            except ValueError:
                data.price = None

        # 5. Image
        img_node = parser.css_first('img#product-full-image')
        if img_node:
            data.image_url = img_node.attributes.get('src')

        # 6. Prescription & Expiration (From the Left Info Block)
        info_block = parser.css_first('#product-main-left')
        if info_block:
            block_text = info_block.text()
            
            # Prescription Logic (Simple check based on your snippet)
            # Note: "Se elibereaza fara reteta" is standard text on Tei
            if "fara reteta" in block_text.lower():
                data.prescription_required = False
            else:
                # If it doesn't say "without prescription", we assume it might need one
                data.prescription_required = True

            # Expiration Date Loop
            # We look for the paragraph containing "Data expirarii"
            for p in info_block.css('p'):
                if "Data expirarii" in p.text():
                    date_span = p.css_first('span.text-bold')
                    if date_span:
                        data.expiration_date = date_span.text(strip=True)
                        break

        # 7. Hardcoded Nulls
        data.side_effects = None
        data.manufacturing_date = None

        return data
