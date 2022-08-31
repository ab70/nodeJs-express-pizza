
function menuControllers(){
    return{
        menu(req,res){
            res.render('menu',{title:'Menus'})
        }
    }
}

module.exports = menuControllers