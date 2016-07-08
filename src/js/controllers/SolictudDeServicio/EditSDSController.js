angular.module('RDash')
    .controller('EditSDSCtrl', ['$scope','$rootScope','$state','$stateParams','SolicitudDeServicioService','UserService',EditSDSCtrl]);

function EditSDSCtrl($scope, $rootScope, $state, $stateParams, SolicitudDeServicioService,UserService) {
    console.log("entre a editar");

  SolicitudDeServicioService.findById($stateParams.solicitudId)
      .then(function(result){
          console.log(result);
          $scope.solicitud = result;
      });

      UserService.getAll().then(function(data){
        console.log(data);
        $scope.users = data;
      });


    $rootScope.title = "Edicion de Talleres";
    $rootScope.route = "Talleres / Edicion de Talleres";

    $scope.save = function(){
        SolicitudDeServicioService.update($scope.solicitud).then(function(){
          $state.go("base.solicitudesDeServicio");
        });
    }
    $scope.delete = function(){
        SolicitudDeServicioService.deleteById($scope.solicitud._id).then(function(){
          $state.go("base.solicitudesDeServicio");
        });
    }
}
