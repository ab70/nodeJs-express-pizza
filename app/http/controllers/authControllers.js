const res = require("express/lib/response")
const User = require('../../models/User')

function authControllers() {
   return {
      login(req, res) {
         res.render('login')
      },
      register(req, res) {
         res.render('register',{success:''})
      },
      async reguser(req, res) {
         const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address
         })
         try {
            const saveUser = await newUser.save();
            res.render('register',{success:'Your registration done Successfully!!'});
         }
         catch (err) {
            console.log(err)
            res.render('register',{success:'Failed to register account.'})
         }

      }
   }
}

module.exports = authControllers