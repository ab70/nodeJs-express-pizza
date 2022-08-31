const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_name: {type:String, required: true},
    product_desc: {type: String, required:true},
    prod_cat: {type: Array},
    prod_img: {type: String},
    prod_price: {type:Number, required:true}
},{timestamps: true})

module.exports = mongoose.model('Product',productSchema)
