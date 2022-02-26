const inquirer = require("inquirer")
const mysql = require("mysql2")
require('dotenv').config();

const sql = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
)

function start() {
    const menu = () => {
        return inquirer.prompt([
            {
                type: "list",
                name: "menuChoice",
                message: "Please select of the following:",
                choices: [
                    "view all departments",
                    "view all roles",
                    "view all employees",
                    "add a department",
                    "add a role",
                    "add an employee",
                    "update an employee role",
                    "quit"
                ]
            }
        ])
    }
    menu()
        .then((data) => {
            switch (data.menuChoice) {
                case "view all departments":
                    return viewDept()
                case "view all roles":
                    return viewRole()
                case "view all employees":
                    return viewEmployees()
                case "add a department":
                    return addDept()
                case "add a role":
                    return addRole()
                case "add an employee":
                    return addEmployee()
                case "update an employee role":
                    return updateEmployeeRole()
                case "quit":
                    return quit()

            }
        })
}

function viewDept() {
    const showDept = () => {
        sql.query("SELECT * FROM departments", (err, results) => { console.table(results) });
        setTimeout(() => {
            start();
        }, 100);
    }
    showDept()
}

function viewRole() {
    const showRole = () => {
        sql.query("SELECT title, salary, department FROM roles INNER JOIN departments ON roles.department_id = departments.id;", (err, results) => { console.table(results) });
        setTimeout(() => {
            start();
        }, 100);
    }
    showRole()
}

function viewEmployees() {
    const showEmployees = () => {
        sql.query("SELECT employees.id,first_name,last_name,title,department,salary,employees.manager_id FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id;", (err, results) => { console.table(results) });
        setTimeout(() => {
            start();
        }, 100);
    }
    showEmployees()
}

function addDept() {
    const newDept = () => {
        return inquirer.prompt([
            {
                type: "input",
                name: "deptName",
                message: "Please enter a new Department name to add:"
            }
        ])
    }
    newDept()
        .then((data) => {
            sql.query(`INSERT INTO departments(department) VALUES("${data.deptName}")`, (err, results) => { console.log("Department Added") })
        })
        .then((data) => {
            sql.query(`SELECT *FROM departments`, (err, results) => { console.table(results) })
        })
        .then((data) => {
            setTimeout(() => {
                start();
            }, 100);
        })
}
function addRole() {
    const newRole = () => {
        let dtd = []
        sql.query("select * from departments", (err, results) => { addDTd(results) })
        function addDTd(value) {
            for (let i = 0; i < value.length; i++) {
                dtd.push({
                    name: value[i]["department"],
                    value: value[i]["id"]
                })
            }
        }
        console.log(dtd)
        return inquirer.prompt([
            {
                type: "input",
                name: "roleName",
                message: "Please enter a new role to add:"
            },
            {
                type: "input",
                name: "salary",
                message: "Please enter this role's salary:"
            },
            {
                type: "list",
                name: "deptChoice",
                message: "Please select of the following:",
                choices: dtd
            }
        ])
    }
    newRole()
        .then((data) => {
            console.log(data)
            sql.query(`INSERT INTO roles(title, salary, department_id) VALUES("${(data.roleName)}","${data.salary}","${data.deptChoice}")`, (err, results) => {
                if (err) {
                    throw err
                }
                console.log(results)
            })
        })
        .then((data) => {
            sql.query(`SELECT *FROM roles`, (err, results) => { console.table(results) })
        })
        .then((data) => {
            setTimeout(() => {
                start();
            }, 100);
        })
}


start()
