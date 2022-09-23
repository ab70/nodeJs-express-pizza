const res = require("express/lib/response")
const {catSchema, prodSchema} = require('../../models/Product')

function homeControllers(){
    return {
        async index(req,res){
            const product = await prodSchema.find()
            
            res.render('home', {title: 'Pizza Web - Home' , product: product})
        },

       

    }
}

module.exports = homeControllers