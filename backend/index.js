
const server = require('./server');
const app = server.app;
const query= require('./queries');

app.get('/', (request, response) => {
    response.json({ info: 'It works!' })
  })

//readData
app.get("/registry", async (req, res) => {
    const rows = await query.readData();
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
        result.success = await query.createEmployee(reqJson.employees)
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
        result.success = await query.updateEmployee(reqJson.employee)
    }
    catch(e){
        result.success=false;
    }
    finally{
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }
   
})

//read the field max people in the office
app.get("/MaxPeople", async (req, res) => {
    const rows = await query.readMaxPeople();
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})

//update the field max people in the office
app.put("/MaxPeople", async (req, res) => {
    let result = {}
    console.log("hi2");
    try{
        const reqJson = req.body;
        console.log(reqJson.maxPeople);
        result.success = await query.updateMaxPeople(reqJson.maxPeople)
    }
    catch(e){
        result.success=false;
    }
    finally{
        console.log("hi1");
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }
})


