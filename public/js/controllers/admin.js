/**
 * Admin Controller
 *
 * @param $scope Ambito de controlador
 * @param $http Objeto HTTP
 * @param socket Socket IO instance
 * @param ngNotify Notificador
 */
var adminCtrl = function($scope, $http, socket, ngNotify) {

   $scope.anuncios = [];

   // Inicializador
   socket.on('connect', function(d){
      socket.emit('suscribe', {
         'canal' : 'admin'
      });
   });

   // Actualizar contador
   socket.on('usuario:visita', function(data){
       $scope.actualizarContadorVisitas(data.aviso, data.total);
   });

   // Notificar Postulacion
   socket.on('usuario:postulacion', function(data){
       ngNotify.set("El usuario :"+ data.usuario + " ha postulado al aviso \n" + data.titulo, 'sucess');
       $scope.actualizarContadorPostulantes(data.aviso);
   });

   $scope.init = function(){
       $http
        .get('/api/anuncios')
        .then(function(obj){
           $scope.anuncios = obj.data.items;
        });
   };

   $scope.actualizarContadorVisitas = function(aviso, total){
      for(var i = 0; i<$scope.anuncios.length; i++){
         if($scope.anuncios[i]._id == aviso ) {
            $scope.anuncios[i].visitas++;
         }
      }
   };

   $scope.actualizarContadorPostulantes = function(aviso){
      for(var i = 0; i<$scope.anuncios.length; i++){
         if($scope.anuncios[i]._id == aviso ) {
            $scope.anuncios[i].postulaciones.length++;
         }
      }
   };

};

adminCtrl.$inject = ['$scope', '$http', 'socket', 'ngNotify'];
app.controller('adminCtrl', adminCtrl);
