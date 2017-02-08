angular.module('RDash')
    .controller('SlacksCtrl', ['$scope', '$rootScope', '$state', '$http', '$location', 'SlackService', SlackCtrl]);

function SlackCtrl($scope, $rootScope, $state, $http, $location, SlackService) {
    $rootScope.title = "Slacks";
    $rootScope.route = "Slacks";
    $scope.slacks = [];

    start();

    $scope.authorizeSlack = function() {
        SlackService.getUrl().then(function(result) {
            console.log(result);
            window.localStorage['tokenSlackApp'] = $http.defaults.headers.common.Authorization;
            console.log("me voy a: " + result.url);
            window.location.href = result.url;
        });
    }

    $scope.next = function(id) {
        console.log(id);
        $state.go("base.editSlack", { slackId: id });
    }

    function start() {
        var token = window.localStorage['tokenSlackApp'];
        console.log("token: " + token);
        if (token && token != 'false') {
            console.log("piso jwt: " + token);
            $http.defaults.headers.common.Authorization = token;
            window.localStorage['tokenSlackApp'] = false;
        }
        var code = $location.search().code;
        if (code) {
            SlackService.authorize(code).then(function(result) {
                console.log(result);
            });
        }
        SlackService.getSlackByUser().then(function(data) {
            $scope.slacks = data.slacks;
        });
    }
}