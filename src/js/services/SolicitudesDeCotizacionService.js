angular.module('RDash').factory('SolicitudesDeCotizacionService',['$http', '$q', 'apiUrl', SolicitudesDeCotizacionService]);

function SolicitudesDeCotizacionService($http, $q, apiUrl) {

  var resource = "solicitudCotizacion";

  var service = {};
  service.getAll = getAll;
  service.findById = findById;
  service.update = update;
  service.save = save;
  service.deleteById = deleteById;
  service.send = send;
  return service;

  function send(solicitudId, tallerId){
    var q = $q.defer();
    var req = {
      taller : {
        _id : tallerId
      }
    };
    var endpoint = apiUrl + "solicitudServicio" + "/" + solicitudId + "/" + resource;
    console.log(endpoint);
    console.log(req);
    $http.post( endpoint, req )
      .then(function(data) {
          console.log(data);
          q.resolve(data.data);
        }, function(error) {
          console.error(error);
          q.reject(error);
        });
    return q.promise;
  }

  function getAll(){
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
