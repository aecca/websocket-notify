/**
 * Listado Controller
 *
 * @param $scope Ambito de controlador
 * @param $http Objeto HTTP
 */
var listadoCtrl = function($scope, $http) {
    $scope.anuncios = [];

    $scope.init = function(){
       $http
        .get('/api/anuncios')
        .then(function(obj){
           $scope.anuncios = obj.data.items;
        });
    };
};

listadoCtrl.$inject = ['$scope', '$http'];
app.controller('listadoCtrl', listadoCtrl);
