-- SELECT price * billing_frequency AS annual_revenue
-- FROM memberships;

-- CEIL()
-- FLOOR()
-- ROUND()
-- TURNC() PostgreSQL
-- TRUNCATE() mysql

-- SELECT CEIL(consumption)
-- -- SELECT consumption
-- FROM memberships;

-- SELECT FLOOR(consumption)
-- FROM memberships;

-- SELECT ROUND(consumption)
-- FROM memberships;

-- SELECT TRUNC(consumption, 1)
-- FROM memberships;

SELECT TRUNCATE(consumption, 1)
FROM memberships;

