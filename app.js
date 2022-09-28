const express = require("express");
const app = express();
// const mongoose = require("mongoose");
const connectDB  = require('./database/connection')
app.use(express.urlencoded({extended: false}));
app.use(express.json());

connectDB();

app.set("view engine", "ejs");

//load assets
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "pubblic/js"));



// load assets
app.use('/', require('./routes/router'))
 

// const employees = {
//   1: {name: "priyank"},

// }




app.listen(8000, () => console.log("server running..."));




