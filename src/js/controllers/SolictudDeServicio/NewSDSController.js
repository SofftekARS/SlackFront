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
        if(!$rootScope.checkPermisos('admin')){
          if(!$scope.solicitud.user){
            $scope.solicitud.user = {};
          }
          $scope.solicitud.user._id = $rootScope.session.user._id;
        }
        SolicitudDeServicioService.save($scope.solicitud).then(function(){
          $state.go("base.solicitudesDeServicio");
        });
    }
}
