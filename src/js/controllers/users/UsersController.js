angular.module('RDash')
    .controller('UsersCtrl', ['$scope','$rootScope','$state','UserService',UsersCtrl]);

function UsersCtrl($scope, $rootScope, $state, UserService) {

    $rootScope.title = "Usuarios";
    $rootScope.route = "Usuarios";

    UserService.getUsers().then(function(result){
      $scope.users = result;
    });

    $scope.next = function(id){
        console.log(id);
        $state.go("base.editUser", {userId : id});
    }
}
