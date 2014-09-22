
/**
 * Defines the main routes in the application.
 * The routes you see here will be anchors '#/' unless specifically configured otherwise.
 */

define(['./app'], function (app) {
    'use strict';
    return app.config(['$routeProvider', function ($routeProvider) {
      $routeProvider
          .when('/adminPage', {
              templateUrl: 'app/templates/adminPage.html',
              controller: 'showAdminPageCtrl'
          })
          .when('/problem/showProblem/:problemID', {
              templateUrl: 'app/templates/showProblem.html',
              controller: 'showProblemCtrl'
          })
          .when('/addDoc',{
            templateUrl: 'app/templates/editor.html',
             controller: 'editorController'
          })
          .when('/problem/addProblem', {
              templateUrl: 'app/templates/addProblem.html',
              controller: 'addProblemCtrl'
          }).
          when('/resources/:name', {
              templateUrl: 'app/templates/resources.html',
              controller:'resourcesCtrl'
          }).
          when('/addDocument', {
              templateUrl: 'app/templates/editorPage.html',
              controller:'addResourceCtrl'
          }).
          when('/editResource/:Alias', {
              templateUrl: 'app/templates/editorPage.html',
              controller:'editorCtrl'
          }).
        otherwise({
            redirectTo: '/map'
        });
  }]);
});
