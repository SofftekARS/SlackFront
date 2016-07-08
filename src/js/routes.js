'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/login');

        // Application routes
        $stateProvider
            .state('login', {
                url: '/login',
                controller:'LoginCtrl',
                controllerAs: 'login',
                templateUrl: 'templates/login.html'
            })
            .state('base', {
                abstract:false,
                controller:'MasterCtrl',
                controllerAs: 'home',
                templateUrl: 'templates/layout.html'
            })

            .state('base.users', {
                url: '/users',
                parent:'base',
                controller:'UsersCtrl',
                controllerAs:'users',
                templateUrl: 'templates/users/users.html'
            })
            .state('base.editUser', {
                url: '/editUser',
                params:{'userId':0},
                controller:'EditUserCtrl',
                templateUrl: 'templates/users/user.html'
            })
            .state('base.newUser', {
                url: '/newUser',
                controller:'NewUserCtrl',
                templateUrl: 'templates/users/user.html'
            })
//------------------------------------------------------------------------
            .state('base.talleres', {
                url: '/talleres',
                parent:'base',
                controller:'TalleresCtrl',
                templateUrl: 'templates/talleres/talleres.html'
            })
            .state('base.editTaller', {
                url: '/editTaller',
                params:{'tallerId':0},
                controller:'EditTallerCtrl',
                templateUrl: 'templates/talleres/taller.html'
            })
            .state('base.newTaller', {
                url: '/newTaller',
                controller:'NewTallerCtrl',
                templateUrl: 'templates/talleres/taller.html'
            })
//-----------------------------------------------------------------------------
            .state('base.solicitudesDeServicio', {
                url: '/solicitudesDeServicio',
                controller:'SDSCtrl',
                templateUrl: 'templates/SolicitudDeServicio/solicitudesDeServicio.html'
            })
            .state('base.newSolicitudesDeServicio', {
                url: '/newSolicitudesDeServicio',
                controller:'NewSDSCtrl',
                templateUrl: 'templates/SolicitudDeServicio/solicitudDeServicio.html'
            })
            .state('base.editSolicitudesDeServicio', {
                url: '/editSolicitudesDeServicio',
                controller:'EditSDSCtrl',
                params:{'solicitudId':0},
                templateUrl: 'templates/SolicitudDeServicio/solicitudDeServicio.html'
            })
            .state('base.sendSolicitudDeServicio', {
                url: '/sendSolicitudesDeServicio',
                controller:'SendSDSCtrl',
                params:{'solicitudId':0},
                templateUrl: 'templates/SolicitudDeServicio/sendSolicitudDeServicio.html'
            })
//----------------------------------------------------------------------------------
          .state('base.solicitudesDeCotizacion', {
              url: '/solicitudesDeCotizacion',
              controller:'SDCotizacionCtrl',
              templateUrl: 'templates/SolicitudDeCotizacion/solicitudesDeCotizacion.html'
          });

    }
]);
