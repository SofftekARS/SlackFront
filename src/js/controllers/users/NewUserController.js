angular.module('RDash')
    .controller('NewUserCtrl', ['$scope','$rootScope','$state','$stateParams','UserService',NewUserCtrl]);

function NewUserCtrl($scope, $rootScope, $state, $stateParams, UserService) {
    console.log("entre a crear");
    $scope.user ={};

    $rootScope.title = "Edicion de Usuario";
    $rootScope.route = "Usuarios / Edicion de Usuarios";

    $scope.save = function(){
        console.log("save!!");
        UserService.save($scope.user).then(function(){
          $state.go("base.users");
        });
    }
}
