const express = require("express");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
 // const body_parser = require("body-parser");  
// const exp = require("constants");    
let port = 3000;

//express
const app = express();
app.use(express.static("./files"));
app.use(express.urlencoded());

//pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, 'views'));


// mongoose
mongoose.connect("mongodb://localhost/Dancer", {useNewUrlParser : true, useUnifiedTopology: true});

// mongoose Schema
var schema = new mongoose.Schema(
    {
        name : String,
        email : String,
        phone : String,
        age : String
    }
);

// mongoose model
var dancer = mongoose.model("dancer", schema);



app.get("/", (req, res)=>{
    res.render('index.pug', { PATH : path.join(__dirname, 'views')} );

})

app.get("/register", (req, res)=>{
    res.render('register.pug', { PATH : path.join(__dirname, 'views')} );  
})

app.post("/register", (req, res)=>{
    dancerdata = new dancer(req.body)
    dancerdata.save().then(() => {
        res.send("data added successfully");
    }).catch(()=>{
        res.send("error");
    });
    // console.log(req.body.json);
})

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})