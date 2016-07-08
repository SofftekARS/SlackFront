angular.module('RDash')
    .controller('EditTallerCtrl', ['$scope','$rootScope','$state','$stateParams','TallerService',EditTallerCtrl]);

function EditTallerCtrl($scope, $rootScope, $state, $stateParams, TallerService) {
    console.log("entre a editar");

    TallerService.findById($stateParams.tallerId)
      .then(function(result){
          $scope.taller = result;
      });

    $rootScope.title = "Edicion de Talleres";
    $rootScope.route = "Talleres / Edicion de Talleres";

    $scope.save = function(){
        console.log("save!!");
        TallerService.update($scope.taller).then(function(){
          $state.go("base.talleres");
        });
    }
    $scope.delete = function(){
        console.log("save!!");
        TallerService.deleteById($scope.user._id).then(function(){
          $state.go("base.talleres");
        });
    }
}
