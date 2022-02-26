INSERT INTO departments (department)
VALUES ("Development"),
       ("Customer Service"),
       ("Billing"),
       ("Sales"),
       ("Engineering");

INSERT INTO roles (title, salary, department_id)
VALUES ("Front End Developer", 80000, 1),
       ("Back End Developer", 90000, 1),
       ("Customer Consultant", 45000, 2),
       ("Accountant", 75000, 3),
       ("Sales-man", 55000, 4),
       ("Server Maintainer", 85000, 5);
       

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Mark", "Hammel",1,null),
       ("Samuel", "Jackson",2,1),
       ("Hayden","Christiansen",3,1),
       ("George","Lucas",4,null),
       ("Harrison","Ford",5,4),
       ("Carrie","Fisher",6,1),
       ("Dominic","Torreto",1,3);