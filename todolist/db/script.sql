\c postgres;

DROP DATABASE IF EXISTS todolist;

CREATE DATABASE todolist;

\c todolist;

CREATE TABLE tasks (
  idTask SERIAL PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE
);

INSERT INTO tasks (description, completed) VALUES
  ('installer docker desktop en D360', false),
  ('parler français', true);
