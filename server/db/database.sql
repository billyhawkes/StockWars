CREATE DATABASE stockwars;

-- \c stockwars

CREATE TABLE stocks (
    stock_id SERIAL PRIMARY KEY,
    symbol varchar(4),
    cost MONEY,
    date_time TIMESTAMPTZ DEFAULT Now(),
    amount int
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username varchar(255) UNIQUE,
    email varchar(255) UNIQUE,
    password varchar(255),
    cash int DEFAULT 2000
);