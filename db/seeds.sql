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
VALUES ("Mark", "Smith",1,null),
       ("Liam", "Johnson",2,1),
       ("Noah","Miller",3,1),
       ("Ava","Davis",4,null),
       ("Olivia","Garcia",5,4),
       ("Emma","Williams",6,1),
       ("Elijah","Anderson",1,3);