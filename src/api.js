"use strict"

const express = require('express');
const app = express();

app.use(express.json())

const Pool = require("pg").Pool;

require('dotenv').config();

const pool = new Pool({
  user: "user",
  host: "localhost",
  database: "prospective_umuzi_students",
  password: "pass",
  port: 5432
});

pool.connect();

app.get('/', (req,res,next)=>{
    res.addNewVisitor.json({
        addNewVisitor: "ok"
    })
})

app.post('/', (req, res)=>{

    addNewVisitor(
         req.body.name,
         req.body.age,
         req.body.date,
         req.body.time,
         req.body.assistant,
         req.body.comment

    )
})

// Save visitor into database
const addNewVisitor = async(name, age, date, time, nameOfAssistant, comment) => {

    try{
    
      query = await pool.query(
        "INSERT INTO Visitors (visitor_name, visitors_age, date_of_visit, time_of_visit, assistant, comments) values ($1, $2, $3, $4, $5, $6)", 
        [name, age, date, time, nameOfAssistant, comment]);
  
        return query.rows
  
    } catch(error) {
      console.log(error)
  
    }
};

addNewVisitor('Jobe', 27, '01/09/2020','10:00','Tumi', 'Lovely.');

app.listen (3005, (req, res) => {
    console.log('server listening in port 3005')
});