const express = require("express");
const bodyParser = require("body-parser");
const mySql = require("mysql");
const cors = require("cors");

const server = express();
server.use(bodyParser.json());
server.use(cors());


// Establishing the database connection.
const db = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "mojasifra",
  database: "dbsmschool"
});
db.connect((error) => {
  if (error) {
    console.log("Error connecting to Alexa's DB!");
  } else {
    console.log("Successfully connected to Alexa's DB!");
  }
});

// Establishing the Port.
server.listen(8085, (error) => {
  if (error) {
    console.log("Error....!!!");
  } else {
    console.log("Started....!!!!");
  }
});

// Creating the POST request.
server.post("/api/student/add", (req, res) => {
  let details = {
    name: req.body.name,
    course: req.body.course,
    fee: req.body.fee
  };
  let sql = "INSERT INTO student SET ?";
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: "Student creating failed! :(" });
    } else {
      res.send({ status: true, message: "Student created successfully! :D" });
    }
  });
});

// Viewing the records.
server.get("/api/student", (req, res) => {
  let sql = "SELECT * FROM student";
  db.query(sql, (error, result) => {
    if (error) {
      console.log("Error connecting to DB! :(")
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Search the records.
server.get("/api/student/:id", (req, res) => {
  let studentId = req.params.id;
  let sql = `SELECT * FROM student WHERE id=${studentId}`;
  db.query(sql, (error, result) => {
    if (error) {
      console.log("Error connecting to DB! :(")
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Update the records.
server.put("/api/student/update/:id", (req, res) => {
  let sql = `UPDATE student SET name='${req.body.name}', course='${req.body.course}',fee='${req.body.fee}' WHERE id=${req.params.id}`;
  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Student updating failed! :(" });
    } else {
      res.send({ status: true, message: "Student updated successfully! :)" });
    }
  });
});

// Delete the record.
server.delete("/api/student/delete/:id", (req, res) => {
  let sql = `DELETE FROM student WHERE id=${req.params.id}`;
  let query = db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "Student deleting failed :(" });
    } else {
      res.send({ status: true, message: "Student deleted successfully! :)" });
    }
  });
});