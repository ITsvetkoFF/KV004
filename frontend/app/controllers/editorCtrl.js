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
                if (Id){
            $http.put('api/editResource/' + Id, {Alias: Alias, Content: Content, Title: Title, IsResource : IsResource}).success(function() {
            $rootScope.getTitles();
            $location.path('resources/' + Alias);
           }).error(function(status, data) {
            consoe.log(data);
            console.log(status);
                });
       }
       else {
            $http.post('api/addResource', { Alias: Alias, Content: Content, Title: Title, IsResource: IsResource}).success(function() {
            $rootScope.getTitles();
            $location.path('resources/' + Alias);
           }).error(function(data, status) {
                switch (data.err) {
                    case "ER_BAD_NULL_ERROR":
                    $scope.errorMsq = "Заповніть всі поля!";
                    break;
                    case "ER_DUP_ENTRY":
                    $scope.errorMsq = "Вже існує ресурс з таким заголовком або alias!";
                    break;
                    default:
                    $scope.errorMsq = "Перевірте правильність заповнення усіх полів!";
                }
                if (data == "Unauthorized") $scope.errorMsq = "У вас немає прав на додавання ресурсів!";
                    console.log(data)
                    console.log(status)
                });
       };
        };
    }]);
        });
