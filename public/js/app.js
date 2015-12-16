/**
 * Application
 * @type {[type]}
 */
var app = angular.module('app', [
   'ngRoute',
   'btford.socket-io',
   'ngNotify'
]);


/**
 * Socket IO
 */
app.factory('socket', function (socketFactory, $window) {
  var app = $window.mApp;
  return socketFactory({
    prefix: '',
    ioSocket: io.connect()
  });
});


/**
 * Router
 */
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/index.html',
        controller: 'listadoCtrl'
      })
      .when('/postular/:id', {
        templateUrl: 'partials/detalle.html',
        controller: 'anuncioCtrl'
      })
      .when('/admin', {
        templateUrl: 'partials/admin.html',
        controller: 'adminCtrl'
      })
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'loginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
}])

.run(['$rootScope','$window','$location', function($rootScope, $window, $location){
     $rootScope.$on('$routeChangeStart', function( event, route) {
        var app = $window.mApp;
        if( !app.usuario ) {
           // evitar bucle de redireccion hacia /login
           if( ['/login', '/admin'].indexOf(route.originalPath) == - 1) {
              $location.path( "/login" );
           }
        }
     });
     $rootScope.$on('$routeChangeSuccess', function(event, route){
       if( route &&  route.originalPath)
         console.log('Current url : ' + route.originalPath);
     });

     $rootScope.$on('$routeChangeError', function(event, route){
        console.error("Error al abrir la url : " + route.originalPath);
     });
}]);