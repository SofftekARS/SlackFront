angular.module('RDash').factory('SecurityService',['$http', '$q', 'apiUrl', SecurityService]);

function SecurityService($http, $q, apiUrl) {

  var resource = "session";

  var service = {};
  service.login = login;
  service.getPerfil = getPerfil;
  return service;

  function getPerfil(idPerfil){
    var q = $q.defer();
    $http.get(apiUrl + "perfil/"+idPerfil).then(function(data) {
      q.resolve(data.data);
    }, function(error) {
      q.reject(error);
    });
    return q.promise;
  }

  function login(user){
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
