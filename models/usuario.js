/**
 * Mongoose
 * @type object
 */
var mongoose = require('../mongoose');
var Schema = mongoose.Schema;


/**
 * Usuario Schema
 * @type {Schema}
 */
var usuarioSchema = new Schema({
  nombre: String,
  estado: {
     type: Number,
     default : 1
  }
});

/**
 * Validaciones
 */
usuarioSchema.path('nombre').validate(function (value) {
   return value.length >= 6;
}, 'El nombre de usuario no es valido');



module.exports = mongoose.model('Usuario', usuarioSchema);