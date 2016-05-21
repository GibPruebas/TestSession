var mongoose = require('mongoose');

var loginSchema = new mongoose.Schema({
	idioma:String,
	username:String,
	empresa:String,
	sucursal:String,
	password:String,
});
var Login = mongoose.model('login', loginSchema);
module.exports=Login;