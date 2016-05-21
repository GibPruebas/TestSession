var mongoose = require('mongoose');

var UsuarioSchema = new mongoose.Schema({
	idUsuario:String,
    UserName:String,  
	Nombre0:String,
	Nombre1:String,
	Nombre2:String,
	Apellido0:String,
	Apellido1:String,
	Password:String,
	RutaFoto:String,
	idCatEstatus:String,
});
var Usuario = mongoose.model('Usuario', UsuarioSchema,'Usuario');
module.exports=Usuario;

