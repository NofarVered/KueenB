import express from 'express';

import settingsController from "../controllers/settings.js";

const settingsRouter = express.Router();

settingsRouter.use(function (req, res, next) {
    res.setHeader("content-type", "application/json");
    next()
});

//read the field max people in the office
settingsRouter.get("/MaxPeople", async (req, res) => {
    let maxPeople = await settingsController.getMaxPeople();
    res.send(JSON.stringify(maxPeople))
});

//read the field max people in the office
settingsRouter.put("/MaxPeople", async (req, res) => {
    let maxPeople = await settingsController.getMaxPeople(req, res);
    res.send(JSON.stringify(maxPeople))
});

export default settingsRouter
