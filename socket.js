var io = require('socket.io')();
var Anuncio = require('./models/anuncio');

// Memory Storage
var usuarios = {};
var mensajes = [];

// Utils
var fn = {
   array : function(collection){
      var arr = [];
      for(var u in collection)
         arr.push(collection[u]);
      return arr;
   },
   clients: function(room){
      try{
         return Object.keys(io.nsps['/'].adapter.rooms[room]).length;
      }catch(e){
         return 0;
      }
   }
};

/**
 * Listener on connection client socket
 * @param  socket Socket/IO client instance
 * @return  void
 */
io.on('connection', function (socket, session) {

   console.log('Socket client connection');
   console.log('Socket client id %s \n', socket.id);

   var id = socket.id;

   /**
   * Suscribe to channel
   * @param  mixed dada
   * @return void
   */
   socket.on('suscribe',function(data){
     console.log('usuario suscrito al canal %s', data.canal)
     socket.join(data.canal);
   });

   socket.on('action:visita', function(data){

      // Total Inicial
      var oldTotal = fn.clients(data.aviso);

      // Suscribir cliente al canal del anuncio
      socket.join(data.aviso);

      // Obtener total de clientes
      var totalVisitas = fn.clients(data.aviso);

      // Notificar contador al canal del anuncio
      io.to(data.aviso).emit('usuario:visita', {
         'total': totalVisitas
      });

      // Notificar contador al administrador
      io.to('admin').emit('usuario:visita', {
         'aviso': data.aviso,
         'total': totalVisitas
      });

      // Actualizar Modelo
      if(totalVisitas != oldTotal) {
         Anuncio.findByIdAndUpdate(data.aviso, {$inc : {'visitas':1}}).exec();
      }


   });


});

module.exports = io;