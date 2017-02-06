angular.module('RDash', ['ui.bootstrap', 'ui.router', 'ngCookies'])
    //.constant('apiUrl', '//demobosch.eastus2.cloudapp.azure.com/api/');
    .constant('apiUrl', '//localhost:8080/api/');

angular.module('RDash').factory('requestRejector', ['$rootScope', '$q', function($rootScope, $q) {
    var requestRejector = {
        responseError: function(response) {
            console.log(response.status);
            if (response.status == 500 || response.status == 401 || response.status == 403) {
                $rootScope.$broadcast('httpError');
                return $q.reject(response);
            } else {
                return response;
            }
        }
    };
    return requestRejector;
}]);

angular.module('RDash').config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('requestRejector');
}]);