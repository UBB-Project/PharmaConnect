CREATE TABLE items_translation (
id_translation UUID PRIMARY KEY,
id UUID NOT NULL,
description TEXT NOT NULL,
category VARCHAR(255) NOT NULL,
side_effects TEXT NOT NULL,
language VARCHAR(255) NOT NULL,

CONSTRAINT fk_item_translation
    FOREIGN KEY (id) REFERENCES items(id)
);