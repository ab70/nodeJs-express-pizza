const { default: Stripe } = require('stripe');
const orderSchema = require('../../models/Order')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
function orderControllers() {
    return {
        //post order
        /**
         * It saves the order in the database and deletes the cart session.
         * 
         *
         */
        async placeOrder(req, res) {

            let data = req.session.cart
            let total = Number(data.totalPrice) + Number(process.env.DELIVERY_CHARGE);
            const newOrder = new orderSchema({
                buyer: req.currentUser._id,
                item: data.items,
                totalPrice: total,
                totatQuantity: data.totalQuantity,
                deliveryAddress: req.body.addressToDeliver,
                paymentType: req.body.paymentType
            })
            try {
                const saveOrder = await newOrder.save().then((results) => {

                    if (newOrder.paymentType == 'card') {
                        stripe.charges.create({
                            amount: req.session.cart.totalPrice * 100,
                            source: req.body.stripeToken,
                            currency: 'usd',
                            description: `Pizza order ${results._id}`
                        }).then(() => {
                            results.paymentStatus = 'paid';
                            results.save().then((r) => {
                                
                            }).catch(err => {
                                console.log(err);
                            })
                        }).catch(err => {
                            console.log(err);
                        })
                    }

                    delete req.session.cart;

                    res.json({
                        status: 200,
                        message: "Order Placed",
                        redirectLink: '/cart'
                    })
                })
            }
            catch (err) {
                res.redirect('/cart')
            }
        }

    }
}

module.exports = orderControllers