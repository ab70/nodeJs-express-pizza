

let card = null
async function stripe(){
    var secret = 'pk_test_51M27tqIIRU9ndlE9XQ1o3BVWLT5dMx0aA1esfrVUEGFt2gZdK1fzycdwC1CN1MwbpA4wmh00OkkciZYXhglDmmWw00Tu7QdUVZ'
    var stripe = Stripe(secret);
    
    // const elements = stripe.elements({secret,appearance});
    var elements = stripe.elements();
    
    
   
    card = elements.create('card', {
      hidePostalCode: true,
        style: {
          base: {
            iconColor: ' #FFFFFF',
            color: ' #FFFFFF',
            fontWeight: '400',
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
            fontSize: '16px',
            lineHeight: 2.5,
            fontSmoothing: 'antialiased',
            ':-webkit-autofill': {
              color: ' #FFFFFF',
            },
            '::placeholder': {
              color: ' #FFD700',
            },
          },
          invalid: {
            iconColor: '#FFC7EE',
            color: '#FFC7EE',
          },
        },
        
      });
    
    
    card.mount('#cardElement')
}

$(document).ready(function () {
    const paymentType = document.querySelector('#paymentType')
    if (!paymentType) {
      return;      
    }
    paymentType.addEventListener('change',(e)=>{
        console.log(e.target.value);
        if (e.target.value=='card') {
          stripe()
          
        }
        else{
          card.destroy()
        }

        
    })
    

});
    
 

    
