var express = require('express');
var router = express.Router();
var Login=require('../schema/Login');
var LoginUsuario=require('../schema/Usuario');
var CatPersonas=require('../schema/CatPersonas');

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

    console.log(Idioma);
    console.log(UserName);
    console.log(Empresa);
    console.log(Sucursal);
    console.log(Password);


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
    console.log(User);
      if(!User){
        console.log(UserName+' '+Password);
        //return res.status(404).send();
        res.render('not_authorized');       
      }else{
      console.log('Autorizado');
      req.session.UserName=UserName;
      req.session.Idioma=Idioma;
      console.log(req.session.UserName);
      console.log(req.session.Idioma);
      global.i18n.setLanguage(req.session.Idioma);
      res.redirect('/dashboard');  
      }
      });   
    });         
});

router.get('/dashboard',isAuthenticated, function(req, res) {
          //res.redirect('dashboard'      

      global.i18n.setLanguage(req.session.Idioma);  
      console.log(req.session.Idioma);
      console.log(req.session.UserName);

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


router.get('/personas',isAuthenticated,function(req,res){
console.log(req.session.Idioma);
      console.log(req.session.UserName);
      global.i18n.setLanguage(req.session.Idioma);  

      res.render('personas', {
      usuario:    req.session.UserName,
      hi:           global.lang.site.hi,
      welcome:      global.lang.site.welcome,
      people:       global.lang.site.people,
      commercial:   global.lang.site.commercial,
      finances:     global.lang.site.finances,
      treasury:     global.lang.site.treasury,
      accounting:   global.lang.site.accounting
              });
    //res.render('./personas');
    //res.end;
});

router.post('/personas', function(req, res, next) { 
    //Cachamos variables
     console.log('Cachamos variables');
      var Nombre0= req.body.firstname;
      var Apellido0= req.body.lastname;
      var Email= req.body.email;
      var Password= req.body.password;
      var ConfirmaPassword= req.body.password_again;
      var DateOfBirthDD= req.body.dd;
      var DateOfBirthMM= req.body.mm;
      var DateOfBirthYYYY= req.body.yyyy;
      var Genero= req.body.genderF;
      var CodigoPostal= req.body.zipcode;
      var Ciudad= req.body.city;
      var PersonaFisica= req.body.PersonaFisica;      
      var Usuario= req.session.UserName;

    
    console.log('Asignamos al Schema');



    var newCatPersonas      = new CatPersonas();
      newCatPersonas.Nombre0= Nombre0;
      newCatPersonas.Apellido0= Apellido0;
      newCatPersonas.Email= Email;
      newCatPersonas.Password= Password;
      newCatPersonas.ConfirmaPassword= ConfirmaPassword;
      newCatPersonas.DateOfBirthDD= DateOfBirthDD;
      newCatPersonas.DateOfBirthMM= DateOfBirthMM;
      newCatPersonas.DateOfBirthYYYY= DateOfBirthYYYY;
      newCatPersonas.Genero= Genero;
      newCatPersonas.CodigoPostal= CodigoPostal;
      newCatPersonas.Ciudad= Ciudad;
      newCatPersonas.PersonaFisica= PersonaFisica;
      newCatPersonas.Usuario= Usuario


      console.log('Salvado');

    newCatPersonas.save(function(err,saveCatPersonas){
    if (err){
      console.log(err);
      return res.status(500).send();
    }
      console.log('Redireccionando');
       res.redirect('/personas');
    });         
});


module.exports = router;
