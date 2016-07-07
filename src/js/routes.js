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
            .state('base', {
                abstract:false,
                url: '',
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
            .state('editUsers', {
                url: '/editUser',
                templateUrl: 'templates/users/user.html'
            });
    }
]);
