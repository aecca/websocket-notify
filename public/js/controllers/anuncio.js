/**
 * Anuncio Controller
 *
 * @param $scope Ambito de controlador
 * @param $http Objeto HTTP
 * @param $routeParams Parametros del ruteador
 * @param socket Socket IO instance
 */
var anuncioCtrl = function($scope, $http, $routeParams, socket) {

   var id = $routeParams.id;
   $scope.contador = 0;

   // Inicializador
   socket.on('connect', function(d){
      socket.emit('action:visita', {
         'aviso' : id
      });
   });

   socket.on('usuario:visita', function(data){
       $scope.contador=data.total;
   });

  // Inicializador
  $scope.init = function() {
    $http
     .get('/api/anuncios/'+id)
     .then(function(obj){
        $scope.anuncio = obj.data.item;
     });
  };

  // Postulacion
  $scope.postular = function() {
     $http
     .post('/api/anuncios/postular/', { 'id' : id })
     .then(function(obj){
        console.log(obj);
        $scope.postulacion = true;
     });
  };

};

anuncioCtrl.$inject = ['$scope', '$http', '$routeParams', 'socket'];
app.controller('anuncioCtrl', anuncioCtrl);
