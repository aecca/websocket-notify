/**
 * Mongo connection
 * @type {[type]}
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/taller');


// Connection error
var db = mongoose.connection;
db.on('error', function(error){
   console.error(error);
});


// Connection sucessfull
db.once('open', function (callback) {
   console.log('Mongo connection successfull');
});


module.exports = mongoose;