const { loadStripe } = require("@stripe/stripe-js");
const { default: axios } = require("axios");






$(document).ready(async function () {

let card = null

var secret = 'pk_test_51M27tqIIRU9ndlE9XQ1o3BVWLT5dMx0aA1esfrVUEGFt2gZdK1fzycdwC1CN1MwbpA4wmh00OkkciZYXhglDmmWw00Tu7QdUVZ'

let stripe = await loadStripe(secret);


async function stripefun(){
    
    
    
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

    const paymentType = document.querySelector('#paymentType')
    if (!paymentType) {
      return;      
    }
    /* Listening to the change event of the paymentType select element. */
    paymentType.addEventListener('change',(e)=>{ 
        console.log(e.target.value);
        if (e.target.value=='card') {
          stripefun()  
        }
        else{
          card.destroy()
        }

        
    })

    //post data
    
    var formDatas = document.querySelector('#orderForm')
    $('#orderNow').on('click', async function (e) {
      e.preventDefault() 
      let formData = new FormData(formDatas)
      let formObj = {}
      for(let [key,value] of formData.entries()){
        formObj[key] =value 
      }

      
      /* This is for the case when the user selects the payment type as cash on delivery. In that case,
      we don't need to create a token. So, we are just posting the form data to the server. */
      if(!card){
        axios.post('/placeorder', formObj).then((res)=>{
          window.location.replace(res.data.redirectLink)
        })
        console.log(formObj);
        return;

      }
      
      
        
        /* This is creating a token from the card element. */
        await stripe.createToken(card).then(res=>{
            formObj.stripeToken = res.token.id
            axios.post('/placeorder', formObj).then((response)=>{
              window.location.replace(response.data.redirectLink)
            })
          }).catch(err=>{
            console.log(err);
          })
    });
});
    
 

    
