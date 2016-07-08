angular.module('RDash')
    .controller('UsersCtrl', ['$scope','$rootScope','$state',UsersCtrl]);

function UsersCtrl($scope, $rootScope, $state) {

    $rootScope.title = "Usuarios";
    $rootScope.route = "Usuarios";

    $scope.next = function(action){
        $state.go("base.editUser");
    }
}
