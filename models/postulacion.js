/**
 * Mongoose
 * @type object
 */
var mongoose = require('../mongoose');
var Schema = mongoose.Schema;


/**
 * Postulacion Schema
 * @type {Schema}
 */
var postulacionSchema = new Schema({
  fecha: { type: Date, default: Date.now },
  usuario: {
    id : {
      type: Schema.Types.ObjectId,
      ref: 'Usuario'
    },
    nombre : {
      type: Schema.Types.String,
      ref: 'Usuario'
    }
  },
  estado: Number
});

module.exports = mongoose.model('Postulacion', postulacionSchema);