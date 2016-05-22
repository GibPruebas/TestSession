var mongoose = require('mongoose');

var loginSchema = new mongoose.Schema({
	Idioma:String,
	UserName:String,
	Empresa:String,
	Sucursal:String,
	Password:String,
	Fecha: { type: Date, default: Date.now }
});
var Login = mongoose.model('login', loginSchema);
module.exports=Login;