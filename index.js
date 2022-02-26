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

start()
