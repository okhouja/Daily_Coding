-- SELECT * FROM sales
-- WHERE volume > 3000;

-- SELECT * FROM sales
-- WHERE is_recurring IS TRUE;

SELECT * FROM sales
WHERE (is_disputed IS TRUE) AND (volume > 5000);