CREATE DATABASE stockwars;

-- \c stockwars

CREATE TABLE stocks (
    stock_id SERIAL PRIMARY KEY,
    symbol varchar(4),
    cost MONEY,
    date_time TIMESTAMPTZ DEFAULT Now(),
    amount int
);