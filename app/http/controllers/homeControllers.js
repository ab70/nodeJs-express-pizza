const res = require("express/lib/response")

function homeControllers(){
    return {
        index(req,res){
            res.render('home', {title: 'Pizza Web - Home'})
        }
    }
}

module.exports = homeControllers