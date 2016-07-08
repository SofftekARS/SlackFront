angular.module('RDash')
    .controller('SendSDCotizacionController', ['$scope','$rootScope','$state','$stateParams',
    'SolicitudDeServicioService', 'TallerService','SolicitudesDeCotizacionService', SendSDCotizacionController]);

function SendSDCotizacionController($scope, $rootScope, $state, $stateParams,
  SolicitudDeServicioService, TallerService, SolicitudesDeCotizacionService) {

    SolicitudDeServicioService.findById($stateParams.solicitudId)
      .then(function(result){
          console.log(result);
          $scope.solicitud = result;
      });

    TallerService.getAll().then(function(data){
      $scope.talleres = data;
    });

    $rootScope.title = "Edicion de Talleres";
    $rootScope.route = "Talleres / Enviar Solicitud de Cotizacion";

    $scope.save = function(){
        SolicitudesDeCotizacionService.send($scope.solicitud._id, $scope.tallerId).then(function(){
          $state.go("base.solicitudesDeServicio");
        });
    }
}
