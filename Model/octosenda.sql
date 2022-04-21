CREATE DATABASE octosenda;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_first_name VARCHAR(255) NOT NULL,
    user_last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL
);


CREATE TABLE message(
    message_id SERIAL PRIMARY KEY,
    message_subject VARCHAR(255),
    message_body VARCHAR(255),
    date_time_sent TIMESTAMP,
    receiver_contact VARCHAR(255)
);


CREATE TABLE templates(
  template_id SERIAL PRIMARY KEY,
  template_subject VARCHAR(255),
  template_body VARCHAR(255),
  template_contacts VARCHAR(255)
);