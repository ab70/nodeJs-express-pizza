const jwt = require('jsonwebtoken');
const userSchema = require('../../models/User')



//user details fetching fuction
async function getData(id){
    const user = await userSchema.findById(id)
    const {password, ...others} = user._doc;
    return others;
}

const adminAuth = (req,res,next)=>{
    const token = req.cookies.jwt_token;
    if (token) {
        jwt.verify(token,process.env.jsonSec, async(err,decodedToken)=>{
            if (err) {
                req.session.currentUser = null
                res.redirect('/login')
                
            }
            else{
                if(decodedToken.role===true){
                    const data = await getData(decodedToken.id)
                    req.session.currentUser = data;
                    next()
                }
                else{
                    res.redirect('/login')
                }

            }
        })        
    }
    else{
        res.redirect('/login')
    }
}
const userAuth = (req,res,next)=>{
    const token = req.cookies.jwt_token;
    if (token) {
        jwt.verify(token,process.env.jsonSec, async(err,decodedToken)=>{
            if (err) {
                req.currentUser = null
                res.redirect('/login')
                
            }
            else{
                if(decodedToken.role===false){
                    const data = await getData(decodedToken.id)
                    req.currentUser = data;
                    next()
                }else{
                    res.redirect('/login')
                }

            }
        })        
    }
    else{
        res.redirect('/register')
    }
}

module.exports = {adminAuth,userAuth}