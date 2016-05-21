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
  res.render('login',{title:'Express'});
});
router.post('/login', function(req, res, next) {  
    req.session.username=req.body.username;
    res.redirect('/dashboard');   
});
router.get('/dashboard',isAuthenticated, function(req, res) {
    res.render('dashboard');
});
router.get('/logout', function(req, res, next) {
  req.session.destroy()
  res.render('login'); 
});
module.exports = router;
