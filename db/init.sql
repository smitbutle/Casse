CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_fullname VARCHAR(500),
    user_email VARCHAR(500),
    password VARCHAR(500),
    username VARCHAR(500),
    resource_id VARCHAR(50),
    create_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT current_timestamp,
    last_login_date TIMESTAMP WITHOUT TIME ZONE,
    user_image BYTEA
);

CREATE TABLE functions (
    function_id SERIAL PRIMARY KEY,
    
    entrypoint VARCHAR(200),
    description TEXT,
    content TEXT,
    weburl TEXT,

    create_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT current_timestamp,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
