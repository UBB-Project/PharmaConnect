from dataclasses import dataclass, field
from typing import Optional
from curl_cffi import requests
from selectolax.lexbor import LexborHTMLParser

@dataclass
class ProductData:
    """
    Standard Data Structure for Backend Team.
    Fields set to None if data is not available.
    """
    provider_name: str
    product_id: str
    url: str
    
    # The fields you requested:
    name: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    brand: Optional[str] = None
    image_url: Optional[str] = None
    prescription_required: Optional[bool] = None
    side_effects: Optional[str] = None
    expiration_date: Optional[str] = None  # LocalDate as string 'YYYY-MM-DD' or None
    manufacturing_date: Optional[str] = None # LocalDate as string 'YYYY-MM-DD' or None

class BaseScraper:
    def __init__(self):
        self.session = requests.Session()
        # Common headers for all scrapers
        self.session.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            "Referer": "https://www.google.com/"
        }
        self.impersonate = "chrome124"

    def _get_parser(self, url: str) -> Optional[LexborHTMLParser]:
        """Helper to fetch URL and return parser safely."""
        try:
            response = self.session.get(url, impersonate=self.impersonate, timeout=15)
            response.raise_for_status()
            return LexborHTMLParser(response.text)
        except Exception as e:
            print(f"    ❌ Connection Error: {e}")
            return None

    def scrape(self, product_id: str, url: str) -> ProductData:
        """Every child class must implement this specific method."""
        raise NotImplementedError("Subclasses must implement scrape()")
