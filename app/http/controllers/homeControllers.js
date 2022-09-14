const res = require("express/lib/response")

function homeControllers(){
    return {
        index(req,res){
            res.render('form', {title: 'Pizza Web - Home'})
        },

        test(req,res){
            console.log(req.body);
        }

    }
}

module.exports = homeControllers