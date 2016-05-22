var express = require('express');
var router = express.Router();
var Login=require('../Schema/Login');
var LoginUsuario=require('../Schema/Usuario');
var languages = global.config.application.languages;

function isAuthenticated (req,res,next){
  //if (!req.session.user_id){
  if (!req.session.UserName){
    res.render('not_authorized');
    console.log(req.session.username);
  } else {
    next();
  }
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login',{title:'Express'});
});
router.post('/login', function(req, res, next) { 
    //Cachamos variables
    var Idioma    = req.body.idioma;    
    var UserName  = req.body.username;
    var Empresa   = req.body.empresa;
    var Sucursal  = req.body.sucursal;
    var Password  = req.body.password

    var newLogin      = new Login();
    newLogin.Idioma   =Idioma;
    newLogin.UserName =UserName;
    newLogin.Empresa  =Empresa;
    newLogin.Sucursal =Sucursal;
    newLogin.Password =Password

    newLogin.save(function(err,savelogin){
    if (err){
      console.log(err);
      return res.status(500).send();
    }
    LoginUsuario.findOne ({UserName:UserName,Password:Password},function(err,User){
      //res.redirect('/Prueba');
      if(err){
        console.log(err);
        return res.status(500).send();
      }

      if(!User){
        console.log(UserName+' '+Password);
        //return res.status(404).send();
        res.render('not_authorized');       
      }else{
      console.log('Autorizado');
      req.session.UserName=UserName;
      req.session.Idioma=Idioma;
      console.log(req.session);
      res.redirect('/dashboard');  
      }
      });   
    });         
});
router.get('/dashboard',isAuthenticated, function(req, res) {
          //res.redirect('dashboard'  
      
      global.i18n.setLanguage(req.session.Idioma);  

      res.render('dashboard', {
      usuario:    req.session.UserName,
      hi:           global.lang.site.hi,
      welcome:      global.lang.site.welcome,
      people:       global.lang.site.people,
      commercial:   global.lang.site.commercial,
      finances:     global.lang.site.finances,
      treasury:     global.lang.site.treasury,
      accounting:   global.lang.site.accounting
              });
    //res.render('dashboard');
});
router.get('/logout', function(req, res, next) {
  req.session.destroy()
  res.render('login'); 
});
module.exports = router;
