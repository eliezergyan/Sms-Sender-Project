CREATE DATABASE octosenda;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_first_name VARCHAR(255) NOT NULL,
    user_last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE receiver(
    receiver_id SERIAL PRIMARY KEY,
    receiver_first_name VARCHAR(255),
    receiver_last_name VARCHAR(255),
    receiver_contact VARCHAR(255) NOT NULL 
);

CREATE TABLE message(
    message_id SERIAL PRIMARY KEY,
    message_subject VARCHAR(255),
    message_body VARCHAR(255),
    date_time_sent TIMESTAMP,
    message_receiver VARCHAR(255),
    saved_as_template BOOLEAN,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE message_receiver(
    receiver_id INT,
    message_id INT,
    PRIMARY KEY (receiver_id, message_id),
    FOREIGN KEY (receiver_id) REFERENCES receiver(receiver_id),
    FOREIGN KEY (message_id) REFERENCES message(message_id)
);

CREATE TABLE templates(
	template_id SERIAL PRIMARY KEY,
  template_subject VARCHAR(255),
  template_body VARCHAR(255)
)