//--Server JS--
const express = require('express');
const app = express(); //here it returns a object of express module
const ejs = require('ejs');  //imported the ejs template engine
const path = require('path');   //inbuilt node js path finder of folders
const expressLayout = require('express-ejs-layouts');  //imported express-ejs template engine
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt =  require('jsonwebtoken');

var cookieParser = require('cookie-parser');

//configs dotenv file(.env)
dotenv.config()

//db configue 
const PORT = process.env.PORT || 3000;  //checks process if any port availablein (.env)  or use 3000

mongoose.connect(process.env.Mongoose_connect,{useNewUrlParser: true, useUnifiedTopology: true});


app.listen(PORT , ()=>{
    console.log(`Listening on ports ${PORT}`)
})
//cookie parser user
app.use(cookieParser());

//set template engine
app.use(expressLayout);

//set public folder
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('views', path.join(__dirname,'/resources/views'));   //sets views path in folder
app.set('layout',path.join(__dirname,'/resources/views/layout'));   //sets layout path for express in folder
app.set('view engine','ejs');                   //sets view engine as ejs

//includes routes(web.js)
require('./routes/web')(app);





