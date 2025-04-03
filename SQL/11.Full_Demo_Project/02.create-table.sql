CREATE TABLE events(
    id INT PRIMARY KEY AUTO_INCREMENT, -- MySQL
    -- id SERIAL PRIMARY KEY,  -- -- Postgresql
    name VARCHAR(300) NOT NULL CHECK (LENGTH(name) > 5),
    date_planned TIMESTAMP NOT NULL,
    image VARCHAR(300),
    description TEXT NOT NULL,
    max_participants INT NOT NULL CHECK(max_participants > 0),
    min_age INT NOT NULL CHECK(min_age >= 0)
);