const mongoose = require('mongoose')


const OrderSchema = new mongoose.Schema({
    buyer: {type : mongoose.Schema.Types.ObjectId, ref: 'Users'},
    item: [{
        pizzaId: {type: String, required: true,trim:true},
        pizzaImg: {type:String,required:true,trim:true},
        pizzaName: {type: String, required: true, trim:true},
        pizzaQty: {type:Number, required:true},
        pizzaSize: { type: String, required:true,trim: true},
        pizzaprice: {type: Number, required: true}

    }],
    totalPrice: {type:Number,required:true},
    totatQuantity: {type:Number, required:true},
    deliveryAddress: {type:String, required: true, trim: true },
    paymentType : { type: String, trim:true,  required: true, default: 'cash'},
    paymentStatus: { type: String, enum: ['paid', 'due'], required: true, default: 'due' }
},{timestamps:true})

const orderschema = mongoose.model('Order', OrderSchema)

module.exports = orderschema