DROP DATABASE IF EXISTS employeetracker_db;
CREATE DATABASE employeetracker_db;
USE employeetracker_db;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(6, 0) NOT NULL,
    department_id INTEGER NOT NULL,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NULL,
    manager_id INTEGER NULL,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id),
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id)
);
  
INSERT INTO departments 
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Manager');

INSERT INTO roles
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Sales Person', 80000, 1),
    ('Engineer Lead', 180000, 2),
    ('Engineer', 120000, 2),
    ('Accountant', 120000, 3),
    ('Legal Team Lead', 180000, 4),
    ('Lawyer', 123000, 4),
    ('Manager', 300000, 5);

INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
	('Elon', 'Musk', 8, NULL),
    ('Ronald', 'Firbank', 1, 1),
    ('Virginia', 'Woolf', 2, 1),
    ('Piers', 'Gaveston', 3, 1),
    ('Charles', 'LeRoi', 4, 1),
    ('Katherine', 'Mansfield', 4, 1),
    ('Dora', 'Carrington', 4, 1),
    ('Edward', 'Bellamy', 5, 1),
    ('Montague', 'Summers', 6, 1),
    ('Octavia', 'Butler', 7, 1),
    ('Unica', 'Zurn', 7, 1);