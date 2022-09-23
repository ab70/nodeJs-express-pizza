const homeControllers = require('../app/http/controllers/homeControllers');
const authControllers = require('../app/http/controllers/authControllers');
const menuControllers = require('../app/http/controllers/menuControllers');
const contactControllers = require('../app/http/controllers/contactControllers');
const cartControllers = require('../app/http/controllers/cartControllers')
const adminControllers = require('../app/http/controllers/adminControllers');
const auth = require('../app/http/middlewares/authMiddleware');
//const uploads = require('../app/http/middlewares/upload')
//middlewares
const uploads = require('../app/http/middlewares/upload')

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
    app.get('/admin', adminControllers().dash )

    app.post('/savecat', adminControllers().saveCategory)
    app.post('/admin', uploads.single('productImage') , adminControllers().postProduct)
    

}

module.exports = initRoutes