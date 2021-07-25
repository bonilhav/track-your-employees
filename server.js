const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_db',
});

connection.connect((err) => {
    if (err) throw err;
    initPrompt();
});

const initPrompt = () => {
    const userChoice = inquirer.prompt([{
        name: 'userOption',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View All Employees',
            'View All Employees By Department',
            'Add Employee',
            'Update Employee Role',
            'View Budget By Department',
        ],
    }])
        .then(function ({ userOption }) {
            if (userOption == 'View All Employees') {
                viewAllEmp();
            };
            if (userOption === 'View All Employees By Department') {
                viewByDept();
            };
            if (userOption === 'Add Employee') {
                addEmployee();
            };
            if (userOption === 'Update Employee Role') {
                updateRole();
            };
            if (userOption === 'View Budget By Department') {
                budgetByDepartment();
            };
        })
};

const viewAllEmp = () => {
    const allQuery = `SELECT employee.id, employee.first_name AS 'First Name', employee.last_name AS  'Last Name', 
                    role.title AS 'Title', department.department_name AS 'Department', role.salary AS 'Salary'
    FROM employee, role, department
    WHERE department.id = role.department_id
    AND role.id = employee.role_id
    ORDER BY employee.id`
    connection.query(allQuery, (err, results) => {
        if (err) throw err;
        console.table(results);
        initPrompt();
    });
};

const viewByDept = () => {

    try {
        const deptQuery = `SELECT employee.id, employee.first_name AS 'First Name', employee.last_name AS  
        'Last Name', role.title AS 'Title', department.department_name AS 'Department' 
    FROM employee 
    LEFT JOIN role ON employee.role_id = role.id  
    LEFT JOIN department ON role.department_id = department.id
    ORDER BY department.department_name`
        connection.query(deptQuery, (err, results) => {
            if (err) throw err;
            console.table(results)
            initPrompt();
        });
    } catch (error) {
        console.log(error);
        initPrompt();
    }

};

