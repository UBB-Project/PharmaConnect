INSERT INTO users (id, first_name, second_name, last_name)
VALUES (
           '00000000-0000-0000-0000-000000000001',  -- Hardcoded deterministic UUID
           'A',
           'B',
           'C'
       )
    ON CONFLICT (id) DO NOTHING;