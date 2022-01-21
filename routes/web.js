const homeControllers = require('../app/http/controllers/homeControllers');
const authControllers = require('../app/http/controllers/authControllers');

function initRoutes(app) {
    app.get('/', homeControllers().index )
    app.get('/login', authControllers().login)
    app.get('/register', authControllers().register)
    app.post('/register', authControllers().reguser)

    app.get('/contact',(req,res)=>{
    	res.render('contact')
    })
    app.get('/menu',(req,res)=>{
    	res.render('menu')
    })

}

module.exports = initRoutes