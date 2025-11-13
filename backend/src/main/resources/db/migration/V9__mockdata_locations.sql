-- V9__mockdata_locations.sql
-- Inserts sample locations for existing pharmacies in Cluj-Napoca

INSERT INTO locations (id, address, pharmacy_id, open_hours, latitude, longitude)
VALUES
    (uuid_generate_v4(), 'Str. Memorandumului 2',
     (SELECT id FROM pharmacies WHERE name = 'HealthCorp'),
     '08:00 - 21:00', 46.7719, 23.6236),

    (uuid_generate_v4(), 'Bulevardul Eroilor 10',
     (SELECT id FROM pharmacies WHERE name = 'NutriLife'),
     '07:30 - 22:00', 46.7705, 23.5947),

    (uuid_generate_v4(), 'Str. Regele Ferdinand 3',
     (SELECT id FROM pharmacies WHERE name = 'Medix'),
     '08:00 - 22:00', 46.7732, 23.6210),

    (uuid_generate_v4(), 'Calea Dorobanților 105',
     (SELECT id FROM pharmacies WHERE name = 'VitaBoost'),
     '09:00 - 21:00', 46.7698, 23.6245),

    (uuid_generate_v4(), 'Str. Observatorului 15',
     (SELECT id FROM pharmacies WHERE name = 'FlexLabs'),
     '08:00 - 22:00', 46.7531, 23.5849),

    (uuid_generate_v4(), 'Piața Mihai Viteazul 14',
     (SELECT id FROM pharmacies WHERE name = 'NeuroLabs'),
     '08:00 - 21:00', 46.7748, 23.5943),

    (uuid_generate_v4(), 'Str. Horea 78',
     (SELECT id FROM pharmacies WHERE name = 'RestWell'),
     '09:00 - 20:00', 46.7825, 23.5970),

    (uuid_generate_v4(), 'Str. Calea Moților 10',
     (SELECT id FROM pharmacies WHERE name = 'BeautyLabs'),
     '07:00 - 22:00', 46.7715, 23.5822);