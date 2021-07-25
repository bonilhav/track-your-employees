INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Rebecca', 'Smith', 1, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Ana', 'Gonzalez', 2, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jim', 'King', 3, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Joseph', 'King', 5, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Marie', 'Long', 5, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Kisha', 'Alire', 6, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Nick', 'Hernon', 6, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Vern', 'Scott', 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Fonz', 'Anderson', 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('June', 'Carter', 7, null);

INSERT INTO department (department_name)
VALUES ('Management');
INSERT INTO department (department_name)
VALUES ('Fraud');
INSERT INTO department (department_name)
VALUES ('Customer Service');
INSERT INTO department (department_name)
VALUES ('Human Resources');
INSERT INTO department (department_name)
VALUES ('CEO');

INSERT INTO role (title, salary, department_id)
VALUES ('People Manager', 120000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ('Human Resources Manager', 120000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ('Fraud Manager', 120000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ('Fraud Analyst', 80000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ('Representative', 90000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ('Human Resource Officer', 70000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ('CEO', 250000, 5);