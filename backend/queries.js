const server = require('./server');
const pool = server.pool;

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
        await pool.query(`UPDATE maxPeople SET maxPeople=maxPeople`);
        const results = await pool.query('SELECT * FROM maxPeople');
        console.log("maxPeople" , results.rows);

        return true
    }
    catch(e){
        console.log(e);
        return false;
    }
}


module.exports = {readData, createEmployee, updateEmployee, updateMaxPeople};