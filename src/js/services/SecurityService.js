angular.module('RDash').factory('SecurityService', ['$http', '$q', 'apiUrl', SecurityService]);

function SecurityService($http, $q, apiUrl) {

    var resource = "authenticate";

    var service = {};
    service.login = login;
    return service;

    function login(user) {
        var q = $q.defer();
        console.log(user);
        $http.post(apiUrl + resource, user).then(function(data) {
            q.resolve(data.data);
        }, function(error) {
            console.error(error);
            q.reject(error);
        });
        return q.promise;
    }
};