var express = require('express');
var router = express.Router();
var io = require('../socket');
var Anuncio = require('../models/anuncio');
var Postulacion = require('../models/postulacion');

// GET /anuncios => Listado anuncios
router.get('/', function(req, res, next) {
  Anuncio.find( function(err, data) {
      if(data) {
         res.json({
           'error' : false,
           'items' : data
         });
      }
  });
});


// POST /anuncio/postular => Postular anuncio
router.post('/postular', function(req, res, next) {
  var body = req.body;
  var sess = req.session;

  if(body.id) {
      var idAnuncio = body.id;
      var postulacion = new Postulacion({
         'usuario' : {
            'id' : sess.mUser.id,
            'nombre' : sess.mUser.nombre
         }
      });
      var query = Anuncio.findByIdAndUpdate(idAnuncio, {
          $push: {
            "postulaciones": postulacion
          }
      });
      query.exec( function(err, data){
          if(err){
              res.json({
               'error' : true,
               'message': 'No se pudo registrar la postulacion'
             });
          }else{

             // Notificar al administrador
             io.to('admin').emit('usuario:postulacion', {
                'usuario' : sess.mUser.nombre,
                'titulo' : data.titulo,
                'aviso': idAnuncio
             });

             // Enviar respuesta
             res.json({
               'error' : false,
               'message': 'ok'
             });
          }
      });

   }else{
      res.json({
         'error' : true,
         'message': 'Error de parametros'
      });
   }

});


// GET /anuncio/id => Ver anuncio
router.get('/:id/', function(req, res, next) {
  var params =  req.params;
  if(params.id) {
    var query = Anuncio.findOne({"_id" : params.id}, function(err, data) {
        if(err) {
           res.json({
             'error' : true,
             'message' : err
           });
        }else{
           res.json({
            'error' : false,
            'message' : 'ok',
            'item' : data
           });
        }
    });
  }else{
     res.json({
       'error': true,
       'message' : 'Parametros incorrectos'
     });
  }

});

module.exports = router;
