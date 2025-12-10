import json
import os

# Get the path to the project root dynamically
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Build path to JSON file
file_path = os.path.join(project_root, "scraper", "pharmacy_data.json")

with open(file_path, encoding="utf-8") as f:
    products = json.load(f)

print(f"""
INSERT INTO products 
(provider_name, product_id, name, description, category, brand, url, 
image_url, prescription_required, side_effects, expiration_date, manufacturing_date, price)
VALUES""")

for p in products:
    # Escape single quotes for SQL
    provider_name = p["provider_name"].replace("'", "''")
    product_id = p["product_id"].replace("'", "''")
    name = p["name"].replace("'", "''")
    description = (p["description"] or "").replace("'", "''")  # handle null
    category = (p.get("category") or "").replace("'", "''")
    brand = (p.get("brand") or "").replace("'", "''")
    url = (p.get("url") or "").replace("'", "''")
    image_url = (p.get("image_url") or "").replace("'", "''")
    prescription_required = 'TRUE' if p.get("prescription_required") else 'FALSE'
    side_effects = (p.get("side_effects") or "").replace("'", "''")
    expiration_date = f"'{p.get('expiration_date')}'" if p.get('expiration_date') else 'NULL'
    manufacturing_date = f"'{p.get('manufacturing_date')}'" if p.get('manufacturing_date') else 'NULL'
    price = p.get("price") or 0

    print(f"""(gen_random_uuid(), {provider_name}', 
    '{product_id}', '{name}', '{description}', '{category}', 
    '{brand}', '{url}', '{image_url}', {prescription_required}, 
    '{side_effects}', {expiration_date}, {manufacturing_date}, {price});""")