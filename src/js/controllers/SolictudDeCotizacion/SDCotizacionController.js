angular.module('RDash')
    .controller('SDCotizacionCtrl', ['$scope','$rootScope','$state',
    'SolicitudDeServicioService',SDCotizacionCtrl]);

function SDCotizacionCtrl($scope, $rootScope, $state, SolicitudDeServicioService) {
    $rootScope.title = "Solicitud De Cotizacion";
    $rootScope.route = "Solicitud De Cotizacion";

    $scope.solicitudes=[];

    SolicitudDeServicioService.getAll().then(function(result){
        angular.extend($scope.solicitudes, result);
    });

    $scope.next = function(id){
        console.log(id);
        $state.go("base.editSolicitudesDeServicio", {solicitudId : id});
    }
    $scope.send = function(id){
        console.log(id);
        $state.go("base.sendSolicitudDeServicio", {solicitudId : id});
    }
    $scope.add = function(){
        $state.go("base.newSolicitudesDeServicio");
    }
}
