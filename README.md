# KueenB project

## How to run the project ?

1. go to : docker-compose.yml
2. change the line `POSTGRES_USER: 'admin'` to a comment (by adding `#` at the beginning) - don't forget to save !
3. open the terminal in the KueenB folder
4. use the commend `docker-compose up`
5. **create the DB :**
    - open a **new** terminal in the KueenB folder
    - use the command : `docker exec -it postgres psql -U postgres`
    - you should see a new line at the terminal starting with 'postgres=#'
    - use the command : `CREATE ROLE admin WITH LOGIN PASSWORD 'p';`
    - you should see a new line at the terminal saying : 'CREATE ROLE'
    - use the command : `CREATE DATABASE testdata WITH OWNER admin;`
    - you should see a new line at the terminal saying : 'CREATE DATABASE'
    - use the command : `\c testdata admin`
    - you should see a new line at the terminal saying : You are now connected to database "testdata" as user "admin".
    - use the command : `CREATE TABLE employees (ID SERIAL PRIMARY KEY, email TEXT, name TEXT, HS BOOLEAN, arrivalDate TEXT);`
    - you should see a new line at the terminal saying : 'CREATE TABLE'
    - use the command : `INSERT INTO employees (email, name, HS, arrivalDate) VALUES ('John', 'Doe', FALSE, '2021-01-01');`
    - you should see a new line at the terminal saying : 'INSERT 0 1'
6. open a **new** terminal in the backend folder
7. use the commend `npm install cors express pg`
8. use the commend `node index.js`
9. open a **new** terminal in the frontend folder
10. use the commend `npm start`
