-- SELECT EXTRACT(MONTH FROM last_checkin)
-- FROM memberships;

-- DOW for Weekday (start with Sunday as 0 ) and ISODOW for Weekday (start with Monday as 1)
-- this is work only on PosgreSQL and Monday will show 1 in both example if there no Sunday
-- SELECT EXTRACT(ISODOW FROM last_checkin)
-- FROM memberships;

-- this work only in MySQL and Monday will start as 0 .. so we need to add +1 to begin with 1
-- SELECT WEEKDAY(last_checkin) +1, last_checkin
-- FROM memberships;

-- this work only on MYSQL and this is to EXTRACT DATE and TIME
-- SELECT CONVERT(last_checkin, DATE), CONVERT(last_checkin, TIME)
-- FROM memberships;

-- this work only on PosgreSQL and this is to EXTRACT DATE and TIME
SELECT last_checkin::TIMESTAMP::DATE, last_checkin::TIMESTAMP::TIME
FROM memberships;


