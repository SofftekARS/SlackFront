angular.module('RDash').factory('UserService',['$http', '$q', 'apiUrl', UserService]);

function UserService($http, $q, apiUrl) {
  var service = {};
  service.getUsers = getUsers;
  service.findById = findById;
  service.update = update;
  return service;

  function getUsers(){
    var q = $q.defer();
    $http.get(apiUrl + 'users').then(function(data) {
      q.resolve(data.data);
    }, function(error) {
      q.reject(error);
    });
    return q.promise;
  }
  function findById(id){
    var q = $q.defer();
    $http.get(apiUrl + 'users/'+id).then(function(data) {
      q.resolve(data.data);
    }, function(error) {
      q.reject(error);
    });
    return q.promise;
  }
  function update(user){
    var q = $q.defer();
    console.log(user);
    $http.put(apiUrl + 'users/'+ user._id, user).then(function(data) {
      console.log(data);
      q.resolve(data.data);
    }, function(error) {
      console.error(error);
      q.reject(error);
    });
    return q.promise;
  }
};
