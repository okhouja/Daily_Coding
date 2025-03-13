SELECT c.name AS city_name, u.first_name, u.last_name
FROM cities AS c
LEFT JOIN adresses AS a ON c.id = a.city_id
LEFT JOIN users AS u ON u.adress_id = a.id;