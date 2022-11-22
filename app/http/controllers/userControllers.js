const { clearCookie } = require("express/lib/response");
const orderSchema = require('../../models/Order')

function userControllers(){
    return{
        //user dashboard home
        async userDash(req,res){
            try{
                const myOrders = await orderSchema.find({buyer: req.session.currentUser._id})
                res.render('user/Dashboard', {layout:'layout/userLayout', myOrders: myOrders})
            }
            catch(err){
                res.redirect('/login')

            }
            
        },
        //logout users
        logOut(req,res){
            res.clearCookie('jwt_token')
            delete req.session.currentUser;
            res.redirect('/login')
        }



    }
}

module.exports = userControllers