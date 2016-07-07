/**
 * Master Controller
 */

angular.module('RDash')
    .controller('UsersCtrl', ['$scope', '$state',UsersCtrl]);

function UsersCtrl($scope, $state) {

    $scope.edita = function(){
        alert("llegue");
        $state.go("editUser");
    }
}
