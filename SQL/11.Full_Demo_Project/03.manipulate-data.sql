-- INSERT INTO events(
--     name,
--     date_planned,
--     description,
--     max_participants,
--     min_age
--   )
-- VALUES (
--     'A First Event',
--     '2025-03-01 16:30:00',
--     'This is the description of this first event',
--     20,
--     18
--   ),
--   (
--     'A Second Event',
--     '2025-04-08 17:30:00',
--     'This is the description of this second event',
--     20,
--     18
--   );

UPDATE events
SET min_age = 16, description = 'This is the description of this second event'
WHERE id = 2;

-- DELETE FROM events
-- WHERE id = 1;