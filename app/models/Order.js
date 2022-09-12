const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    buyer: {type : mongoose.Schema.Types.ObjectId, ref: 'Users'},
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]
})