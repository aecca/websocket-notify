/**
 * Mongoose
 * @type object
 */
var mongoose = require('../mongoose');
var Schema = mongoose.Schema;


/**
 * Anuncio Schema
 * @type {Schema}
 */
var anuncioSchema = new Schema({
  titulo: { type : String, required: true },
  imagen: String,
  descripcion: String,
  visitas : {type: Number, default : 0},
  postulaciones: ['Postulacion'],
  estado: Number
});



module.exports = mongoose.model('Anuncio', anuncioSchema);