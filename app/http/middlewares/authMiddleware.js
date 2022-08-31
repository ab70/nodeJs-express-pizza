const jwt = require('jsonwebtoken');


const  auth = (req, res, next)=>{
    const token = req.cookies.jwt_token;
    if(token){
        jwt.verify(token, process.env.jsonSec, (err, decodedToken)=>{
            if(err){
                res.redirect('/login');
            }
            else{

                //token value is stored in decodedToken
                //to see the token value: 
                console.log(decodedToken)
                next();
                
            }

        })
    }
    else{
        res.redirect('/login')
    }
}
module.exports = auth