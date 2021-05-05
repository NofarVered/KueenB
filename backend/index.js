
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
    console.log(rows);
    res.send(JSON.stringify(rows))
})

//update the field max people in the office
app.put("/MaxPeople", async (req, res) => {
    let result = {}
    try{
        const reqJson = req.body;
        result.success = await query.updateMaxPeople(reqJson.maxPeople)
    }
    catch(e){
        result.success=false;
    }
    finally{
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }
})


app.get("/sign-up", async (req, res) => {
    const rows = await query.readSignUp();
    res.setHeader("content-type", "application/json")
    console.log(rows);
    res.send(JSON.stringify(rows))
})

const express = require('express')
const bcrypt = require('bcrypt')
app.use(express.json())

app.get("/login", async (req, res) => {
    const email = req.query.email;
    const password = req.query.password;
    const user = await query.checkUserDetails(email);
    console.log('user ' + JSON.stringify(user[0].password))
    const match = user ? await bcrypt.compare(password, user[0].password) : false;
    if (match) {
        const name = JSON.stringify(user[0].name);
        res.send(name);
    } else res.send(null);
})

app.post("/sign-up", async (req, res) => {
    let result = {}
    try{
        const reqJson = req.body;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(reqJson.employees.password, saltRounds);
        reqJson.employees.password = hashedPassword;
        result.success = await query.createNewSignup(reqJson.employees);
    }
    catch(e){
        result.success=false;
    }
    finally{
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }
   
})
//updateSIGN
app.put("/sign-up", async (req, res) => {
    let result = {}
    try{
        const reqJson = req.body;
        result.success = await query.updateSignup(reqJson.employee)
    }
    catch(e){
        result.success=false;
    }
    finally{
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }
})

app.get("/user-name", async (req, res) => {
    const email = req.query.email;
    const result = await query.getUserName(email);
    const name = JSON.stringify(result[0].name);
    console.log('username ' + name);
    res.send(name);
})

app.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.employees.email });

    try{
        const match = await bcrypt.compare(req.body.employees.password, user.password);
        const accessToken = jwt.sign(JSON.stringify(user), process.env.TOKEN_SECRET)
        if(match){
            res.json({ accessToken: accessToken });
        } else {
            res.json({ message: "Invalid Credentials" });
        }
    } catch(e) {
        console.log(e)
    }
});


