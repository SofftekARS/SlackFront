angular.module('RDash')
    .controller('NewSDSCtrl', ['$scope','$rootScope','$state','$stateParams'
    ,'SolicitudDeServicioService','UserService',NewSDSCtrl]);

function NewSDSCtrl($scope, $rootScope, $state, $stateParams, SolicitudDeServicioService, UserService) {

    $rootScope.title = "Solicitud De Servicio";
    $rootScope.route = "Solicitudes De Servicio / Edicion de Solicitudes De Servicio";
    $scope.solicitud ={};
    $scope.users ={};
    UserService.getAll().then(function(data){
      console.log(data);
      $scope.users = data;
    });


    $scope.save = function(){
        console.log("save!!");
        SolicitudDeServicioService.save($scope.solicitud).then(function(){
          $state.go("base.solicitudesDeServicio");
        });
    }
}
