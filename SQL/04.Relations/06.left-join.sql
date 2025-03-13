-- SELECT *
-- FROM users AS u
-- LEFT JOIN adresses AS a ON a.id = u.adress_id;

SELECT *
FROM adresses AS a
LEFT JOIN users AS u ON a.id = u.adress_id
LEFT JOIN cities AS c ON c.id = a.city_id;