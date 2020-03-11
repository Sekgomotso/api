"use strict"

const express = require('express');
const bodyParser = require('body-parser');

// database info
const {addNewVisitor, deleteVisitorId, deleteAllVisitors, viewVisitors, viewVisitorId, updateVisitorId} = require('./functions');

// app set up
const app = express();

app.use(express.json());

// parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.DATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PORT
});
  
pool.connect();

// save visitor
app.post('/add_new_visit', async (req, res) => {

    let visitor_name = req.body.name;
    let visitors_age = req.body.age;
    let date_of_visit = req.body.date;
    let time_of_visit = req.body.time;
    let nameOfAssistant = req.body.assistant;
    let comment = req.body.comment;

    const person = await addNewVisitor(visitor_name, visitors_age, date_of_visit, time_of_visit, nameOfAssistant, comment)

  res.send(person)
});

// delete a single visitor
app.delete("/delete_visitor/:id", async (req, res) => {

  let id = req.param.id;

  if(!req.body.id){
    return res.status(400).send({
      success: 'false',
      message: 'specify id'
    })
  }

  const person = await deleteVisitorId(id);

  res.send(person.rows)
});

// delete all visitors
app.delete('/delete_visitor', async (req, res) => {
  
  const person = await deleteAllVisitors();

  res.status(200).json({
    status: 'okay',
    person: person
  })

});

// view all visitors
app.get('/view_all_visitors', async (req, res) => {

  const person = await viewVisitors();

  res.send(person.rows)

});

// view a single visitor
app.get('/view_visitor/:id', async (req, res) => {

  let id = req.param.id;

  if(!req.body.id){
    return res.status(400).send({
      success: 'false',
      message: 'specify id'
    })
  }

  const person = await viewVisitorId(id);

  res.status.json(person.rows)

})

// update a single visitor
app.put('/update_visitor/:id', async (req, res) => {

  let id = req.param.id; 

  const person = await updateVisitorId(id);

  res.send(person.rows)
  
})

const server = app.listen (3005, (req, res) => {
    console.log('server listening in port 3005')
});

module.exports = server;