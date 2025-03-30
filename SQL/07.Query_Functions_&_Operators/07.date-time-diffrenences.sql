-- WORK on postgreSQL
-- SELECT last_checkout - last_checkin
-- FROM memberships;

-- work only in MYSQL
-- SELECT TIMESTAMPDIFF(MINUTE, last_checkin, last_checkout)
-- FROM memberships;

-- work in postgreSQL
-- SELECT membership_end - membership_start
-- FROM memberships;

-- SELECT NOW() - membership_start
-- FROM memberships;

-- work only in MYSQL
-- SELECT DATEDIFF(membership_end, membership_start)
-- FROM memberships;

SELECT DATEDIFF(NOW(), membership_start)
FROM memberships;

