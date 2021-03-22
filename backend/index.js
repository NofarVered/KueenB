const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3001
const Pool = require('pg').Pool
const pool = new Pool({
  host: 'localhost', //when we run localy
  //when we want to run with docker we need to change to postgers
  port: 5432,
  user: 'admin',
  password: 'p',
  database: 'testdata'
})
app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({ extended: true })
)
app.get('/', (request, response) => {
  response.json({ info: 'It works!' })
})


//readData
app.get("/registry", async (req, res) => {
    const rows = await readData();
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})

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
app.post("/registry", async (req, res) => {
    let result = {}
    try{
        const reqJson = req.body;
        console.log(reqJson.employees);
        result.success = await createEmployee(reqJson.employees)
    }
    catch(e){
        result.success=false;
    }
    finally{
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }
   
})

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

app.put("/registry", async (req, res) => {
    let result = {}
    try{
        const reqJson = req.body;
        console.log(reqJson.employee);
        result.success = await updateEmployee(reqJson.employee)
    }
    catch(e){
        result.success=false;
    }
    finally{
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }
   
})

async function updateEmployee(employeeDetails){

    try {
        console.log(employeeDetails.arrivalDate);
        await pool.query(`UPDATE employees SET HS=true WHERE email=$1 and arrivalDate=$2`,[employeeDetails.email, employeeDetails.arrivalDate]);
        return true
        }
        catch(e){
            console.log(e);
            return false;
        }
}


app.listen(port, () => {
  console.log(`running on port ${port}.`)
})