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
            'View All Employees By Manager',
            'Add Employee',
            'Remove Employee',
            'Update Employee Role',
            'View Budget By Department',
            'Exit'
        ],
    }])
        .then(function ({ userOption }) {
            if (userOption == 'View All Employees') {
                viewAllEmp();
            };
            if (userOption === 'View All Employees By Department') {
                viewByDept();
            };
            if (userOption === 'View All Employees By Manager') {
                viewByMan();
            };
            if (userOption === 'Add Employee') {
                addEmployee();
            };
            if (userOption === 'Remove Employee') {
                removeEmployee();
            };
            if (userOption === 'Update Employee Role') {
                updateRole();
            };
            if (userOption === 'View Budget By Department') {
                budgetByDepartment();
            };
            if (userOption === 'Exit') {
                connection.end();
            };
        })
};

const viewAllEmp = () => {
    const allQuery = `SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS Employee, 
    role.title AS 'Title', department.department_name AS 'Department', role.salary AS 'Salary'
    FROM employee, role, department
    WHERE department.id = role.department_id
    AND role.id = employee.role_id
    ORDER BY employee.id`
    connection.query(allQuery, (err, results) => {
        if (err) throw err;
        console.log('\n');
            console.log('VIEW ALL EMPLOYEES');
            console.log('\n');
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
            console.log('\n');
            console.log('VIEW EMPLOYEE BY DEPARTMENT');
            console.log('\n');
            console.table(results)
            initPrompt();
        });
    } catch (error) {
        console.log(error);
        initPrompt();
    }
};

const viewByMan = () => {
    try {
        const manQuery = `SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS manager, department.department_name AS department, employee.id,  CONCAT(employee.first_name, ' ', employee.last_name) AS employee, role.title
        FROM employee
        LEFT JOIN employee manager on manager.id = employee.manager_id
        INNER JOIN role ON (role.id = employee.role_id && employee.manager_id != 'NULL')
        INNER JOIN department ON (department.id = role.department_id)
        ORDER BY manager`
        connection.query(manQuery, (err, results) => {
            if (err) throw err;
            console.log('\n');
            console.log('VIEW EMPLOYEE BY MANAGER');
            console.log('\n');
            console.table(results)
            initPrompt();
        });
    } catch (error) {
        console.log(error);
        initPrompt();
    }
};

const addEmployee = () => {
    try {
        const roleQuery = `SELECT * from role`
        connection.query(roleQuery, async (err, results) => {
            if (err) throw err;
            await inquirer.prompt([
                {
                    name: 'firstName',
                    message: 'What is their first name?',
                    type: 'input',
                },
                {
                    name: 'lastName',
                    message: 'What is their last name?',
                    type: 'input',
                },
                {
                    name: 'role',
                    message: 'What is their role?',
                    type: 'list',
                    choices: results.map(role =>
                        role.title
                    ),
                },
            ]).then(function (response) {
                const chosenRole = results.find(role => role.title === response.role)
                connection.query('INSERT INTO employee SET ?', {
                    first_name: response.firstName,
                    last_name: response.lastName,
                    role_id: chosenRole.id,
                })
            })
            initPrompt();
        });
    } catch (error) {
        console.log(error);
        initPrompt();
    }
};

const removeEmployee = () => {
    try {
        const roleQuery = `SELECT * from employee`
        connection.query(roleQuery, async (err, results) => {
            if (err) throw err;
            await inquirer.prompt([
                {
                    name: 'employee',
                    message: 'Which employee would you like to remove?',
                    type: 'list',
                    choices: results.map(employee =>
                        employee.first_name
                    ),
                },
            ]).then(function (response) {
                const chosenEmp = results.find(employee => employee.first_name === response.employee)
                connection.query('DELETE FROM employee WHERE ?', {
                    id: chosenEmp.id,
                })
            })
            initPrompt();
        });
    } catch (error) {
        console.log(error);
        initPrompt();
    }
};

const updateRole = async () => {
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name: 'employee',
                message: 'Which employee would you like to update their role?',
                type: 'list',
                choices: results.map(employee => employee.first_name)
            },
        ]).then(function (response) {
            connection.query('SELECT * FROM role', (err, roleResponse) => {
                if (err) throw err;
                inquirer.prompt([
                    {
                        name: 'role',
                        message: 'What is their new role?',
                        input: 'list',
                        choices: roleResponse.map(role => role.title),
                    },
                ]);
                const newRole = roleResponse.find(role => role.title === response.role)

                connection.query('UPDATE employee SET role_id = ? WHERE first_name = ?', [newRole.id, first_name], (err, result) => {
                    if (err) throw err;
                })
            });
        });
    });
}

const budgetByDepartment = async () => {
    connection.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name: 'department',
                message: 'Which department budget would you like to view?',
                type: 'list',
                choices: results.map(department => department.department_name)
            },
        ])
    }).then(function (response) {
        const deptChoice = results.find(department => department.department_name === response.department_name)
        const deptQuery = `SELECT role.title AS 'Title', department.department_name AS 'Department', role.salary AS 'Salary'
                            FROM role, department
                            WHERE department_name = ?
                            AND department.id = role.department_id`
        connection.query(deptQuery, [deptChoice.department_name], (err, res) => {
            if (err) throw err;
            console.table(res);
        })
    });
}