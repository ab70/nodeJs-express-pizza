const {catSchema, prodSchema} = require('../../models/Product')
function adminControllers(){
    return{
        //get admin Dash
        async dash(req,res){
            const allCat = await catSchema.find()
            
            res.render('admin/adminDash',  {layout: 'layout/adminlayout', title: 'Pizza Web - Admin Dash', category: allCat})
        },

        //post category
        async saveCategory(req,res){
            try{
                const newcat = new catSchema({
                    name : req.body.catName
                })
    
                const category = await newcat.save()
                if(category){
                    res.json({
                        status: 200,
                    })
                }

            }
            catch(err){
                console.log(err);
            }
            
        }
    }
}
module.exports = adminControllers