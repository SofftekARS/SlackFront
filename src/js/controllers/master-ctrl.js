 /**
  * Master Controller
  */

 angular.module('RDash')
     .controller('MasterCtrl', ['$scope', '$rootScope', '$cookieStore', '$state', MasterCtrl]);

 function MasterCtrl($scope, $rootScope, $cookieStore, $state) {
     /**
      * Sidebar Toggle & Cookie Control
      */
     var mobileView = 992;

     $rootScope.title = "Home";
     $rootScope.route = "Home";

     $scope.getWidth = function() {
         return window.innerWidth;
     };

     $scope.$watch($scope.getWidth, function(newValue, oldValue) {
         if (newValue >= mobileView) {
             if (angular.isDefined($cookieStore.get('toggle'))) {
                 $scope.toggle = !$cookieStore.get('toggle') ? false : true;
             } else {
                 $scope.toggle = true;
             }
         } else {
             $scope.toggle = false;
         }

     });

     $scope.toggleSidebar = function() {
         $scope.toggle = !$scope.toggle;
         $cookieStore.put('toggle', $scope.toggle);
     };

     window.onresize = function() {
         $scope.$apply();
     };

     $rootScope.checkPermisos = function(perfil) {
         if ($rootScope.session.user.perfil.name == 'admin') {
             return true;
         }
         return $rootScope.session.user.perfil.name == perfil;
     }
     $rootScope.$on('httpError', function(event, eventData) {
         console.log(eventData);
         $state.go("login", eventData);
     });
 }