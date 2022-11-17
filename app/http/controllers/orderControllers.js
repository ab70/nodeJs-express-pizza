const orderSchema = require('../../models/Order')
function orderControllers() {
    return {
        //post order
        async placeOrder(req, res) {
            
            let data= req.session.cart
            let total = Number(data.totalPrice) + Number(process.env.DELIVERY_CHARGE);
            const newOrder = new orderSchema({
                buyer: req.currentUser._id,
                item: data.items,
                totalPrice: total ,
                totatQuantity: data.totalQuantity,
                deliveryAddress: req.body.addressToDeliver
            })
            try{
                const saveOrder = await newOrder.save().then((docs)=>{
                    
                    delete req.session.cart;
                    
                    res.redirect('/cart')
                })
            }
            catch(err){
                res.redirect('/cart')
            }
        }

    }
}

module.exports = orderControllers