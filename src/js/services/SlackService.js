angular.module('RDash').factory('SlackService', ['$http', '$q', 'apiUrl', SlackService]);

function SlackService($http, $q, apiUrl) {

    var resource = "slack";

    var service = {};
    service.getUrl = getUrl;
    service.authorize = authorize;
    service.getSlackByUser = getSlackByUser;
    service.findById = findById;
    return service;

    function findById(id) {
        var q = $q.defer();
        $http.get(apiUrl + resource + '/' + id).then(function(data) {
            q.resolve(data.data);
        }, function(error) {
            q.reject(error);
        });
        return q.promise;
    }

    function getSlackByUser() {
        var q = $q.defer();
        $http.get(apiUrl + "users/slacks").then(function(data) {
            q.resolve(data.data);
        }, function(error) {
            q.reject(error);
        });
        return q.promise;
    }

    function getUrl() {
        var q = $q.defer();
        $http.get(apiUrl + resource + "/url").then(function(data) {
            q.resolve(data.data);
        }, function(error) {
            q.reject(error);
        });
        return q.promise;
    }

    function authorize(code) {
        var q = $q.defer();
        var obj = {
            code: code
        }
        $http.post(apiUrl + resource, obj).then(function(data) {
            q.resolve(data.data);
        }, function(error) {
            q.reject(error);
        });
        return q.promise;
    }

};