const res = require("express/lib/response")
const User = require('../../models/User')
const CryptoJS = require('crypto-js');
const { status } = require("express/lib/response");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

function authControllers() {
   return {
      login(req, res) {
         res.render('login',{layout: 'layout/layout' , title: 'Login'})
      },
      //login functions(POST)
      async loginauth(req,res){
         try {
            const user = await User.findOne({email:req.body.email});
            if(!user){
               //res.status(400).json("No account Exists on this email");
               res.render('login',authControllers().login);
            }
            
            else{
               const hasedPass = CryptoJS.AES.decrypt(user.password, process.env.SECRET_key).toString(CryptoJS.enc.Utf8);
               if(hasedPass!==req.body.password){
                  res.status(401).json("Wrong credential");
               }
               if(hasedPass==req.body.password){
                 // return res.status(200).json("Logged in");
                   
                   const token = jwt.sign({id: user._id, role: user.isAdmin}, process.env.jsonSec,{expiresIn:'1h'});
                    res.cookie('jwt_token', token ).redirect('/dashboard');
                  //This is used to seperate password from the response or json
                  const  { password, ...others } = user._doc;
                  //console.log(others) //here printing that excluded value
                  res.status(200).json(others)
               }
            }
            
         }
         catch(err){
            res.render('login',{success:'Failed to login account.', title: "login"})
         }
      },
      register(req, res) {
         res.render('register',{success:'',title: 'Register'})
      },

      //register user -jwt auth
      async reguser(req, res) {
         const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password:  CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_key),
            address: req.body.address
         })
         try {
            const saveUser = await newUser.save();
            res.render('register',{success:'Your registration done Successfully!!',title:'Register'});
         }
         catch (err) {
            console.log(err)
            res.render('register',{success:'Failed to register account.', title: "REgister"})
         }

      }
   }
}

module.exports = authControllers