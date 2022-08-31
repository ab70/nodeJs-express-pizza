
function dashControllers(){
    return{
        user(req,res){
            res.render('dashboard',  { title: 'Pizza Web - User Dash'})
        }
    }
}
module.exports = dashControllers