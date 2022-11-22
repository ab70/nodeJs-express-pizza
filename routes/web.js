const homeControllers = require('../app/http/controllers/homeControllers');
const authControllers = require('../app/http/controllers/authControllers');
const menuControllers = require('../app/http/controllers/menuControllers');
const contactControllers = require('../app/http/controllers/contactControllers');
const cartControllers = require('../app/http/controllers/cartControllers')
const adminControllers = require('../app/http/controllers/adminControllers');
const userControllers = require('../app/http/controllers/userControllers')

//const uploads = require('../app/http/middlewares/upload')
//middlewares
const uploads = require('../app/http/middlewares/upload')
const {userAuth,adminAuth} = require('../app/http/middlewares/authMiddleware');
const orderControllers = require('../app/http/controllers/orderControllers');
const res = require('express/lib/response');


function initRoutes(app) {

    app.get('/', homeControllers().index )
    
    app.get('/login', authControllers().login)
    app.post('/login', authControllers().loginauth)
    app.get('/register', authControllers().register)
    app.post('/register', authControllers().reguser)
    app.get('/contact', contactControllers().contact)
    app.get('/cart', cartControllers().cart)
    app.post('/update-cart', cartControllers().updateCart)
    

    app.get('/menu', menuControllers().menu)

    //adminPanel
    app.get('/admin',adminAuth, adminControllers().dash )
    app.post('/savecat',adminAuth, adminControllers().saveCategory)
    app.post('/admin',adminAuth, uploads.single('productImage') , adminControllers().postProduct)
    app.get('/allorders', adminAuth, adminControllers().allOrders)
    app.post('/updateOrderStatus', adminAuth, adminControllers().updateOrderStatus)


    //user
    app.get('/user', userAuth, userControllers().userDash)
    app.post('/placeorder', userAuth, orderControllers().placeOrder)
    

    //logout
    app.get('/logout' ,userControllers().logOut)
}

module.exports = initRoutes