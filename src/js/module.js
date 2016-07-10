angular.module('RDash', ['ui.bootstrap', 'ui.router', 'ngCookies'])
//.constant('apiUrl', '//demobosch.eastus2.cloudapp.azure.com/api/');
.constant('apiUrl', '//localhost:3000/');

angular.module('RDash').factory('requestRejector', ['$rootScope','$q', function($rootScope, $q) {
    var requestRejector = {
        responseError: function(response) {
            console.log(response.status);
            if(response.status != 200){
              $rootScope.$broadcast('httpError');
              return $q.reject(response);
            }else{
              return response;
            }
        }
    };
    return requestRejector;
}]);

angular.module('RDash').config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('requestRejector');
}]);
