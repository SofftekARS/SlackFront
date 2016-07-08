angular.module('RDash')
    .controller('EditUserCtrl', ['$scope','$rootScope','$state',EditUserCtrl]);

function EditUserCtrl($scope, $rootScope, $state) {

    $rootScope.title = "Edicion de Usuario";
    $rootScope.route = "Usuarios / Edicion de Usuarios";

    $scope.save = function(){
        $state.go("base.users");
    }
}
