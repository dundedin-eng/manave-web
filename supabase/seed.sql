-- Optional starter data. All rows are "coming soon" until you confirm real placements.
-- Replace with actual accounts (retailers, resorts, duty-free) and set coming_soon = false.
insert into public.locations (location_name, location_type, city, state, country, coming_soon) values
  ('Chicago Area',  'region', 'Chicago', 'IL', 'USA',    true),
  ('Illinois Retail','region', null,      'IL', 'USA',    true),
  ('Cabo',          'region', 'Cabo San Lucas', 'BCS', 'Mexico', true),
  ('Cancún',        'region', 'Cancún', 'QROO', 'Mexico', true);
