const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true}
},{timestamps: true})

const productSchema = new mongoose.Schema({
    product_name: {type:String, required: true},
    product_desc: {type: String, required:true},
    prod_cat: {type: mongoose.Schema.Types.ObjectId,ref: 'Category'},
    prod_img: {type: String, required: true},
    prod_price: {type:Number, required:true}
},{timestamps: true})

const catSchema = mongoose.model('Category', categorySchema)
const prodSchema = mongoose.model('Product',productSchema)

module.exports = {catSchema, prodSchema}