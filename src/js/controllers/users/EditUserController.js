angular.module('RDash')
    .controller('EditUserCtrl', ['$scope','$rootScope','$state','$stateParams','UserService',EditUserCtrl]);

function EditUserCtrl($scope, $rootScope, $state, $stateParams, UserService) {
    console.log("entre a editar");

    UserService.findById($stateParams.userId)
      .then(function(result){
          $scope.user = result;
      });

    $rootScope.title = "Edicion de Usuario";
    $rootScope.route = "Usuarios / Edicion de Usuarios";

    $scope.save = function(){
        console.log("save!!");
        UserService.update($scope.user).then(function(){
          $state.go("base.users");
        });
    }
    $scope.delete = function(){
        console.log("save!!");
        UserService.deleteById($scope.user._id).then(function(){
          $state.go("base.users");
        });
    }
}
