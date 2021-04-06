
const server = require('./server');
const app = server.app;
const {readData, createEmployee, updateEmployee} = require('./index');


app.get('/', (request, response) => {
    response.json({ info: 'It works!' })
  })

//readData
app.get("/registry", async (req, res) => {
    const rows = await readData();
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})

//insert
app.post("/registry", async (req, res) => {
    let result = {}
    console.log(req.body);
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