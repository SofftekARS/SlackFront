'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');
        
        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                controller:'MasasdasdasdterCtrl',
                controllerAs: 'home',
                templateUrl: 'templates/dashboard.html'
            })
            .state('users', {
                url: '/users',
                controller:'UsersCtrl',
                templateUrl: 'templates/users/users.html'
            })
            .state('editUsers', {
                url: '/editUser',
                templateUrl: 'templates/users/user.html'
            });
    }
]);
