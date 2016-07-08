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
                controller:'EditUserCtrl',
                templateUrl: 'templates/users/user.html'
            });
    }
]);
