angular.module('RDash')
    .controller('NewSDSCtrl', ['$scope','$rootScope','$state','$stateParams'
    ,'SolicitudDeServicioService','UserService','inlineOptions','dateOptions', NewSDSCtrl]);

function NewSDSCtrl($scope, $rootScope, $state, $stateParams, SolicitudDeServicioService, UserService,
  inlineOptions, dateOptions) {

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
