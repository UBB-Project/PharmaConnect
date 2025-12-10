INSERT INTO items_translation (id_translation, id, description, category, side_effects, language)
VALUES
    (gen_random_uuid(), (SELECT id FROM items WHERE name='PainRelief 500'), 'Ameliorează eficient durerile de cap și musculare', 'Medicamente', 'Greață, amețeli', 'ro'),

    (gen_random_uuid(), (SELECT id FROM items WHERE name='Vitamin C 1000'),  'Întărește sistemul imunitar și sănătatea generală', 'Suplimente', 'Disconfort gastric', 'ro'),

    (gen_random_uuid(), (SELECT id FROM items WHERE name='AllergyStop'), 'Ameliorează simptomele alergiilor sezoniere', 'Medicamente', 'Somnolență', 'ro'),

    (gen_random_uuid(), (SELECT id FROM items WHERE name='Omega 3 Fish Oil'),  'Sprijină sănătatea inimii și a creierului', 'Suplimente', 'Gust de pește', 'ro'),

    (gen_random_uuid(), (SELECT id FROM items WHERE name='Cough Relief Syrup'), 'Calmează tusea și iritația gâtului', 'Medicamente', 'Somnolență, greață', 'ro'),

    (gen_random_uuid(), (SELECT id FROM items WHERE name='SleepWell'),  'Îmbunătățește calitatea somnului', 'Suplimente', 'Ușoară durere de cap', 'ro'),

    (gen_random_uuid(), (SELECT id FROM items WHERE name='Probiotic Max'),  'Sprijină sănătatea digestivă', 'Suplimente', 'Balonare', 'ro'),

    (gen_random_uuid(), (SELECT id FROM items WHERE name='Antibiotic A-Z'),  'Antibiotic cu spectru larg', 'Medicamente', 'Diaree, greață', 'ro'),

    (gen_random_uuid(), (SELECT id FROM items WHERE name='EnergyBoost'),  'Crește energia și concentrarea', 'Suplimente', 'Neliniște, insomnie', 'ro'),

    (gen_random_uuid(), (SELECT id FROM items WHERE name='HeartCare'), 'Sprijină sănătatea cardiovasculară', 'Suplimente', 'Ușoară amețeală', 'ro'),

    (gen_random_uuid(), (SELECT id FROM items WHERE name='AntiFungal Cream'),  'Tratează infecțiile fungice ale pielii', 'Medicamente', 'Iritații ale pielii', 'ro'),

    (gen_random_uuid(), (SELECT id FROM items WHERE name='Vitamin D 1000'), 'Sprijină sănătatea oaselor și imunitatea', 'Suplimente', 'Oboseală', 'ro'),

    (gen_random_uuid(), (SELECT id FROM items WHERE name='MuscleRelief Gel'), 'Calmează durerile musculare și articulare', 'Medicamente', 'Erupție cutanată', 'ro'),

    (gen_random_uuid(), (SELECT id FROM items WHERE name='BrainBoost'), 'Îmbunătățește funcția cognitivă', 'Suplimente', 'Durere de cap', 'ro'),

    (gen_random_uuid(), (SELECT id FROM items WHERE name='ColdEase'), 'Reduce simptomele răcelii', 'Medicamente', 'Somnolență', 'ro');
