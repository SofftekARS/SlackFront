/**
 * Master Controller
 */

angular.module('RDash')
    .controller('UsersCtrl', ['$scope',UsersCtrl]);

function UsersCtrl($scope) {
    $scope.lala = "asd";
    $scope.a = function(){
        alert("llegue");
        //$state.go("editUser");
    }
}
