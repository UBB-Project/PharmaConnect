ALTER TABLE items
ADD COLUMN sold_count INTEGER NOT NULL DEFAULT 0,
ADD COLUMN stock_quantity INTEGER NOT NULL DEFAULT 50;

UPDATE items SET sold_count = 0, stock_quantity = 50 WHERE sold_count IS NULL OR stock_quantity IS NULL;