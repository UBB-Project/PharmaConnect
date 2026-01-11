import json
import os
import asyncio
from translator import translate_text
import uuid



# Get the path to the project root dynamically
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
print(project_root)
# Build paths
input_file = os.path.join(project_root, "scraper/pharmacy_data.json")
flyway = os.path.join(project_root, "backend/src/main/resources/flyway_version.json")
#Get the flyway version
with open(flyway, "r", encoding="utf-8") as f:
    data = json.load(f)

base_version = int(data["flywayVersion"])
# Build output file paths
output_file_1 = os.path.join(
    project_root,
    "backend/src/main/resources/db/migration",
    f"V{base_version + 1}__mockdata_items.sql"
)

output_file_2 = os.path.join(
    project_root,
    "backend/src/main/resources/db/migration",
    f"V{base_version + 2}__mockdata_itemsTranslation.sql"
)

# Update flyway version in JSON (+2)
data["flywayVersion"] = base_version + 2

with open(flyway, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)

# Read JSON data
with open(input_file, encoding="utf-8") as f:
    products = json.load(f)

# Open output SQL file
with open(output_file_1, "w", encoding="utf-8") as sql_file, \
        open(output_file_2, "w", encoding="utf-8") as sql_file_2:

    sql_file.write("-- Auto-generated SQL INSERT statements for items table\n")
    sql_file.write("-- Generated from pharmacy_data.json\n\n")

    sql_file_2.write("-- Auto-generated SQL INSERT statements for items_translation table\n")
    sql_file_2.write("-- Generated from pharmacy_data.json\n\n")


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

        # translating
        name_en = asyncio.run(translate_text(name))
        description_en = asyncio.run(translate_text(description))
        category_en = asyncio.run(translate_text(category))
        side_effects_en = asyncio.run(translate_text(side_effects))

        # Build SQL INSERT statement matching ItemEntity structure

        item_id = uuid.uuid4()
        sql_statement = f"""INSERT INTO items (id, name, description, category, price, brand, image_url, manufacturing_date, expiration_date, prescription_required, side_effects, sold_count, stock_quantity) VALUES
('{item_id}', '{name_en}', '{description_en}', '{category_en}', {price}, '{brand}', '{image_url}', {manufacturing_date}, {expiration_date}, {prescription_required}, '{side_effects_en}', 0, {stock_quantity});

"""
        sql_statement_2 = f"""INSERT INTO items_translation (id_translation, id, description, category, side_effects, language) VALUES
(gen_random_uuid(), '{item_id}', '{description}', '{category}', '{side_effects}', 'ro');

"""

        sql_file.write(sql_statement)
        sql_file_2.write(sql_statement_2)

    print(f"✓ Successfully generated {len(products)} INSERT statements")
    print(f"✓ Output written to: {output_file_1}")

print(f"\nProcessed {len(products)} products from {input_file}")
print(f"SQL file ready for execution: {output_file_1}")