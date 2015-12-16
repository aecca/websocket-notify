// Auto-scrollear cuando llega un nuevo mensaje
// - Se crea un watcher para realizar un seguimiento
//  y notificar cuando la data se ha modificado
app.directive('scrollData', function () {
  return {
    restrict : 'AC',
    scope: {
      scrollData: "="
    },
    link: function (scope, element) {
      scope.$watchCollection('scrollData', function (newValue) {
         if(newValue){
            var div = element[0];
            div.scrollTop = div.scrollHeight;
         }
      });
    }
  }
});