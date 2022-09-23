const e = require('express');
const Cart = require('../../models/Cart');

function cartControllers(){
    return{
        cart(req,res){
            res.render('cart',{ title: "Cart" })
        },
        
        updateCart(req,res){
           
            //for the first time cart create
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
            cart.items.forEach(element => {
                sum = sum + (element.pizzaQty * element.pizzaprice)
                qty = qty + element.pizzaQty
            });
            cart.totalPrice = sum
            cart.totalQuantity = qty

                return res.json({
                    fulCart: cart
                })

            
            
           
        }
    }
}
module.exports = cartControllers;