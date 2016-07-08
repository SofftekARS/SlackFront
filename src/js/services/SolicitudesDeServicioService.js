angular.module('RDash').factory('SolicitudDeServicioService',['$http', '$q', 'apiUrl', SolicitudDeServicioService]);

function SolicitudDeServicioService($http, $q, apiUrl) {

  var resource = "solicitudServicio";

  var service = {};
  service.getAll = getAll;
  service.getAllPendientes = getAllPendientes;
  service.getAllEnviadas = getAllEnviadas;
  service.findById = findById;
  service.update = update;
  service.save = save;
  service.deleteById = deleteById;
  return service;

  function getAll(){
    var q = $q.defer();
    $http.get(apiUrl + resource).then(function(data) {
      q.resolve(data.data);
    }, function(error) {
      q.reject(error);
    });
    return q.promise;
  }
  function getAllEnviadas(){
    var q = $q.defer();
    $http.get(apiUrl + resource + '?status=send').then(function(data) {
      q.resolve(data.data);
    }, function(error) {
      q.reject(error);
    });
    return q.promise;
  }
  function getAllPendientes(){
    var q = $q.defer();
    $http.get(apiUrl + resource + '?status=prossesing').then(function(data) {
      q.resolve(data.data);
    }, function(error) {
      q.reject(error);
    });
    return q.promise;
  }

  function findById(id){
    var q = $q.defer();
    $http.get(apiUrl + resource +'/'+id).then(function(data) {
      var solicitud = data.data;
      console.log(solicitud);
      solicitud.user = solicitud.user[0];
      q.resolve(solicitud);
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
