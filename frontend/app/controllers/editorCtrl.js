define(['./module'], function (controllers) {
   'use strict';
    controllers.controller('editorCtrl',['$scope', '$rootScope', '$http', '$routeParams', '$location', function ($scope, $rootScope, $http, $routeParams, $location) {
        if ($routeParams.Alias) {
        $http.get('api/resources/' + $routeParams.Alias).success(function(data) {
            $scope.resource = data[0];
            $scope.Alias = $scope.resource.Alias;
            $scope.Content = $scope.resource.Content;
            $scope.Title = $scope.resource.Title;
            $scope.IsResource = $scope.resource.IsResource
            $scope.Id = $scope.resource.Id;
            });
        }
        else {
            $scope.IsResource = 1
        }
        $rootScope.$broadcast('Update', '_full');
        $scope.sendResource = function(Alias, Content, Title, IsResource, Id) {
            /*$rootScope.data.forEach( function(d) {
                   if (d.Alias == Alias) Id = d.Id
                });*/
            if (Alias === undefined || Content === '' || Content === undefined || IsResource === undefined) {
                $scope.errorMsq = "Всі поля обов'язкові для заповнення!";
                return;
            }
            else {
                if (Id){
            $http.put('api/editResource/' + Id, {Alias: Alias, Content: Content, Title: Title, IsResource : IsResource}).success(function() {
            $rootScope.getTitles();
            $location.path('resources/' + Alias);
           }).error(function(status, data) {
                });
       }
       else {
            $http.post('api/addResource', { Alias: Alias, Content: Content, Title: Title, IsResource: IsResource}).success(function() {
            $rootScope.getTitles();
            $location.path('resources/' + Alias);
           }).error(function(data, status) {
                    if (status === 500)  $scope.errorMsq = "Вже існує ресурс з таким заголовком або alias!";
                });
       };
       };
        };
    }]);
        });
