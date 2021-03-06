"use strict"

const Pool = require("pg").Pool;

// access enviromental variables
require('dotenv').config();

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.DATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PORT
  });

pool.connect();

// Save visitor into database
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

// Return an array of visitor's names and ID
const viewVisitors = async () => {

  try {
    query = pool.query(
      "SELECT id, visitor_name FROM Visitors",
      []);

      return query.rows

  } catch(err){
     console.log(err)
  }
};

// Delete a visitor
const deleteVisitorId = async () => {
  try {
    query = pool.query(
      "DELETE FROM Visitors WHERE id = ${id}", []);


      return query.rows

  }catch(err){
    console.log(err)

  }
};

// Update a visitor
const updateVisitorId = async () => {

  try {

    query = pool.query(
      "UPDATE Visitors SET visitor_name = ${visitor_name}", []);

      return query.rows;

  } catch(err) {
    console.log(err);
  }

};

// Return visitor's info given an id
const viewVisitorId = async () => {

  try {
    
    query = pool.query(
      "SELECT * FROM Visitors WHERE id = ${id}", []);
    
      return query.rows

  } catch(err) {
    console.log(err)
  }
  
};

// Delete all visitors 
const deleteAllVisitors = async () => {

  try {
    
    query = pool.query(
      "DELETE FROM Visitors", []);

      await pool.end()
      return query.rows

  } catch(err) {
    console.log(err)
    await pool.end();
  }
};

module.exports = {
  addNewVisitor,
  viewVisitors,
  deleteVisitorId,
  updateVisitorId,
  viewVisitorId,
  deleteAllVisitors
}