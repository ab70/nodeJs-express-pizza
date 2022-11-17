const { clearCookie } = require("express/lib/response");


function userControllers(){
    return{
        //user dashboard home
        userDash(req,res){
            res.render('user/Dashboard', {layout:'layout/userLayout'})
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