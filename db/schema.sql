DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    PRIMARY KEY (id),
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT
);

CREATE TABLE role (
    id INT AUTO_INCREMENT,
    PRIMARY KEY (id),
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INT
);

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30),
    PRIMARY KEY (id)
);