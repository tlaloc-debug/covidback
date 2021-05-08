const { Pool } = require('pg');
const { parse } = require('pg-connection-string')
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const connectionString = process.env.DATABASE_URL;
const config = parse(connectionString)
const app=express();

app.use(cors());
app.use(bodyparser.json());

config.ssl = {
    rejectUnauthorized: false
  }
const pool = new Pool(config)

var sympA=false;
var sympB=false;
var sympC=false;
var sympD=false;
var sympE=false;
var sympF=false;
var sympG=false;
var sympH=false;
var sympI=false;
var sympJ=false;
var sympK=false;
var sympL=false;
var sympM=false;

var date;
var sintom;

app.post("/senddata", (req,res) => {
    
    sintom=req.body.sintoma;
    console.log(sintom)
    if (sintom==="sympa") {sympA=true}
    if (sintom==="sympb") {sympB=true}
    if (sintom==="sympc") {sympC=true}
    if (sintom==="sympd") {sympD=true}
    if (sintom==="sympe") {sympE=true}
    if (sintom==="sympf") {sympF=true}
    if (sintom==="sympg") {sympG=true}
    if (sintom==="symph") {sympH=true}
    if (sintom==="sympi") {sympI=true}
    if (sintom==="sympj") {sympJ=true}
    if (sintom==="sympk") {sympK=true}
    if (sintom==="sympl") {sympL=true}
    if (sintom==="sympm") {sympM=true}
    console.log(sintom)
    res.send("done");
})

app.get("/negative", (req, res) => {
    pool.query("INSERT INTO welders (name, general, sympa, sympb, sympc, sympd, sympe, sympf, sympg, symph, sympi, sympj, sympk, sympl, sympm, date) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)", ['Erick Diaz', false, false, false, false, false, false, false, false, false, false, false, false, false, false, '2015-10-21' ], function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
        console.log(result);
        res.send(result);
    });  
});

app.get("/positive", (req, res) => {
    pool.query("INSERT INTO welders (name, general, sympa, sympb, sympc, sympd, sympe, sympf, sympg, symph, sympi, sympj, sympk, sympl, sympm, date) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)", ['Erick Diaz', true, sympA, sympB, sympC, sympD, sympE, sympF, sympG, sympH, sympI, sympJ, sympK, sympL, sympM, '2015-10-21' ], function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
        console.log(result);
        res.send(result);
    });  
});

app.get("/resconsulta", (req, res) => {
    pool.query("SELECT name FROM welders where date like '2015-10-21'", function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
        console.log(result.rows);
        res.send(result.rows);
    });  
});

app.get("/resconsultb", (req, res) => {
    pool.query("SELECT name FROM welders where general=$1 and date like '2015-10-21'", [true], function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
        res.send(result.rows);
    });  
});

app.get("/resconsultc", (req, res) => {
    pool.query("SELECT * FROM welders where general=$1 and date like '2015-10-21'", [true], function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
        console.log(result.rows);
        res.send(result.rows);
    });  
});

app.get("/reset", (req, res) => {
    pool.query("DELETE from welders where name='Erick Diaz'", function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
        console.log(result);
        res.send(result);
        sympA=false;
        sympB=false;
        sympC=false;
        sympD=false;
        sympE=false;
        sympF=false;
        sympG=false;
        sympH=false;
        sympI=false;
        sympJ=false;
        sympK=false;
        sympL=false;
        sympM=false;
    });  
});

app.listen(process.env.PORT, () => {
    console.log("running")
});