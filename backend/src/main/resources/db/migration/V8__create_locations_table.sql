CREATE TABLE IF NOT EXISTS locations (
                                         id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    address VARCHAR(255) NOT NULL,
    pharmacy_id UUID NOT NULL REFERENCES pharmacies(id) ON DELETE CASCADE,
    open_hours VARCHAR(255),
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION
    );