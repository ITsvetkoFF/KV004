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
        };
        $rootScope.$broadcast('Update', '_full');
        $scope.sendResource = function(Alias, Content, Title, IsResource, Id) {
            if (Alias === undefined || Content === undefined  || IsResource === undefined) {
                $scope.delPhotoErrorMsg = 'Всі поля обов\'язкові для заповнення';
                return;
            }
            else {
                if (Id){
            $http.put('api/editResource/' + Id, {Alias: Alias, Content: Content, Title: Title, IsResource : IsResource}).success(function() {
            console.log('Query has been successfully sent');
            $rootScope.getTitles();
            $location.path('resources/' + Alias);
           }).error(function(status, data) {
                    console.log(status);
                    console.log(data);
                });
       }
       else {
            $http.post('api/addResource', { Alias: Alias, Content: Content, Title: Title, IsResource: IsResource}).success(function() {
            console.log('Query has been successfully sent');
            $rootScope.getTitles();
            $location.path('resources/' + Alias);
           }).error(function(status, data) {
                    console.log(status);
                    console.log(data);
                });
       };
       };
        };
    }]);
        });
