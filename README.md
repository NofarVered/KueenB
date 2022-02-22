HR-app for Khealth employees, frontend(React)+server(Node.js)+backend(PostgreSQL).

# KueenB project

How to run the project locally:

1. open the terminal in the KueenB folder
2. use the commend `docker-compose up`


3. **create the DB :**
- open a **new** terminal in the KueenB folder
- use the command : `docker exec -it postgres psql -U postgres`
- you should see a new line at the terminal starting with postgres=# 
- use the command : `CREATE ROLE admin WITH LOGIN PASSWORD 'p';`
- you should see a new line at the terminal saying : CREATE ROLE
- use the command : `CREATE DATABASE testdata WITH OWNER admin;`
- you should see a new line at the terminal saying : CREATE DATABASE
- use the command : `\c testdata admin`
- you should see a new line at the terminal saying : You are now connected to database "testdata" as user "admin".
- use the command : `CREATE TABLE employees (ID SERIAL PRIMARY KEY, email TEXT, name TEXT, HS BOOLEAN, arrivalDate TEXT);`
- you should see a new line at the terminal saying : CREATE TABLE
- use the command : `INSERT INTO employees (email, name, HS, arrivalDate) VALUES ('John', 'Doe', FALSE, '2021-01-01');`
- you should see a new line at the terminal saying : INSERT 0 1
- use the command: `CREATE TABLE maxPeople (ID SERIAL PRIMARY KEY, numberOfPeople int);`
- use the command: `INSERT INTO maxPeople (numberOfPeople) VALUES (15);`


4. open a **new** terminal in the frontend folder
5. use the commend `npm run dev`



