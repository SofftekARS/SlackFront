angular.module('RDash')
    .controller('UsersCtrl', ['$scope','$rootScope','$state','UserService',UsersCtrl]);

function UsersCtrl($scope, $rootScope, $state, UserService) {
    $rootScope.title = "Usuarios";
    $rootScope.route = "Usuarios";

    $scope.users=[];

    UserService.getAll().then(function(result){
        angular.extend($scope.users, result);
    });

    $scope.next = function(id){
        console.log(id);
        $state.go("base.editUser", {userId : id});
    }
    $scope.add = function(){
        $state.go("base.newUser");
    }
}
