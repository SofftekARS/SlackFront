angular.module('RDash')
    .controller('EditUserCtrl', ['$scope','$rootScope','$state','$stateParams','UserService',EditUserCtrl]);

function EditUserCtrl($scope, $rootScope, $state, $stateParams, UserService) {
    UserService.findById($stateParams.userId)
      .then(function(result){
          $scope.user = result;
      });

    $rootScope.title = "Edicion de Usuario";
    $rootScope.route = "Usuarios / Edicion de Usuarios";

    $scope.save = function(){
        console.log("save!!");
        UserService.update($scope.user);
        $state.go("base.users");

    }
}
