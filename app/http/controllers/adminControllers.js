const {catSchema, prodSchema} = require('../../models/Product')
const orderSchema = require('../../models/Order')

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
        /**
         * I'm trying to save the data from the form to the database.
         * </code>
         
         */
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
        },

        
        /**
         * It's an async function that finds all orders in the database and sorts them by the date they
         * were created.
         * @param req - request
         * @param res - response object
         */
        async allOrders(req,res){
            try{
                const allOrders = await orderSchema.find({}).sort({createdAt:-1})
                res.render('admin/orders', {layout: 'layout/adminlayout',myOrders: allOrders})
            }
            catch(err){
                res.redirect('/admin')
            }
        },

        async updateOrderStatus(req,res){
            try{
                const updateStatus = await orderSchema.findByIdAndUpdate(req.body.orderId, {$set:{orderStatus:req.body.orderStatus}},{new: true}, function(err,result){
                    if (err) {
                        console.log(err);
                    }
                    res.status(200).json({message: 'Order Status Changed'})
                })
            }
            catch(err){

            }
        }
    }
}
module.exports = adminControllers