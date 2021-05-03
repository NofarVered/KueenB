const express = require('express');
const bodyParser = require('body-parser') 
const app = express();
const cors = require('cors')
const port = 3001;


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// const jwtKey = "my_secret_key"
// const jwtExpirySeconds = 300

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
app.use(bodyParser.json());
app.use(express.json());
app.use(
  bodyParser.urlencoded({ extended: true }))

app.listen(port, () => {
    console.log(`running on port ${port}.`)
  })

module.exports = {app, pool, bcrypt, jwt};