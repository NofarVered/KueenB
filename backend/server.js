const express = require('express');
const app = express();
const cors = require('cors')
const port = 3001;
const Pool = require('pg').Pool
const pool = new Pool({
  host: 'localhost', //when we run localy
  //when we want to run with docker we need to change to postgers
  port: 5432,
  user: 'admin',
  password: 'p',
  database: 'testdata'
})
app.use(cors());


app.listen(port, () => {
    console.log(`running on port ${port}.`)
  })

module.exports = {app, pool};