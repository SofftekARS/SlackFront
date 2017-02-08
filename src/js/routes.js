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
                controller: 'LoginCtrl',
                controllerAs: 'login',
                templateUrl: 'templates/login.html'
            })
            .state('base', {
                abstract: false,
                controller: 'MasterCtrl',
                controllerAs: 'home',
                templateUrl: 'templates/layout.html'
            })

        .state('base.users', {
                url: '/users',
                parent: 'base',
                controller: 'UsersCtrl',
                controllerAs: 'users',
                templateUrl: 'templates/users/users.html'
            })
            .state('base.editUser', {
                url: '/editUser',
                params: { 'userId': 0 },
                controller: 'EditUserCtrl',
                templateUrl: 'templates/users/user.html'
            })
            .state('base.newUser', {
                url: '/newUser',
                controller: 'NewUserCtrl',
                templateUrl: 'templates/users/user.html'
            })
            //------------------------------------------------------------------------
            .state('base.slacks', {
                url: '/slacks',
                parent: 'base',
                controller: 'SlacksCtrl',
                templateUrl: 'templates/slacks/slacks.html'
            }).state('base.editSlack', {
                url: '/editSlack',
                params: { 'slackId': 0 },
                controller: 'EditSlackCtrl',
                templateUrl: 'templates/slacks/slack.html'
            });
    }
]);