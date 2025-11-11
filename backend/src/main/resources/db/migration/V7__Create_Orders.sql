CREATE TABLE IF NOT EXISTS orders
(
    id        UUID NOT NULL,
    type      SMALLINT,
    placed_at TIMESTAMP WITHOUT TIME ZONE,
    quantity  INTEGER,
    item_id   UUID,
    user_id   UUID,
    CONSTRAINT pk_orders PRIMARY KEY (id),
    CONSTRAINT FK_ORDERS_ON_ITEM FOREIGN KEY (item_id) REFERENCES items (id),
    CONSTRAINT FK_ORDERS_ON_USER FOREIGN KEY (user_id) REFERENCES users (id)
);
