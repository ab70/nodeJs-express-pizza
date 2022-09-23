// const axios = require('axios').default;
//  import axios from "axios";
let cartCount = document.querySelector('#cartCounter')


function updateCart(pizza){
    
    axios.post('/update-cart',pizza).then(res=>{
        console.log(res);
        cartCount.innerText = res.data.fulCart.totalQuantity
    })
    
}

document.querySelectorAll('#addToCart').forEach(
function(btn){
    btn.addEventListener('click', function(e){
        e.preventDefault()
        var pizzaname = this.dataset.pizzaname
        var pizzaid = this.dataset.pizzaid
        var pizzaImage = this.dataset.pizzaimg
        var pizzaprice = Number(this.dataset.pizzaprice)
        var pizzasize = this.dataset.pizzasize
        var pizza = {
            pizzaId : pizzaid,
            pizzaImg : pizzaImage,
            pizzaName: pizzaname,
            pizzaSize: pizzasize,
            pizzaprice: pizzaprice,
            pizzaQty : 1
        }
        updateCart(pizza)
    })
}
)


