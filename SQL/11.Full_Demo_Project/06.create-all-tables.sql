CREATE TABLE cities(
    name VARCHAR(200) PRIMARY KEY
);

CREATE TABLE locations(
    -- id INT PRIMARY KEY AUTO_INCREMENT, -- MySQL
    id SERIAL PRIMARY KEY,  -- -- Postgresql
    title VARCHAR(300),
    street VARCHAR(300) NOT NULL,
    house_number VARCHAR(10) NOT NULL,
    postal_code VARCHAR(10) NOT NULL,
    city_name VARCHAR(200) NOT NULL,
    FOREIGN KEY (city_name) REFERENCES cities(name) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE users(
    -- id INT PRIMARY KEY AUTO_INCREMENT, -- MySQL
    id SERIAL PRIMARY KEY,  -- -- Postgresql
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    birthdate DATE NOT NULL,
    email VARCHAR(300) NOT NULL UNIQUE,
    location_id INT NOT NULL,
    FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE
);

CREATE TABLE organizers(
    password VARCHAR(500) NOT NULL,
    user_id INT PRIMARY KEY NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE tags(
    name VARCHAR(100) PRIMARY KEY
);

CREATE TABLE events(
    -- id INT PRIMARY KEY AUTO_INCREMENT, -- MySQL
    id SERIAL PRIMARY KEY,  -- -- Postgresql
    name VARCHAR(300) NOT NULL CHECK (LENGTH(name) > 5),
    date_planned TIMESTAMP NOT NULL,
    image VARCHAR(300),
    description TEXT NOT NULL,
    max_participants INT NOT NULL CHECK(max_participants > 0),
    min_age INT NOT NULL CHECK(min_age >= 0),
    location_id INT NOT NULL,
    FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE,
    organizers_id INT NOT NULL,
    FOREIGN KEY (organizers_id) REFERENCES organizers(user_id) ON DELETE CASCADE
);

CREATE TABLE events_users(
    event_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (event_id, user_id),
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE events_tags(
    event_id INT NOT NULL,
    tag_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (event_id, tag_name),
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_name) REFERENCES tags(name) ON DELETE CASCADE
);