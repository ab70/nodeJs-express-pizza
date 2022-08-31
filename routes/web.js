const homeControllers = require('../app/http/controllers/homeControllers');
const authControllers = require('../app/http/controllers/authControllers');
const menuControllers = require('../app/http/controllers/menuControllers');
const contactControllers = require('../app/http/controllers/contactControllers');
const dashControllers = require('../app/http/controllers/dashControllers');
const auth = require('../app/http/middlewares/authMiddleware');

function initRoutes(app) {
    app.get('/', homeControllers().index )
    app.get('/login', authControllers().login)
    app.post('/login', authControllers().loginauth)
    app.get('/register', authControllers().register)
    app.post('/register', authControllers().reguser)
    app.get('/contact', contactControllers().contact)
    app.get('/dashboard', auth, dashControllers().user)

    app.get('/menu', menuControllers().menu)

}

module.exports = initRoutes