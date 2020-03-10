const log= require('./controllers/log');
const register= require('./controllers/register');
const bodyParser=require('body-parser');
var passport = require('passport');

module.exports=function(app){

    app.use((req, res ,next)=>{
        res.setHeader('Access-Control-Allow-Origin','*');
        res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
      });
    app.use(bodyParser.json());

    app.post('register',register.register);
    app.post('/login', 
        passport.authenticate('local', { failureRedirect: '/login' }),
            function(req, res) {
                res.status(200).json({message:'Authentification réussis'});
            });


    app.get('logout',log.logout);

}