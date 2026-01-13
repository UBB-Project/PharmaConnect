CREATE TABLE IF NOT EXISTS stock_alerts (
                              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                              email VARCHAR(255) NOT NULL,
                              item_id UUID NOT NULL,
                              CONSTRAINT fk_item FOREIGN KEY(item_id) REFERENCES items(id) ON DELETE CASCADE
);