const homeControllers = require('../app/http/controllers/homeControllers');
const authControllers = require('../app/http/controllers/authControllers');
const menuControllers = require('../app/http/controllers/menuControllers');
const contactControllers = require('../app/http/controllers/contactControllers');
const adminControllers = require('../app/http/controllers/adminControllers');
const auth = require('../app/http/middlewares/authMiddleware');

//middlewares
const uploads = require('../app/http/middlewares/upload')

function initRoutes(app) {
    app.get('/', homeControllers().index )
    app.post('/', homeControllers().test)
    app.get('/login', authControllers().login)
    app.post('/login', authControllers().loginauth)
    app.get('/register', authControllers().register)
    app.post('/register', authControllers().reguser)
    app.get('/contact', contactControllers().contact)
    

    app.get('/menu', menuControllers().menu)

    app.get('/admin', adminControllers().dash )

    app.post('/savecat', adminControllers().saveCategory)

}

module.exports = initRoutes