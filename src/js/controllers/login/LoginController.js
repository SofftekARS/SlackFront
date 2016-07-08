angular.module('RDash')
    .controller('LoginCtrl', ['$scope','$state', LoginCtrl]);

function LoginCtrl($scope, $state) {

    $scope.sigin = function(){
        alert("llegue");
        $state.go("base.users");
    }
}
