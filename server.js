const express = require('express');
const app = express(); //here it returns a object of express module
const ejs = require('ejs');  //imported the ejs template engine
const path = require('path');   //inbuilt node js path finder of folders
const expressLayout = require('express-ejs-layouts');  //imported express-ejs template engine
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

const PORT = process.env.PORT || 3000;  //checks process if any port available or use 3000
mongoose.connect(process.env.Mongoose_connect).then(()=>{console.log(`Databse connected`)}).catch((err)=>{console.log("not connected")})

app.listen(PORT , ()=>{
    console.log(`Listening on ports ${PORT}`)
})

//set template engine
app.use(expressLayout);
//set public folder
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('views', path.join(__dirname,'/resources/views'));
app.set('layout',path.join(__dirname,'/resources/views/layout'));
app.set('view engine','ejs');

//includes routes
require('./routes/web')(app);





