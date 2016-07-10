angular.module('RDash', ['ui.bootstrap', 'ui.router', 'ngCookies'])
//.constant('apiUrl', '//demobosch.eastus2.cloudapp.azure.com/api/');
.constant('apiUrl', '//localhost:3000/')
.constant('inlineOptions',{
  customClass: getDayClass,
  minDate: new Date(),
  showWeeks: true
}).constant('dateOptions',{
dateDisabled: disabled,
formatYear: 'yy',
maxDate: new Date(2020, 5, 22),
minDate: new Date(),
startingDay: 1
});

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
