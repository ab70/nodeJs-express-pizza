const {catSchema, prodSchema} = require('../../models/Product')
const path = require('path')
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
            
        },
        //product post 
        async postProduct(req,res){
            try{
                console.log(req.body);
                const newProduct = new prodSchema({
                    product_name: req.body.productName,
                    product_desc: req.body.productDetails,
                    prod_cat: req.body.category,
                    prod_img: req.file.filename,
                    pro_price: req.body.pro
                })
                
               
                const addProduct = newProduct.save()
                if(addProduct){
                    res.redirect('/admin')
                }
                
            }
            catch(err){
                console.log(err);
            }
        }
    }
}
module.exports = adminControllers