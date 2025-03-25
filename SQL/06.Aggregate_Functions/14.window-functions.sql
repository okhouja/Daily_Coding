-- SELECT booking_date, amount_billed
-- FROM bookings;

-- SELECT SUM(amount_tipped) FROM bookings;

-- SELECT booking_date, amount_billed, SUM(amount_tipped) OVER()
-- FROM bookings;

SELECT booking_date, amount_billed, SUM(amount_tipped) OVER(PARTITION BY booking_date)
FROM bookings;