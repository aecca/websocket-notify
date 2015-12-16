/**
 * Login Controller
 *
 * @param $scope Ambito de controlador
 * @param $http Objeto HTTP
 * @param $window Window object instance
 */
var loginCtrl = function($scope, $http, $window) {

   $scope.form = {
     nombre:''
   };

   /**
    * Signup and Login
    */
   $scope.submit = function() {
      if($scope.form.nombre.length < 6 ) {
        alert('El usuario no es valido');
        return;
      }

      $http
       .post('/api/auth/login', $scope.form)
       .then(
        function(obj){
          if(obj.data){
            $scope.reload();
          }
        },
        function(err){
           alert('Ocurrio un problema al entrar. Intente nuevamente');
           console.log(err);
        });

   };

   /**
    * Recargar pagina
    */
   $scope.reload = function(){
      $window.location.href = '/';
   }

};

loginCtrl.$inject = ['$scope', '$http', '$window'];
app.controller('loginCtrl', loginCtrl);
