-- SELECT u.id, first_name, last_name, street, house_number, city_id
SELECT u.id, first_name, last_name, street, house_number, c.name AS city_name
FROM users AS u
INNER JOIN adresses AS a ON u.adress_id = a.id
INNER JOIN cities AS c ON a.city_id = c.id;
