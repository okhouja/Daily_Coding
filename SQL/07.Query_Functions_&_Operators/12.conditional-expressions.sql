-- SELECT amount_billed,
--     CASE WHEN amount_billed > 15 AND amount_billed <= 30 THEN 'Normal Day'
--         WHEN amount_billed > 30 THEN 'Good Day'
--         ELSE 'Bad Day' END AS day_type
-- FROM orders;

-- MYSQL
-- SELECT Weekday_nr,
--     CASE WHEN Weekday_nr = 1 THEN 'Monday'
--         WHEN Weekday_nr = 2 THEN 'Tuesday'
--         WHEN Weekday_nr = 3 THEN 'Wednesday'
--         WHEN Weekday_nr = 4 THEN 'Thursday'
--         WHEN Weekday_nr = 5 THEN 'Friday'
--         WHEN Weekday_nr = 6 THEN 'Saturday'
--         ELSE 'Sunday'
--     END
-- FROM (
--     SELECT WEEKDAY(last_checkin) +1 AS Weekday_nr
--     FROM memberships
-- ) AS Weekday_numbers;

--PostgreSQL
SELECT EXTRACT(ISODOW FROM last_checkin) AS Weekday_nr,
    CASE WHEN EXTRACT(ISODOW FROM last_checkin) = 1 THEN 'Monday'
        WHEN EXTRACT(ISODOW FROM last_checkin) = 2 THEN 'Tuesday'
        WHEN EXTRACT(ISODOW FROM last_checkin) = 3 THEN 'Wednesday'
        WHEN EXTRACT(ISODOW FROM last_checkin) = 4 THEN 'Thursday'
        WHEN EXTRACT(ISODOW FROM last_checkin) = 5 THEN 'Friday'
        WHEN EXTRACT(ISODOW FROM last_checkin) = 6 THEN 'Saturday'
        ELSE 'Sunday'
    END AS Weekday_name
FROM memberships;

