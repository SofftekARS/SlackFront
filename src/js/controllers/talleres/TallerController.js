angular.module('RDash')
    .controller('TalleresCtrl', ['$scope','$rootScope','$state','TallerService',TalleresCtrl]);

function TalleresCtrl($scope, $rootScope, $state, TallerService) {
    $rootScope.title = "Usuarios";
    $rootScope.route = "Usuarios";

    $scope.talleres=[];

    TallerService.getUsers().then(function(result){
        angular.extend($scope.talleres, result);
    });

    $scope.next = function(id){
        console.log(id);
        $state.go("base.editTaller", {tallerId : id});
    }
    $scope.add = function(){
        $state.go("base.newTaller");
    }
}
