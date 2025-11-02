CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS items
(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    image_url TEXT,
    manufacturing_date DATE NOT NULL,
    expiration_date DATE NOT NULL,
    prescription_required BOOLEAN NOT NULL,
    side_effects TEXT NOT NULL
);