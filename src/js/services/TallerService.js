angular.module('RDash').factory('TallerService',['$http', '$q', 'apiUrl', TallerService]);

function TallerService($http, $q, apiUrl) {

  var resource = "talleres";

  var service = {};
  service.getUsers = getUsers;
  service.findById = findById;
  service.update = update;
  service.save = save;
  service.deleteById = deleteById;
  return service;

  function getUsers(){
    var q = $q.defer();
    $http.get(apiUrl + resource).then(function(data) {
      q.resolve(data.data);
    }, function(error) {
      q.reject(error);
    });
    return q.promise;
  }
  function findById(id){
    var q = $q.defer();
    $http.get(apiUrl + resource +'/'+id).then(function(data) {
      q.resolve(data.data);
    }, function(error) {
      q.reject(error);
    });
    return q.promise;
  }
  function deleteById(id){
    var q = $q.defer();
    $http.delete(apiUrl + resource +'/'+id).then(function(data) {
      q.resolve(data.data);
    }, function(error) {
      q.reject(error);
    });
    return q.promise;
  }
  function update(user){
    var q = $q.defer();
    console.log(user);
    $http.put(apiUrl + resource +'/'+ user._id, user).then(function(data) {
      console.log(data);
      q.resolve(data.data);
    }, function(error) {
      console.error(error);
      q.reject(error);
    });
    return q.promise;
  }
  function save(user){
    var q = $q.defer();
    console.log(user);
    $http.post(apiUrl + resource, user).then(function(data) {
      console.log(data);
      q.resolve(data.data);
    }, function(error) {
      console.error(error);
      q.reject(error);
    });
    return q.promise;
  }
};
