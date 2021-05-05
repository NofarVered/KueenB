const server = require('./server');
const pool = server.pool;
var nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

//readData
async function readData() {
    try {
    const results = await pool.query('SELECT * FROM employees ORDER BY arrivalDate DESC');
    return results.rows;
    }
    catch(e){
        return [];
    }
}

//insert
async function createEmployee(employeeDetails){

    try {
        console.log(employeeDetails.arrivalDate);
        await pool.query(`INSERT INTO employees (email, name, HS, arrivalDate) VALUES ($1, $2, $3, $4)`,[employeeDetails.email, employeeDetails.name, employeeDetails.HS, employeeDetails.arrivalDate]);
        return true
        }
        catch(e){
            console.log(e);
            return false;
        }
}

//updateHS
async function updateEmployee(employeeDetails){

    try {
        console.log(employeeDetails.arrivalDate);
        await pool.query(`UPDATE employees SET hs=true WHERE email=$1 and arrivalDate=$2`,[employeeDetails.email, employeeDetails.arrivalDate]);
        const results = await pool.query('SELECT * FROM employees WHERE email=$1', [employeeDetails.email])
        console.log("data" , results.rows);
        
        return true
        }
        catch(e){
            console.log(e);
            return false;
        }
}


async function updateMaxPeople(maxPeople){
    try {   
        await pool.query(`UPDATE maxPeople SET numberOfPeople = $1 WHERE ID = $2`, [maxPeople, 1]);
        const results = await pool.query('SELECT * FROM maxPeople');
        return true
    }
    catch(e){
        console.log(e);
        return false;
    }
}

async function readMaxPeople() {
    try {
    const results = await pool.query('SELECT numberOfPeople FROM maxPeople');
    return results.rows;
    }
    catch(e){
        return [];
    }
}


//SIGN UP !!!! 
async function readSignUp() {
    try {
    const results = await pool.query('SELECT * FROM signup');
    return results.rows;
    }
    catch(e){
        return [];
    }
}

//insert
async function createNewSignup(employeeDetails){

    try {
        //we should validate before- check that there is no user with that email adress. TODO
        await pool.query(`INSERT INTO signup (email, name, password, verified) VALUES ($1, $2, $3, $4)`,[employeeDetails.email, employeeDetails.name, employeeDetails.password, false]);
        return true
        }
        catch(e){
            console.log(e);
            return false;
        }
}

// update signUP user from false to true
async function updateSignup(employeeDetails){
    try {
        await pool.query(`UPDATE signup SET verified=true WHERE email=$1`,[employeeDetails.email]);
        return true
        }
        catch(e){
            console.log(e);
            return false;
        }
}


//checkUserDetails(email, password)
async function checkUserDetails(email, password){
    try {
        const res = await pool.query('SELECT * FROM signup WHERE email = $1', [email]);
        if (res.rows.length >= 1) return res.rows;
        return false;
    }
    catch(e){
        console.log(e);
        return false;
    }
}

async function getUserName(email) {
    try {
        const res = await pool.query(`SELECT * FROM signup WHERE email = $1`,[email]);
        return res.rows;
        }
        catch(e){
            console.log(e);
            return [];
        }
}


module.exports = {readData, createEmployee, updateEmployee, updateMaxPeople, readMaxPeople, readSignUp, createNewSignup, updateSignup, getUserName, checkUserDetails};
