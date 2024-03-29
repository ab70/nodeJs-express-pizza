const e = require('express');
const Cart = require('../../models/Cart');



function cartControllers(){
    return{
        cart(req,res){
            res.render('cart',{ title: "Cart" })
        },
        
        //add item to cart
        /* A function that is used to update the cart. */
        updateCart(req,res){
           
            
            /* This is checking if the cart is empty. If it is empty, it will create a new cart. */
            if (!req.session.cart) {
                req.session.cart = {
                    items: [],
                    totalQuantity: 0,
                    totalPrice: 0
                }  
                var cart = req.session.cart;
                cart.items.push(req.body)
                
            }
           
            else{
                var cart = req.session.cart;
                const searchi = cart.items.find(e=> e.pizzaId == req.body.pizzaId && e.pizzaSize == req.body.pizzaSize )
                if (searchi) {
                    searchi.pizzaQty = searchi.pizzaQty+1
                    
                }
                else{
                    cart.items.push(req.body)
                }
               
            }
            var sum = 0
            var qty = 0

            /* Adding the quantity of the pizza and the price of the pizza. */
            cart.items.forEach(element => {
                sum = sum + (element.pizzaQty * element.pizzaprice)
                qty = qty + element.pizzaQty
            });
            cart.totalPrice = sum
            cart.totalQuantity = qty

                return res.json({
                    fulCart: cart
                })

            
            
           
        },
    }
}
module.exports = cartControllers;