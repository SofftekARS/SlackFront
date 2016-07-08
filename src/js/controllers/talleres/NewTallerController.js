angular.module('RDash')
    .controller('NewTallerCtrl', ['$scope','$rootScope','$state','$stateParams','TallerService',NewTallerCtrl]);

function NewTallerCtrl($scope, $rootScope, $state, $stateParams, TallerService) {
    console.log("entre a crear");
    $scope.taller ={};

    $rootScope.title = "Edicion de Talleres";
    $rootScope.route = "Talleres / Edicion de Talleres";

    $scope.save = function(){
        console.log("save!!");
        TallerService.save($scope.taller).then(function(){
          $state.go("base.talleres");
        });
    }
}
