angular.module('RDash')
    .controller('SDSCtrl', ['$scope','$rootScope','$state','SolicitudDeServicioService',SDSCtrl]);

function SDSCtrl($scope, $rootScope, $state, SolicitudDeServicioService) {
    $rootScope.title = "Solicitud De Servicio";
    $rootScope.route = "Solicitud De Servicio";

    $scope.solicitudesEnviadas=[];
    $scope.solicitudesPendientes=[];

    SolicitudDeServicioService.getAllEnviadas().then(function(result){
        angular.extend($scope.solicitudesEnviadas, result);
    });
    SolicitudDeServicioService.getAllPendientes().then(function(result){
        angular.extend($scope.solicitudesPendientes, result);
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
