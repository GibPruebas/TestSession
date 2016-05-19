var express = require('express');
var router = express.Router();

function isAuthenticated (req,res,next){
  //if (!req.session.user_id){
  if (!req.session.username){
    res.render('not_authorized');
    console.log(req.session.username);
  } else {
    next();
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{title:'Express'});
});

router.get('/login', function(req, res, next) {
  res.render('login');      
});



router.post('/login', function(req, res, next) {
    req.session.username=req.body.username;
    
    //var pagina='<!doctype html><html><head></head><body>'+
               //'<p>Acceso valido</p>'+
               //'<p>Puede ingresar al panel de control:</p>'+
               //'<a href="/dashboard">Ingresar</a><br>'+
               //'</body></html>';
    //res.send(pagina); 
    //res.render('dashboard'); 

    //res.render('dashboard'); 
    res.redirect('/dashboard');   

});


router.get('/dashboard',isAuthenticated, function(req, res) {
    //if (req.session.username) {
      //res.render('dashboard');    
    //} else {
      //res.render('not_authorized');
    //}

    res.render('dashboard');
});

router.get('/logout', function(req, res, next) {
      req.session.destroy();
      var pagina='<!doctype html><html><head></head><body>'+
               '<br><a href="/login">Retornar</a></body></html>';
      res.send(pagina);
});


module.exports = router;
