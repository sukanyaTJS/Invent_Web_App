const express = require("express");
const app = express();
const connectDB  = require('./database/connection')
app.use(express.urlencoded({extended: false}));
app.use(express.json());
const dotenv = require("dotenv")
dotenv.config()
connectDB();

app.set("view engine", "ejs");

//load assets
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "pubblic/js"));



// load assets
app.use('/', require('./routes/router'))
 




app.listen(process.env.PORT, () => console.log("server running..."));




