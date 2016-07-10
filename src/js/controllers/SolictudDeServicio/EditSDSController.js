angular.module('RDash')
    .controller('EditSDSCtrl', ['$scope','$rootScope','$state','$stateParams','SolicitudDeServicioService',
    'inlineOptions','dateOptions','UserService',EditSDSCtrl]);

function EditSDSCtrl($scope, $rootScope, $state, $stateParams, SolicitudDeServicioService,
  inlineOptions, dateOptions, UserService) {

      console.log("entre a editar");

  SolicitudDeServicioService.findById($stateParams.solicitudId)
      .then(function(result){
          $scope.solicitud = result;
      });

      UserService.getAll().then(function(data){
        console.log(data);
        $scope.users = data;
      });


    $rootScope.title = "Edicion de Talleres";
    $rootScope.route = "Talleres / Edicion de Talleres";

    $scope.save = function(){
      console.log($scope.solicitud.fecha_deseada);
        SolicitudDeServicioService.update($scope.solicitud).then(function(){
          $state.go("base.solicitudesDeServicio");
        });
    }
    $scope.delete = function(){
        SolicitudDeServicioService.deleteById($scope.solicitud._id).then(function(){
          $state.go("base.solicitudesDeServicio");
        });
    }
    //----------------------- congiguro data picker ------------------------------
    $scope.format = 'dd-MM-yyyy';
    $scope.popup1 = {
      opened: false
    };
    $scope.inlineOptions = inlineOptions;
    $scope.dateOptions = dateOptions;

    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.clear = function() {
     $scope.dt = null;
    };
    $scope.toggleMin = function() {
      $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
      $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };
    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };
    $scope.today();
    $scope.toggleMin();

}
