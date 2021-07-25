INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Rebecca', 'Smith', 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jim', 'King', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Vern', 'Scott', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Beth', 'Lively', 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Joe', 'King', 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Kisha', 'Alire', 5, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('June', 'Carter', 6, null);

INSERT INTO department (department_name)
VALUES ('Management');
INSERT INTO department (department_name)
VALUES ('Fraud');
INSERT INTO department (department_name)
VALUES ('Customer Service');
INSERT INTO department (department_name)
VALUES ('Data Entry');
INSERT INTO department (department_name)
VALUES ('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES ('People Manager', 120000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ('Fraud Analyst', 80000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ('Representative', 90000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ('Data Analyst', 40000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ('Human Resource Officer', 75000, 5);
INSERT INTO role (title, salary, department_id)
VALUES ('CEO', 250000, null);