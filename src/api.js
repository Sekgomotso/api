"use strict"

const express = require('express');
const bodyParser = require('body-parser');

// app set up
const app = express();

app.use(express.json());

// parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

const Pool = require("pg").Pool;

const pool = new Pool({
    user: "user",
    host: "localhost",
    database: "prospective_umuzi_students",
    password: "pass",
    port: 5432
  });
  
  pool.connect();

// form route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/form.html"));
  });

app.post('/new_visit', async (req, res) => {

    let visitor_name = req.body.name;
    let visitors_age = req.body.age;
    let date_of_visit = req.body.date;
    let time_of_visit = req.body.time;
    let nameOfAssistant = req.body.assistant;
    let comment = req.body.comment;

    const visitor = await addNewVisitor(visitor_name, visitors_age, date_of_visit, time_of_visit, nameOfAssistant, comment)

    res.render('/form', {
        id: visitor[0].id,
        visitor_name: req.body.name,
        visitors_age : req.body.age,
        visitors_date: req.body.date,
        time_of_visit: req.body.time,
        nameOfAssistant: req.body.assistant,
        comment: req.body.comment
    })
})

// create new visitor in the database
const addNewVisitor = async(name, age, date, time, nameOfAssistant, comment) => {

    try{
    
      query = await pool.query(
        "INSERT INTO Visitors (visitor_name, visitors_age, date_of_visit, time_of_visit, assistant, comments) values ($1, $2, $3, $4, $5, $6)", 
        [name, age, date, time, nameOfAssistant, comment]);
  
        return query.rows
  
    } catch(err) {
      console.log(err)
  
    }
};

app.listen (3005, (req, res) => {
    console.log('server listening in port 3005')
});