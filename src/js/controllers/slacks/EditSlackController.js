angular.module('RDash')
    .controller('EditSlackCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'SlackService', EditSlackCtrl]);

function EditSlackCtrl($scope, $rootScope, $state, $stateParams, SlackService) {
    console.log("entre a editar");
    $rootScope.title = "Edicion de Usuario";
    $rootScope.route = "Usuarios / Edicion de Usuarios";

    SlackService.findById($stateParams.slackId)
        .then(function(result) {
            $scope.slack = result;
        });

    $scope.save = function() {
        console.log("save!!");
        SlackService.update($scope.slack).then(function() {
            $state.go("base.salcks");
        });
    }
}