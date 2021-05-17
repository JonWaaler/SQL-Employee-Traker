DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

-- Sales, engineering, finance, legal

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
    ('Ronald', 'Firbank', 1, 11),
    ('Virginia', 'Woolf', 2, 11),
    ('Piers', 'Gaveston', 3, 11),
    ('Charles', 'LeRoi', 4, 11),
    ('Katherine', 'Mansfield', 4, 11),
    ('Dora', 'Carrington', 4, 11),
    ('Edward', 'Bellamy', 5, 11),
    ('Montague', 'Summers', 6, 11),
    ('Octavia', 'Butler', 7, 11),
    ('Unica', 'Zurn', 7, 11),
    ('Elon', 'Musk', 8, NULL);
