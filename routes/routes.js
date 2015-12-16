var routes = {};
var config = require('../config');
var Usuario = require('../models/usuario');

// Index
routes.index = function(req, res, next) {
   var sess = req.session;
   res.render('index', {
     'data': {
       'usuario' : sess.mUser
     }
   });
};

// Signup and Login
routes.login = function(req, res, next) {
   var sess = req.session
   var body = req.body;

   if( body ) {
    var mUser = new Usuario({
       'nombre' : req.body.nombre
    });
    mUser.save( function(err, data){
        if(err) {
           res.json({
             'error': true,
             'messages' : err.errors
           })
        }else{

           // almacenar datos en session
           sess.mUser = {
             'id' : data.id,
             'nombre' : data.nombre
           };

           // enviar respuesta
           res.json({
            'error' : false,
            'message': 'ok'
           });
        }
    });
  }
};


// Partials
routes.partials = function(req, res, next) {
   var name = req.params.name;
   res.render('partials/' + name);
};

module.exports = routes;
