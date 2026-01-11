import json
import os

# Get the path to the project root dynamically
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
print(project_root)
# Build paths
input_file = os.path.join(project_root, "scraper/pharmacy_data.json")
output_file = os.path.join(project_root, "converter_scraper_sql", "insert_items.sql")

# Read JSON data
with open(input_file, encoding="utf-8") as f:
    products = json.load(f)

# Open output SQL file
with open(output_file, "w", encoding="utf-8") as sql_file:
    sql_file.write("-- Auto-generated SQL INSERT statements for items table\n")
    sql_file.write("-- Generated from pharmacy_data.json\n\n")

    for i, p in enumerate(products):
        # Escape single quotes for SQL
        name = p.get("name", "").replace("'", "''")
        description = (p.get("description") or "").replace("'", "''")
        category = (p.get("category") or "Uncategorized").replace("'", "''")
        brand = (p.get("brand") or "Unknown").replace("'", "''")
        image_url = (p.get("image_url") or "").replace("'", "''")

        # Handle price - ensure it's a valid number
        try:
            price = float(p.get("price", 0))
        except (ValueError, TypeError):
            price = 0.0

        # Handle boolean
        prescription_required = 'TRUE' if p.get("prescription_required") else 'FALSE'

        # Handle side effects
        side_effects = (p.get("side_effects") or "No known side effects").replace("'", "''")

        # Handle dates - convert to proper format or use defaults
        expiration_date = p.get("expiration_date")
        if expiration_date:
            # Convert from DD-MM-YYYY to YYYY-MM-DD if needed
            if "-" in expiration_date:
                parts = expiration_date.split("-")
                if len(parts[0]) == 2:  # DD-MM-YYYY format
                    expiration_date = f"{parts[2]}-{parts[1]}-{parts[0]}"
            expiration_date = f"'{expiration_date}'"
        else:
            # Default to 2 years from now
            expiration_date = "'2027-01-01'"

        manufacturing_date = p.get("manufacturing_date")
        if manufacturing_date:
            # Convert from DD-MM-YYYY to YYYY-MM-DD if needed
            if "-" in manufacturing_date:
                parts = manufacturing_date.split("-")
                if len(parts[0]) == 2:  # DD-MM-YYYY format
                    manufacturing_date = f"{parts[2]}-{parts[1]}-{parts[0]}"
            manufacturing_date = f"'{manufacturing_date}'"
        else:
            # Default to current year
            manufacturing_date = "'2025-01-01'"

        # Set default stock quantity (you may want to adjust this)
        stock_quantity = 100

        # sold_count defaults to 0 (will be handled by @Builder.Default in Java)

        # Build SQL INSERT statement matching ItemEntity structure
        sql_statement = f"""INSERT INTO items (id, name, description, category, price, brand, image_url, manufacturing_date, expiration_date, prescription_required, side_effects, sold_count, stock_quantity) VALUES
(gen_random_uuid(), '{name}', '{description}', '{category}', {price}, '{brand}', '{image_url}', {manufacturing_date}, {expiration_date}, {prescription_required}, '{side_effects}', 0, {stock_quantity});

"""

        sql_file.write(sql_statement)

    print(f"✓ Successfully generated {len(products)} INSERT statements")
    print(f"✓ Output written to: {output_file}")

print(f"\nProcessed {len(products)} products from {input_file}")
print(f"SQL file ready for execution: {output_file}")