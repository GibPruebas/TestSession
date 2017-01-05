var mongoose = require('mongoose');

var CatPersonasSchema = new mongoose.Schema({
Nombre0:    String,
Apellido0: String,
Email:		String,
Password: String,
ConfirmaPassword: String,
DateOfBirthDD: { type: Number, min: 1, max: 31 },
DateOfBirthMM: { type: Number, min: 1, max: 12 },
DateOfBirthYYYY: { type: Number, min: 1800, max: 3000 },
Genero:		String,
CodigoPostal: String,
Ciudad: String,
PersonaFisica: Boolean,
FechaAlta: { type: Date, default: Date.now }, 
Usuario: String,
});
var CatPersonas = mongoose.model('CatPersonas', CatPersonasSchema,'CatPersonas');
module.exports=CatPersonas;
