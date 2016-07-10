angular.module('RDash')
    .controller('LoginCtrl', ['$scope','$rootScope','$state', '$http', 'SecurityService', LoginCtrl]);

function LoginCtrl($scope, $rootScope ,$state, $http, SecurityService) {
    $scope.user = {};
    $scope.sigin = function(){
      SecurityService.login($scope.user).then(function(result){
          $rootScope.session = result;
          $http.defaults.headers.common.Authorization = result.token;
          SecurityService.getPerfil(result.user[0].perfil[0]).then(function(perfil){
            $rootScope.session.user = result.user[0];
            $rootScope.session.user.perfil = perfil;
            console.log("session");
            console.log($rootScope.session);
            console.log(perfil);
            $state.go("base");
          });
      });
    }
}
