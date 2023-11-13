CREATE DATABASE cms;

CREATE TABLE users (
	id serial primary key,
  name varchar(50) not null,
  email varchar(50) not null unique,
  password text not null
);