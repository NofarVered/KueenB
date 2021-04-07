const express = require("express");
const app = express();

app.get("/", (request, response) => {
  response.json({ info: "It works!" });
});

module.exports = app;
