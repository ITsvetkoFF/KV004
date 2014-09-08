var mapApp = angular.module('mapApp', [
  'ngRoute',
  'mapControllers'
]);

mapApp.config(['$routeProvider', function ($routeProvider) {
      $routeProvider
          .when('/map', {
              templateUrl: 'app/templates/map.html',
              controller: 'mapLoadCtrl'
          })
          .when('/adminPage', {
              templateUrl: 'app/templates/adminPage.html',
              controller: 'showAdminPageCtrl'
          })
          .when('/problem/showProblem/:problemID', {
              templateUrl: 'app/templates/showProblem.html',
              controller: 'showProblemCtrl'
          })
          .when('/problem/addProblem', {
              templateUrl: 'app/templates/addProblem.html',
              controller: 'addProblemCtrl'
          }).
        otherwise({
            redirectTo: '/map'
        });
  }]);
