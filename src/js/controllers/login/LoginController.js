angular.module('RDash')
    .controller('LoginCtrl', ['$scope', '$rootScope', '$state', '$http', '$stateParams', 'SecurityService',
        LoginCtrl
    ]);

function LoginCtrl($scope, $rootScope, $state, $http, $stateParams, SecurityService) {
    $scope.user = {};
    $scope.sigin = function() {
        SecurityService.login($scope.user).then(function(result) {
            $rootScope.session = result;
            console.log(result);
            $http.defaults.headers.common.Authorization = result.token;
            $state.go("base");
        });
    }
}