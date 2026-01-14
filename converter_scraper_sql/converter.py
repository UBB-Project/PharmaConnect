import json
import os
import asyncio
from operator import truediv
import psycopg2
import uuid as uuid_lib
from psycopg2.extras import RealDictCursor
from transformers import add_end_docstrings

from translator import translate_text
import uuid


def check_item(provider_name, product_id, items):
    for i in items:
        if i["provider_name"] == provider_name and i["product_id"] == product_id:
            return i
    return None

items_edited = 0
items_added = 0
def delete_file(path):
    if os.path.exists(path):
        os.remove(path)

conn = psycopg2.connect(
    host="127.0.0.1",
    port=5432,
    database="pharmaconnect",
    user="user",
    password="password"
)
cursor = conn.cursor(cursor_factory=RealDictCursor)
def get_item_DB(uuid):
    cursor.execute(
        "SELECT * FROM items WHERE id = %s;",
        (uuid,)
    )
    item = cursor.fetchone()
    return item

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
items = data["items"]
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
        provider_name = p.get("provider_name", "").replace("'", "''")
        product_id = p.get("product_id", "").replace("'", "''")
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
        side_effects = (p.get("side_effects") or "Fără efecte secundare cunoscute").replace("'", "''")

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
        json_item = check_item(provider_name, product_id, items)
        if json_item is not None:
            uuid = str(json_item["uuid"])
            item_db = get_item_DB(uuid)
            if item_db is None:
                print(item_db)
                continue

            db_man = item_db["manufacturing_date"].isoformat() if item_db["manufacturing_date"] else ""
            db_exp = item_db["expiration_date"].isoformat() if item_db["expiration_date"] else ""
            db_presc = bool(item_db["prescription_required"])
            db_image = item_db["image_url"] or ""

            # normalize incoming values (REMOVE QUOTES)
            manufacturing_date_raw = manufacturing_date.strip("'")
            expiration_date_raw = expiration_date.strip("'")

            # normalize boolean properly
            prescription_required_bool = p.get("prescription_required") is True

            if not (
                    item_db["name"] == name_en and
                    item_db["category"] == category_en and
                    float(item_db["price"]) == float(price) and
                    item_db["brand"] == brand and
                    (item_db["image_url"] or "") == image_url and
                    db_man == manufacturing_date_raw and
                    db_exp == expiration_date_raw and
                    bool(item_db["prescription_required"]) == prescription_required_bool and
                    item_db["side_effects"] == side_effects_en and
                    item_db["stock_quantity"] == stock_quantity
                ):
                sql_statement = f"""
UPDATE items SET name = '{name_en}', category = '{category_en}',
price = {price}, brand = '{brand}', image_url = '{image_url}', manufacturing_date = {manufacturing_date}, expiration_date = {expiration_date},
prescription_required = {prescription_required}, side_effects = '{side_effects_en}', stock_quantity = {stock_quantity}
WHERE id = '{uuid}';
"""
                sql_statement_2 = f"""
UPDATE items_translation SET  category = '{category}', side_effects = '{side_effects}'
WHERE id = '{uuid}'
  AND language = 'ro';
"""
                sql_file.write(sql_statement)
                sql_file_2.write(sql_statement_2)
                items_edited+=1
        else:
            item_id = uuid.uuid4()
            sql_statement = f"""INSERT INTO items (id, name, description, category, price, brand, image_url, manufacturing_date, expiration_date, prescription_required, side_effects, sold_count, stock_quantity) VALUES
('{item_id}', '{name_en}', '{description_en}', '{category_en}', {price}, '{brand}', '{image_url}', {manufacturing_date}, {expiration_date}, {prescription_required}, '{side_effects_en}', 0, {stock_quantity});

"""
            sql_statement_2 = f"""INSERT INTO items_translation (id_translation, id, description, category, side_effects, language) VALUES
(gen_random_uuid(), '{item_id}', '{description}', '{category}', '{side_effects}', 'ro');

"""

            sql_file.write(sql_statement)
            sql_file_2.write(sql_statement_2)
            items_added+=1
            with open(flyway, "r", encoding="utf-8") as f:
                data = json.load(f)
            data["items"].append({
                "product_id": product_id,
                "provider_name": provider_name,
                "uuid": str(item_id)
            })
            with open(flyway, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2)

print("The number of items that where edited: " + str(items_edited))
print("The number of items that where added: " + str(items_added))
if items_edited==0 and items_added==0:
    delete_file(output_file_1)
    delete_file(output_file_2)
    with open(flyway, "r", encoding="utf-8") as f:
        data = json.load(f)
    data["flywayVersion"] = base_version
    with open(flyway, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
else:
    print(f"SQL files ready for execution: \n {output_file_1}, \n {output_file_2}")
    print("Please run the backend before running the converter again so that the database syncs with the flyway version")