import express from 'express';

import employeeController from "../controllers/employee.js";

const registryRouter = express.Router();

registryRouter.use(function (req, res, next) {
    res.setHeader("content-type", "application/json");
    next()
});

registryRouter.get("/registry", async (req, res) => {
    let employees = await employeeController.fetchAllEmployees();
    res.send(JSON.stringify(employees))
});


registryRouter.post("/registry", async (req, res) => {
    let result = await employeeController.registerEmployee(req, res);
    res.send(JSON.stringify(result))
});


registryRouter.put("/registry", async (req, res) => {
    let result = await employeeController.updateHealthStatement(req, res)
    res.send(JSON.stringify(result))
});




export default registryRouter
